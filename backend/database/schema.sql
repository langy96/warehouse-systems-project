CREATE TABLE Locations (
    LocationCode NVARCHAR(20) PRIMARY KEY,
    Aisle NVARCHAR(10) NOT NULL,
    Bay NVARCHAR(10) NOT NULL,
    Shelf NVARCHAR(10) NOT NULL,
    MaxCapacity INT NOT NULL
);

CREATE TABLE Products (
    Sku NVARCHAR(50) PRIMARY KEY,
    ProductName NVARCHAR(100) NOT NULL,
    Category NVARCHAR(50) NOT NULL,
    LocationCode NVARCHAR(20) NOT NULL,
    Stock INT NOT NULL,
    ReorderLevel INT NOT NULL,
    FOREIGN KEY (LocationCode) REFERENCES Locations(LocationCode)
);

CREATE TABLE Customers (
    CustomerId INT PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    DeliveryArea NVARCHAR(100) NOT NULL
);

CREATE TABLE Orders (
    OrderNumber INT PRIMARY KEY,
    CustomerId INT NOT NULL,
    Priority NVARCHAR(50) NOT NULL,
    Status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customers(CustomerId)
);

CREATE TABLE OrderLines (
    OrderLineId INT PRIMARY KEY,
    OrderNumber INT NOT NULL,
    Sku NVARCHAR(50) NOT NULL,
    Quantity INT NOT NULL,
    FOREIGN KEY (OrderNumber) REFERENCES Orders(OrderNumber),
    FOREIGN KEY (Sku) REFERENCES Products(Sku)
);
