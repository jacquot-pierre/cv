# Mon CV en Ligne - Apprentissage & Projet

Bienvenue dans le dépôt de mon CV interactif. Ce projet a pour double objectif de fournir une vitrine en ligne de mon parcours professionnel et de me former au développement Front-end et Full-stack moderne.

---

## 🛠 L'Écosystème Technologique (Next.js)

### Pourquoi Next.js ?
En tant que DevOps, la gestion de l'infrastructure et de la livraison est familière. Cependant, dans le monde du web "moderne" avec React (librairie UI très populaire), une application classique s'exécute uniquement dans le navigateur du client (Client-Side Rendering), ce qui pose des problèmes de référencement (SEO) et de performances pour les sites de contenu comme un CV.

**Next.js** résout ce problème en étant un framework Full-stack construit *au-dessus* de React. Il déplace une grande partie du travail du navigateur vers le serveur.

### Concepts clés de l'architecture Next.js (App Router)
1. **Server Components (RSC - React Server Components)** : Par défaut dans Next.js, les composants sont rendus côté serveur. Cela signifie que le HTML final est envoyé au navigateur, allégeant la charge de ce dernier et sécurisant les requêtes aux bases de données (le code serveur ne fuite jamais vers le client).
2. **SSR (Server-Side Rendering)** vs **SSG (Static Site Generation)** :
   - SSG (le plus performant) : La page est construite une seule fois au moment du build (`next build`). Parfait pour le portfolio public.
   - SSR : La page est construite à chaque requête. Idéal pour l'interface d'administration où la donnée change souvent.
3. **API Routes** : Next.js permet d'écrire des routes backend directement dans le projet `/api`, évitant d'avoir un serveur backend (Node.js/Express) séparé.

---

## 🏗 Architecture du projet

Voici la structure de base générée par Next.js, avec une configuration "App Router" et "Tailwind CSS" :

- 📂 `/src/app` : Cœur de l'application Next.js (App Router). Contient la logique de routage, les pages (`page.tsx`) et la mise en page (`layout.tsx`).
- 📂 `/src/components` : Briques d'interface réutilisables (Client Components avec état interactif, boutons, etc.).
- 📂 `/src/lib` : Utilitaires et connexions externes (ex: l'instanciation de Prisma `prisma.ts`).
- 📂 `/public` : Contient les assets statiques publics (images, polices, favicons) qui sont servis directement sans traitement.
- 📂 `/docs` : Contient la documentation du projet (ex: le PRD - Cahier des charges).
- 📄 `/learning.md` : Documentation technique et pédagogique détaillée sur les choix architecturaux (Next.js, Prisma, etc).

---

## 🚀 Scripts et Déploiement

Ces commandes s'exécutent avec `npm` (Node Package Manager).

- `npm run dev` : Lance le serveur de développement avec rechargement à chaud (Hot Reloading). Idéal pour coder.
- `npm run build` : Compile l'application pour la production (Génère une version optimisée dans le dossier `.next`).
- `npm start` : Démarre le serveur Node.js avec la version de production compilée.
- `npm run lint` : Lance l'analyseur de code (ESLint) pour repérer les erreurs ou le non-respect des conventions.

*(Note : Une fois Dockerisé, le déploiement se fera via un conteneur exposant ces commandes).*

---

## 📚 Pédagogie : Gestion des Données et ORM (Prisma)

### Qu'est-ce qu'un ORM ?
**ORM** signifie *Object-Relational Mapping* (Mapping Objet-Relationnel). 
Dans le développement classique, pour parler à une base de données (comme PostgreSQL, MySQL ou SQLite), tu écris des requêtes SQL brutes sous forme de chaînes de caractères (ex : `SELECT * FROM users WHERE id = 1`). 

L'inconvénient ? Si tu te trompes dans ta chaîne de caractères, ça crash à l'exécution. De plus, tu dois mapper manuellement les résultats SQL bruts vers les structures de ton langage de programmation.

L'ORM résout cela. Il crée une "couche" entre ton code (TypeScript) et ta base de données. Au lieu d'écrire du SQL brut, tu vas appeler des **méthodes objets** de ton langage. L'ORM va ensuite traduire ces appels objets en requêtes SQL parfaites et sécurisées (protégées d'office contre les injections SQL).

**Exemple concret :**
- **En SQL** : `INSERT INTO users (name, email) VALUES ("Guerande", "devops@mail.com");`
- **Avec Prisma (TypeScript)** : `await prisma.user.create({ data: { name: "Guerande", email: "devops@mail.com" } })`

### Pourquoi Prisma specifically ?
**Prisma** est l'un des ORMs les plus modernes et appréciés dans l'écosystème Node.js / React (Next.js). Ses atouts majeurs :
1. **Un Schéma Central** : On déclare l'architecture de toute notre base de données dans un seul fichier très lisible : `schema.prisma`.
2. **Génération de Types Forts** : Dès que tu modifies `schema.prisma` et que tu tapes une commande, Prisma génère automatiquement tous les types TypeScript correspondants. Si tu tentes de lire `user.age` alors que cette colonne n'existe plus dans la DB, ton code refusera tout simplement de compiler !
3. **Migrations simples** : Comme Ansible gère l'état souhaité d'un serveur, Prisma gère l'état de la base de données. Tu modifies ton schéma, tu lances `npx prisma migrate dev`, et Prisma calcule le différentiel et crée/applique les requêtes SQL (ALTER TABLE) nécessaires pour mettre ta DB à jour.

### Notre choix : Prisma + SQLite
Pour ce projet précis (un CV où seul TOI peux administrer), **SQLite** est redoutable. C'est une base de données complète qui tient en un seul fichier (ex: `dev.db`). Cela rend le déploiement Docker et les sauvegardes triviales (un simple fichier à docker-volumer). Prisma s'interface de la même manière avec SQLite qu'avec un énorme cluster PostgreSQL.

### Le Rôle de chaque outil sur la Data :
- **SQLite** : Stocke physiquement la donnée dans un fichier.
- **Prisma** : Lit écrire et migre cette donnée en fournissant une API parfaite pour notre code.
- **Next.js (Server Components/API Routes)** : Interroge Prisma de manière sécurisée (côté serveur) pour envoyer les données propres au navigateur.

### Commandes Prisma (Cycle de Vie de la Base de Données)

Voici les commandes que nous avons utilisées pour mettre en place la base de données. En tant que DevOps, vois cela comme ton outil de provisionnement (Ansible/Terraform) mais pour le schéma de données :

- `npx prisma init --datasource-provider sqlite` : Cette commande initialise Prisma dans le projet. Elle crée le dossier `/prisma`, le fichier `schema.prisma` (où l'on déclare l'architecture de la DB) et prépare le terrain pour utiliser SQLite.
- `npx prisma generate` : À lancer **à chaque fois** que le fichier `schema.prisma` est modifié. Cela lit le schéma et génère le client Prisma (le code TypeScript `PrismaClient` que Next.js va utiliser pour faire les requêtes). C'est ce qui garantit le typage fort de la base de données.
- `npx prisma migrate dev --name <nom_du_changement>` : C'est l'équivalent d'un `terraform apply`. Prisma compare le fichier `schema.prisma` avec l'état actuel de la base de données `dev.db`, génère le code SQL de migration (ex: `CREATE TABLE`) et l'applique à la base. Ici, on l'a lancé avec le nom `init` pour la toute première création de notre schéma (Expériences et Tags).
