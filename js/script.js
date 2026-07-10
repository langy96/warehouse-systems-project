function getOrderStatus(order) {
    if (order.status === "Despatched") {
        return {
            label: "Despatched",
            badgeClass: "text-bg-success"
        };
    } else if (order.priority === "Next Day") {
        return {
            label: order.status,
            badgeClass: "text-bg-warning"
        };
    } else if (order.status === "Ready to Despatch") {
        return {
            label: order.status,
            badgeClass: "text-bg-primary"
        };
    } else {
        return {
            label: order.status,
            badgeClass: "text-bg-secondary"
        };
    }
}

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

function renderProductOptions(productsToRender) {
    const productSelect = document.getElementById("receiveSku");
    productSelect.innerHTML = '<option value="" disabled selected hidden>Select Product</option>';

    productsToRender.forEach(product => {
        const option = document.createElement("option");
        option.value = product.sku;
        option.textContent = `${product.sku} - ${product.productName}`;
        productSelect.appendChild(option);
    });
}

function renderOrderOptions(ordersToRender) {
    const orderSelect = document.getElementById("orderNumber");
    orderSelect.innerHTML = '<option value="" disabled selected hidden>Select Order</option>';

    ordersToRender.forEach(order => {
        const option = document.createElement("option");
        option.value = order.orderNumber;
        option.textContent = `${order.orderNumber} - ${order.status}`;
        orderSelect.appendChild(option);
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
        category: "Hi-Vis",
        location: "D5-C",
        stock: 1,
        reorderLevel: 1
    }
];

const orders = [
    {
        orderNumber: 220993,
        customer: "Lucy Lang Ltd",
        deliveryArea: "West Yorkshire",
        priority: "Next Day",
        status: "Awaiting Pick",
        lines: [
            { sku: "GL-01-SM", quantity: 10 },
            { sku: "GL-01-LG", quantity: 5 },
            { sku: "JMP-03-MD", quantity: 2 }
        ]
    },
    {
        orderNumber: 130624,
        customer: "Freya's Flowers",
        deliveryArea: "West Yorkshire",
        priority: "48 Hours",
        status: "Ready to Despatch",
        lines: [
            { sku: "GL-01-SM", quantity: 1 }
        ]
    }
];

function renderOrdersTable(ordersToRender) {
    const tableBody = document.getElementById("ordersTableBody");
    tableBody.innerHTML = "";

    ordersToRender.forEach(order => {
        const status = getOrderStatus(order);
        const row = document.createElement("tr");
        const items = order.lines.map(line => `${line.sku} x ${line.quantity}`).join(", ");
        row.innerHTML = `
            <td>${order.orderNumber}</td>
            <td>${order.customer}</td>
            <td>${order.deliveryArea}</td>
            <td>${order.priority}</td>
            <td><span class="badge ${status.badgeClass}">${status.label}</span></td>
            <td>${items}</td>
        `;
        tableBody.appendChild(row);
    });
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

function getFilteredProducts() {
    const selectedStatus = document.getElementById("productStatusFilter").value;
    const selectedLocation = document.getElementById("productLocationFilter").value;

    return products.filter(product => {
        const matchesStatus = selectedStatus === "All" || getProductStatus(product).label === selectedStatus;
        const matchesLocation = selectedLocation === "All" || product.location === selectedLocation;

        return matchesStatus && matchesLocation;
    });
}

function renderApp() {
    renderProductsTable(getFilteredProducts());
    renderDashboard(products);
    renderOrdersTable(orders);
    renderProductOptions(products);
    renderOrderOptions(orders);
};

renderApp();

document.getElementById("receiveStockForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const sku = document.getElementById("receiveSku").value;
    const quantity = Number(document.getElementById("receivedQuantity").value);

    if (!sku || quantity <= 0) {
        return;
    }

    const product = products.find(product => product.sku === sku);

    if (!product) {
        return;
    }

    product.stock += quantity;

    document.getElementById("receiveStockForm").reset();

    renderApp();
});

document.getElementById("despatchOrderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderNumber = document.getElementById("orderNumber").value;

    if (!orderNumber) {
        return;
    }

    const order = orders.find(order => String(order.orderNumber) === orderNumber);

    if (!order) {
        return;
    }

    if (order.status === "Despatched") {
        alert("Order already despatched.");
        return;
    }

    const hasEnoughStock = order.lines.every(line => {
        const product = products.find(product => product.sku === line.sku);

        return product && product.stock >= line.quantity;
    });

    if (!hasEnoughStock) {
        alert("Insufficient stock to despatch order.");
        return;
    }

    order.lines.forEach(line => {
        const product = products.find(product => product.sku === line.sku);
        product.stock -= line.quantity;
    });

    order.status = "Despatched";

    document.getElementById("despatchOrderForm").reset();

    renderApp();
});

document.getElementById("productStatusFilter").addEventListener("change", function(event) {
    event.preventDefault();

    renderApp();
});

document.getElementById("productLocationFilter").addEventListener("change", function(event) {
    event.preventDefault();

    renderApp();
});
