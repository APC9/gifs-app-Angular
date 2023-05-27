# 1er Etapa de la imagen

# Node instalado en linux alpine3.16
FROM node:19.2-alpine3.16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

RUN npm run build --prod

RUN ls -alt

# 2da Etapa de la imagen

FROM nginx:1.17.1-alpine

COPY --from=build /usr/src/app/dist/gifs-app /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

