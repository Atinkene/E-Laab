# Étape 1 : Build de l'application React
FROM node:18 AS build

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

# Étape 2 : Servir l'application avec serve
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers buildés
COPY --from=build /app/build ./build

# Installer serve pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port
EXPOSE 3000

# Lancer serve
CMD ["serve", "-s", "build", "-l", "3000"]