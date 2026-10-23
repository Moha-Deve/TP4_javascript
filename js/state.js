// js/state.js
// Cet objet centralise toutes les données et les filtres de notre application

export const state = {
    // Les tableaux qui vont contenir les données une fois chargées depuis les JSON
    customers: [],
    products: [],
    orders: [],

    // Les critères de recherche et de filtres initialisés par défaut
    searchQuery: "",         // Recherche par nom de client
    selectedStatus: "Tous",  // Filtre par statut de commande
    selectedCategory: "Tous" // Filtre par catégorie de produit
};