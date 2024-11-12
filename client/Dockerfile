# Utiliser l'image de base Node.js
FROM node:lts-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du client
COPY . .

# Construire l'application React
RUN npm run build

# Installer un serveur HTTP léger pour servir les fichiers statiques de build
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Démarrer le serveur pour servir les fichiers de build
CMD ["serve", "-s", "build", "-l", "3000"]
