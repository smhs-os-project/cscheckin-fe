FROM node:current-alpine

# Copy this workdir to the docker image
COPY . fe
WORKDIR fe

# Install the dependencies
RUN yarn --production;

# Build the frontend
RUN yarn build;

# Run it
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
