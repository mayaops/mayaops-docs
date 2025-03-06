---
sidebar_position: 4
---

# View and Delete Environment

# MayaOps Environment Details Documentation

## Viewing Environment Details

From the Environments page, you can view detailed information about each environment by following these steps:

### Steps to View Environment Details:
1. Navigate to the Environments page
2. Locate your environment in the list
3. Click the "View Details icon" button in the corresponding row

### Connection Information Available:

#### 1. Bastion Host Details
* Hostname
* IP Address
* PEM file download link

## How to Connect to Resources

### Connecting to Bastion Host:
1. Download the PEM file from the environment details
2. Set correct permissions for the PEM file:
   ```bash
   chmod 400 path/to/your-key.pem
   ```
3. Connect using SSH:
   ```bash
   ssh -i path/to/your-key.pem ec2-user@<bastion-ip>
   ```

### Connecting to RDS:
1. First, SSH into the bastion host
2. Use the following command to connect to RDS:
   ```bash
   psql -h <rds-endpoint> -U <username> -d <database>
   ```
   or for MySQL:
   ```bash
   mysql -h <rds-endpoint> -u <username> -p <database>
   ```

### Connection to Redis:
```bash
# First SSH into bastion host
ssh -i path/to/your-key.pem ec2-user@<bastion-ip>

# Connect to Redis using redis-cli
redis-cli -h <redis-endpoint> -p 6379
```

### Connecting to EC2 Instances:
1. First, SSH into the bastion host
2. Then connect to the EC2 instance:
   ```bash
   ssh -i /path/to/internal-key.pem ec2-user@<private-ip>
   ```

## Environment Deletion

### Important Notes:
* Environment deletion is irreversible
* All resources within the environment will be terminated
* This action cannot be undone
* There is no edit functionality for environments

### Deletion Steps:
1. Navigate to the Environments page
2. Locate the environment you want to delete
3. Click the "Delete" button in the actions column
4. Confirm deletion in the warning dialog
5. Wait for the deletion process to complete (typically 5-10 minutes)

### Pre-deletion Checklist:
* Backup any important data
* Download any necessary logs
* Inform team members
* Ensure no critical services are running

### Deletion Process:
1. Terminates all EC2 instances
2. Deletes RDS instances
3. Removes load balancers
4. Cleans up security groups
5. Deletes NAT gateways
6. Removes VPC and associated resources

### Post-deletion:
* Environment will be removed from the list
* Resources will no longer be accessible
* AWS charges for these resources will cease
* Backups will be retained according to backup policy

## Important Security Notes:
* Keep PEM files secure and never share them
* Always use the bastion host for accessing private resources
* Follow security best practices when connecting to resources
* Regularly rotate credentials
* Monitor access logs for security