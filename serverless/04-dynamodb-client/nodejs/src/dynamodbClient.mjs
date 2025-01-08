import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
const REGION = "us-east-1";
const dynamoDBClient = new DynamoDBClient({ region: REGION });
export { dynamoDBClient }