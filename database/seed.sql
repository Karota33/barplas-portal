-- BARPLAS Portal - Seed Data
-- Ejecutar después del schema.sql en Supabase SQL Editor

BEGIN;

-- Insertar productos desde productos.json
INSERT INTO productos (sku, nombre, precio, url_imagen) VALUES
('BAR-ALU-R27', 'Envase de Aluminio R-27', 0.45, 'https://barplascanarias.com/wp-content/uploads/2019/07/ENVASES-DE-ALUMINIO.jpg'),
('BAR-FILM-M23', 'Film Extensible Manual 23 Micras', 12.50, 'https://barplascanarias.com/wp-content/uploads/2019/07/FILM-EXTENSIBLE-MANUAL.jpg'),
('BAR-BOLS-PAP-ASA', 'Bolsas de Papel con Asa', 0.30, 'https://barplascanarias.com/wp-content/uploads/2019/07/BOLSAS-DE-PAPEL-CON-ASA-PLANA-O-RIZADA.jpg');

-- Insertar productos adicionales para demostración
INSERT INTO productos (sku, nombre, precio, url_imagen, descripcion) VALUES
('BAR-SERV-BCO-250', 'Servilletas Blancas 250 uds', 3.50, 'https://barplascanarias.com/wp-content/uploads/2019/07/SERVILLETAS.jpg', 'Servilletas de papel blanco, pack de 250 unidades'),
('BAR-VASO-PLAST-500', 'Vasos Plástico Transparente 500ml', 0.08, 'https://barplascanarias.com/wp-content/uploads/2019/07/VASOS-PLASTICO.jpg', 'Vasos de plástico transparente 500ml'),
('BAR-PLATO-CART-20CM', 'Platos de Cartón 20cm', 0.15, 'https://barplascanarias.com/wp-content/uploads/2019/07/PLATOS-CARTON.jpg', 'Platos de cartón biodegradables 20cm diámetro'),
('BAR-CUBIT-PLAST-SET', 'Cubiertos Plástico Set Completo', 0.12, 'https://barplascanarias.com/wp-content/uploads/2019/07/CUBIERTOS-PLASTICO.jpg', 'Set completo: tenedor, cuchillo, cuchara'),
('BAR-BOLS-COMPOST-1L', 'Bolsas Compostables 1L', 0.25, 'https://barplascanarias.com/wp-content/uploads/2019/07/BOLSAS-COMPOSTABLES.jpg', 'Bolsas biodegradables para residuos orgánicos'),
('BAR-FILM-ALUMINIO-30M', 'Film de Aluminio 30 metros', 8.90, 'https://barplascanarias.com/wp-content/uploads/2019/07/FILM-ALUMINIO.jpg', 'Rollo de papel aluminio de 30 metros'),
('BAR-MANT-PLAST-120', 'Manteles Plástico 120x180cm', 2.40, 'https://barplascanarias.com/wp-content/uploads/2019/07/MANTELES-PLASTICO.jpg', 'Manteles de plástico desechables');

-- Insertar comercial de prueba (NOTA: En producción esto se hará a través de Supabase Auth)
-- Este comercial debe coincidir con un usuario creado en Supabase Auth
-- Reemplazar 'user-uuid-here' con el UUID real del usuario de Supabase Auth
/*
INSERT INTO comerciales (id, email, nombre) VALUES
('user-uuid-here', 'comercial@barplas.com', 'Juan Pérez');
*/

-- Insertar clientes de prueba (descomenta después de crear el comercial)
/*
INSERT INTO clientes (comercial_id, nombre, email, telefono, direccion) VALUES
('user-uuid-here', 'Restaurante La Esquina', 'laesquina@email.com', '928123456', 'Calle Mayor 123, Las Palmas'),
('user-uuid-here', 'Cafetería Central', 'central@email.com', '928234567', 'Plaza Central 45, Las Palmas'),
('user-uuid-here', 'Bar Los Amigos', 'amigos@email.com', '928345678', 'Avenida Atlántica 78, Las Palmas');
*/

-- Configurar catálogos de ejemplo (descomenta después de crear clientes)
/*
-- Catálogo para Restaurante La Esquina (productos para restaurante)
INSERT INTO catalogos_clientes (cliente_id, producto_id)
SELECT c.id, p.id 
FROM clientes c, productos p 
WHERE c.nombre = 'Restaurante La Esquina' 
AND p.sku IN ('BAR-ALU-R27', 'BAR-FILM-M23', 'BAR-SERV-BCO-250', 'BAR-PLATO-CART-20CM', 'BAR-CUBIT-PLAST-SET');

-- Catálogo para Cafetería Central (productos para cafetería)
INSERT INTO catalogos_clientes (cliente_id, producto_id)
SELECT c.id, p.id 
FROM clientes c, productos p 
WHERE c.nombre = 'Cafetería Central' 
AND p.sku IN ('BAR-VASO-PLAST-500', 'BAR-SERV-BCO-250', 'BAR-BOLS-PAP-ASA', 'BAR-CUBIT-PLAST-SET');

-- Catálogo para Bar Los Amigos (productos para bar)
INSERT INTO catalogos_clientes (cliente_id, producto_id)
SELECT c.id, p.id 
FROM clientes c, productos p 
WHERE c.nombre = 'Bar Los Amigos' 
AND p.sku IN ('BAR-VASO-PLAST-500', 'BAR-SERV-BCO-250', 'BAR-BOLS-COMPOST-1L', 'BAR-MANT-PLAST-120');
*/

COMMIT;

-- Instrucciones para completar el setup:
/*
1. Crear usuario en Supabase Auth con email: comercial@barplas.com
2. Obtener el UUID del usuario creado
3. Descomenta las secciones marcadas y reemplaza 'user-uuid-here' con el UUID real
4. Ejecuta las inserciones de comerciales, clientes y catálogos
*/