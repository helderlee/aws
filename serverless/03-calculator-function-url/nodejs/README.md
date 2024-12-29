# Creating NodeJS Lambda

Zip the handler to function.zip.

```
aws iam get-role --role-name MyLambdaRole
aws lambda create-function --function-name calculator-function --runtime nodejs22.x --zip-file fileb://function.zip --handler index.handler --role arn:aws:iam::308360398142:role/MyLambdaRole
```

# Updating NodeJS Lambda

Update the code.

Zip the handler to function.zip.

```
aws lambda update-function-code --function-name calculator-function --zip-file fileb://function.zip
```

# Creating Function URL

* Only for development purposes

```
aws lambda create-function-url-config --function-name calculator-function --auth-type NONE
aws lambda get-function --function-name calculator-function
aws lambda add-permission --function-name calculator-function --statement-id FunctionURLAllowPublicAccessMyStatementId --action lambda:InvokeFunctionUrl --principal * --source-arn arn:aws:lambda:us-west-2:123456789012:function:calculator-function --function-url-auth-type NONE
```
