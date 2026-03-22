---
trigger: always_on
---

# `rules/debugging-log.md`

## **Règle : Documentation Systématique du Débuggage**

**Contexte :** Chaque fois qu'une erreur est rencontrée, analysée et résolue lors du développement avec NextJS et Prisma.

**Action :** Créer ou mettre à jour le fichier `debugging.md` à la racine du projet.

---

## **Structure du Log**
Chaque entrée dans `debugging.md` doit impérativement respecter ce format :

### 1. Titre du Problème
* Utiliser un titre clair (ex: `Erreur P2002 Prisma : Contrainte unique sur l'email`).

### 2. Logs de l'Erreur
* Copier-coller le bloc de log significatif (Terminal ou Console Navigateur).
* Utiliser les blocs de code Markdown avec le langage approprié (bash, json, etc.).

### 3. Analyse et Solution
* Expliquer brièvement la cause racine.
* Fournir le code corrigé ou la commande de résolution.

---

### **Exemple de format attendu**
```markdown
## [DATE] - Titre du problème

### Logs
\```bash
[Prisma Client Python] Error: P2002: Unique constraint failed on the fields: (`email`)
\```

## Solution
L'erreur était due à une tentative d'insertion d'un doublon. 
1. Ajout d'une vérification d'existence avant le `prisma.user.create`.
2. Utilisation de `upsert` pour gérer les conflits proprement.
```

---

## **Déclencheur (Trigger)**
* **Quand :** Dès qu'un bug bloque le flux de travail ou nécessite plus de 2 minutes de recherche.
* **Commande :** "Mets à jour le journal de debug" ou automatique lors de la résolution confirmée par l'utilisateur.

---

## Pourquoi c'est utile pour toi ?
En utilisant cette règle avec Antigravity ou un agent IA :
* **Mémoire contextuelle :** L'IA saura qu'elle a déjà croisé ce bug et ne te proposera pas deux fois la même mauvaise piste.
* **Onboarding :** Si quelqu'un d'autre rejoint ton projet NextJS, il a déjà la "FAQ des galères" sous la main.

Souhaites-tu que je génère également une structure de base pour ton fichier `debugging.md` afin de l'initialiser proprement ?