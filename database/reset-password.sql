-- Reset password directamente en Supabase
-- IMPORTANTE: Solo para desarrollo/testing

-- Opción 1: Verificar el usuario existe
SELECT id, email, email_confirmed_at, encrypted_password 
FROM auth.users 
WHERE email = 'javvv.6@gmail.com';

-- Opción 2: Si necesita forzar confirmación de email
UPDATE auth.users 
SET email_confirmed_at = NOW(),
    confirmation_token = NULL,
    confirmation_sent_at = NULL
WHERE email = 'javvv.6@gmail.com';

-- Verificar el cambio
SELECT id, email, email_confirmed_at 
FROM auth.users 
WHERE email = 'javvv.6@gmail.com';