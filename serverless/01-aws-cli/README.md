Using AWS Lambda with AWS CLI

```
aws --version
aws lambda list-functions
aws lambda get-function --function-name my-function
aws lambda invoke --function-name my-function --cli-binary-format raw-in-base64-out --payload {\"key\":\"value\"} response.json
```
