# Creating Python Lambda

Zip the handler to function.zip.

```
aws iam get-role --role-name MyLambdaRole
aws lambda create-function --function-name my-python-function --runtime python3.13 --zip-file fileb://function.zip --handler lambda_function.lambda_handler --role arn:aws:iam::308360398142:role/MyLambdaRole
```

# Updating Python Lambda

Update the code.

Zip the handler to function.zip.

```
aws lambda update-function-code --function-name my-python-function --zip-file fileb://function.zip
```

# Environment Variables

```
aws lambda update-function-configuration --function-name my-python-function --environment Variables={BUCKET=my-bucket,KEY=file.txt}
aws lambda get-function-configuration --function-name my-python-function
```

# Delete Lambda

```
aws lambda list-functions --max-items 10
aws lambda delete-function --function-name my-python-function
```
