FROM node:22 AS builder

COPY ./product-service /app

WORKDIR /app

RUN npm install

RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD ["node", "./dist/main.js"]
