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

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Vérifier que les fichiers buildés sont bien présents (pour le débogage)
RUN ls -la /usr/share/nginx/html

# Copier une configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 (Railway remplacera par $PORT)
EXPOSE 80

# Définir une variable d'environnement par défaut pour PORT
ENV PORT=80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]