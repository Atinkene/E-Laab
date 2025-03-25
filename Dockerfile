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

# Copier package.json pour éviter les erreurs ENOENT (même si non strictement nécessaire)
COPY --from=build /app/package.json ./package.json

# Installer une version spécifique de serve (version 14.2.1 est stable)
RUN npm install -g serve@14.2.1

# Exposer le port
EXPOSE 3000

# Définir une variable d'environnement par défaut pour PORT
ENV PORT=3000

# Lancer serve avec une commande simplifiée
CMD ["serve", "-s", "build", "-l", "3000"]