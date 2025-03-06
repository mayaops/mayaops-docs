---
sidebar_position: 2
---

# Resources Created

# Detailed AWS VPC Resources Documentation

## 1. VPC (Virtual Private Cloud)
* **Definition**: A logically isolated section of the AWS cloud where you can launch AWS resources in a virtual network.
* **Key Features**:
   * Custom IP address range (CIDR block, e.g., 10.0.0.0/16)
   * Multiple subnets across availability zones
   * Private and public networking capabilities
   * Network isolation from other VPCs
* **Benefits**:
   * Complete network control
   * Enhanced security
   * Resource isolation
   * Customizable network architecture

## 2. Subnets
* **Definition**: Subdivisions of a VPC's IP address range where you place resources.
* **Types**:
   * **Public Subnets**:
      * Direct route to Internet Gateway
      * Used for public-facing resources
      * Typically smaller (/24 CIDR blocks)
      * Examples: Web servers, load balancers
   * **Private Subnets**:
      * No direct internet access
      * Used for internal resources
      * Larger address spaces (/23 or /22 CIDR blocks)
      * Examples: Databases, application servers
* **Characteristics**:
   * Located in specific Availability Zones
   * Can have custom routing rules
   * Configurable network access controls
   * Flexible IP addressing

## 3. Network ACLs (NACLs)
* **Definition**: Stateless firewalls operating at the subnet level.
* **Key Features**:
   * Numbered rules for traffic control
   * Separate inbound and outbound rules
   * Processed in order (lowest to highest)
   * Can explicitly allow or deny traffic

**Example Configuration**:
```
Inbound Rules:
100: Allow HTTP (80) from 0.0.0.0/0
200: Allow HTTPS (443) from 0.0.0.0/0
* Deny all others

Outbound Rules:
100: Allow all traffic to 0.0.0.0/0
* Deny all others
```

## 4. Security Groups (SGs)
* **Definition**: Stateful firewalls operating at the instance level.
* **Characteristics**:
   * Only allow rules (no explicit deny)
   * Stateful tracking
   * Instance-specific
   * Can reference other security groups

**Common Configurations**:
```
Web Server SG:
Inbound:
- HTTP (80) from ALB SG
- HTTPS (443) from ALB SG
- SSH (22) from Bastion SG

Database SG:
Inbound:
- DB port from App Server SG
```

## 5. NAT Gateway
* **Definition**: Managed service that enables private subnet resources to access the internet.
* **Features**:
   * Automatic scaling
   * High availability when deployed per AZ
   * Managed by AWS
   * IPv4 and IPv6 support
* **Use Cases**:
   * Software updates for private instances
   * API calls to external services
   * Package downloads
   * External service integration

## 6. Route Tables
* **Definition**: Contains rules (routes) that determine network traffic direction.
* **Types**:

**Main Route Table**:
```
Destination      Target
10.0.0.0/16     local
```

**Public Route Table**:
```
Destination      Target
10.0.0.0/16     local
0.0.0.0/0       igw-id
```

**Private Route Table**:
```
Destination      Target
10.0.0.0/16     local
0.0.0.0/0       nat-id
```

## 7. Gateway Endpoints
* **Definition**: Provides private connectivity to AWS services without internet exposure.
* **Common Services**:
   * Amazon S3
   * DynamoDB
* **Benefits**:
   * Reduced data transfer costs
   * Enhanced security
   * Improved network performance
   * No internet gateway requirement

## 8. ECS Cluster
* **Definition**: Logical grouping of resources for running containerized applications.
* **Components**:
   * Container instances
   * Task definitions
   * Services
   * Load balancing integration
* **Features**:
   * Auto scaling
   * Container orchestration
   * Service discovery
   * Load balancing integration

## 9. Bastion Host Machine
* **Definition**: Secure entry point for accessing private resources.

**Security Configuration**:
```
Security Group:
Inbound:
- SSH (22) from allowed IP ranges
Outbound:
- SSH (22) to private instances
```

* **Best Practices**:
   * Minimal installed software
   * Regular security updates
   * Strong access controls
   * Audit logging enabled
   * Multi-factor authentication

## 10. Integration and Communication Flow

### 10.1 Network Flow
```
Internet → Internet Gateway → Public Subnet → NAT Gateway → Private Subnet
```

### 10.2 Security Layer Integration
```
External Request → NACL → Security Group → Instance
```

### 10.3 Access Pattern
```
Admin → Bastion Host → Private Resources
```
