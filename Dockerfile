FROM node:22-alpine AS builder

COPY . /app
RUN bun install
RUN bun run build

FROM node:22-alpine AS serve

COPY --from=builder /app/build /var/www/kinnema
CMD [ "node", "/var/www/kinnema/main.js" ]