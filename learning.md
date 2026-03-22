# 🧠 Documentation Pédagogique et Architecture Technique (`learning.md`)

Bienvenue dans cette documentation approfondie. Ce fichier a pour but de décortiquer les concepts techniques utilisés dans ce dépôt, d'expliquer le *pourquoi* avant le *comment*, et de te donner une vision claire de l'architecture moderne mise en place. 

---

## 1. ⚡ Next.js : Le Framework Full-Stack

### A. Le Problème avec React Classique (SPA)
Historiquement, avec React pur (Single Page Application), le serveur n'envoie qu'une coquille HTML vide et un gros fichier JavaScript. C'est le navigateur du client qui doit exécuter ce JS pour construire l'interface (Client-Side Rendering - CSR).
* **Inconvénients** : Mauvais pour le référencement (SEO), page blanche pendant le chargement, et le client doit faire ses propres requêtes réseau pour obtenir la donnée.

### B. La Solution Next.js (Server-Side)
Next.js est un framework construit par-dessus React. Son but principal est de **déplacer le calcul du navigateur vers le serveur**. 
Il introduit l'**App Router** (dossier `/src/app`) qui utilise les **React Server Components (RSC)** par défaut.

👉 **React Server Components (RSC)** : 
- Les composants (fichiers `.tsx`) sont exécutés *sur le serveur*. 
- Le serveur interroge la base de données, construit le HTML final, et l'envoie au navigateur. 
- **Avantages** : Le navigateur reçoit instantanément une page lisible (excellent pour le SEO et l'expérience utilisateur), le code JavaScript envoyé est réduit, et tes identifiants de base de données ne fuitent jamais vers le client.

### C. Stratégies de Rendu (Rendering)
Ici, Next.js est particulièrement intelligent :
- **Static Site Generation (SSG)** : Pour une page de CV (qui ne change pas à la seconde), Next.js va construire la page HTML **une seule fois** lors du `npm run build`. Le serveur ne recalculera plus la page, il servira le HTML statique ultra-rapidement à tous les visiteurs.
- **Server-Side Rendering (SSR)** : Si on crée une route `/admin` pour gérer les expériences, la page sera regénérée **à chaque requête** car la donnée doit toujours être fraîche.
- Tu gères cela de manière transparente : Next.js détecte de lui-même si une page utilise de la donnée dynamique ou non.

### D. Le système de fichiers comme Routeur
Dans `/src/app` :
- `page.tsx` représente de l'UI unique à une route. Exemple : `/src/app/page.tsx` est l'accueil (`/`).
- `layout.tsx` représente l'UI partagée entre plusieurs routes (le menu, le footer, la balise `<html>`). Il enveloppe les `page.tsx`.

---

## 2. 🗄️ La Couche Data : Prisma ORM & SQLite

### A. Qu'est-ce qu'un ORM et pourquoi s'en servir ?
Un **ORM (Object-Relational Mapping)** est un pont entre ton code (TypeScript) et ta base de données (SQLite/PostgreSQL). 
- Au lieu de manipuler des tables et d'écrire des requêtes SQL chaotiques (`SELECT * FROM Experience WHERE type="PRO"`), tu manipules des **Objets** (`prisma.experience.findMany({ where: { type: 'PRO' } })`).
- **Pourquoi ?** Parce que cela apporte une sécurité de typage. L'ORM lit la base de données et dit à TypeScript exactement quelles colonnes existent. Si tu te trompes de nom de variable, l'application refuse de compiler. Adieu les erreurs SQL à l'exécution !

### B. Prisma au cœur du projet
Prisma est basé sur trois piliers présents dans ce dépôt :
1. **Le Schéma (`prisma/schema.prisma`)** : C'est la source de vérité. On y définit nos modèles (Ex: `Experience`, `Tag`). Ici, nous utilisons *SQLite*, qui stocke la donnée dans un simple fichier local (`dev.db`).
2. **Prisma Client** : C'est l'outil généré automatiquement (via `npx prisma generate`) qui expose les fonctions parfaites pour interagir avec nos tables en TypeScript.
3. **Prisma Migrate** : L'outil de versioning. Quand tu ajoutes une colonne au schéma, `npx prisma migrate dev` génère le code SQL de migration et l'applique pour faire évoluer la base de données sans perdre l'existant.

### C. Déploiement de la Base de Données & Bonnes Pratiques
- **Toujours générer le client** : Lors d'un déploiement (CI/CD ou Docker), il faut toujours lancer `npx prisma generate` avant de build le projet Next.js pour s'assurer que TypeScript connaît les types de la BDD.
- **Les Migrations en Prod** : Sur un serveur de production, on n'utilise pas `prisma migrate dev`, mais `npx prisma migrate deploy` qui applique les changements pré-approuvés de façon sécurisée.
- **Ignorer `dev.db`** : Le fichier SQLite local est ignoré par Git pour ne pas commiter de vraies données de développement. En production, on volumera le dossier ou on passera sur PostgreSQL.

---

## 3. 🎨 L'Interface et l'Écosystème UI

En fouillant le dépôt (`package.json`), on remarque les technologies suivantes, très courantes avec Next.js :

- **Tailwind CSS** : Un framework CSS "Utility-First". Au lieu d'écrire des fichiers `.css` longs et distants, on applique des classes directement dans le HTML (`<div className="bg-blue-500 p-4">`). C'est extrêmement rapide, maintient le code composant cohérent et génère un bundle CSS final minuscule.
- **next-themes** : Gère proprement le Mode Sombre / Clair (Dark Mode). Dans le web moderne, basculer le thème demande de gérer les classes du DOM root (`<html>`) sans provoquer de clignotement ("FOUC") au chargement de la page. `next-themes` le fait parfaitement.
- **lucide-react** : Une librairie d'icônes très légères. On importe des composants vectoriels (SVG) propres, comme `<ArrowRight />`, au lieu de charger de lourdes polices d'icônes.

---

## 4. 📂 Anatomie experte d'un projet Next.js (App Router)

Pour bien développer, il faut comprendre le rôle de chaque dossier et fichier clé. Voici les conventions modernes de Next.js.

### A. Le dossier `app/` (Le Cœur du Réacteur)
C'est ici que tu définis tes routes (URL). Dans Next.js, **un dossier = une route**.
- `/app/page.tsx` correspond à `monsite.com/`.
- `/app/contact/page.tsx` correspond à `monsite.com/contact`.

**Les fichiers spéciaux dans un dossier de route :**
1. **`page.tsx`** : L'interface unique de cette route.
2. **`layout.tsx`** : L'interface partagée (le cadre qui entoure `page.tsx`, comme une barre de navigation). Il ne se recharge pas quand on navigue entre ses enfants.
3. **`loading.tsx`** : Une interface de chargement (un "spinner" ou un "skeleton") qui s'affiche automatiquement en attendant que `page.tsx` finisse de charger ses données.
4. **`error.tsx`** : Une page affichant le message d'erreur si `page.tsx` plante, évitant à tout le site de crasher.

**Exemple de `page.tsx` (Rendu Serveur par défaut) :**
```tsx
// src/app/dashboard/page.tsx
// Ce composant s'exécute sur le serveur.
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {
  // On interroge directement la DB depuis le composant de manière asynchrone !
  const experiences = await prisma.experience.findMany()

  return (
    <main>
      <h1>Tableau de bord</h1>
      <ul>
        {experiences.map(exp => (
          <li key={exp.id}>{exp.title}</li>
        ))}
      </ul>
    </main>
  )
}
```

### B. Le dossier `components/` (Les Briques Réutilisables)
Dans `app/`, on met la structure des pages. Dans `components/`, on crée les petits morceaux de l'interface : boutons, cartes, formulaires.
C'est souvent ici que l'on utilise le concept de **Client Component**.

**Server Component vs Client Component :**
Par défaut, tout est Server Component (excellent pour les perfs, la sécurité et le SEO). Mais un composant serveur ne peut pas écouter les clics (`onClick`) ni utiliser d'état interactif (`useState`). Pour rendre un composant interactif dans le navigateur client, on ajoute `"use client"` tout en haut du fichier.

**Exemple d'un Client Component (`components/LikeButton.tsx`) :**
```tsx
"use client" // <--- La directive magique pour indiquer au navigateur de charger ce bout de JavaScript !

import { useState } from "react"

export default function LikeButton() {
  const [likes, setLikes] = useState(0)

  // Cette fonction s'exécute dans le navigateur de l'utilisateur
  return (
    <button onClick={() => setLikes(likes + 1)} className="bg-red-500 text-white p-2 rounded">
      ❤️ {likes}
    </button>
  )
}
```

### C. Le dossier `lib/` (La Boîte à Outils)
Ce dossier (parfois appelé `utils/`) contient le code qui n'est pas de l'interface React, mais de la logique métier (des fonctions qui formatent la date, valident un email, etc.) ou **la connexion aux bases tierces**.
Exemple classique : L'instanciation unique de Prisma (`src/lib/prisma.ts`) pour éviter d'ouvrir 1000 connexions à la DB en phase de développement lors du hot-reloading.

---

## 🎯 Résumé des responsabilités

1. **La Base de Données (SQLite)** : Stocke la donnée en dur.
2. **L'ORM (Prisma)** : Intermédiaire qui garantit la validité avec la DB et type fortement la donnée.
3. **Le Serveur (`app/page.tsx`)** : Interroge Prisma de manière sécurisée, compile le HTML avec la donnée injectée (Server Components).
4. **Le Client (`components/... "use client"`)** : Gère l'interactivité isolée (clics, animations, formulaires).

Cette architecture en "couches" est le standard industriel pour créer des applications web robustes, rapides et maintenables.
