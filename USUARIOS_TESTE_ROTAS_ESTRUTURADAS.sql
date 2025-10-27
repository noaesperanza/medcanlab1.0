-- USUÁRIOS DE TESTE PARA ROTAS ESTRUTURADAS
-- Execute este script no Supabase SQL Editor

-- 1. Usuário Admin (já existe, mas vamos garantir que está correto)
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb),
        '{type}', 
        '"admin"'::jsonb
    ),
    '{name}', 
    '"Dr. Ricardo Valença"'::jsonb
)
WHERE email LIKE '%ricardo%' OR email LIKE '%rrvlenca%' OR email LIKE '%profrvalenca%';

-- 2. Usuário Profissional - Clínica
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'profissional.clinica@medcannlab.com',
    crypt('clinica123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "professional", "name": "Dr. Ana Silva", "crm": "12345", "cro": "67890"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "professional", "name": "Dr. Ana Silva", "crm": "12345", "cro": "67890"}'::jsonb;

-- 3. Usuário Paciente - Clínica
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'paciente.clinica@medcannlab.com',
    crypt('paciente123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "patient", "name": "Maria Santos", "cpf": "123.456.789-00"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "patient", "name": "Maria Santos", "cpf": "123.456.789-00"}'::jsonb;

-- 4. Usuário Profissional - Ensino
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'profissional.ensino@medcannlab.com',
    crypt('ensino123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "professional", "name": "Dr. Carlos Mendes", "crm": "54321", "cro": "09876"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "professional", "name": "Dr. Carlos Mendes", "crm": "54321", "cro": "09876"}'::jsonb;

-- 5. Usuário Aluno - Ensino
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'aluno.ensino@medcannlab.com',
    crypt('aluno123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "aluno", "name": "João Oliveira", "matricula": "2024001"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "aluno", "name": "João Oliveira", "matricula": "2024001"}'::jsonb;

-- 6. Usuário Profissional - Pesquisa
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'profissional.pesquisa@medcannlab.com',
    crypt('pesquisa123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "professional", "name": "Dra. Fernanda Costa", "crm": "98765", "cro": "43210"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "professional", "name": "Dra. Fernanda Costa", "crm": "98765", "cro": "43210"}'::jsonb;

-- 7. Usuário Aluno - Pesquisa
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_user_meta_data
) VALUES (
    gen_random_uuid(),
    'aluno.pesquisa@medcannlab.com',
    crypt('pesquisa123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"type": "aluno", "name": "Pedro Almeida", "matricula": "2024002"}'::jsonb
) ON CONFLICT (email) DO UPDATE SET
    raw_user_meta_data = '{"type": "aluno", "name": "Pedro Almeida", "matricula": "2024002"}'::jsonb;

-- 8. Verificar usuários criados
SELECT 
    email,
    raw_user_meta_data->>'type' as tipo,
    raw_user_meta_data->>'name' as nome,
    raw_user_meta_data->>'crm' as crm,
    raw_user_meta_data->>'cro' as cro,
    raw_user_meta_data->>'matricula' as matricula,
    raw_user_meta_data->>'cpf' as cpf,
    created_at
FROM auth.users 
WHERE email LIKE '%@medcannlab.com'
ORDER BY raw_user_meta_data->>'type', email;
