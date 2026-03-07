# Cahier des Charges - Web CV & Portfolio (PRD)

## 1. Vision et Objectifs
Créer un site vitrine personnel (CV) en ligne permettant de mettre en valeur les parcours professionnels et personnels. Au-delà de l'aspect vitrine, ce projet est conçu comme un tremplin d'apprentissage pour le framework **Next.js**, tout en s'appuyant sur une infrastructure robuste gérée par des pratiques DevOps.

## 2. Design et Expérience Utilisateur (UX/UI)
- **Style Visuel** : Épuré, élégant et minimaliste. L'information doit primer, sans surcharge visuelle.
- **Apparence** : Prise en charge native du **Mode Clair et Mode Sombre** (Light/Dark mode) via un toggle.
- **Structure** : Séparation claire du parcours en deux grandes sections : "Professionnel" et "Personnel".

## 3. Fonctionnalités Clés

### Vue Visiteur (Publique)
- **Consultation Structurée** : Affichage chronologique ou par importance des expériences (profil, poste, description, dates).
- **Filtrage Dynamique (Tags)** : Possibilité de cliquer sur des compétences (ex: *Ansible*, *Docker*, *Python*) pour ne faire apparaître que les expériences pertinentes.
- **Export PDF** : Fonctionnalité "Un-clic" permettant de générer et de télécharger la version PDF du CV depuis l'interface web en fonction des filtres sélectionnés.

### Vue Administration (Privée)
- **Authentification** : Page de login sécurisée limitant l'accès au propriétaire (toi).
- **Gestionnaire de Contenu (Back-office embarqué)** : 
  - Formulaire intuitif pour l'ajout, la modification ou la suppression d'une expérience.
  - Gestion des tags attachés à l'expérience lors de la saisie.

## 4. Stack Technique (Développement)
- **Framework Principal** : Next.js (React). Choisi pour sa puissance, son rendu hybride (SSR/SSG) et le fait qu'il intègre le frontend et le backend (API Routes).
- **Design/CSS** : Tailwind CSS (très adapté à Next.js et idéal pour créer un design minimaliste avec gestion du Dark Mode intégrée).
- **Base de données** : Une base de données légère (ex: **SQLite** ou **PostgreSQL**) interfacée via un ORM moderne (comme **Prisma** ou **Drizzle**). Cela permettra d'avoir un stockage persistant simple à gérer dans un conteneur.
- **Authentification** : NextAuth.js (pour la gestion simple et sécurisée des sessions).

## 5. Infrastructure et Déploiement (DevOps)
- **Conteneurisation** : L'application sera packagée dans une image **Docker** (fourniture d'un `Dockerfile` multi-stage optimisé).
- **Environnement Serveur** : Machine Virtuelle (VM) hébergée sur un hyperviseur **Proxmox**.
- **Gestion de Configuration / Déploiement** : L'ensemble de la configuration du serveur cible et le déploiement de l'application s'effectueront via **Ansible** (Playbooks & Roles).

## 6. Séquencement du Projet (Phases)
1. **Phase 1 : Bootstrap & Design** (Initialisation Next.js, configuration Tailwind, composants UI de base, Layout, Header, Footer).
2. **Phase 2 : Base de données & API** (Setup ORM, création du schéma des expériences/tags, création des routes d'API CRUD).
3. **Phase 3 : Interface d'Administration** (Mise en place de l'authentification et du formulaire d'ajout/édition).
4. **Phase 4 : Interface Publique & Fonctionnalités** (Affichage dynamique, moteur de filtrage par tags, implémentation de l'export PDF).
5. **Phase 5 : Conteneurisation (Docker)** (Création du Dockerfile et du docker-compose.yml si une DB externe est utilisée).
6. **Phase 6 : Déploiement (Ansible)** (Création du Playbook pour déployer l'ensemble sur la VM Proxmox de production).
