function getProductStatus(product) {
    if (product.stock === 0) {
        return {
            label: "Out of Stock",
            badgeClass: "text-bg-danger"
        };
    } else if (product.stock <= product.reorderLevel) {
        return {
            label: "Low Stock",
            badgeClass: "text-bg-warning"
        };
    } else {
        return {
            label: "In Stock",
            badgeClass: "text-bg-success"
        };
    }
}

function renderDashboard(productsToRender) {
    const totalProducts = productsToRender.length;
    const lowStockProducts = productsToRender.filter(product => product.stock > 0 && product.stock <= product.reorderLevel).length;
    const outOfStockProducts = productsToRender.filter(product => product.stock === 0).length;

    document.getElementById("totalProductsCard").querySelector(".card-title").textContent = `Total Products: ${totalProducts}`;
    document.getElementById("lowStockCard").querySelector(".card-title").textContent = `Low Stock: ${lowStockProducts}`;
    document.getElementById("outOfStockCard").querySelector(".card-title").textContent = `Out of Stock: ${outOfStockProducts}`;
}

function renderProductsTable(productsToRender) {
    const tableBody = document.getElementById("productsTableBody");
    tableBody.innerHTML = "";

    productsToRender.forEach(product => {
        const status = getProductStatus(product);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.sku}</td>
            <td>${product.productName}</td>
            <td>${product.category}</td>
            <td>${product.location}</td>
            <td>${product.stock}</td>
            <td>${product.reorderLevel}</td>
            <td><span class="badge ${status.badgeClass}">${status.label}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

const products = [
    {
        sku: "GL-01-SM",
        productName: "Safety Gloves",
        category: "PPE",
        location: "A1-F",
        stock: 13,
        reorderLevel: 7
    },
    {
        sku: "GL-01-LG",
        productName: "Safety Gloves",
        category: "PPE",
        location: "A2-A",
        stock: 0,
        reorderLevel: 11
    },
    {
        sku: "JMP-03-MD",
        productName: "Hi-Vis Jumper",
        category: "General",
        location: "D5-C",
        stock: 1,
        reorderLevel: 1
    }
];

renderProductsTable(products);
renderDashboard(products);
