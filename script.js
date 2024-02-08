const productsFilter = {
    products: [
        {
            name: "Prod 1",
            efficiency: "low",
            type: "heat",
            equipment: "furnace",
        },
        {
            name: "Prod 2",
            efficiency: "mid",
            type: "heat",
            equipment: "furnace",
        },
        {
            name: "Prod 3",
            efficiency: "high",
            type: "heat",
            equipment: "furnace",
        },
        {
            name: "Prod 4",
            efficiency: "low",
            type: "cool", 
            equipment: "air conditioner",
        },
        {
            name: "Prod 5",
            efficiency: "mid",
            type: "cool",
            equipment: "air conditioner",
        },
        {
            name: "Prod 6",
            efficiency: "high",
            type: "cool",
            equipment: "air conditioner",
        },
        {
            name: "Prod 7",
            efficiency: "low",
            type: "heat cool",
            equipment: "heat pump",
        },
        {
            name: "Prod 8",
            efficiency: "mid",
            type: "heat cool",
            equipment: "heat pump",
        },
        {
            name: "Prod 9",
            efficiency: "high",
            type: "heat cool",
            equipment: "heat pump",
        },
    ]
}

document.querySelectorAll('.products-checkboxes input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', filterAndDisplayProducts);
});

function filterAndDisplayProducts() {
    const filters = {};
    document.querySelectorAll('.products-checkboxes input[type="checkbox"]:checked').forEach(checkbox => {
        const filterType = checkbox.dataset.filter;
        const value = checkbox.dataset.value;
        if (!filters[filterType]) {
            filters[filterType] = [];
        }
        filters[filterType].push(value);
    });

    const filteredProducts = productsFilter.products.filter(product => {
        return Object.keys(filters).every(filterType => {

            if (!filters[filterType].length) return true;

            if (filterType === 'type') {

                const productTypes = product.type.split(' ');
                return filters[filterType].some(filter => productTypes.includes(filter));
            } else {

                return filters[filterType].includes(product[filterType]);
            }
        });
    });

    displayProducts(filteredProducts);
}

function displayProducts(filteredProducts) {
    const productsContainer = document.querySelector('.products-viewport');
    productsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.efficiency}% Efficient</p>
            <p>${product.equipment}</p>
            <p>Type: ${product.type}</p>
        `;
        productsContainer.appendChild(productCard);
    });
}