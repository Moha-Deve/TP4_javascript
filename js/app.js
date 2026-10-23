// js/app.js
// C'est le chef d'orchestre : il initialise l'application et gère les événements.

import { state } from './state.js';
import { loadAllData } from './dataService.js';
import { filterOrders } from './selectors.js';
import { renderIndicators, renderOrders, renderError } from './view.js';

// Fonction principale de rendu qui met à jour toute l'interface
function render() {
    // 1. Obtenir les commandes filtrées selon les choix de l'utilisateur
    const filteredOrders = filterOrders(state);

    // 2. Mettre à jour les cartes des commandes
    renderOrders(filteredOrders, state.customers, state.products);

    // 3. Mettre à jour les indicateurs du haut
    renderIndicators(state.customers, state.products, state.orders);
}

// Fonction d'initialisation appelée au chargement de la page
async function init() {
    try {
        // Chargement des données JSON
        const data = await loadAllData();

        // Enregistrement des données dans le state central
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        // Configuration des écouteurs d'événements (filtres et recherche)
        setupEventListeners();

        // Premier rendu complet
        render();

    } catch (error) {
        // En cas d'erreur de chargement, on affiche une alerte
        renderError("Un problème est survenu lors du chargement des données.");
    }
}

// Gestion des actions de l'utilisateur
function setupEventListeners() {
    // 1. Événement de saisie dans la barre de recherche
    document.getElementById('search-input').addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        render(); // On réaffiche immédiatement après la modification de l'état
    });

    // 2. Événement du filtre par statut
    document.getElementById('status-filter').addEventListener('change', (e) => {
        state.selectedStatus = e.target.value;
        render();
    });

    // 3. Événement du filtre par catégorie
    document.getElementById('category-filter').addEventListener('change', (e) => {
        state.selectedCategory = e.target.value;
        render();
    });
}

// Lancement de l'application
init();