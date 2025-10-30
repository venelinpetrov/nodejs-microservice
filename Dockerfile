FROM node:22-slim

# Define build-time variables that will be passed from GitHub Actions
ARG _BUILD_COMMIT
ARG _BUILD_VERSION
ARG _BUILD_TIME

# Make them available at runtime as environment variables
ENV BUILD_COMMIT=${_BUILD_COMMIT}
ENV BUILD_VERSION=${_BUILD_VERSION}
ENV BUILD_TIME=${_BUILD_TIME}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . ./

ENTRYPOINT [ "node", "index.js" ]
