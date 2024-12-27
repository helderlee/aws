# NodeJS Lambda

Zip the handler to function.zip

```
aws iam get-role --role-name MyLambdaRole
aws lambda create-function --function-name my-nodejs-function --runtime nodejs22.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::308360398142:role/MyLambdaRole
```
