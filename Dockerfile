FROM node:current-alpine

# -- You should configure this
ENV NEXT_PUBLIC_GA_ID=G-NM8XG9Q8ST

# Copy this workdir to the docker image
COPY . fe
WORKDIR fe

# Install the dependencies
RUN apk update
RUN apk add git
RUN yarn --production;

# Build the frontend
RUN yarn build;

# Run it
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
