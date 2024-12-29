const OPERATIONS = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? NaN : a / b
};

export const handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    let result;

    try {
        // Parse and validate payload
        const payload = JSON.parse(event.body);
        const { a, b, op } = payload;

        if (a === undefined || b === undefined || !OPERATIONS[op]) {
            throw new Error(`Invalid input: ${JSON.stringify(payload)}. Expecting a, b, and a valid op.`);
        }

        // Perform the operation using the OPERATIONS object
        result = OPERATIONS[op](a, b);
        
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error.message);
        return {
            statusCode: 400,
            body: JSON.stringify({
                processed: false,
                message: `Cannot process event: ${error.message}`
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            processed: true,
            result: result
        })
    };
};
