FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 3001
RUN npm run build
CMD ["node", "dist/index.js"]

