# Project Labor

Plateforme de mise en relation entre travailleurs saisonniers et agriculteurs en France.

## Stack technique

Frontend : React, TypeScript, Vite, Ionic *(prévu en post-MVP)*

Backend : Express, TypeScript, Prisma

Base de données : PostgreSQL

## Prerequis

Avant de commencer, les outils suivants doivent etre installes sur la machine :

- **Node.js 24** (version exacte requise) et **npm 11**. Node.js exécute le code JavaScript/TypeScript en dehors du navigateur. npm est le gestionnaire de paquets qui installe les dépendances du projet. Télechargement : https://nodejs.org
- **PostgreSQL** (version 15 ou supérieure). C'est la base de données relationnelle du projet. Elle stocke les données des utilisateurs, des annonces, des candidatures, etc. Telechargement : https://www.postgresql.org/download

Pour verifier que tout est installe :

```bash
node -v       # doit afficher v24.x.x
npm -v        # doit afficher 11.x.x
psql --version  # doit afficher la version de PostgreSQL
```

Si `psql` n'est pas reconnu alors que PostgreSQL est installé, il faut ajouter le dossier `bin` de PostgreSQL au PATH du systeme. Sur Windows, le chemin par defaut est `C:\Program Files\PostgreSQL\17\bin`. L'ajout se fait via l'éditeur de variables d'environnement Windows (et non via `setx` qui tronque les valeurs longues).

## Installation

### 1. Cloner le dépôt

```bash
git clone git@github.com:aymericpbdev/Project-Labor.git
cd Project-Labor
```

### 2. Installer les dépendances

Le projet est organisé en monorepo avec deux dossiers indépendants. Chacun a son propre `package.json` et ses propres dépendances. Il faut donc lancer `npm install` dans chaque dossier séparement.

```bash
cd client
npm install

cd ../server
npm install
```

Le dossier `node_modules/` est crée dans chaque dossier. Il contient les librairies téléchargées. Ce dossier est gitignore : chaque développeur le régenère localement avec `npm install`.

### 3. Créer la base de données

Le projet utilise une base de données PostgreSQL nommée `labor`. Il faut la créer manuellement avant de pouvoir lancer le backend.

Se connecter à PostgreSQL avec l'utilisateur `postgres` (le superutilisateur crée lors de l'installation) :

```bash
psql -U postgres
```

Puis créer la base :

```sql
CREATE DATABASE labor;
```

Taper `\q` pour quitter.

### 4. Configurer les variables d'environnement

Le backend a besoin de certaines informations pour fonctionner : l'adresse de la base de données, le port du serveur, etc. Ces informations sont stockées dans un fichier `.env` qui n'est pas versionné (il est gitignore) parce qu'il contient des données sensibles propres à chaque developpeur.

Un fichier modèle `.env.example` est fourni. Le copier et le compléter avec ses propres valeurs :

```bash
cd server
cp .env.example .env
```

Ouvrir le fichier `.env` et remplacer les valeurs :

```
DATABASE_URL="postgresql://postgres:votre_mot_de_passe@localhost:5432/labor"
PORT=3000
```

- `postgres` : le nom de l'utilisateur PostgreSQL (par defaut, c'est le superutilisateur crée a l'installation)
- `votre_mot_de_passe` : le mot de passe défini pour cet utilisateur
- `localhost:5432` : l'adresse et le port par défaut de PostgreSQL en local
- `labor` : le nom de la base de données créée à l'étape 3

### 5. Appliquer les migrations de base de données

Prisma gère la structure de la base de données (les tables, les colonnes, les relations) à travers des fichiers de migration. Cette commande crée les tables définies dans le schéma Prisma :

```bash
cd server
npx prisma migrate dev
```

Cette étape n'est necessaire que si le schema Prisma contient des modèles. Si la base est vide et qu'aucune migration n'existe encore, cette commande n'a pas d'effet.

## Lancer le projet en local

Backend :

```bash
cd server
npm run dev
```

Frontend :

```bash
cd client
npm run dev
```

L'application frontend est accessible sur `http://localhost:5173` (port par defaut de Vite).

## Structure du projet

```
saisonnier-agricole/
    client/                --> Frontend (React + TypeScript + Vite)
        src/
            pages/         --> Les ecrans de l'application (un par route)
            components/    --> Les composants reutilisables
            services/      --> Les appels API vers le backend
            hooks/         --> Les hooks React personnalises
            types/         --> Les interfaces et types TypeScript
            utils/         --> Les fonctions utilitaires
    server/                --> Backend (Express + TypeScript + Prisma)
        src/
            routes/        --> Définition des endpoints HTTP
            controllers/   --> Réception des requetes, delegation aux services
            services/      --> Logique métier et appels Prisma
            middlewares/   --> Traitements intermédiaires (auth, validation, erreurs)
            types/         --> Les interfaces et types TypeScript
            utils/         --> Les fonctions utilitaires
        prisma/
            schema.prisma  --> Définition des tables de la base de données
```
## Charte graphique

Première version de la charte graphique du projet. Vouée à évoluer, elle est néanmoins suffisamment complète pour poser les bases visuelles et servir de référence dans l'élaboration graphique du projet.

[Voir la charte graphique v1 (PDF)](./Charte-graphique-LABOR-v1.pdf)

## Conventions

Les règles de commits, de branches et de pull requests sont décrites dans le fichier [CONTRIBUTING.md](./docs/CONTRIBUTING.md).
