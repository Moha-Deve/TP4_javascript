// js/selectors.js
// Ce fichier gère toutes les relations entre les données, les calculs et les filtres.

// 1. Retrouver un client grâce à son ID (utilisation de find)
export function getCustomerById(customerId, customers) {
    return customers.find(c => c.id === customerId);
}

// 2. Retrouver un produit grâce à son ID (utilisation de find)
export function getProductById(productId, products) {
    return products.find(p => p.id === productId);
}

// 3. Calculer le montant d'une ligne de commande (Prix du produit x Quantité)
export function calculateLineTotal(item, products) {
    const product = getProductById(item.productId, products);
    if (!product) return 0;
    return product.price * item.quantity;
}

// 4. Calculer le montant total d'une commande (utilisation de forEach)
export function calculateOrderTotal(order, products) {
    let total = 0;
    order.items.forEach(item => {
        total += calculateLineTotal(item, products);
    });
    return total;
}

// 5. Filtrer et rechercher les commandes selon la recherche texte, le statut et la catégorie
export function filterOrders(state) {
    return state.orders.filter(order => {
        // Trouver le client de la commande pour vérifier son nom
        const customer = getCustomerById(order.customerId, state.customers);
        const customerName = customer ? customer.name.toLowerCase() : "";
        
        // Critère 1 : Recherche par nom de client
        const matchesSearch = customerName.includes(state.searchQuery.toLowerCase());

        // Critère 2 : Filtre par statut (Livrée, En attente, Annulée...)
        const matchesStatus = (state.selectedStatus === "Tous") || (order.status === state.selectedStatus);

        // Critère 3 : Filtre par catégorie de produit contenu dans la commande
        let matchesCategory = true;
        if (state.selectedCategory !== "Tous") {
            matchesCategory = order.items.some(item => {
                const product = getProductById(item.productId, state.products);
                return product && product.category === state.selectedCategory;
            });
        }

        // La commande est gardée seulement si elle respecte tous les filtres en même temps
        return matchesSearch && matchesStatus && matchesCategory;
    });
}