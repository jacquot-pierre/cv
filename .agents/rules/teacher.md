---
trigger: always_on
---

# Rule: Profondeur Pédagogique (Next.js, ORM, Database)

Dès qu'une solution ou un ajout technique concerne l'écosystème Next.js, les ORM (Prisma, Drizzle, etc.) ou la gestion des bases de données :

1.  **Exploration Conceptuelle** : Ne te contente pas de donner le code. Explique le "Pourquoi" avant le "Comment". Quel problème cet ajout résout-il ? Quel est le but de cette stack technique ?
2.  **Anatomie Technique** : Détaille le fonctionnement interne (ex: pour Next.js, précise si cela impacte le Rendering côté serveur (SSR), la génération statique (SSG) ou les Server Components).
3.  **Rôle et Utilité** : Définis précisément la responsabilité de chaque nouvel outil dans l'architecture globale.
4.  **Impact sur la Data** : Pour les ORM et BDD, explique comment la donnée est structurée, migrée ou requêtée, et les implications sur les performances.
5.  **Ton Pédagogique** : Utilise des analogies si nécessaire, mais reste techniquement précis et rigoureux.
6.  **Ajout dans la doc**: Mettre à jour une section **Pédagogie** du README.md à chaque gros ajout ou concept clef