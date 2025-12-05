import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding entities...');

  const entities = [
    'Microsoft Corporation',
    'Apple Inc.',
    'Google LLC',
    'Amazon.com Inc.',
    'Meta Platforms Inc.',
    'Tesla Inc.',
    'NVIDIA Corporation',
    'Oracle Corporation',
    'IBM Corporation',
    'Intel Corporation',
    'Samsung Electronics',
    'Sony Corporation',
    'Dell Technologies',
    'HP Inc.',
    'Cisco Systems Inc.',
    'Adobe Inc.',
    'Salesforce Inc.',
    'Netflix Inc.',
    'Twitter Inc.',
    'Uber Technologies Inc.',
    'Airbnb Inc.',
    'Spotify AB',
    'Zoom Video Communications',
    'Slack Technologies',
    'Dropbox Inc.',
    'GitHub Inc.',
    'Red Hat Inc.',
    'VMware Inc.',
    'SAP SE',
    'Siemens AG',
    'General Electric',
    'Ford Motor Company',
    'General Motors',
    'Toyota Motor Corporation',
    'Volkswagen AG',
    'BMW Group',
    'Mercedes-Benz Group AG',
    'Honda Motor Co.',
    'Nissan Motor Co.',
    'Hyundai Motor Company',
    'Boeing Company',
    'Airbus SE',
    'Lockheed Martin Corporation',
    'Northrop Grumman Corporation',
    'Raytheon Technologies',
    'Coca-Cola Company',
    'PepsiCo Inc.',
    'Nestlé S.A.',
    'Unilever PLC',
    'Procter & Gamble Co.'
  ];

  for (const description of entities) {
    await prisma.entity.create({
      data: {
        description,
        isActive: true,
      },
    });
  }

  console.log(`✅ Successfully created ${entities.length} entities`);

  // Seeding articles
  console.log('Seeding articles...');

  const articles = [
    { codigoAsy: 'ASY-001', description: 'Laptop Dell Inspiron 15', listprice: 899.99, revendedorsPrice: 750.00, codigoProvider: 'DELL-001', descriptionProvider: 'Dell Technologies' },
    { codigoAsy: 'ASY-002', description: 'Monitor Samsung 27"', listprice: 349.99, revendedorsPrice: 290.00, codigoProvider: 'SAM-001', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-003', description: 'Teclado Mecánico Logitech G Pro', listprice: 129.99, revendedorsPrice: 105.00, codigoProvider: 'LOG-001', descriptionProvider: 'Logitech International' },
    { codigoAsy: 'ASY-004', description: 'Mouse Inalámbrico Logitech MX Master', listprice: 99.99, revendedorsPrice: 82.00, codigoProvider: 'LOG-002', descriptionProvider: 'Logitech International' },
    { codigoAsy: 'ASY-005', description: 'Auriculares Sony WH-1000XM5', listprice: 399.99, revendedorsPrice: 340.00, codigoProvider: 'SONY-001', descriptionProvider: 'Sony Corporation' },
    { codigoAsy: 'ASY-006', description: 'Webcam Logitech C920', listprice: 79.99, revendedorsPrice: 65.00, codigoProvider: 'LOG-003', descriptionProvider: 'Logitech International' },
    { codigoAsy: 'ASY-007', description: 'SSD Samsung 1TB NVMe', listprice: 109.99, revendedorsPrice: 88.00, codigoProvider: 'SAM-002', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-008', description: 'Memoria RAM Corsair 16GB DDR4', listprice: 69.99, revendedorsPrice: 55.00, codigoProvider: 'COR-001', descriptionProvider: 'Corsair Components' },
    { codigoAsy: 'ASY-009', description: 'Fuente de Poder EVGA 750W', listprice: 89.99, revendedorsPrice: 72.00, codigoProvider: 'EVGA-001', descriptionProvider: 'EVGA Corporation' },
    { codigoAsy: 'ASY-010', description: 'Tarjeta Gráfica NVIDIA RTX 4070', listprice: 599.99, revendedorsPrice: 520.00, codigoProvider: 'NVD-001', descriptionProvider: 'NVIDIA Corporation' },
    { codigoAsy: 'ASY-011', description: 'Procesador Intel Core i7-13700K', listprice: 409.99, revendedorsPrice: 350.00, codigoProvider: 'INT-001', descriptionProvider: 'Intel Corporation' },
    { codigoAsy: 'ASY-012', description: 'Motherboard ASUS ROG Strix', listprice: 299.99, revendedorsPrice: 255.00, codigoProvider: 'ASUS-001', descriptionProvider: 'ASUSTeK Computer' },
    { codigoAsy: 'ASY-013', description: 'Gabinete NZXT H510', listprice: 79.99, revendedorsPrice: 65.00, codigoProvider: 'NZXT-001', descriptionProvider: 'NZXT Inc.' },
    { codigoAsy: 'ASY-014', description: 'Cooler CPU Noctua NH-D15', listprice: 99.99, revendedorsPrice: 85.00, codigoProvider: 'NOC-001', descriptionProvider: 'Noctua' },
    { codigoAsy: 'ASY-015', description: 'Router TP-Link Archer AX6000', listprice: 299.99, revendedorsPrice: 250.00, codigoProvider: 'TPL-001', descriptionProvider: 'TP-Link Technologies' },
    { codigoAsy: 'ASY-016', description: 'Switch Cisco 24 Puertos', listprice: 449.99, revendedorsPrice: 380.00, codigoProvider: 'CIS-001', descriptionProvider: 'Cisco Systems' },
    { codigoAsy: 'ASY-017', description: 'UPS APC 1500VA', listprice: 199.99, revendedorsPrice: 165.00, codigoProvider: 'APC-001', descriptionProvider: 'APC by Schneider Electric' },
    { codigoAsy: 'ASY-018', description: 'Disco Duro WD 4TB', listprice: 99.99, revendedorsPrice: 82.00, codigoProvider: 'WD-001', descriptionProvider: 'Western Digital' },
    { codigoAsy: 'ASY-019', description: 'Cable HDMI 2.1 3m', listprice: 29.99, revendedorsPrice: 22.00, codigoProvider: 'GEN-001', descriptionProvider: 'Generic Cables' },
    { codigoAsy: 'ASY-020', description: 'Hub USB-C 7 en 1', listprice: 49.99, revendedorsPrice: 38.00, codigoProvider: 'ANK-001', descriptionProvider: 'Anker Innovations' },
    { codigoAsy: 'ASY-021', description: 'Tablet Samsung Galaxy Tab S9', listprice: 849.99, revendedorsPrice: 720.00, codigoProvider: 'SAM-003', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-022', description: 'iPad Pro 12.9"', listprice: 1099.99, revendedorsPrice: 950.00, codigoProvider: 'APL-001', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-023', description: 'iPhone 15 Pro Max', listprice: 1199.99, revendedorsPrice: 1050.00, codigoProvider: 'APL-002', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-024', description: 'Samsung Galaxy S24 Ultra', listprice: 1299.99, revendedorsPrice: 1120.00, codigoProvider: 'SAM-004', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-025', description: 'MacBook Pro 16" M3', listprice: 2499.99, revendedorsPrice: 2200.00, codigoProvider: 'APL-003', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-026', description: 'Impresora HP LaserJet Pro', listprice: 399.99, revendedorsPrice: 340.00, codigoProvider: 'HP-001', descriptionProvider: 'HP Inc.' },
    { codigoAsy: 'ASY-027', description: 'Scanner Epson V600', listprice: 229.99, revendedorsPrice: 195.00, codigoProvider: 'EPS-001', descriptionProvider: 'Seiko Epson' },
    { codigoAsy: 'ASY-028', description: 'Proyector BenQ 4K', listprice: 1499.99, revendedorsPrice: 1280.00, codigoProvider: 'BNQ-001', descriptionProvider: 'BenQ Corporation' },
    { codigoAsy: 'ASY-029', description: 'Silla Gamer Secretlab Titan', listprice: 449.99, revendedorsPrice: 380.00, codigoProvider: 'SEC-001', descriptionProvider: 'Secretlab' },
    { codigoAsy: 'ASY-030', description: 'Escritorio Ajustable Standing Desk', listprice: 599.99, revendedorsPrice: 510.00, codigoProvider: 'FLX-001', descriptionProvider: 'FlexiSpot' },
    { codigoAsy: 'ASY-031', description: 'Micrófono Blue Yeti', listprice: 129.99, revendedorsPrice: 108.00, codigoProvider: 'BLU-001', descriptionProvider: 'Blue Microphones' },
    { codigoAsy: 'ASY-032', description: 'Stream Deck Elgato', listprice: 149.99, revendedorsPrice: 125.00, codigoProvider: 'ELG-001', descriptionProvider: 'Elgato Systems' },
    { codigoAsy: 'ASY-033', description: 'Luz LED Ring Light', listprice: 49.99, revendedorsPrice: 38.00, codigoProvider: 'GEN-002', descriptionProvider: 'Generic Lighting' },
    { codigoAsy: 'ASY-034', description: 'Green Screen Elgato', listprice: 159.99, revendedorsPrice: 135.00, codigoProvider: 'ELG-002', descriptionProvider: 'Elgato Systems' },
    { codigoAsy: 'ASY-035', description: 'Capture Card Elgato HD60 S+', listprice: 179.99, revendedorsPrice: 152.00, codigoProvider: 'ELG-003', descriptionProvider: 'Elgato Systems' },
    { codigoAsy: 'ASY-036', description: 'Control Xbox Series X', listprice: 59.99, revendedorsPrice: 48.00, codigoProvider: 'MSF-001', descriptionProvider: 'Microsoft Corporation' },
    { codigoAsy: 'ASY-037', description: 'Control PlayStation 5 DualSense', listprice: 69.99, revendedorsPrice: 58.00, codigoProvider: 'SONY-002', descriptionProvider: 'Sony Corporation' },
    { codigoAsy: 'ASY-038', description: 'Nintendo Switch OLED', listprice: 349.99, revendedorsPrice: 295.00, codigoProvider: 'NIN-001', descriptionProvider: 'Nintendo Co., Ltd.' },
    { codigoAsy: 'ASY-039', description: 'PlayStation 5 Digital', listprice: 449.99, revendedorsPrice: 390.00, codigoProvider: 'SONY-003', descriptionProvider: 'Sony Corporation' },
    { codigoAsy: 'ASY-040', description: 'Xbox Series X', listprice: 499.99, revendedorsPrice: 430.00, codigoProvider: 'MSF-002', descriptionProvider: 'Microsoft Corporation' },
    { codigoAsy: 'ASY-041', description: 'Procesador AMD Ryzen 9 7950X', listprice: 549.99, revendedorsPrice: 470.00, codigoProvider: 'AMD-001', descriptionProvider: 'Advanced Micro Devices' },
    { codigoAsy: 'ASY-042', description: 'Tarjeta Gráfica AMD RX 7900 XTX', listprice: 999.99, revendedorsPrice: 870.00, codigoProvider: 'AMD-002', descriptionProvider: 'Advanced Micro Devices' },
    { codigoAsy: 'ASY-043', description: 'Monitor LG UltraGear 32"', listprice: 449.99, revendedorsPrice: 385.00, codigoProvider: 'LG-001', descriptionProvider: 'LG Electronics' },
    { codigoAsy: 'ASY-044', description: 'TV LG OLED 55"', listprice: 1299.99, revendedorsPrice: 1120.00, codigoProvider: 'LG-002', descriptionProvider: 'LG Electronics' },
    { codigoAsy: 'ASY-045', description: 'Soundbar Samsung Q990C', listprice: 1799.99, revendedorsPrice: 1550.00, codigoProvider: 'SAM-005', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-046', description: 'Parlantes Bose Companion 50', listprice: 249.99, revendedorsPrice: 210.00, codigoProvider: 'BOSE-001', descriptionProvider: 'Bose Corporation' },
    { codigoAsy: 'ASY-047', description: 'Auriculares Bose QuietComfort', listprice: 349.99, revendedorsPrice: 295.00, codigoProvider: 'BOSE-002', descriptionProvider: 'Bose Corporation' },
    { codigoAsy: 'ASY-048', description: 'AirPods Pro 2', listprice: 249.99, revendedorsPrice: 215.00, codigoProvider: 'APL-004', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-049', description: 'Apple Watch Series 9', listprice: 399.99, revendedorsPrice: 345.00, codigoProvider: 'APL-005', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-050', description: 'Samsung Galaxy Watch 6', listprice: 329.99, revendedorsPrice: 280.00, codigoProvider: 'SAM-006', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-051', description: 'Fitbit Charge 6', listprice: 159.99, revendedorsPrice: 135.00, codigoProvider: 'FIT-001', descriptionProvider: 'Fitbit Inc.' },
    { codigoAsy: 'ASY-052', description: 'GoPro Hero 12 Black', listprice: 399.99, revendedorsPrice: 340.00, codigoProvider: 'GPR-001', descriptionProvider: 'GoPro Inc.' },
    { codigoAsy: 'ASY-053', description: 'DJI Mini 4 Pro', listprice: 759.99, revendedorsPrice: 650.00, codigoProvider: 'DJI-001', descriptionProvider: 'DJI Technology' },
    { codigoAsy: 'ASY-054', description: 'Canon EOS R6 Mark II', listprice: 2499.99, revendedorsPrice: 2150.00, codigoProvider: 'CAN-001', descriptionProvider: 'Canon Inc.' },
    { codigoAsy: 'ASY-055', description: 'Sony Alpha A7 IV', listprice: 2499.99, revendedorsPrice: 2150.00, codigoProvider: 'SONY-004', descriptionProvider: 'Sony Corporation' },
    { codigoAsy: 'ASY-056', description: 'Lente Canon RF 24-70mm', listprice: 1099.99, revendedorsPrice: 950.00, codigoProvider: 'CAN-002', descriptionProvider: 'Canon Inc.' },
    { codigoAsy: 'ASY-057', description: 'Trípode Manfrotto BeFree', listprice: 199.99, revendedorsPrice: 170.00, codigoProvider: 'MAN-001', descriptionProvider: 'Manfrotto' },
    { codigoAsy: 'ASY-058', description: 'Tarjeta SD SanDisk Extreme 256GB', listprice: 39.99, revendedorsPrice: 32.00, codigoProvider: 'SAN-001', descriptionProvider: 'SanDisk' },
    { codigoAsy: 'ASY-059', description: 'NAS Synology DS923+', listprice: 599.99, revendedorsPrice: 510.00, codigoProvider: 'SYN-001', descriptionProvider: 'Synology Inc.' },
    { codigoAsy: 'ASY-060', description: 'Servidor Dell PowerEdge', listprice: 2999.99, revendedorsPrice: 2600.00, codigoProvider: 'DELL-002', descriptionProvider: 'Dell Technologies' },
    { codigoAsy: 'ASY-061', description: 'Rack de Servidores 42U', listprice: 899.99, revendedorsPrice: 770.00, codigoProvider: 'GEN-003', descriptionProvider: 'Generic Server Equipment' },
    { codigoAsy: 'ASY-062', description: 'Cable Ethernet Cat6 30m', listprice: 39.99, revendedorsPrice: 30.00, codigoProvider: 'GEN-004', descriptionProvider: 'Generic Cables' },
    { codigoAsy: 'ASY-063', description: 'Patch Panel 24 Puertos', listprice: 79.99, revendedorsPrice: 65.00, codigoProvider: 'GEN-005', descriptionProvider: 'Generic Network' },
    { codigoAsy: 'ASY-064', description: 'Access Point Ubiquiti UniFi 6', listprice: 179.99, revendedorsPrice: 152.00, codigoProvider: 'UBI-001', descriptionProvider: 'Ubiquiti Inc.' },
    { codigoAsy: 'ASY-065', description: 'Firewall Fortinet FortiGate', listprice: 999.99, revendedorsPrice: 860.00, codigoProvider: 'FRT-001', descriptionProvider: 'Fortinet Inc.' },
    { codigoAsy: 'ASY-066', description: 'Cámara de Seguridad Ring', listprice: 99.99, revendedorsPrice: 82.00, codigoProvider: 'RNG-001', descriptionProvider: 'Ring LLC' },
    { codigoAsy: 'ASY-067', description: 'Timbre Inteligente Ring Video', listprice: 149.99, revendedorsPrice: 125.00, codigoProvider: 'RNG-002', descriptionProvider: 'Ring LLC' },
    { codigoAsy: 'ASY-068', description: 'Cerradura Inteligente August', listprice: 229.99, revendedorsPrice: 195.00, codigoProvider: 'AUG-001', descriptionProvider: 'August Home' },
    { codigoAsy: 'ASY-069', description: 'Termostato Nest Learning', listprice: 249.99, revendedorsPrice: 215.00, codigoProvider: 'GOO-001', descriptionProvider: 'Google LLC' },
    { codigoAsy: 'ASY-070', description: 'Google Nest Hub Max', listprice: 229.99, revendedorsPrice: 195.00, codigoProvider: 'GOO-002', descriptionProvider: 'Google LLC' },
    { codigoAsy: 'ASY-071', description: 'Amazon Echo Show 10', listprice: 249.99, revendedorsPrice: 215.00, codigoProvider: 'AMZ-001', descriptionProvider: 'Amazon.com Inc.' },
    { codigoAsy: 'ASY-072', description: 'Amazon Fire TV Stick 4K Max', listprice: 54.99, revendedorsPrice: 45.00, codigoProvider: 'AMZ-002', descriptionProvider: 'Amazon.com Inc.' },
    { codigoAsy: 'ASY-073', description: 'Chromecast con Google TV', listprice: 49.99, revendedorsPrice: 40.00, codigoProvider: 'GOO-003', descriptionProvider: 'Google LLC' },
    { codigoAsy: 'ASY-074', description: 'Apple TV 4K', listprice: 179.99, revendedorsPrice: 155.00, codigoProvider: 'APL-006', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-075', description: 'Roku Ultra', listprice: 99.99, revendedorsPrice: 85.00, codigoProvider: 'ROK-001', descriptionProvider: 'Roku Inc.' },
    { codigoAsy: 'ASY-076', description: 'Aspiradora Robot iRobot Roomba', listprice: 549.99, revendedorsPrice: 470.00, codigoProvider: 'IRB-001', descriptionProvider: 'iRobot Corporation' },
    { codigoAsy: 'ASY-077', description: 'Purificador de Aire Dyson', listprice: 549.99, revendedorsPrice: 470.00, codigoProvider: 'DYS-001', descriptionProvider: 'Dyson Ltd.' },
    { codigoAsy: 'ASY-078', description: 'Aspiradora Dyson V15', listprice: 749.99, revendedorsPrice: 640.00, codigoProvider: 'DYS-002', descriptionProvider: 'Dyson Ltd.' },
    { codigoAsy: 'ASY-079', description: 'Cafetera Nespresso Vertuo', listprice: 199.99, revendedorsPrice: 170.00, codigoProvider: 'NES-001', descriptionProvider: 'Nestlé Nespresso' },
    { codigoAsy: 'ASY-080', description: 'Licuadora Vitamix E310', listprice: 349.99, revendedorsPrice: 295.00, codigoProvider: 'VIT-001', descriptionProvider: 'Vitamix Corporation' },
    { codigoAsy: 'ASY-081', description: 'Teclado Apple Magic Keyboard', listprice: 99.99, revendedorsPrice: 85.00, codigoProvider: 'APL-007', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-082', description: 'Mouse Apple Magic Mouse', listprice: 99.99, revendedorsPrice: 85.00, codigoProvider: 'APL-008', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-083', description: 'Trackpad Apple Magic', listprice: 129.99, revendedorsPrice: 110.00, codigoProvider: 'APL-009', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-084', description: 'Cargador MagSafe Apple', listprice: 39.99, revendedorsPrice: 32.00, codigoProvider: 'APL-010', descriptionProvider: 'Apple Inc.' },
    { codigoAsy: 'ASY-085', description: 'Power Bank Anker 26800mAh', listprice: 65.99, revendedorsPrice: 55.00, codigoProvider: 'ANK-002', descriptionProvider: 'Anker Innovations' },
    { codigoAsy: 'ASY-086', description: 'Cargador Rápido Anker 65W', listprice: 45.99, revendedorsPrice: 38.00, codigoProvider: 'ANK-003', descriptionProvider: 'Anker Innovations' },
    { codigoAsy: 'ASY-087', description: 'Cable USB-C Anker 2m', listprice: 19.99, revendedorsPrice: 15.00, codigoProvider: 'ANK-004', descriptionProvider: 'Anker Innovations' },
    { codigoAsy: 'ASY-088', description: 'Soporte Monitor AmazonBasics', listprice: 24.99, revendedorsPrice: 20.00, codigoProvider: 'AMZ-003', descriptionProvider: 'Amazon.com Inc.' },
    { codigoAsy: 'ASY-089', description: 'Alfombrilla Mouse XL Gaming', listprice: 29.99, revendedorsPrice: 24.00, codigoProvider: 'GEN-006', descriptionProvider: 'Generic Gaming' },
    { codigoAsy: 'ASY-090', description: 'Soporte Laptop Adjustable', listprice: 39.99, revendedorsPrice: 32.00, codigoProvider: 'GEN-007', descriptionProvider: 'Generic Accessories' },
    { codigoAsy: 'ASY-091', description: 'Memoria USB Kingston 128GB', listprice: 14.99, revendedorsPrice: 11.00, codigoProvider: 'KIN-001', descriptionProvider: 'Kingston Technology' },
    { codigoAsy: 'ASY-092', description: 'Disco Externo Seagate 2TB', listprice: 79.99, revendedorsPrice: 65.00, codigoProvider: 'SEA-001', descriptionProvider: 'Seagate Technology' },
    { codigoAsy: 'ASY-093', description: 'Disco SSD Externo Samsung T7', listprice: 119.99, revendedorsPrice: 100.00, codigoProvider: 'SAM-007', descriptionProvider: 'Samsung Electronics' },
    { codigoAsy: 'ASY-094', description: 'Adaptador USB-C a HDMI', listprice: 24.99, revendedorsPrice: 20.00, codigoProvider: 'GEN-008', descriptionProvider: 'Generic Adapters' },
    { codigoAsy: 'ASY-095', description: 'Lector de Tarjetas SD USB-C', listprice: 19.99, revendedorsPrice: 15.00, codigoProvider: 'GEN-009', descriptionProvider: 'Generic Readers' },
    { codigoAsy: 'ASY-096', description: 'Ventilador USB Portátil', listprice: 14.99, revendedorsPrice: 11.00, codigoProvider: 'GEN-010', descriptionProvider: 'Generic Fans' },
    { codigoAsy: 'ASY-097', description: 'Lámpara LED de Escritorio', listprice: 49.99, revendedorsPrice: 40.00, codigoProvider: 'GEN-011', descriptionProvider: 'Generic Lighting' },
    { codigoAsy: 'ASY-098', description: 'Organizador de Cables', listprice: 12.99, revendedorsPrice: 9.00, codigoProvider: 'GEN-012', descriptionProvider: 'Generic Organizers' },
    { codigoAsy: 'ASY-099', description: 'Filtro de Pantalla Privacidad', listprice: 34.99, revendedorsPrice: 28.00, codigoProvider: 'GEN-013', descriptionProvider: 'Generic Filters' },
    { codigoAsy: 'ASY-100', description: 'Kit Limpieza para Pantallas', listprice: 9.99, revendedorsPrice: 7.00, codigoProvider: 'GEN-014', descriptionProvider: 'Generic Cleaning' },
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: article,
    });
  }

  console.log(`✅ Successfully created ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
