# Étape 1 : Utiliser l'image de base Node.js LTS Alpine
FROM node:lts-alpine

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Étape 3 : Copier les fichiers package*.json dans le répertoire de travail
COPY package*.json ./

# Étape 4 : Installer les dépendances avec npm install
RUN npm install

# Étape 5 : Copier le reste des fichiers du serveur dans le conteneur
COPY . .

# Étape 6 : Exposer le port 9000
EXPOSE 9000

# Étape 7 : Démarrer l'application avec npm start
CMD ["npm", "start"]
