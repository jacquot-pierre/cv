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
- 📂 `/public` : Contient les assets statiques publics (images, polices, favicons) qui sont servis directement sans traitement.
- 📂 `/docs` : Contient la documentation du projet (ex: le PRD - Cahier des charges).

---

## 🚀 Scripts et Déploiement

Ces commandes s'exécutent avec `npm` (Node Package Manager).

- `npm run dev` : Lance le serveur de développement avec rechargement à chaud (Hot Reloading). Idéal pour coder.
- `npm run build` : Compile l'application pour la production (Génère une version optimisée dans le dossier `.next`).
- `npm start` : Démarre le serveur Node.js avec la version de production compilée.
- `npm run lint` : Lance l'analyseur de code (ESLint) pour repérer les erreurs ou le non-respect des conventions.

*(Note : Une fois Dockerisé, le déploiement se fera via un conteneur exposant ces commandes).*
