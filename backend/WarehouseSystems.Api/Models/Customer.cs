namespace WarehouseSystems.Api.Models;

public record Customer(
    int CustomerId,
    string Name,
    string DeliveryArea
);