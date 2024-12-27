# Creating AWS Lambda with AWS CLI

```
aws iam create-role --role-name MyLambdaRole --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name MyLambdaRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```
