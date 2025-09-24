# ===== Build Stage =====
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Backend-Basis-URL aus CI reinreichen
ARG API_PUBLIC_URL
ENV REACT_APP_API_URL=$API_PUBLIC_URL
RUN npm run build

# ===== Runtime Stage =====
FROM nginx:alpine

# curl für Healthcheck (wget geht auch, curl ist robuster)
RUN apk add --no-cache curl

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fsS http://127.0.0.1/health || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

