# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Projet

Juda Arcade : application mobile privée de quiz et de mini-jeux manga/anime pour un groupe de 5 à 10 amis (Expo / React Native, backend Supabase). L'interface est uniquement en français.

Les spécifications sont hors du dépôt, dans le dossier parent :

- `../Planning_V1_Mobile.md` : **périmètre à livrer maintenant** (comptes, quiz, quêtes quotidiennes, classements, points), jalons et design system.
- `../PRD_Quiz_Cartes_Manga_Anime_V2_Mobile.md` : vision complète et règles métier détaillées. Cartes, boosters, échanges, duels, notifications push et admin web y figurent, mais le planning les repousse après la V1.
- `../PRD_Quiz_Cartes_Manga_Anime_V1.ipynb` : ancienne version web, remplacée par le PRD V2.

En cas de contradiction entre les deux documents sur le périmètre, le planning l'emporte.

## Commandes

Les commandes générales sont dans `AGENTS.md`. Points propres à ce dépôt :

- Le gestionnaire de paquets est npm (`package-lock.json`).
- Aucun framework de test n'est installé : il n'existe ni script `test` ni test à lancer.
- Aucune configuration ESLint n'est présente : le premier `npx expo lint` la met en place et modifie donc le dépôt.
- Ne pas lancer `npm run reset-project` : ce script du template déplace le code vers `example/` et vide `src/app`.
- Lancer les commandes git depuis ce dossier : `Juda_gaming` a son propre dépôt, et le dossier personnel `C:\Users\pc` en est un autre.

## Configuration

Copier `.env.example` vers `.env` et renseigner `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Les variables `EXPO_PUBLIC_*` sont intégrées au bundle client : n'y mettre aucun secret.

La base se crée en exécutant `supabase/schema.sql` dans le SQL Editor de Supabase. Il n'y a ni migrations ni Supabase CLI.

## Architecture

**Flux d'authentification.** `src/app/_layout.tsx` appelle `initialize()` de `src/stores/authStore.ts`, puis masque le splash screen. `src/app/index.tsx` redirige ensuite vers `(tabs)` ou `(auth)/login` selon `isAuthenticated`. Il n'y a pas de garde de route dans les groupes : les écrans naviguent eux-mêmes avec `router.replace` après une connexion ou une déconnexion.

**État.** Le store Zustand `authStore` détient la session, le profil et les actions d'authentification. Les écrans passent par le hook `useAuth` (`src/hooks/useAuth.ts`), qui ajoute `isAuthenticated`. Le client Supabase (`src/lib/supabase.ts`) conserve la session via `expo-secure-store`, ou `localStorage` sur le web.

**Mode invité.** `loginAsGuest` installe un faux profil local, sans session Supabase. Tout nouvel accès aux données doit gérer le cas `isGuest`, où `user` vaut `null`.

**Niveau et XP.** Ces valeurs ne sont pas stockées en base : `calculateLevel` les calcule côté client à partir de `profiles.total_points_earned`. `level`, `currentXp` et `nextLevelXp` n'existent donc que dans `UserProfile`.

**Profils.** Le trigger `handle_new_user` crée la ligne `profiles` à l'inscription à partir de `raw_user_meta_data.username`. `refreshProfile` prévoit un profil de secours si cette ligne est absente.

**Interface.** Le thème arcade est sombre uniquement : utiliser `ArcadeTheme` de `src/constants/theme.ts` et les composants de `src/components/arcade/`. Les styles passent par `StyleSheet.create`. `themed-text`, `themed-view`, `hint-row`, `web-badge`, `collapsible` et `animated-icon` viennent du template et aucun écran ne les utilise.

## État d'avancement

- Implémentés : authentification, navigation, interface de l'accueil et du profil.
- Fictifs : le classement (`MOCK_LEADERBOARD`) et les statistiques du profil (quiz réussis, série, rang) sont codés en dur.
- Pas encore construits : le lancement d'un jeu n'ouvre qu'une `Alert` ; il n'existe aucun écran de quiz ou de mini-jeu.
- Absents du dépôt : Edge Functions (`supabase/functions`), vues de classement et tâches `pg_cron` prévues par le planning.
- Pas encore installés : TanStack Query et Skia, prévus par les spécifications. Vérifier qu'ils restent nécessaires avant de les ajouter.

## Règles métier

Le PRD impose que les points, les plafonds et le code d'activation soient validés côté serveur (Edge Functions). La base est préparée dans ce sens : dans `supabase/schema.sql`, les joueurs n'ont qu'un accès en **lecture** aux tables de jeu, un trigger (`protect_profile_columns`) empêche un joueur de modifier ses `points`, son `total_points_earned` ou son `role`, et la table `config` n'est lisible que par les admins. Les écritures d'économie doivent passer par une Edge Function (clé `service_role`, qui contourne la RLS) : ces fonctions ne sont pas encore écrites.

Reste côté client, à déplacer vers une Edge Function avant toute vraie mise en service : la vérification du code d'activation dans `register` (`src/stores/authStore.ts`), qui s'appuie sur une liste `FALLBACK_CODES` en dur. La politique de lecture de `questions` expose aussi `correct_index` ; le tirage et la correction devront passer par le serveur.

Les quêtes et plafonds se réinitialisent à minuit, heure du Maroc (`Africa/Casablanca`), et non en UTC.
