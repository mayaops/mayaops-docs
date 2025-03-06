---
sidebar_position: 1
---

# Request Logs

# Request Logs in MayaOps

## Overview
The Request Logs section in MayaOps provides a comprehensive audit trail of all significant actions performed within the platform. Every creation, update, or deletion of services and resources is logged, allowing for better traceability, compliance, and debugging.

## Logged Actions
MayaOps captures and stores the following actions in the Request Logs:

### 1. Service Management Logs
* **Create Service:** Logs the details when a new service is created, including the AWS account, region, and configurations.
* **Update Service:** Records modifications made to an existing service, including changes in instance configurations and attached resources.
* **Delete Service:** Tracks when a service is deleted, ensuring accountability and traceability.

### 2. Resource Management Logs
* **Create Resource:** Logs when an RDS (PostgreSQL) or ElastiCache (Redis) instance is created, along with instance class, security settings, and credentials (if applicable).
* **Update Resource:** Records any changes to an existing resource, such as instance class upgrades or modifications to security settings.
* **Delete Resource:** Captures the deletion of an RDS or ElastiCache instance, ensuring that resource removals are logged for reference.

## Log Details
Each log entry contains:
* **Timestamp:** The exact time when the action occurred.
* **User:** The user who performed the action.
* **Role & Permissions:** Ensures the action was allowed based on the user's assigned role.
* **AWS Account & Region:** Specifies in which AWS account and region the change was made.
* **Action Type:** Whether the action was a creation, update, or deletion.
* **Resource Details:** Information about the affected service or resource.
* **Previous vs. Updated State:** For updates, logs the before-and-after details.

## Accessing Request Logs
Users with the necessary permissions can access the Request Logs section via the MayaOps dashboard. Logs can be filtered based on:
* Date Range
* Action Type (Create, Update, Delete)
* User
* AWS Account & Region
* Service/Resource Name