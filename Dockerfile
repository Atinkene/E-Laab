# Étape 1 : Build de l'application React
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . ./

# Construire l'application
RUN npm run build

# Étape 2 : Servir l'application avec http-server
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers buildés
COPY --from=build /app/build ./build

# Copier package.json pour éviter les erreurs ENOENT
COPY --from=build /app/package.json ./package.json

# Installer http-server
RUN npm install -g http-server

# Exposer le port
EXPOSE 3000

# Définir une variable d'environnement par défaut pour PORT
ENV PORT=3000

# Lancer http-server avec $PORT
CMD ["sh", "-c", "http-server build -p ${PORT}"]