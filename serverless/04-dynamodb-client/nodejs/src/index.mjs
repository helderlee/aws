import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDBClient } from "./dynamodbClient.mjs";
import { GetItemCommand, QueryCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = "products";

export const handler = async (event) => {
    try {
        console.log("Event: ", JSON.stringify(event, null, 2));

        const httpRequest = event.requestContext.http;
        let body;

        switch (httpRequest.method) {
            case "GET":
                if (httpRequest.path === "/") {
                    console.log("GET all products");
                    body = await getProducts(event);
                } else {
                    console.log("GET product by id");
                    const productId = httpRequest.path.split("/")[1];
                    body = await getProductById(productId);
                }
                break;
            case "POST":
                body = await createProduct(event);
                break;
            case "DELETE":
                const deleteProductId = httpRequest.path.split("/")[1];
                body = await deleteProduct(deleteProductId);
                break;
            case "PUT":
                body = await updateProduct(event);
                break;
            default:
                throw new Error(`Unsupported method: ${httpRequest.method}`);
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(body),
        };

        console.log("Response:", JSON.stringify(response, null, 2));

        return response;
    } catch (error) {
        console.error("Error processing event:", error.message);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

const getProductById = async (productId) => {
    console.log("Method: getProductById");
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: marshall({ id: productId })
        };

        const { Item: item } = await dynamoDBClient.send(new GetItemCommand(params));

        console.log("Item:", item);

        return item ? unmarshall(item) : {};
    } catch (error) {
        console.error("Error in getProductById:", error);
        throw error;
    }
};

const getProducts = async (event) => {
    console.log("Method: getAllProducts");
    try {
        // Parse the query string
        const queryParams = new URLSearchParams(event.rawQueryString || '');
        // Build the FilterExpression and ExpressionAttributeValues
        const filterExpressions = [];
        const expressionAttributeValues = {};

        for (const [key, value] of queryParams.entries()) {
            filterExpressions.push(`#${key} = :${key}`);
            expressionAttributeValues[`:${key}`] = value;
        }

        const params = {
            TableName: TABLE_NAME,
            ...(filterExpressions.length > 0 && {
                FilterExpression: filterExpressions.join(' AND '),
                ExpressionAttributeNames: Array.from(queryParams.keys()).reduce((acc, key) => {
                    acc[`#${key}`] = key;
                    return acc;
                }, {}),
                ExpressionAttributeValues: marshall(expressionAttributeValues)
            })
        };

        const { Items: items } = await dynamoDBClient.send(new QueryCommand(params));

        console.log("Items:", items);

        return items ? items.map((item) => unmarshall(item)) : [];
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        throw error;
    }
};

const createProduct = async (event) => {
    try {
        console.log('Method: createProduct. Body:', event.body);

        const productBody = JSON.parse(event.body);
        // Set product ID
        productBody.id = uuidv4();

        const params = {
            TableName: TABLE_NAME,
            Item: marshall(productBody || {})
        };

        const createResult = await dynamoDBClient.send(new PutItemCommand(params));

        console.log(createResult);
        return createResult;
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    console.log("Method: deleteProduct");
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: marshall({ id: productId })
        };

        const deleteResult = await dynamoDBClient.send(new DeleteItemCommand(params));

        console.log(deleteResult);

        return deleteResult;
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        throw error;
    }
};

const updateProduct = async (event) => {
    try {
        console.log('Method: updateProduct. Body:', event.body);

        const productId = event.requestContext.http.path.split("/")[1];
        const updateBody = JSON.parse(event.body);

        const updateExpression = [];
        const expressionAttributeValues = {};

        for (const [attribute, value] of Object.entries(updateBody)) {
            updateExpression.push(`${attribute} = :${attribute}`);
            expressionAttributeValues[`:${attribute}`] = value;
        }

        const params = {
            TableName: TABLE_NAME,
            Key: marshall({ id: productId }),
            UpdateExpression: `SET ${updateExpression.join(', ')}`,
            ExpressionAttributeValues: marshall(expressionAttributeValues),
            ReturnValues: "ALL_NEW"
        };

        const updateResult = await dynamoDBClient.send(new UpdateItemCommand(params));

        console.log("Updated item:", unmarshall(updateResult.Attributes));
        return unmarshall(updateResult.Attributes);
    } catch (error) {
        console.error("Error in updateProduct:", error);
        throw error;
    }
};
