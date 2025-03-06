---
sidebar_position: 1
---

# Create a Resource

# Creating Resources in MayaOps Application

This document provides a detailed guide on how to create resources in your MayaOps application. The "Create Resource" feature allows users to create RDS (Relational Database Service) and ElastiCache instances. Currently, the application supports PostgreSQL for RDS and Redis for ElastiCache. This document will explain each element of the resource creation process, including validations, security considerations, and how to connect to the created resources.

## Table of Contents
- Introduction to Resource Creation
- Resource Creation Form Elements
- Resource Name
- Environment
- Resource Type (RDS/ElastiCache)
- Instance Class
- Password (for RDS)
- Security of Resources
- Connecting to Resources
- Attaching Resources to Services
- Instance Classes (Detailed Explanation)
- Conclusion

## 1. Introduction to Resource Creation
The "Create Resource" feature in MayaOps allows users to create RDS and ElastiCache instances. These resources are essential for applications that require a database (RDS) or an in-memory caching layer (ElastiCache). The created resources are deployed in private subnets, ensuring they are not exposed to the public internet and are secure by default.

## 2. Resource Creation Form Elements

### 2.1 Resource Name
**What is it?**
The resource name is a unique identifier for the resource being created. It is used to distinguish between different resources in your application.

**Validation Rules:**
- Must be exactly 8 characters long.
- Must contain only lowercase letters.
- No numbers or special characters are allowed except for hyphens (-).
- Example: my-resource, db-cache.

### 2.2 Environment
**What is it?**
The environment field is pre-selected based on the account, region, and environment chosen in the navbar. It determines where the resource will be deployed.

**Validation Rules:**
- The environment can be changed from the navbar if needed.
- Must be a valid environment (e.g., dev, staging, prod).

### 2.3 Resource Type
**What is it?**
The resource type defines the type of resource being created. Currently, the following types are supported:
- RDS: A managed relational database service (PostgreSQL).
- ElastiCache: A managed in-memory caching service (Redis).

**Validation Rules:**
- Must be one of the supported types (rds or ec).

### 2.4 Instance Class
**What is it?**
The instance class defines the compute and memory capacity of the resource. Different instance classes are available for RDS and ElastiCache.

**Validation Rules:**
- Must be selected from the predefined instance classes (see Section 6 for details).

### 2.5 Password (for RDS)
**What is it?**
The password is used to secure the RDS instance. It is required only for RDS resources.

**Validation Rules:**
- Must be entered and confirmed.
- Must meet the password complexity requirements (e.g., minimum length, special characters).

## 3. Security of Resources

### 3.1 Private Subnet Deployment
All resources (RDS and ElastiCache) are deployed in private subnets. This means:
- The resources are not exposed to the public internet.
- Access is restricted to resources within the VPC (Virtual Private Cloud).

### 3.2 Secure Connectivity
- To connect to the resources, users must first SSH into the bastion host created during environment creation.
- The bastion host acts as a secure gateway to access the resources.

### 3.3 Encryption
- All data stored in RDS and ElastiCache is encrypted at rest and in transit.
- Encryption keys are managed using AWS Key Management Service (KMS).

## 4. Connecting to Resources

### 4.1 Steps to Connect
**SSH into the Bastion Host:**
- Use the SSH key pair provided during environment creation.
- Example: 
```
ssh -i my-key.pem ec2-user@bastion-host-ip
```

**Connect to RDS (PostgreSQL):**
- Use the psql command or a PostgreSQL client.
- Example: 
```
psql -h my-rds-endpoint -U my-user -d my-database
```

**Connect to ElastiCache (Redis):**
- Use the redis-cli command.
- Example: 
```
redis-cli -h my-elasticache-endpoint -p 6379
```

## 5. Attaching Resources to Services

### 5.1 Attaching from Service Details Page
- Users can create and attach resources directly from the Service Details Page.
- This ensures that the resource is linked to the service and can be used by the application.

### 5.2 Benefits
- Simplifies resource management.
- Ensures that the service has access to the required resources (e.g., database, cache).

## 6. Instance Classes (Detailed Explanation)

### 6.1 RDS Instance Classes
**db.t4g.micro:**
- CPU: 2 vCPU
- Memory: 1 GB
- Use Case: Development and testing.

**db.t4g.small:**
- CPU: 2 vCPU
- Memory: 2 GB
- Use Case: Small production workloads.

**db.t4g.medium:**
- CPU: 2 vCPU
- Memory: 4 GB
- Use Case: Medium production workloads.

### 6.2 ElastiCache Instance Classes
**cache.t4g.micro:**
- CPU: 2 vCPU
- Memory: 1 GB
- Use Case: Development and testing.

**cache.t4g.small:**
- CPU: 2 vCPU
- Memory: 2 GB
- Use Case: Small production workloads.

**cache.t4g.medium:**
- CPU: 2 vCPU
- Memory: 4 GB
- Use Case: Medium production workloads.

## 7. Conclusion
The "Create Resource" feature in MayaOps is a powerful tool that allows users to create RDS and ElastiCache instances with ease. By following the guidelines and validations outlined in this document, users can ensure a smooth and secure resource creation process. The resources are deployed in private subnets, ensuring they are secure by default. Users can connect to these resources via a bastion host and attach them to services as needed. If you have any questions or need further assistance, please refer to the application's help documentation or contact support.

This document serves as a comprehensive guide for creating and managing resources in your MayaOps application.