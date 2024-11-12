# frontend/Dockerfile

# Utiliser l'image Node 16 pour le build
FROM node:18 as builder

# Créer et définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du frontend
COPY . .

# Construire l'application
RUN npm run build

# Utiliser Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers de build dans Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande par défaut de Nginx
CMD ["nginx", "-g", "daemon off;"]