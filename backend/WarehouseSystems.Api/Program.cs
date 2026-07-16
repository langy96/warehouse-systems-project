using WarehouseSystems.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.MapGet("/api/products", () => ProductData.Products);

app.MapGet("/", () => "Warehouse Systems API");

app.Run();
