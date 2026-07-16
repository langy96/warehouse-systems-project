var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

var products = new[]
{
    new Product("GL-01-SM", "Safety Gloves", "PPE", "A1-F", 13, 7),
    new Product("GL-01-LG", "Safety Gloves", "PPE", "A2-A", 0, 11),
    new Product("JMP-03-MD", "Hi-Vis Jumper", "Hi-Vis", "D5-C", 1, 1)
};

app.MapGet("/api/products", () => products);

app.MapGet("/", () => "Warehouse Systems API");

app.Run();

record Product(
    string Sku,
    string ProductName,
    string Category,
    string Location,
    int Stock,
    int ReorderLevel
);
