---
sidebar_position: 1
---

# Create a Service

# Creating a Service in MayaOps Application

This document provides a detailed guide on how to create a service in MayaOps. The service creation process involves configuring various settings, including service type, CPU, memory, task count, and more. The service creation will result in the creation of several AWS resources, including an ECS service, task definition, load balancer, and more. Below, we will explain each component, its purpose, and the validations required.

## Table of Contents
- Introduction to Service Creation
- Service Creation Options
- Service Name
- Environment, Account, and Region
- Connect to Git Account and Repository
- Service Types List
- Service Type Configuration
- Service Type
- CPU and Memory Allocation
- Task Count
- Command
- Port Configuration
- Health Check Endpoint
- Public Accessibility (Load Balancer)
- Autoscaling
- Environment Variables
- Validations
- AWS Resources Created
- Secrets Management
- Conclusion

## 1. Introduction to Service Creation
The "Create Service" feature in MayaOps application allows users to create an ECS (Elastic Container Service) service. This service can be of different types, such as server, worker, or fe-web. Each service type has specific configurations, such as CPU, memory, task count, and more. The service creation process also integrates with AWS resources like ECS, ALB (Application Load Balancer), and AppConfig, ensuring a seamless deployment experience.

## 2. Service Creation Options

### 2.1 Service Name
**What is it?**  
The service name is a unique identifier for the service being created. It is used to distinguish between different services in your application.

**Validation Rules:**
- Must contain only lowercase letters.
- No numbers or special characters are allowed except for hyphens (-).
- Example: my-service, backend-server.

### 2.2 Environment, Account, and Region
**What is it?**  
These fields are pre-selected based on the user's environment, AWS account, and region. They determine where the service will be deployed.

**Validation Rules:**
- These fields are read-only and cannot be modified during service creation.

### 2.3 Connect to Git Account and Repository
**What is it?**  
This is an optional field that allows users to connect their GitHub account and repository to the service. If connected, a CI/CD pipeline will be created using GitHub Actions for automated deployments.

**Validation Rules:**
- The repository must exist and be accessible by the connected GitHub account.
- The repository must contain the necessary files for deployment (e.g., Dockerfile, application code).

### 2.4 Service Types List
**What is it?**  
This is an array of objects where users can define multiple service types (e.g., server, worker, fe-web). Each service type has its own configuration.

**Validation Rules:**
- Each service type must be unique. For example, if server is selected, it cannot be chosen again.

### 2.5 Service Type Configuration

#### 2.5.1 Service Type
**What is it?**  
The service type defines the role of the service. For example:
- server: Handles incoming requests.
- worker: Performs background tasks.
- fe-web: Serves frontend web applications.

**Validation Rules:**
- Must be one of the predefined types (server, worker, fe-web).

#### 2.5.2 CPU and Memory Allocation
**What is it?**  
These fields define the amount of CPU and memory allocated to the service. They determine the performance and resource usage of the service.

**Validation Rules:**
- Must be selected from predefined plans (e.g., 0.5 vCPU / 1 GB RAM, 1 vCPU / 2 GB RAM).

#### 2.5.3 Task Count
**What is it?**  
The task count defines the number of running instances (tasks) for the service. It ensures scalability and high availability.

**Validation Rules:**
- Must be an integer between 1 and 20.

#### 2.5.4 Command
**What is it?**  
The command is the entry point for the container. It specifies the script or command to run when the container starts.

**Validation Rules:**
- Default values:
  - For server: `sh run.sh`
  - For worker: `sh worker.sh`
- Changes to this field should be verified carefully, as they can impact the application.

#### 2.5.5 Port Configuration
**What is it?**  
The port number is used for communication between the service and other components (e.g., load balancer, other services).

**Validation Rules:**
- Must be an integer between 1000 and 9999.
- Default: 8080.

#### 2.5.6 Health Check Endpoint
**What is it?**  
The health check endpoint is used by the load balancer to determine if the service is healthy and able to handle requests.

**Validation Rules:**
- Default: `/ping`.
- Changes to this field should be verified carefully, as they can impact the application.

#### 2.5.7 Public Accessibility (Load Balancer)
**What is it?**  
This checkbox determines whether the service is accessible to the public internet via a load balancer.

**Validation Rules:**
- Default: false (not public).

#### 2.5.8 Autoscaling
**What is it?**  
Autoscaling dynamically adjusts the number of tasks based on traffic patterns.

**Validation Rules:**
- Default: false (disabled).

### 2.6 Environment Variables
**What is it?**  
Environment variables are used to configure the application dynamically. They can be added via a form input or a raw editor (JSON/YAML).

**Validation Rules:**
- Keys must be unique.
- Values must be valid strings.
- Bulk upload and YAML/JSON types can only be done using the raw editor.

## 3. Validations
- Service Name: Lowercase letters and hyphens only.
- Service Type: Must be unique and one of the predefined types.
- CPU and Memory: Must be selected from predefined plans.
- Task Count: Must be between 1 and 20.
- Port: Must be between 1000 and 9999.
- Environment Variables: Keys must be unique, and values must be valid strings.

## Detailed Explanation of AWS Resources Created and Additional Features
In this section, we will dive deeper into the AWS resources created during the service creation process, as well as explain how service types are customizable by organizations during onboarding. We will also provide a detailed explanation of environment variables (secrets) and AppConfig deployment.

## 4. AWS Resources Created (Detailed Explanation)
When a service is created in MayaOps, the following AWS resources are provisioned:

### 4.1 Task Definition
**What is it?**  
A task definition is a blueprint for your application. It defines the container settings, such as:
- Docker image to use.
- CPU and memory allocation.
- Environment variables.
- Networking mode (e.g., bridge, awsvpc).
- Logging configuration.

