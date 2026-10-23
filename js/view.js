// js/view.js
// Ce fichier gère uniquement l'affichage (le DOM) et l'intégration Bootstrap.
// Il ne charge pas les données et ne modifie pas l'état.

import { getCustomerById, calculateOrderTotal } from './selectors.js';

// 1. Afficher les 4 indicateurs dynamiques en haut de page
export function renderIndicators(customers, products, orders) {
    document.getElementById('total-customers').textContent = customers.length;
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-orders').textContent = orders.length;

    // Calculer le montant cumulé de toutes les commandes
    let totalRevenue = 0;
    orders.forEach(order => {
        totalRevenue += calculateOrderTotal(order, products);
    });
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2) + " MAD";
}

// 2. Afficher la liste des commandes sous forme de cartes Bootstrap
export function renderOrders(orders, customers, products) {
    const container = document.getElementById('orders-container');
    container.innerHTML = ""; // Vider l'ancienne liste avant de réafficher

    if (orders.length === 0) {
        container.innerHTML = `<div class="alert alert-warning">Aucune commande ne correspond à vos critères.</div>`;
        return;
    }

    orders.forEach(order => {
        // Retrouver le client grâce à la relation customerId
        const customer = getCustomerById(order.customerId, customers);
        const customerName = customer ? customer.name : "Client inconnu";
        
        // Calculer le total de cette commande
        const orderTotal = calculateOrderTotal(order, products);

        // Choisir la couleur du badge Bootstrap selon le statut
        let badgeClass = "bg-secondary";
        if (order.status === "Livree") badgeClass = "bg-success";
        else if (order.status === "En attente") badgeClass = "bg-warning text-dark";
        else if (order.status === "Annulee") badgeClass = "bg-danger";

        // Création de la carte pour chaque commande
        const card = document.createElement('div');
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">Commande #${order.id}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Client : ${customerName}</h6>
                    <p class="card-text mb-1"><strong>Date :</strong> ${order.date}</p>
                    <p class="card-text mb-2"><strong>Statut :</strong> <span class="badge ${badgeClass}">${order.status}</span></p>
                    <p class="card-text"><strong>Total :</strong> ${orderTotal.toFixed(2)} MAD</p>
                    <button class="btn btn-outline-primary btn-sm details-btn" data-id="${order.id}">
                        Voir Détails
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Afficher un message d'erreur dans l'interface en cas de problème de chargement
export function renderError(message) {
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
        errorContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                <strong>Erreur de chargement :</strong> ${message}
            </div>
        `;
    }
}