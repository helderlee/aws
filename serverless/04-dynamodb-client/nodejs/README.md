# Setup

```bash
aws iam get-role --role-name MyLambdaSimpleMicroserviceRole
aws lambda create-function --function-name product-function --runtime nodejs22.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::308360398142:role/MyLambdaSimpleMicroserviceRole
```

`npm init -y`

Change package.json:

```jso
  "main": "index.mjs",
```

Install the DynamoDB modules:

`npm install @aws-sdk/client-dynamodb`

`npm install @aws-sdk/util-dynamodb`
