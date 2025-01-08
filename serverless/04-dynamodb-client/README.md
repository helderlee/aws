# DynamoDB Client

DynamoDB table

`aws dynamodb create-table --cli-input-json file://products-table.json`

`aws dynamodb list-tables`

`aws dynamodb describe-table --table-name products`

`aws dynamodb scan --table-name products`

Policies

```bash
aws sts get-caller-identity --query "Account" --output text
# replace 000000000000 by account ID from the prior command
aws iam create-policy --policy-name MyLambdaLogsPolicy --policy-document file://lambda-logs-policy.json
aws iam create-policy --policy-name MyLambdaDynamoDBPolicy --policy-document file://lambda-dynamodb-policy.json
```

Lambda Role to DynamoDB

```bash
aws iam create-role --role-name MyLambdaSimpleMicroserviceRole --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name MyLambdaSimpleMicroserviceRole --policy-arn arn:aws:iam::000000000000:policy/MyLambdaLogsPolicy
aws iam attach-role-policy --role-name MyLambdaSimpleMicroserviceRole --policy-arn arn:aws:iam::000000000000:policy/MyLambdaDynamoDBPolicy
```
