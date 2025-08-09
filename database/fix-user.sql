-- BARPLAS Portal - Ajuste de usuario administrador
-- Ejecutar este script en Supabase SQL Editor

BEGIN;

-- Paso 1: Insertar el nuevo comercial con el ID correcto de Auth
INSERT INTO comerciales (id, email, nombre, activo) VALUES 
('dc5f9151-3035-440a-b1da-146f0df20eed'::uuid, 'javvv.6@gmail.com', 'Comercial BARPLAS - javvv.6@gmail.com', true)
ON CONFLICT (id) DO UPDATE SET
    email = 'javvv.6@gmail.com',
    nombre = 'Comercial BARPLAS - javvv.6@gmail.com';

-- Paso 2: Actualizar todos los clientes para que apunten al nuevo comercial
UPDATE clientes 
SET comercial_id = 'dc5f9151-3035-440a-b1da-146f0df20eed'::uuid
WHERE comercial_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid;

-- Paso 3: Eliminar el comercial antiguo
DELETE FROM comerciales 
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'::uuid;

-- Verificación final
SELECT 
    'Configuración actualizada:' as status,
    c.id,
    c.email,
    c.nombre,
    COUNT(cl.id) as clientes_asignados
FROM comerciales c
LEFT JOIN clientes cl ON c.id = cl.comercial_id
WHERE c.email = 'javvv.6@gmail.com'
GROUP BY c.id, c.email, c.nombre;

COMMIT;