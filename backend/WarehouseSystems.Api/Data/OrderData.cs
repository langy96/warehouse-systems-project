using WarehouseSystems.Api.Models;

namespace WarehouseSystems.Api.Data;

public static class OrderData
{
    public static readonly Order[] Orders =
    [
        new Order(
            220993,
            1,
            "Next Day",
            "Awaiting Pick",
            [
                new OrderLine("GL-01-SM", 10),
                new OrderLine("GL-01-LG", 5),
                new OrderLine("JMP-03-MD", 2)
            ]
        ),
        new Order(
            130624,
            2,
            "48 Hours",
            "Ready to Despatch",
            [
                new OrderLine("GL-01-SM", 1)
            ]
        )
    ];
}