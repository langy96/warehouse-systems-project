using WarehouseSystems.Api.Models;

namespace WarehouseSystems.Api.Data;

public static class CustomerData
{
    public static readonly Customer[] Customers =
    [
        new Customer(1, "Lucy Lang Ltd", "County Durham"),
        new Customer(2, "Freya's Flowers", "West Yorkshire")
    ];
}