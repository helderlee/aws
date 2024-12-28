# Using AWS Lambda with AWS CLI

```
aws --version
aws lambda list-functions
aws lambda get-function --function-name my-function
aws lambda invoke --function-name my-function --cli-binary-format raw-in-base64-out --payload {\"key\":\"value\"} response.json
aws lambda invoke --function-name my-function --cli-binary-format raw-in-base64-out --payload file://event.json response.json
aws lambda invoke --function-name my-function out --log-type Tail --query LogResult --output text
```

# Reading CloudWatch Logs with AWS CLI

```
aws logs describe-log-groups --query logGroups[*].logGroupName
aws logs describe-log-streams --log-group-name /aws/lambda/my-function --query logStreams[*].logStreamName
aws logs get-log-events --log-group-name /aws/lambda/my-function --log-stream-name 2024/12/27/[$LATEST]fbe378fccd124a7e8ac6d0bc22a81349
```
