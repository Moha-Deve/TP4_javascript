## Structure générale
Le projet est organisé de la manière suivante :
- `index.html` : Page principale de l'application avec quelques Bootstrap.
- `style.css` : Styles CSS personnalisés.
- `js/` : C'est le dossiers qui Contient les differents pages scripts qui sont:
  - `app.js` : Point d'entrée principal.
  - `dataService.js` : Chargement des fichiers JSON et calculs.
  - `state.js` : Gestion de l'état de l'application.
  - `view.js` : Rendu dynamique de l'interface.
  - `selectors.js` : Centralisation des éléments du DOM.
- `data/` : Contient les diiferents pages sources de données (`customers.json`, `orders.json`, `products.json`).

## Fonctionnalités principales
- Chargement asynchrone des données via l'API `Fetch`.
- Calcul dynamique des montants par ligne et du montant total des commandes.
- Affichage dynamique des clients, produits et commandes.
- Interface responsive grâce au framework Bootstrap 5.

## Instructions pour lancer le projet
1. Cloner le dépôt ou télécharger les sources.
2. Ouvrir le dossier dans **Visual Studio Code**.
3. Lancer le projet à l'aide d'un serveur local (comme l'extension **Live Server** de VS Code) en ouvrant le fichier `index.html`.