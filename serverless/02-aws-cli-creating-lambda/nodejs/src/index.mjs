export const handler = async (event, context) => {
    try {
        const { num1, num2 } = event;

        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            throw new Error('Invalid input: num1 and num2 must be numbers.');
        }

        // Access environment variables
        const region = process.env.AWS_REGION;
        const bucket = process.env.BUCKET;
        const key = process.env.KEY;

        // Log environment variables
        console.log(`AWS Region: ${region}`);
        console.log(`Bucket: ${bucket}`);
        console.log(`Key: ${key}`);

        console.info("Info Log");
        console.warn("Warning Log");
        console.log("Received event:", JSON.stringify(event, null, 2));
        console.log(`Remaining Time (ms): ${context.getRemainingTimeInMillis()}`);
        console.log(`Function Name: ${context.functionName}`);
        console.log(`Log Stream Name: ${context.logStreamName}`);

        const total = num1 * num2;
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: `The total of ${num1} multiplied by ${num2} is ${total}`,
                functionName: context.functionName,
                logStreamName: context.logStreamName,
                region,
                bucket,
                key,
            }),
        };

        console.log("Response:", JSON.stringify(response, null, 2));

        return response;
    } catch (error) {
        console.error("Error processing event:", error.message);

        return {
            statusCode: 400,
            body: JSON.stringify({ message: error.message }),
        };
    }
};

