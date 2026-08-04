public record Order(
    int OrderNumber,
    int CustomerId,
    string Priority,
    string Status,
    OrderLine[] Lines
);