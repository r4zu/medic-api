# Usa una imagen base de Node.js
FROM node:20-alpine3.19

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo pnpm-lock.yaml y el package.json al directorio de trabajo
COPY pnpm-lock.yaml ./
COPY package.json ./

# Instala las dependencias usando pnpm
RUN pnpm install --frozen-lockfile

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación NestJS
RUN pnpm build

# Expone el puerto en el que la aplicación se ejecutará
# EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["pnpm", "start:prod"]