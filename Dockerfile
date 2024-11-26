# Étape 1 : Utiliser Node 18 pour construire l'application
FROM node:18 as builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du frontend
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Utiliser Apache pour servir l'application
FROM httpd:alpine

# Copier les fichiers de build dans le répertoire public d'Apache
COPY --from=builder /app/dist /usr/local/apache2/htdocs/

# Exposer le port 80
EXPOSE 80

# Apache démarre automatiquement en mode foreground par défaut