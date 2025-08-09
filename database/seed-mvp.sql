-- BARPLAS Portal - Datos de ejemplo para MVP
-- Ejecutar después del schema principal

BEGIN;

-- 1. COMERCIAL DE PRUEBA (Usuario administrador)
INSERT INTO comerciales (id, email, nombre, activo) VALUES 
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'comercial@barplas.com', 'Carlos Mendoza - Comercial BARPLAS', true);

-- 2. PRODUCTOS REALISTAS DE BARPLAS (Productos plásticos industriales)
INSERT INTO productos (sku, nombre, descripcion, precio, url_imagen, activo) VALUES 

-- CONTENEDORES Y CAJAS
('BAR-CNT-001', 'Caja Plástica Apilable 60x40x32cm', 'Caja resistente para almacenamiento y transporte. Capacidad 60L. Material PP reciclado.', 18.50, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-CNT-002', 'Contenedor Industrial 80x60x42cm', 'Contenedor de alta resistencia. Ideal para logística. Capacidad 120L.', 32.75, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop', true),
('BAR-CNT-003', 'Caja Eurobox 40x30x22cm', 'Caja estándar europeo para almacén. Apilable y anidable.', 12.90, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', true),
('BAR-CNT-004', 'Bandeja Plástica Perforada 60x40cm', 'Bandeja con perforaciones para ventilación. Ideal frutas y verduras.', 8.25, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-CNT-005', 'Contenedor con Tapa 50x30x35cm', 'Contenedor hermético con tapa de bisagra. Protección total.', 24.60, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop', true),

-- PALETS Y PLATAFORMAS
('BAR-PAL-001', 'Palet Plástico 120x80cm Ligero', 'Palet de polietileno. Peso: 12kg. Carga dinámica: 1200kg.', 45.80, 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&h=400&fit=crop', true),
('BAR-PAL-002', 'Palet Europeo 120x80cm Reforzado', 'Palet reforzado para uso intensivo. Carga estática: 4000kg.', 62.30, 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&h=400&fit=crop', true),
('BAR-PAL-003', 'Media Palet 80x60cm', 'Palet de dimensión media. Ideal para espacios reducidos.', 28.75, 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&h=400&fit=crop', true),
('BAR-PAL-004', 'Palet Display 60x40cm', 'Palet de exhibición para puntos de venta. Liviano y resistente.', 19.95, 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?w=400&h=400&fit=crop', true),

-- BIDONES Y CONTENEDORES LÍQUIDOS
('BAR-BID-001', 'Bidón 25L con Grifo', 'Bidón alimentario con grifo dosificador. Ideal para líquidos.', 15.40, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', true),
('BAR-BID-002', 'Contenedor IBC 1000L', 'Contenedor industrial para líquidos. Con palet integrado.', 285.00, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', true),
('BAR-BID-003', 'Bidón Apilable 20L', 'Bidón rectangular apilable. Ahorra espacio de almacenamiento.', 12.80, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', true),
('BAR-BID-004', 'Tanque Cilíndrico 200L', 'Tanque vertical para almacenamiento. Con tapa roscada.', 68.50, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', true),

-- CUBOS Y PAPELERAS
('BAR-CUB-001', 'Cubo Basura 120L con Ruedas', 'Contenedor de residuos con ruedas y tapa. Para uso exterior.', 42.90, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', true),
('BAR-CUB-002', 'Papelera Oficina 25L', 'Papelera elegante para oficinas. Sin tapa, fácil vaciado.', 8.75, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', true),
('BAR-CUB-003', 'Cubo Industrial 80L', 'Cubo resistente para uso industrial. Con asas reforzadas.', 18.60, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', true),
('BAR-CUB-004', 'Contenedor Reciclaje 50L', 'Contenedor con símbolo de reciclaje. Varios colores disponibles.', 16.25, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', true),

-- ACCESORIOS Y COMPLEMENTOS
('BAR-ACC-001', 'Tapa para Caja 60x40cm', 'Tapa resistente para cajas apilables. Con sistema de clip.', 4.20, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-ACC-002', 'Divisor para Caja Eurobox', 'Divisor ajustable para organizar contenido de cajas.', 2.85, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-ACC-003', 'Ruedas Giratorias para Contenedor', 'Set de 4 ruedas de 100mm. Con freno. Carga máx: 200kg.', 24.50, 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=400&fit=crop', true),
('BAR-ACC-004', 'Etiquetas Identificación 100 unidades', 'Etiquetas adhesivas resistentes para identificar contenedores.', 6.90, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),

-- PRODUCTOS ESPECIALIZADOS
('BAR-ESP-001', 'Bandeja Antiestática ESD', 'Bandeja conductiva para componentes electrónicos sensibles.', 34.80, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-ESP-002', 'Contenedor Isotérmico 40L', 'Contenedor aislante para transporte de alimentos. 6h frío.', 89.50, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=400&fit=crop', true),
('BAR-ESP-003', 'Caja Archivo A4 con Tapa', 'Caja para documentos formato A4. Resistente a la humedad.', 7.40, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true),
('BAR-ESP-004', 'Soporte Apilable para Botellas', 'Rack modular para almacenar botellas de 1.5L. Apilable.', 13.20, 'https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&h=400&fit=crop', true);

-- 3. CLIENTES DE EJEMPLO (Diferentes sectores)
INSERT INTO clientes (id, comercial_id, nombre, email, telefono, direccion, activo) VALUES 

-- Cliente 1: Restaurante
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
 'Restaurante El Buen Sabor', 'pedidos@restaurantebuensabor.com', '+34 91 234 5678', 
 'Calle Mayor 123, 28013 Madrid', true),

-- Cliente 2: Supermercado
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
 'Supermercado FreshMart', 'compras@freshmart.es', '+34 93 567 8901', 
 'Avenida Diagonal 456, 08029 Barcelona', true),

-- Cliente 3: Almacén logístico
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
 'LogiCenter Valencia', 'operaciones@logicenter.com', '+34 96 789 0123', 
 'Polígono Industrial Sur, Nave 15, Valencia', true),

-- Cliente 4: Oficina corporativa
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
 'TechCorp Solutions', 'facilities@techcorp.com', '+34 95 456 7890', 
 'Parque Tecnológico, Edificio A, Sevilla', true),

-- Cliente 5: Fábrica alimentaria
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 
 'Industrias Alimentarias SUR', 'compras@iasur.com', '+34 92 345 6789', 
 'Carretera A-4 Km 547, Córdoba', true);

-- 4. CATÁLOGOS PERSONALIZADOS POR CLIENTE

-- Restaurante: Productos para cocina y almacenamiento de alimentos
INSERT INTO catalogos_clientes (cliente_id, producto_id) 
SELECT 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', p.id 
FROM productos p 
WHERE p.sku IN ('BAR-CNT-001', 'BAR-CNT-004', 'BAR-CNT-005', 'BAR-BID-001', 'BAR-BID-003', 'BAR-CUB-002', 'BAR-ESP-002', 'BAR-ESP-004');

-- Supermercado: Variedad amplia para diferentes secciones
INSERT INTO catalogos_clientes (cliente_id, producto_id) 
SELECT 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', p.id 
FROM productos p 
WHERE p.sku IN ('BAR-CNT-001', 'BAR-CNT-002', 'BAR-CNT-003', 'BAR-CNT-004', 'BAR-PAL-001', 'BAR-PAL-004', 'BAR-CUB-001', 'BAR-CUB-004', 'BAR-ACC-001', 'BAR-ACC-004');

-- Almacén logístico: Productos industriales pesados
INSERT INTO catalogos_clientes (cliente_id, producto_id) 
SELECT 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', p.id 
FROM productos p 
WHERE p.sku IN ('BAR-CNT-002', 'BAR-CNT-005', 'BAR-PAL-001', 'BAR-PAL-002', 'BAR-PAL-003', 'BAR-BID-002', 'BAR-BID-004', 'BAR-CUB-003', 'BAR-ACC-003');

-- Oficina: Productos de oficina y reciclaje
INSERT INTO catalogos_clientes (cliente_id, producto_id) 
SELECT 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', p.id 
FROM productos p 
WHERE p.sku IN ('BAR-CNT-003', 'BAR-CUB-002', 'BAR-CUB-004', 'BAR-ESP-003', 'BAR-ACC-002', 'BAR-ACC-004');

-- Fábrica alimentaria: Productos grado alimentario y contenedores especiales
INSERT INTO catalogos_clientes (cliente_id, producto_id) 
SELECT 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', p.id 
FROM productos p 
WHERE p.sku IN ('BAR-CNT-004', 'BAR-CNT-005', 'BAR-PAL-001', 'BAR-BID-001', 'BAR-BID-003', 'BAR-CUB-003', 'BAR-ESP-002', 'BAR-ACC-001');

-- 5. PEDIDOS DE EJEMPLO (Para mostrar historial)

-- Pedido del restaurante
INSERT INTO pedidos (id, cliente_id, estado, total, notas, fecha_pedido) VALUES 
('11eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'entregado', 89.45, 'Entrega en horario de mañana', NOW() - INTERVAL '5 days');

-- Items del pedido del restaurante
INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal) 
SELECT '11eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 2, p.precio, (2 * p.precio)
FROM productos p WHERE p.sku = 'BAR-CNT-001'
UNION ALL
SELECT '11eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 3, p.precio, (3 * p.precio)
FROM productos p WHERE p.sku = 'BAR-BID-001'
UNION ALL
SELECT '11eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 1, p.precio, (1 * p.precio)
FROM productos p WHERE p.sku = 'BAR-ESP-002';

-- Pedido del supermercado (pendiente)
INSERT INTO pedidos (id, cliente_id, estado, total, notas, fecha_pedido) VALUES 
('22eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'confirmado', 156.75, 'Urgente para fin de semana', NOW() - INTERVAL '2 days');

-- Items del pedido del supermercado
INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal) 
SELECT '22eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 5, p.precio, (5 * p.precio)
FROM productos p WHERE p.sku = 'BAR-CNT-003'
UNION ALL
SELECT '22eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 2, p.precio, (2 * p.precio)
FROM productos p WHERE p.sku = 'BAR-PAL-001'
UNION ALL
SELECT '22eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 1, p.precio, (1 * p.precio)
FROM productos p WHERE p.sku = 'BAR-CUB-001';

-- Pedido reciente del almacén logístico
INSERT INTO pedidos (id, cliente_id, estado, total, notas, fecha_pedido) VALUES 
('33eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'pendiente', 724.30, 'Necesario para nueva línea de producción', NOW() - INTERVAL '1 hour');

-- Items del pedido del almacén
INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario, subtotal) 
SELECT '33eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 10, p.precio, (10 * p.precio)
FROM productos p WHERE p.sku = 'BAR-PAL-002'
UNION ALL
SELECT '33eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 3, p.precio, (3 * p.precio)
FROM productos p WHERE p.sku = 'BAR-CNT-002'
UNION ALL
SELECT '33eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid, p.id, 1, p.precio, (1 * p.precio)
FROM productos p WHERE p.sku = 'BAR-BID-002';

COMMIT;

-- Verificación de datos insertados
SELECT 'Comerciales insertados:' as tabla, COUNT(*) as cantidad FROM comerciales
UNION ALL
SELECT 'Productos insertados:', COUNT(*) FROM productos
UNION ALL
SELECT 'Clientes insertados:', COUNT(*) FROM clientes
UNION ALL
SELECT 'Relaciones catálogo creadas:', COUNT(*) FROM catalogos_clientes
UNION ALL
SELECT 'Pedidos de ejemplo:', COUNT(*) FROM pedidos
UNION ALL
SELECT 'Items de pedido:', COUNT(*) FROM pedido_items;