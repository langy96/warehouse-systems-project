using Microsoft.Data.SqlClient;
using WarehouseSystems.Api.Models;

namespace WarehouseSystems.Api.Data;

public class ProductRepository
{
    private readonly string _connectionString;

    public ProductRepository(string connectionString)
    {
        _connectionString = connectionString;
    }

    public List<Product> GetAllProducts()
    {
        var products = new List<Product>();

        using var connection = new SqlConnection(_connectionString);

        connection.Open();

        using var command = new SqlCommand(
            "SELECT Sku, ProductName, Category, LocationCode, Stock, ReorderLevel FROM Products",
            connection
        );

        using var reader = command.ExecuteReader();

        while (reader.Read())
        {
            products.Add(new Product(
                reader.GetString(0),
                reader.GetString(1),
                reader.GetString(2),
                reader.GetString(3),
                reader.GetInt32(4),
                reader.GetInt32(5)
            ));
        }

        return products;
    }

    public Product? GetProductBySku(string sku)
    {
        using var connection = new SqlConnection(_connectionString);

        connection.Open();

        using var command = new SqlCommand(
            "SELECT Sku, ProductName, Category, LocationCode, Stock, ReorderLevel FROM Products WHERE Sku = @sku",
            connection
        );

        command.Parameters.AddWithValue("@sku", sku);

        using var reader = command.ExecuteReader();

        if (!reader.Read())
        {
            return null;
        }

        return new Product(
            reader.GetString(0),
            reader.GetString(1),
            reader.GetString(2),
            reader.GetString(3),
            reader.GetInt32(4),
            reader.GetInt32(5)
        );
    }
}
