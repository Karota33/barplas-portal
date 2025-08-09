-- BARPLAS Portal - Actualizar usuario de prueba
-- Ejecutar en Supabase SQL Editor

BEGIN;

-- Insertar/actualizar comercial con el UUID real del usuario test@barplas.com
INSERT INTO comerciales (id, email, nombre, activo) VALUES 
('fbf60cdb-f661-4da5-812d-361c26997f75'::uuid, 'test@barplas.com', 'Test User BARPLAS', true)
ON CONFLICT (id) DO UPDATE SET
    email = 'test@barplas.com',
    nombre = 'Test User BARPLAS';

-- Actualizar todos los clientes para que apunten al nuevo comercial
UPDATE clientes 
SET comercial_id = 'fbf60cdb-f661-4da5-812d-361c26997f75'::uuid
WHERE comercial_id = 'dc5f9151-3035-440a-b1da-146f0df20eed'::uuid;

-- Eliminar comercial anterior si existe
DELETE FROM comerciales 
WHERE id = 'dc5f9151-3035-440a-b1da-146f0df20eed'::uuid;

-- Verificar resultado
SELECT 
    'Usuario actualizado correctamente:' as status,
    c.id,
    c.email,
    c.nombre,
    COUNT(cl.id) as clientes_asignados
FROM comerciales c
LEFT JOIN clientes cl ON c.id = cl.comercial_id
WHERE c.email = 'test@barplas.com'
GROUP BY c.id, c.email, c.nombre;

COMMIT;