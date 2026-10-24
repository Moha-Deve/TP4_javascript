// js/dataService.js
// Ce fichier sert uniquement à récupérer les données des fichiers JSON. 
// Il ne touche pas du tout à l'affichage (pas de DOM ici).

export async function loadAllData() {
    try {
        // 1. On lance les requêtes fetch pour récupérer les 3 fichiers en même temps
        const [resCustomers, resProducts, resOrders] = await Promise.all([
            fetch('data/customers.json'),
            fetch('data/products.json'),
            fetch('data/orders.json')
        ]);

        // 2. On vérifie si les fichiers ont bien été trouvés (response.ok)
        if (!resCustomers.ok || !resProducts.ok || !resOrders.ok) {
            throw new Error("Impossible de charger un ou plusieurs fichiers de données.");
        }

        // 3. On convertit les réponses brutes en données exploitables (tableaux JavaScript)
        const customers = await resCustomers.json();
        const products = await resProducts.json();
        const orders = await resOrders.json();

        // ==========================================
        // 4. CALCULS (Règles 7.3 et 7.4)
        // ==========================================
        const enrichedOrders = orders.map(order => {
            let totalOrder = 0;

            // 7.3 : Calcul du montant de chaque ligne
            const enrichedItems = order.items.map(item => {
                // On cherche le produit correspondant pour récupérer son prix
                const product = products.find(p => p.id === item.productId);
                const unitPrice = product ? product.price : 0;
                
                // Formule : montant ligne = prix du produit x quantité
                const lineAmount = unitPrice * item.quantity;
                
                // On cumule pour le total de la commande
                totalOrder += lineAmount;

                return {
                    ...item,
                    unitPrice: unitPrice,
                    lineAmount: lineAmount // Montant de la ligne calculé
                };
            });

            return {
                ...order,
                items: enrichedItems,
                totalAmount: totalOrder // 7.4 : Montant total de la commande calculé
            };
        });

        // 5. On retourne toutes ces données regroupées (avec les commandes calculées)
        return {
            customers,
            products,
            orders: enrichedOrders
        };

    } catch (error) {
        // 6. En cas d'erreur (chemin erroné, fichier manquant...), on l'affiche et on la transmet
        console.error("Erreur dans dataService.js :", error);
        throw error; 
    }
}