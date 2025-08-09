# 🚀 Portal BARPLAS - MVP Setup Guide

## 📋 ¿Qué es esto?

Un portal web completo para BARPLAS que permite:
- **Administradores:** Gestionar clientes, productos y pedidos
- **Clientes:** Ver catálogos personalizados y realizar pedidos online

---

## ⚡ Setup Rápido (15 minutos)

### **Paso 1: Configurar Base de Datos**

#### 1.1 Crear cuenta Supabase (GRATIS)
```
🌐 Ir a: https://supabase.com
📧 Registrarse con email
🆕 Click "New Project"
📝 Nombre: "BARPLAS Portal"
📍 Región: Europe West (Ireland)
🔑 Contraseña: [Anótela en lugar seguro]
```

#### 1.2 Ejecutar Schema de Base de Datos
```
1. En Supabase Dashboard:
   - Click "SQL Editor" (izquierda)
   - Click "New query"
   
2. Copiar contenido completo de: database/schema.sql
   - Pegar en el editor
   - Click "Run" (botón azul)
   ✅ Debe mostrar "Success"

3. Repetir con: database/seed-mvp.sql
   - Nueva query
   - Pegar contenido completo
   - Click "Run"
   ✅ Debe mostrar cuántos registros se insertaron
```

#### 1.3 Obtener Credenciales
```
En Supabase Dashboard:
- Click "Settings" > "API"
- Copiar "Project URL" 📋
- Copiar "anon public" key 📋
```

### **Paso 2: Configurar Variables de Entorno**

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env con sus datos reales:
VITE_SUPABASE_URL=https://su-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=su-clave-anon-aqui
```

### **Paso 3: Instalar y Ejecutar**

```bash
# Instalar dependencias (solo primera vez)
npm install

# Ejecutar en modo desarrollo
npm run dev

# ✅ Abrir: http://localhost:5173
```

---

## 🔐 Credenciales de Prueba

### **Administrador/Comercial:**
- **Email:** `comercial@barplas.com`
- **Nota:** Se crea automáticamente en Supabase Auth

### **Clientes de Prueba:**
Los clientes acceden con enlaces directos:
- **Restaurante:** `/client/b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`
- **Supermercado:** `/client/c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`
- **Almacén:** `/client/d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`

---

## 🛠️ Testing del Sistema

### **1. Testing como Administrador:**
```
1. Ir a: http://localhost:5173
2. Login con: comercial@barplas.com
3. Explorar:
   - ✅ Dashboard con clientes
   - ✅ Gestión de clientes
   - ✅ Asignación de catálogos
   - ✅ Visualización de pedidos
```

### **2. Testing como Cliente:**
```
1. Ir a: http://localhost:5173/client/b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
2. Probar:
   - ✅ Ver productos asignados
   - ✅ Buscar productos
   - ✅ Agregar al carrito
   - ✅ Realizar pedido
   - ✅ Funciona en móvil
```

### **3. Verificar Flujo Completo:**
```
Cliente hace pedido → Aparece en Dashboard admin → Cambiar estado
```

---

## 📦 Datos de Ejemplo Incluidos

### **25 Productos Realistas de BARPLAS:**
- 🥡 Contenedores y cajas apilables
- 🛠️ Palets industriales
- 🛢️ Bidones y tanques
- 🗑️ Cubos y papeleras
- ⚙️ Accesorios y complementos
- 🔬 Productos especializados

### **5 Clientes de Diferentes Sectores:**
- 🍽️ **Restaurante** → Productos para cocina
- 🛒 **Supermercado** → Variedad comercial
- 📦 **Almacén** → Productos industriales
- 🏢 **Oficina** → Productos administrativos
- 🏭 **Fábrica** → Productos grado alimentario

### **Historial de Pedidos:**
- Pedidos entregados, confirmados y pendientes
- Estados realistas del flujo de trabajo

---

## 🚀 Deployment a Producción

### **Opción A: Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Seguir instrucciones:
# 1. Link to existing project? No
# 2. Project name: barplas-portal
# 3. Directory: ./
# 4. Settings? No

# ✅ Obtendrá URL: https://barplas-portal-abc123.vercel.app
```

