export const handler = async (event, context) => {
    try {
        const { num1, num2 } = event;

        if (typeof num1 !== 'number' || typeof num2 !== 'number') {
            throw new Error('Invalid input: num1 and num2 must be numbers.');
        }

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
                logStreamName: context.logStreamName
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
