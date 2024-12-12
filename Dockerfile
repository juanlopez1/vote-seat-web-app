# Etapa 1: Construir la aplicación
FROM node:22 AS build

WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos de la aplicación construida (en la carpeta 'dist') al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para Nginx
CMD ["nginx", "-g", "daemon off;"]