### **Opción B: Netlify**
```bash
# Build para producción
npm run build

# Subir carpeta 'dist/' a Netlify.com
# Drag & drop en la web
```

### **Configurar Variables en Producción:**
```
En Vercel/Netlify Dashboard:
- Agregar variable: VITE_SUPABASE_URL
- Agregar variable: VITE_SUPABASE_ANON_KEY
- Redeploy
```

---

## 📱 URLs de Acceso

### **Panel Administrativo:**
```
https://su-dominio.com/
```

### **Portales de Clientes:**
```
https://su-dominio.com/client/ID-DEL-CLIENTE
```

**Ejemplo real:**
```
https://barplas-portal.vercel.app/client/b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
```

---

## 🔧 Personalización

### **Cambiar Logo y Colores:**
```css
/* En src/index.css - línea ~10 */
:root {
  --color-primary-600: #1e40af; /* Cambiar por color BARPLAS */
  --color-primary-700: #1d4ed8;
}
```

### **Agregar Productos Reales:**
```sql
-- En Supabase SQL Editor:
INSERT INTO productos (sku, nombre, descripcion, precio, url_imagen) 
VALUES ('BAR-NEW-001', 'Producto Real', 'Descripción...', 25.99, 'url-imagen');
```

### **Crear Clientes Reales:**
```
1. Login como admin
2. Click "Gestión Clientes"
3. "Nuevo Cliente"
4. Completar formulario
5. Asignar catálogo personalizado
```

---

## ❗ Troubleshooting

### **Error: "Invalid API Key"**
```
- Verificar que copió la clave correcta de Supabase
- Debe ser la "anon public" key, NO la "service_role"
- Reiniciar npm run dev después de cambiar .env
```

### **Error: "Network Error"**
```
- Verificar URL de Supabase (debe terminar en .supabase.co)
- Verificar conexión a internet
- Verificar que el proyecto Supabase está activo
```

### **Login no funciona:**
```
1. En Supabase: Authentication > Users
2. Click "Add user" manually
3. Email: comercial@barplas.com
4. Password: [elegir una]
5. Usar esas credenciales en login
```

### **Productos no aparecen:**
```
1. Verificar que ejecutó seed-mvp.sql
2. En Supabase: Database > Tables > productos
3. Debe haber ~25 productos
```

---

## 📞 Soporte

### **Documentación:**
- `database/schema.sql` → Estructura de datos
- `database/seed-mvp.sql` → Datos de ejemplo
- `src/services/` → Lógica de backend
- `src/components/` → Componentes de interfaz

### **Logs de Errores:**
- **Frontend:** Abrir DevTools (F12) → Console
- **Backend:** Supabase Dashboard → Logs

---

## ✅ Checklist MVP

### **Configuración Básica:**
- [ ] ✅ Cuenta Supabase creada
- [ ] ✅ Schema ejecutado correctamente
- [ ] ✅ Datos de ejemplo cargados
- [ ] ✅ Variables .env configuradas
- [ ] ✅ Aplicación ejecuta localmente

### **Testing Funcional:**
- [ ] ✅ Login administrador funciona
- [ ] ✅ Dashboard muestra clientes
- [ ] ✅ Portal cliente accesible
- [ ] ✅ Productos se muestran correctamente
- [ ] ✅ Carrito funciona
- [ ] ✅ Pedidos se crean en base de datos

### **Deploy Producción:**
- [ ] ✅ Deployado a Vercel/Netlify
- [ ] ✅ Variables configuradas en producción
- [ ] ✅ URLs públicas funcionando
- [ ] ✅ SSL/HTTPS habilitado

### **Personalización:**
- [ ] Logo BARPLAS
- [ ] Colores corporativos
- [ ] Productos reales cargados
- [ ] Clientes reales creados

---

**🎉 ¡Su Portal BARPLAS está listo para usar!**

**👨‍💻 Desarrollado con React + Supabase + Vite + Tailwind CSS**