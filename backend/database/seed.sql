INSERT INTO Locations (LocationCode, Aisle, Bay, Shelf, MaxCapacity)
VALUES
('A1-F', 'A1', 'A', 'F', 20),
('A2-A', 'A2', 'A', 'A', 20),
('D5-C', 'D5', 'D', 'C', 20);

INSERT INTO Products (Sku, ProductName, Category, LocationCode, Stock, ReorderLevel)
VALUES
('GL-01-SM', 'Safety Gloves', 'PPE', 'A1-F', 13, 7),
('GL-01-LG', 'Safety Gloves', 'PPE', 'A2-A', 0, 11),
('JMP-03-MD', 'Hi-Vis Jumper', 'Hi-Vis', 'D5-C', 1, 1);

INSERT INTO Customers (CustomerId, Name, DeliveryArea)
VALUES
(1, 'Lucy Lang Ltd', 'County Durham'),
(2, 'Freya''s Flowers', 'West Yorkshire');

INSERT INTO Orders (OrderNumber, CustomerId, Priority, Status)
VALUES
(220993, 1, 'Next Day', 'Awaiting Pick'),
(130624, 2, '48 Hours', 'Ready to Despatch');

INSERT INTO OrderLines (OrderLineId, OrderNumber, Sku, Quantity)
VALUES
(1, 220993, 'GL-01-SM', 10),
(2, 220993, 'GL-01-LG', 5),
(3, 220993, 'JMP-03-MD', 2),
(4, 130624, 'GL-01-SM', 1);
