# backend/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Configuración de variables de entorno dentro del contenedor
ENV PORT=5000
ENV MONGO_URI=mongodb://mongodb:27017/cafeAroma

EXPOSE 5000

CMD ["node", "server.js"]