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

# Étape 2 : Servir l'application avec Caddy
FROM caddy:2

# Définir le répertoire de travail
WORKDIR /app

# Copier le Caddyfile
COPY Caddyfile ./

# Formatter le Caddyfile
RUN caddy fmt Caddyfile --overwrite

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build /app/build ./dist

# Lancer Caddy pour servir l'application
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]