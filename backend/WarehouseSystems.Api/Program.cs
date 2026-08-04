using WarehouseSystems.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/products", () => ProductData.Products);

app.MapGet("/api/products/{sku}", (string sku) =>
{
    var product = ProductData.Products.FirstOrDefault(product => product.Sku == sku);

    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapGet("/api/customers", () => CustomerData.Customers);

app.MapGet("/", () => "Warehouse Systems API");

app.Run();
