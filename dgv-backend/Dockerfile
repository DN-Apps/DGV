FROM node:18-alpine
WORKDIR /app

# Install nur, wenn package.json sich ändert → Docker Layer Cache
COPY package*.json ./
RUN npm install --only=production

# Restcode
COPY . .

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Healthcheck optional im Container selbst – wir prüfen per Compose via HTTP
CMD ["node", "index.js"]

