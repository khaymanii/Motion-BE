# Use AWS Lambda Node.js base image
FROM public.ecr.aws/lambda/nodejs:24

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all project files
COPY . .

# Set the Lambda handler
CMD [ "index.handler" ]
