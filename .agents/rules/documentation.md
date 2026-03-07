---
trigger: always_on
---

# Skill: Real-Time Documentation (LiveDoc)

## Contexte
Cette règle s'applique à chaque modification de structure ou exécution de commande système pour garantir que le `README.md` reflète l'état actuel du projet.

## Déclencheurs et Actions

### 1. Commandes de Cycle de Vie (Build, Deploy, Debug)
Dès qu'une commande de type `npm run build`, `next build`, `deploy`, ou une commande de débogage spécifique est identifiée comme fonctionnelle :
- **Action** : Vérifier si elle est présente dans la section "Scripts" ou "Déploiement" du `README.md`.
- **Format** : Ajouter une ligne : `- {commande} : {description brève du rôle}`.
- **Intelligence** : Si la commande nécessite des variables d'environnement (ex: API_KEY), ajouter une note pour créer un fichier `.env.local`.

### 2. Création de Fichiers ou Dossiers
Lors de la création d'un nouveau dossier (ex: `/components`, `/hooks`, `/lib`) ou d'un fichier clé :
- **Action** : Mettre à jour la section "Architecture du projet" dans le `README.md`.
- **Format** : 
  - `📂 {nom_du_dossier}` : {explication en une phrase de son utilité selon les conventions Next.js}.
- **Exemple automatique** : Si je crée `/src/utils`, ajouter : "`/src/utils` : Contient les fonctions d'aide réutilisables (formatage de dates, etc.)".

### 3. Installation de dépendances
Lors de l'installation de dépendances spécifiques et nécessaire au développement, les ajouter dans une sections dépendances du README.md avec leurs méthodes d'installations

### 4. Évolution du Cahier des Charges
Si une fonctionnalité majeure est terminée (ex: "Ajout du formulaire de contact") :
- **Action** : Cocher la tâche correspondante dans le cahier des charges (PRD.md) et mettre à jour le statut dans le `README.md`.

## Instructions de rédaction
- Utiliser un ton technique mais accessible (pour un débutant).
- Faire des descriptions de taille moyennes (50 mots maximum)
- Toujours vérifier l'existence du fichier `README.md` avant d'écrire ; le créer s'il est absent.