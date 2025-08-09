# BARPLAS Portal - Prototipo

Portal de pedidos personalizado para comerciales de BARPLAS y sus clientes.

## 🚀 Características Implementadas

### Panel del Comercial (Admin)
- ✅ Sistema de autenticación con Supabase
- ✅ Dashboard con lista de clientes asignados
- ✅ Gestión de catálogo personalizado por cliente
- ✅ Selección de productos disponibles con checkboxes
- ✅ Guardado de configuraciones de catálogo

### Portal del Cliente
- ✅ Acceso directo por URL única (`/client/:clientId`)
- ✅ Catálogo personalizado y simplificado
- ✅ Visualización de productos con imagen, nombre, SKU y precio
- ✅ Sistema de carrito de compras
- ✅ Realizar pedidos con confirmación
- ✅ Interfaz responsive y moderna

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + Vite
- **Estilos**: Tailwind CSS
- **Base de Datos**: Supabase (configurado)
- **Ruteo**: React Router DOM
- **Estado**: React Hooks

## 📦 Instalación y Configuración

1. **Clonar e instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```
Completar con tus credenciales de Supabase:
```
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

3. **Ejecutar en desarrollo:**
```bash
npm run dev
```

## 🗂️ Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.jsx          # Layout principal
│   ├── LoginForm.jsx       # Formulario de login
│   ├── Dashboard.jsx       # Dashboard del comercial
│   ├── CatalogManager.jsx  # Gestión de catálogos
│   └── ClientPortal.jsx    # Portal del cliente
├── hooks/
│   └── useAuth.js          # Hook de autenticación
├── lib/
│   └── supabase.js         # Cliente de Supabase
└── App.jsx                 # Componente principal
```

## 🎯 Funcionalidades Principales

### Para el Comercial:
1. **Login**: `/` - Acceso con email/contraseña
2. **Dashboard**: Ver lista de clientes asignados
3. **Gestión de Catálogo**: Seleccionar productos disponibles por cliente
4. **Vista de Pedidos**: (Por implementar en producción)

### Para el Cliente:
1. **Portal Personalizado**: `/client/:clientId` - Acceso directo
2. **Catálogo Filtrado**: Solo productos habilitados por el comercial
3. **Carrito de Compras**: Agregar/quitar productos con cantidades
4. **Realizar Pedidos**: Envío de pedidos con confirmación

## 🎨 Diseño y UX

- **Diseño Responsivo**: Optimizado para desktop y móvil
- **Interfaz Limpia**: Diseño minimalista con Tailwind CSS
- **Experiencia Intuitiva**: Navegación simple y directa
- **Feedback Visual**: Loading states y confirmaciones

## 📊 Datos de Ejemplo

El proyecto incluye `productos.json` con productos de ejemplo:
- Envases de Aluminio
- Film Extensible
- Bolsas de Papel

## 🚀 Próximos Pasos para Producción

1. **Base de Datos**: Configurar tablas en Supabase
2. **Autenticación**: Completar flujo de usuarios reales
3. **API**: Implementar CRUD completo de productos y pedidos
4. **Despliegue**: Subir a Vercel/Netlify
5. **Testing**: Pruebas unitarias y de integración

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting del código

---

**Estado**: Prototipo funcional listo para validación de concepto