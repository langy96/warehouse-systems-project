using WarehouseSystems.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var connectionString = builder.Configuration.GetConnectionString("WarehouseDatabase");
var productRepository = new ProductRepository(connectionString!);

app.MapGet("/api/products", () => productRepository.GetAllProducts());

app.MapGet("/api/products/{sku}", (string sku) =>
{
    var product = ProductData.Products.FirstOrDefault(product => product.Sku == sku);

    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapGet("/api/customers", () => CustomerData.Customers);

app.MapGet("/api/customers/{customerId}", (int customerId) =>
{
    var customer = CustomerData.Customers.FirstOrDefault(customer => customer.CustomerId == customerId);

    return customer is not null ? Results.Ok(customer) : Results.NotFound();
});

app.MapGet("/api/orders", () => OrderData.Orders);

app.MapGet("/api/orders/{orderNumber}", (int orderNumber) =>
{
    var order = OrderData.Orders.FirstOrDefault(order => order.OrderNumber == orderNumber);

    return order is not null ? Results.Ok(order) : Results.NotFound();
});

app.MapGet("/", () => "Warehouse Systems API");

app.Run();