**Why is it important?**  
The task definition ensures that your application runs consistently across different environments. It acts as a template for launching ECS tasks.

### 4.2 ECS Service
**What is it?**  
An ECS (Elastic Container Service) service ensures that a specified number of tasks (instances of your application) are running and healthy at all times. It provides:
- High availability by distributing tasks across availability zones.
- Automatic failover by restarting failed tasks.
- Load balancing integration.

**Why is it important?**  
The ECS service ensures that your application is always available and can handle traffic efficiently.

### 4.3 Deploy Task with Base Image
**What is it?**  
This step involves deploying the initial version of your application using a predefined base image. The base image is typically a Docker image that contains the necessary runtime and dependencies for your application.

**Why is it important?**  
The base image ensures that your application starts with a consistent and tested environment, reducing the risk of runtime errors.

### 4.4 Application Load Balancer (ALB)
**What is it?**  
An ALB (Application Load Balancer) distributes incoming traffic across multiple tasks (instances) of your service. It provides:
- Health checks to ensure traffic is only routed to healthy tasks.
- SSL/TLS termination for secure communication.
- Path-based routing for advanced traffic management.

**Why is it important?**  
The ALB ensures that your application can handle high traffic loads and provides a single entry point for users.

### 4.5 Target Group
**What is it?**  
A target group is a logical grouping of tasks (instances) that the ALB routes traffic to. It defines:
- The port to route traffic to.
- Health check settings.
- Protocol (HTTP/HTTPS).

**Why is it important?**  
The target group links your ECS service to the ALB, enabling efficient traffic distribution.

### 4.6 Auto Scaling Policies
**What is it?**  
Auto Scaling policies dynamically adjust the number of tasks based on traffic patterns or resource utilization. For example:
- Scale out (add more tasks) when CPU usage exceeds 70%.
- Scale in (remove tasks) when CPU usage drops below 30%.

**Why is it important?**  
Auto Scaling ensures that your application can handle varying traffic loads without manual intervention, optimizing resource usage and cost.

### 4.7 AppConfig Deployment
**What is it?**  
AWS AppConfig is a service that manages application configurations. It allows you to:
- Deploy environment-specific configurations (e.g., dev, staging, prod).
- Roll out changes gradually (e.g., 10% of users first).
- Roll back changes if issues are detected.

**Why is it important?**  
AppConfig ensures that your application uses the correct configuration for each environment, reducing the risk of misconfigurations.

### 4.8 CI/CD Pipeline in GitHub (if repository is connected)
**What is it?**  
If a GitHub repository is connected, a CI/CD (Continuous Integration/Continuous Deployment) pipeline is created using GitHub Actions. The pipeline automates:
- Building the Docker image.
- Running tests.
- Deploying the application to ECS.

**Why is it important?**  
The CI/CD pipeline ensures that your application is always up-to-date and reduces the manual effort required for deployments.

## 5. Customizable Service Types
During onboarding to the MayaOps platform, organizations (companies) can define their own service types. These service types are then shown to users within that organization when creating a service. For example:
- An organization might define service types like server, worker, fe-web, batch-processor, or api-gateway.
- These service types are customizable and can be tailored to the organization's specific needs.

**How It Works:**
- During onboarding, the organization provides a list of service types they want to use.
- These service types are stored in the platform's database and associated with the organization.
- When users from that organization create a service, they can only choose from the predefined service types.

## 6. Environment Variables (Secrets) Creation
Environment variables (secrets) are used to configure your application dynamically. They can be created and managed in several ways:

### 6.1 Form Input
Users can add secrets one by one using a form.
Each secret consists of a key and a value.
Example:
- Key: `DB_HOST`
- Value: `database.example.com`

### 6.2 Raw Editor
Users can bulk upload secrets using a raw editor.

Supported formats:
- JSON:
```json
{
  "DB_HOST": "database.example.com",
  "DB_USER": "admin"
}
```
- YAML:
```yaml
DB_HOST: database.example.com
DB_USER: admin
```
- ENV:
```
DB_HOST=database.example.com
DB_USER=admin
```

### 6.3 Bulk Upload
Users can upload a file containing secrets in JSON, YAML, or ENV format.
The platform parses the file and adds the secrets to the service.

### 6.4 Validations
- Keys must be unique.
- Values must be valid strings.
- Reserved keys (e.g., AWS_*) cannot be used.

## 7. AppConfig Deployment (Detailed Explanation)
AWS AppConfig is used to manage and deploy environment-specific configurations for your application. Here's how it works:

### 7.1 Configuration Creation
Configurations are created in JSON or YAML format.
Example:
```json
{
  "feature_flag": true,
  "max_connections": 100
}
```

### 7.2 Environment-Specific Configurations
Different configurations can be created for different environments (e.g., dev, staging, prod).
Example:
- Dev: feature_flag = true, max_connections = 50
- Prod: feature_flag = false, max_connections = 100

### 7.3 Deployment Strategy
Configurations can be deployed gradually to reduce risk.
Example:
- Deploy to 10% of tasks first.
- Monitor for errors.
- If no errors, deploy to 100% of tasks.

### 7.4 Rollback
If issues are detected, the deployment can be rolled back to the previous configuration.

### 7.5 Integration with ECS
AppConfig is integrated with ECS, ensuring that each task uses the correct configuration for its environment.

## 8. Conclusion
The "Create Service" feature in MayaOps is a comprehensive tool that leverages AWS resources like ECS, ALB, and AppConfig to provide a seamless deployment experience. Organizations can customize service types during onboarding, and users can manage environment variables (secrets) using a form or raw editor. AppConfig ensures that environment-specific configurations are applied correctly, reducing the risk of misconfigurations. By following this detailed guide, users can create and manage services with confidence.