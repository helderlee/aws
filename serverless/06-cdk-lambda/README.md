# Creating, Debugging, and Testing a Lambda Function with AWS CDK, Node.js 22.x, and VSCode

## Prerequisites

- Node.js and npm installed
- AWS CLI configured
- VSCode installed
- AWS CDK installed globally

## Steps

### Step 1: Install AWS CDK and Initialize a New CDK Project

First, ensure that you have Node.js and npm installed, then install the AWS CDK globally.

```sh
npm install -g aws-cdk
```

Create a new directory for your CDK project and initialize it in the `cdk-lambda` folder.

```sh
mkdir cdk-lambda
cd cdk-lambda
cdk init app --language typescript
```

### Step 2: Install Dependencies

Install the necessary dependencies, including Jest for testing.

```sh
npm install aws-cdk-lib
npm install --save-dev jest
```

### Step 3: Create Your Lambda Handler

Create a new directory named `lambda` and add your JavaScript Lambda handler file (e.g., `index.mjs`).

```javascript
// lambda/index.mjs
export async function handler(event) {
  console.log('Hello from Lambda');
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda',
      input: event,
    }),
  };
}
```

### Step 4: Create a SAM Template File

Create a `template.yml` file in the root directory of your project.

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
  MyLambdaFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs22.x
      CodeUri: lambda/
      Timeout: 15
```

### Step 5: Build the SAM Application

Build your SAM application to prepare for local invocation.

```sh
sam build
```

### Step 6: Define the CDK Stack

Modify the stack file (e.g., `lib/cdk-lambda-stack.ts`) to include your Lambda function using `Function` from the CDK library.

```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda Function
    new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
    });
  }
}
```

### Step 7: Create Unit Tests for the Lambda Handler

1. **Create a `test` Directory**:
   Create a new directory named `test` in the root of your project.

   ```sh
   mkdir test
   ```
2. **Add a Test File**:
   Create a new file named `index.test.mjs` inside the `test` directory.

   ```javascript
   // test/index.test.mjs
   import { handler } from '../lambda/index.mjs';

   describe('Lambda Function', () => {
     it('returns a successful response', async () => {
       const event = {}; // Mock event object
       const response = await handler(event);
       expect(response.statusCode).toBe(200);
       expect(response.body).toBe(JSON.stringify({
         message: 'Hello from Lambda',
         input: event,
       }));
     });
   });
   ```
3. **Configure Jest**:
   Add the following Jest configuration to your `package.json` file:

   ```json
   {
     "type": "module",
     "jest": {
       "testEnvironment": "node",
       "extensionsToTreatAsEsm": [".mjs"]
     }
   }
   ```
4. **Run Unit Tests**:
   Use the following command to run your tests:

   ```sh
   npm test
   ```

### Step 8: Configure Debugging in VSCode

1. **Install the AWS Toolkit for VSCode**: This extension helps with debugging and deploying AWS resources.

   ```sh
   ext install amazonwebservices.aws-toolkit-vscode
   ```
2. **Set Up the Launch Configuration**:
   Create a `launch.json` file in the `.vscode` directory to configure the debugger.

   ```json
   // .vscode/launch.json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "node",
         "request": "attach",
         "name": "Attach to Lambda",
         "port": 9229,
         "localRoot": "${workspaceFolder}/lambda",
         "remoteRoot": "/var/task",
         "protocol": "inspector"
       }
     ]
   }
   ```
3. **Run the Lambda Function Locally**:
   Use the AWS SAM CLI to invoke your Lambda function locally with debugging.

   ```sh
   sam local invoke MyLambdaFunction --debug-port 9229
   ```

### Step 9: Synthesize and Deploy the Stack

Run the CDK commands to synthesize the CloudFormation template and deploy the stack.

```sh
cdk synth
cdk deploy
```

## Summary

1. **Install AWS CDK**: `npm install -g aws-cdk`
2. **Initialize Project**: `cdk init app --language typescript`
3. **Install Dependencies**: `npm install aws-cdk-lib` and `npm install --save-dev jest`
4. **Create Lambda Handler**: Write your handler code in JavaScript (`index.mjs`).
5. **Create SAM Template**: Define your Lambda function in `template.yml`.
6. **Build SAM Application**: Use `sam build` to build your application.
7. **Define CDK Stack**: Use `Function` to create the Lambda function.
8. **Create Unit Tests**: Write unit tests in the `test` directory using Jest.
9. **Configure Debugging**: Set up VSCode for debugging with `launch.json` and use AWS SAM for local invocation.
10. **Deploy**: Synthesize and deploy using CDK commands.
11. **Run Tests**: Execute `npm test` to run unit tests.
