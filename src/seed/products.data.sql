-- Limpiamos los registros inválidos anteriores
DELETE FROM prod.product WHERE id LIKE 'p0%';

-- Insertamos los 10 productos con UUIDs v4 reales
INSERT INTO prod.product (id, name, unitPrice, lastCostPrice, stock, rowStatus, createdAt, updatedAt) VALUES
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae01', 'Laptop ASUS ROG Strix', 1500.00, 1100.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae02', 'Monitor Gamer MSI 27"', 350.00, 240.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae03', 'Teclado Mecánico Corsair K70', 120.00, 80.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae04', 'Mouse Logi G Pro X Superlight', 150.00, 95.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae05', 'Memoria RAM Kingston Fury 16GB', 65.00, 42.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae06', 'Disco Duro SSD Samsung 1TB', 110.00, 75.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae07', 'Procesador AMD Ryzen 7 7800X3D', 450.00, 320.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae08', 'Tarjeta de Video RTX 4070 Ti', 850.00, 620.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae09', 'Fuente de Poder EVGA 850W Gold', 140.00, 95.00, 0, 1, GETDATE(), GETDATE()),
('6ec0bd7f-11c0-43da-975e-2a8ad9ebae10', 'Gabinete Lian Li O11 Dynamic', 180.00, 115.00, 0, 1, GETDATE(), GETDATE());
