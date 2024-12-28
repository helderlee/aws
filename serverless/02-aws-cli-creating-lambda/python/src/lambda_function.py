import json
import os

def lambda_handler(event, context):
    try:
        num1 = event.get('num1')
        num2 = event.get('num2')

        if not isinstance(num1, (int, float)) or not isinstance(num2, (int, float)):
            raise ValueError('Invalid input: num1 and num2 must be numbers.')

        # Access environment variables
        region = os.getenv('AWS_REGION')
        bucket = os.getenv('BUCKET')
        key = os.getenv('KEY')

        # Log environment variables
        print(f"AWS Region: {region}")
        print(f"Bucket: {bucket}")
        print(f"Key: {key}")

        print("Info Log")
        print("Warning Log")
        print("Received event:", json.dumps(event, indent=2))
        print(f"Remaining Time (ms): {context.get_remaining_time_in_millis()}")
        print(f"Function Name: {context.function_name}")
        print(f"Log Stream Name: {context.log_stream_name}")

        total = num1 * num2
        response = {
            'statusCode': 200,
            'body': json.dumps({
                'message': f'The total of {num1} multiplied by {num2} is {total}',
                'functionName': context.function_name,
                'logStreamName': context.log_stream_name,
                'region': region,
                'bucket': bucket,
                'key': key,
            }),
        }

        print("Response:", json.dumps(response, indent=2))

        return response
    except Exception as error:
        print(f"Error processing event: {str(error)}")

        return {
            'statusCode': 400,
            'body': json.dumps({'message': str(error)}),
        }
