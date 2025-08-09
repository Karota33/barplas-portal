-- BARPLAS Portal - Database Schema
-- Ejecutar este script en Supabase SQL Editor

-- Enable RLS (Row Level Security)
BEGIN;

-- Tabla de comerciales (usuarios del sistema)
CREATE TABLE comerciales (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de clientes (restaurantes, tiendas, etc.)
CREATE TABLE clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    comercial_id UUID REFERENCES comerciales(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    direccion TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos
CREATE TABLE productos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sku TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    url_imagen TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de catálogos personalizados (relación many-to-many entre clientes y productos)
CREATE TABLE catalogos_clientes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(cliente_id, producto_id)
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cliente_id UUID REFERENCES clientes(id) ON DELETE CASCADE,
    numero_pedido TEXT UNIQUE NOT NULL,
    estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
    total DECIMAL(10,2) NOT NULL,
    notas TEXT,
    fecha_pedido TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_entrega TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de items de pedido
CREATE TABLE pedido_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id UUID REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_clientes_comercial_id ON clientes(comercial_id);
CREATE INDEX idx_catalogos_cliente_id ON catalogos_clientes(cliente_id);
CREATE INDEX idx_catalogos_producto_id ON catalogos_clientes(producto_id);
CREATE INDEX idx_pedidos_cliente_id ON pedidos(cliente_id);
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido DESC);
CREATE INDEX idx_pedido_items_pedido_id ON pedido_items(pedido_id);

-- Funciones para actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar timestamps automáticamente
CREATE TRIGGER update_comerciales_updated_at BEFORE UPDATE ON comerciales FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clientes_updated_at BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pedidos_updated_at BEFORE UPDATE ON pedidos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Función para generar número de pedido
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.numero_pedido = 'PED-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('pedidos_seq')::text, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Secuencia para números de pedido
CREATE SEQUENCE pedidos_seq START 1;

-- Trigger para generar número de pedido automáticamente
CREATE TRIGGER generate_pedidos_numero BEFORE INSERT ON pedidos FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Row Level Security (RLS) Policies

-- Habilitar RLS en todas las tablas
ALTER TABLE comerciales ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalogos_clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedido_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS

-- Los comerciales solo pueden ver sus propios datos
CREATE POLICY comerciales_policy ON comerciales FOR ALL USING (auth.uid() = id);

-- Los comerciales solo pueden ver sus clientes
CREATE POLICY clientes_policy ON clientes FOR ALL USING (
    comercial_id IN (SELECT id FROM comerciales WHERE auth.uid() = id)
);

-- Todos pueden leer productos (catálogo público)
CREATE POLICY productos_read_policy ON productos FOR SELECT USING (true);
CREATE POLICY productos_write_policy ON productos FOR ALL USING (
    auth.uid() IN (SELECT id FROM comerciales)
);

-- Catálogos: comerciales pueden gestionar los de sus clientes
CREATE POLICY catalogos_policy ON catalogos_clientes FOR ALL USING (
    cliente_id IN (
        SELECT c.id FROM clientes c 
        JOIN comerciales com ON c.comercial_id = com.id 
        WHERE auth.uid() = com.id
    )
);

-- Pedidos: comerciales pueden ver los de sus clientes
CREATE POLICY pedidos_policy ON pedidos FOR ALL USING (
    cliente_id IN (
        SELECT c.id FROM clientes c 
        JOIN comerciales com ON c.comercial_id = com.id 
        WHERE auth.uid() = com.id
    )
);

-- Items de pedido: siguen la política de pedidos
CREATE POLICY pedido_items_policy ON pedido_items FOR ALL USING (
    pedido_id IN (
        SELECT p.id FROM pedidos p 
        JOIN clientes c ON p.cliente_id = c.id
        JOIN comerciales com ON c.comercial_id = com.id 
        WHERE auth.uid() = com.id
    )
);

COMMIT;