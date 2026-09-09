import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el sembrado de datos (Seed)...');

  await prisma.product.deleteMany({});

  const productsData = [
    {
      name: 'Laptop Gamer Phoenix Pro',
      unitPrice: 1299.99,
      lastCostPrice: 950.00,
      stock: 15,
    },
    {
      name: 'Monitor UltraWide 34" Curvo',
      unitPrice: 449.99,
      lastCostPrice: 310.00,
      stock: 22,
    },
    {
      name: 'Teclado Mecánico RGB Switch Blue',
      unitPrice: 89.50,
      lastCostPrice: 45.00,
      stock: 50,
    },
    {
      name: 'Mouse Ergonómico Inalámbrico',
      unitPrice: 59.99,
      lastCostPrice: 28.50,
      stock: 120,
    },
    {
      name: 'Auriculares Noise Cancelling Pro',
      unitPrice: 199.99,
      lastCostPrice: 110.00,
      stock: 35,
    },
    {
      name: 'Memoria RAM DDR5 32GB (2x16GB)',
      unitPrice: 145.00,
      lastCostPrice: 95.00,
      stock: 40,
    },
    {
      name: 'Disco Duro Sólido NVMe M.2 2TB',
      unitPrice: 179.99,
      lastCostPrice: 120.00,
      stock: 65,
    },
    {
      name: 'Tarjeta de Video RTX 4070 OC',
      unitPrice: 649.99,
      lastCostPrice: 490.00,
      stock: 8,
    },
    {
      name: 'Fuente de Poder 850W Gold Modular',
      unitPrice: 125.50,
      lastCostPrice: 80.00,
      stock: 25,
    },
    {
      name: 'Gabinete Mid-Tower Cristal Templado',
      unitPrice: 95.00,
      lastCostPrice: 55.00,
      stock: 18,
    },
  ];

  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    console.log(`Producto creado: ${createdProduct.name} (ID: ${createdProduct.id})`);
  }

  console.log('🏁 Proceso de seed finalizado con éxito.');
}

main()
  .catch((e) => {
    console.error('Error ejecutando el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
