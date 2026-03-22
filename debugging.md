# Journal de Déboguage

## 2026-03-22 - Erreur P2002/PrismaClientInitializationError : PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions

### Logs
```bash
⨯ Error [PrismaClientInitializationError]: `PrismaClient` needs to be constructed with a non-empty, valid `PrismaClientOptions`:

new PrismaClient({
  ...
})

or

constructor() {
  super({ ... });
}
```

### Solution
L'erreur est due à une évolution dans Prisma 7. La propriété `url` n'est plus supportée dans `schema.prisma`. Par conséquent, le client doit être instancié avec un _driver adapter_ fournissant la connexion directement dans le code.

1. Installation de l'adapteur LibSQL : `npm install @libsql/client @prisma/adapter-libsql`
2. Création de `.env.local` et définition de `DATABASE_URL="file:./dev.db"`.
3. Modification de `src/lib/prisma.ts` pour instancier `PrismaClient` avec l'adapter pointant sur notre base SQLite locale.
4. Lancement de `npx prisma generate` pour valider et régénérer le client.
