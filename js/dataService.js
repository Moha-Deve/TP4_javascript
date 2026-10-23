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

        // 4. On retourne toutes ces données regroupées
        return {
            customers,
            products,
            orders
        };

    } catch (error) {
        // 5. En cas d'erreur (chemin erroné, fichier manquant...), on l'affiche et on la transmet
        console.error("Erreur dans dataService.js :", error);
        throw error; 
    }
}