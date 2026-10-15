# Stage 1: Build the dasar-ui library and the documentation SSR app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build dasar-ui --configuration=production \
 && npx ng build documentation --configuration=production

# Stage 2: Run the SSR Node server
FROM node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=build /app/dist/documentation /app/dist/documentation

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production

USER node

CMD ["node", "dist/documentation/server/server.mjs"]
