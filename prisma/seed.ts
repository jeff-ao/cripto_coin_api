import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Supplier
  const supplier = await prisma.supplier.upsert({
    where: { taxId: '12345678000199' },
    update: {},
    create: {
      taxId: '12345678000199',
      name: 'Fornecedor Exemplo',
      phone: '11999999999',
    },
  });

  // Customer
  const customer = await prisma.customer.upsert({
    where: { cpf: '12345678901' },
    update: {},
    create: {
      cpf: '12345678901',
      cnpj: '12345678000199',
      name: 'Cliente Exemplo',
      email: 'cliente@exemplo.com',
    },
  });

  // Phone
  const phone = await prisma.phone.upsert({
    where: { uuid: 'seed-phone-uuid' },
    update: {},
    create: {
      uuid: 'seed-phone-uuid',
      customerId: customer.id,
      number: '11988887777',
    },
  });

  // Address
  const address = await prisma.address.upsert({
    where: { uuid: 'seed-address-uuid' },
    update: {},
    create: {
      uuid: 'seed-address-uuid',
      customerId: customer.id,
      street: 'Rua Teste',
      number: 123,
      district: 'Centro',
      city: 'Cidade',
      state: 'SP',
      zipCode: '12345000',
    },
  });

  // Product
  const product = await prisma.product.upsert({
    where: { uuid: 'seed-product-uuid' },
    update: {},
    create: {
      uuid: 'seed-product-uuid',
      name: 'Produto Exemplo',
      unitPrice: 10.5,
      unit: 'UN',
      description: 'Produto para testes',
      active: true,
    },
  });

  // Stock
  const stock = await prisma.stock.upsert({
    where: { productId: product.id },
    update: {},
    create: {
      productId: product.id,
      quantity: 100,
    },
  });

  // Kit
  const kit = await prisma.kit.upsert({
    where: { uuid: 'seed-kit-uuid' },
    update: {},
    create: {
      uuid: 'seed-kit-uuid',
      name: 'Kit Exemplo',
      description: 'Kit de teste',
      totalPrice: 99.9,
      active: true,
    },
  });

  // KitItem
  await prisma.kitItem.upsert({
    where: { uuid: 'seed-kititem-uuid' },
    update: {},
    create: {
      uuid: 'seed-kititem-uuid',
      kitId: kit.id,
      productId: product.id,
      quantity: 2,
    },
  });

  // Quote
  const quote = await prisma.quote.upsert({
    where: { uuid: 'seed-quote-uuid' },
    update: {},
    create: {
      uuid: 'seed-quote-uuid',
      customerId: customer.id,
      totalValue: 100,
      discount: 10,
      finalValue: 90,
      status: 'PENDING',
    },
  });

  // QuoteItem
  await prisma.quoteItem.upsert({
    where: { uuid: 'seed-quoteitem-uuid' },
    update: {},
    create: {
      uuid: 'seed-quoteitem-uuid',
      quoteId: quote.id,
      productId: product.id,
      quantity: 1,
      unit: 'UN',
      unitPrice: 10.5,
    },
  });

  // Sale
  const sale = await prisma.sale.upsert({
    where: { uuid: 'seed-sale-uuid' },
    update: {},
    create: {
      uuid: 'seed-sale-uuid',
      customerId: customer.id,
      quoteId: quote.id,
      date: new Date(),
      totalValue: 90,
      discount: 10,
      paymentMethod: 'Dinheiro',
      deliveryFee: 0,
      status: 'PAID',
    },
  });

  // SaleItem
  await prisma.saleItem.upsert({
    where: { uuid: 'seed-saleitem-uuid' },
    update: {},
    create: {
      uuid: 'seed-saleitem-uuid',
      saleId: sale.id,
      productId: product.id,
      quantity: 1,
      unit: 'UN',
      unitPrice: 10.5,
    },
  });

  // Purchase
  const purchase = await prisma.purchase.upsert({
    where: { uuid: 'seed-purchase-uuid' },
    update: {},
    create: {
      uuid: 'seed-purchase-uuid',
      date: new Date(),
      description: 'Compra de teste',
      invoice: 'INV-001',
      totalValue: 100,
      supplierId: supplier.id,
    },
  });

  // PurchaseItem
  await prisma.purchaseItem.upsert({
    where: { uuid: 'seed-purchaseitem-uuid' },
    update: {},
    create: {
      uuid: 'seed-purchaseitem-uuid',
      purchaseId: purchase.id,
      productId: product.id,
      quantity: 10,
      unitPrice: 10.5,
    },
  });

  console.log('Seed finalizada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
