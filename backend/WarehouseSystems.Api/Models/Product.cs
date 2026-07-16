namespace WarehouseSystems.Api.Models;

public record Product(
    string Sku,
    string ProductName,
    string Category,
    string Location,
    int Stock,
    int ReorderLevel
);
