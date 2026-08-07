# Gamification Éthique — Framework d'évaluation

Application web permettant d'évaluer le niveau éthique des mécaniques de gamification d'un projet numérique, **avant** leur intégration dans une interface. À partir d'un questionnaire, l'outil analyse les réponses et produit un diagnostic accompagné de recommandations concrètes, d'alternatives plus éthiques et de points de vigilance.

Projet réalisé dans le cadre d'un Travail de Bachelor (HEIG-VD, Ingénierie des médias), en collaboration avec l'agence Antistatique.

🔗 **Site en ligne : [gamification.espinasse.ch](https://gamification.espinasse.ch)**

---

## Ce que fait l'outil

Le site s'articule autour de plusieurs fonctionnalités :

- un **questionnaire** de 19 questions (à choix unique ou multiple, dont certaines conditionnelles) pour décrire le projet et les mécaniques envisagées ;
- une **analyse automatique** reposant sur des règles explicites, sans appel à une IA — chaque recommandation reste traçable jusqu'aux réponses fournies ;
- un **diagnostic** présentant une orientation générale, les thèmes de risque, les incohérences et les recommandations ;
- un **export PDF** du résultat pour le partager avec une équipe ou un·e client·e ;
- un **prompt à copier** destiné à une IA générative, pour prolonger la réflexion à partir du diagnostic.

L'analyse repose sur **8 principes d'une gamification éthique** : transparence, autonomie, progression, feedback, récompenses, comparaison sociale, rareté & urgence, choix contraint.

Tout fonctionne **côté client** : il n'y a ni serveur ni base de données. Les réponses sont conservées temporairement dans le navigateur (`localStorage`) et ne quittent jamais l'appareil de l'utilisateur·trice.

---

## Stack technique

| Domaine     | Technologie              |
| ----------- | ------------------------ |
| Framework   | Next.js 16 (App Router)  |
| Langage     | TypeScript               |
| UI          | React 19                 |
| Styles      | Tailwind CSS 4           |
| Composants  | shadcn/ui (sur Radix UI) |
| Icônes      | lucide-react             |
| Hébergement | Netlify                  |

---

## Démarrage rapide

**Prérequis :** Node.js 20.9+ (recommandé : 24.x) et npm.

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
```

Le site est alors accessible sur [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Commande        | Description                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Lance le serveur de développement              |
| `npm run build` | Génère la version de production                |
| `npm run start` | Démarre le serveur de production (après build) |
| `npm run lint`  | Vérifie le code avec ESLint                    |

---

## Auteure

**Christel Espinasse** — Travail de Bachelor 2025-2026
Filière Ingénierie des médias, HEIG-VD
En collaboration avec l'agence [Antistatique](https://antistatique.net/)

Des retours et suggestions d'amélioration peuvent être transmis via la page « À propos » du site.

---

## Licence

Projet académique réalisé dans le cadre d'un Travail de Bachelor. Toute réutilisation, même partielle, doit être faite dans le respect du droit d'auteur.
