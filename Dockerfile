FROM node:16-alpine as builder

# -- You should configure this
ENV NEXT_PUBLIC_GA_ID=G-NM8XG9Q8ST

# Install Git
RUN apk update && apk add git

# Copy the `package.json` and its lockfile to the builder
WORKDIR /fe
COPY package.json .
COPY yarn.lock .

# Install the dependencies
RUN yarn --production

# Copy the remaining file to the Docker image
COPY . .

# Build the frontend
RUN yarn build;

FROM node:16-alpine AS production

# Copy the dist to the exact Docker image
WORKDIR /fe
COPY --from=builder /fe/node_modules ./node_modules
COPY --from=builder /fe/.next ./.next
COPY --from=builder /fe/package.json .
COPY --from=builder /fe/yarn.lock .

# Run it
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
