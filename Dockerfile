#Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

#Production stage
FROM node:22-alpine AS production

WORKDIR /app

COPY package*.json .
COPY tsconfig.prod.json ./tsconfig.json
COPY prisma ./prisma

# Install dependencies and generate Prisma client
RUN npm ci && \
    npm install tsconfig-paths && \
    npx prisma generate

COPY --from=build /app/build ./build

ENV TS_NODE_PROJECT=tsconfig.json

CMD ["node", "-r", "tsconfig-paths/register", "build/main.js"]