FROM node:18-slim

WORKDIR /usr/src/app

# Add environment variables for better network handling
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV YARN_NETWORK_TIMEOUT=600000

# Add npm registry configuration for better reliability
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-factor 2 && \
    npm config set fetch-retry-mintimeout 15000 && \
    npm config set fetch-retry-maxtimeout 600000

# Add wait-for-it script
RUN apt-get update && apt-get install -y wget
RUN wget -O wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh

COPY package*.json ./

# Install yarn and dependencies with retry mechanism
RUN set -ex && \
    for i in {1..3}; do \
      npm install -g yarn && break || \
      sleep 15; \
    done && \
    for i in {1..3}; do \
      yarn global add @nestjs/cli && break || \
      sleep 15; \
    done && \
    yarn install --network-timeout 600000 --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

# Modified CMD to wait for MySQL
CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -t 60 -- yarn run start:prod"]