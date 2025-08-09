# 🔐 Credenciales y URLs de Acceso - MVP Portal BARPLAS

## 🚨 **INFORMACIÓN IMPORTANTE**

Este archivo contiene las credenciales y enlaces necesarios para probar el MVP.  
**NOTA:** Debe completar el setup de Supabase antes de usar estas credenciales.

---

## 🏢 **ACCESO ADMINISTRATIVO (Dashboard Comercial)**

### **URL de Acceso:**
```
http://localhost:5173/
```
*(Cuando esté deployado, será https://su-dominio.com/)*

### **Credenciales de Login:**
```
Email: comercial@barplas.com
Contraseña: [Debe crearla en Supabase Authentication]
```

### **¿Cómo crear el usuario administrador?**
1. Complete el setup de Supabase (README-MVP.md)
2. Vaya a Supabase Dashboard > Authentication > Users
3. Click "Add user" / "Agregar usuario"
4. Email: `comercial@barplas.com`
5. Password: `[Elija una contraseña segura]`
6. Email Confirm: ✅ (confirmado)
7. Use esas credenciales para hacer login

---

## 🛒 **PORTALES DE CLIENTES (Acceso Directo)**

Los clientes **NO necesitan login**, acceden directamente con sus URLs personalizadas:

### **🍽️ Restaurante El Buen Sabor**
```
URL: http://localhost:5173/client/b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

Productos asignados (8):
• Caja Plástica Apilable 60x40x32cm - €18.50
• Bandeja Plástica Perforada 60x40cm - €8.25  
• Contenedor con Tapa 50x30x35cm - €24.60
• Bidón 25L con Grifo - €15.40
• Bidón Apilable 20L - €12.80
• Papelera Oficina 25L - €8.75
• Contenedor Isotérmico 40L - €89.50
• Soporte Apilable para Botellas - €13.20
```

### **🛒 Supermercado FreshMart**  
```
URL: http://localhost:5173/client/c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

Productos asignados (10):
• Caja Plástica Apilable 60x40x32cm - €18.50
• Contenedor Industrial 80x60x42cm - €32.75
• Caja Eurobox 40x30x22cm - €12.90
• Bandeja Plástica Perforada 60x40cm - €8.25
• Palet Plástico 120x80cm Ligero - €45.80
• Palet Display 60x40cm - €19.95
• Cubo Basura 120L con Ruedas - €42.90
• Contenedor Reciclaje 50L - €16.25
• Tapa para Caja 60x40cm - €4.20
• Etiquetas Identificación 100 unidades - €6.90
```

### **📦 LogiCenter Valencia (Almacén)**
```
URL: http://localhost:5173/client/d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

Productos asignados (9):
• Contenedor Industrial 80x60x42cm - €32.75
• Contenedor con Tapa 50x30x35cm - €24.60  
• Palet Plástico 120x80cm Ligero - €45.80
• Palet Europeo 120x80cm Reforzado - €62.30
• Media Palet 80x60cm - €28.75
• Contenedor IBC 1000L - €285.00
• Tanque Cilíndrico 200L - €68.50
• Cubo Industrial 80L - €18.60
• Ruedas Giratorias para Contenedor - €24.50
```

### **🏢 TechCorp Solutions (Oficina)**
```
URL: http://localhost:5173/client/e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

Productos asignados (6):
• Caja Eurobox 40x30x22cm - €12.90
• Papelera Oficina 25L - €8.75
• Contenedor Reciclaje 50L - €16.25  
• Caja Archivo A4 con Tapa - €7.40
• Divisor para Caja Eurobox - €2.85
• Etiquetas Identificación 100 unidades - €6.90
```

### **🏭 Industrias Alimentarias SUR**
```
URL: http://localhost:5173/client/f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

Productos asignados (8):
• Bandeja Plástica Perforada 60x40cm - €8.25
• Contenedor con Tapa 50x30x35cm - €24.60
• Palet Plástico 120x80cm Ligero - €45.80
• Bidón 25L con Grifo - €15.40
• Bidón Apilable 20L - €12.80
• Cubo Industrial 80L - €18.60
• Contenedor Isotérmico 40L - €89.50
• Tapa para Caja 60x40cm - €4.20
```

---

## 📋 **DATOS DE TESTING**

### **Historial de Pedidos Pre-cargado:**
En el dashboard administrativo verá pedidos de ejemplo:

```
🍽️ Restaurante El Buen Sabor - ENTREGADO
• Total: €89.45
• Fecha: Hace 5 días
• Items: Cajas, Bidones, Contenedor isotérmico

🛒 Supermercado FreshMart - CONFIRMADO  
• Total: €156.75
• Fecha: Hace 2 días
• Items: Cajas eurobox, Palets, Cubo con ruedas

📦 LogiCenter Valencia - PENDIENTE
• Total: €724.30  
• Fecha: Hace 1 hora
• Items: Palets reforzados, Contenedores, IBC 1000L
```

### **Datos de Productos (25 productos):**
- **Contenedores:** 5 productos (€8.25 - €32.75)
- **Palets:** 4 productos (€19.95 - €62.30)  
- **Bidones:** 4 productos (€12.80 - €285.00)
- **Cubos:** 4 productos (€8.75 - €42.90)
- **Accesorios:** 4 productos (€2.85 - €24.50)
- **Especializados:** 4 productos (€7.40 - €89.50)

---

## 🧪 **PLAN DE TESTING SUGERIDO**

### **✅ Testing Administrador (5 minutos):**
1. Login con credenciales de comercial
2. Ver dashboard con estadísticas
3. Click en "Clientes" → Ver lista de 5 clientes
4. Click "Gestionar Catálogo" en un cliente → Ver productos asignados
5. Click en "Pedidos" → Ver historial con diferentes estados
6. Cambiar estado de pedido pendiente → Confirmar cambio

### **✅ Testing Cliente Restaurante (3 minutos):**
1. Abrir URL del restaurante en móvil/tablet
2. Ver catálogo personalizado (8 productos)
3. Buscar "bidón" → Ver resultados filtrados
4. Agregar 2 productos al carrito → Ver total actualizado
5. Click "Realizar Pedido" → Ver confirmación
6. **Verificar:** En dashboard admin debe aparecer el pedido nuevo

### **✅ Testing Cliente Supermercado (3 minutos):**
1. Abrir URL del supermercado
2. Ver catálogo diferente (10 productos)
3. Usar filtro de precio → Ver productos filtrados
4. Hacer un pedido grande (5+ productos)
5. **Verificar:** Total calculado correctamente

### **✅ Testing Multi-dispositivo (5 minutos):**
1. Portal admin en desktop → Funcionalidad completa
2. Portal cliente en móvil → Responsive design
3. Portal cliente en tablet → Experiencia optimizada
4. Diferentes navegadores → Compatibilidad total

---

## 🔍 **VERIFICACIONES DE CALIDAD**

### **Base de Datos (En Supabase Dashboard):**
```
Tabla "comerciales": 1 registro
Tabla "clientes": 5 registros  
Tabla "productos": 25 registros
Tabla "catalogos_clientes": 41 relaciones
Tabla "pedidos": 3 pedidos de ejemplo
Tabla "pedido_items": 8 items de pedidos
```

### **URLs que deben funcionar:**
```
✅ http://localhost:5173/ → Dashboard admin
✅ http://localhost:5173/login → Pantalla de login  
✅ http://localhost:5173/client/[ID] → Portal cliente
✅ http://localhost:5173/cualquier-cosa → Redirije al login
```

### **Funcionalidades críticas:**
```
✅ Login/logout funciona
✅ Dashboard carga datos correctos
✅ Catálogos personalizados por cliente
✅ Carrito suma totales correctamente  
✅ Pedidos se guardan en base de datos
✅ Estados de pedido se pueden cambiar
✅ Búsqueda de productos funciona
✅ Responsive en móvil/tablet
```

---

## 🚨 **TROUBLESHOOTING RÁPIDO**

### **Error: "Login no funciona"**
- Verificar que creó el usuario en Supabase Authentication
- Email exacto: `comercial@barplas.com`
- Verificar variables de entorno en .env

### **Error: "Portal cliente muestra 'Sin productos'"**
- Verificar que ejecutó seed-mvp.sql correctamente
- Verificar tabla catalogos_clientes tiene datos
- Verificar URL del cliente es correcta

### **Error: "Pedidos no se guardan"**
- Verificar conexión a Supabase
- Verificar políticas RLS están activas
- Revisar consola del navegador (F12) por errores

### **Error: "Imágenes no cargan"**  
- Las imágenes vienen de Unsplash, requiere internet
- En producción, usar imágenes propias de productos

---

## 📞 **SOPORTE**

### **Documentación Completa:**
- `README-MVP.md` → Setup paso a paso (15 min)
- `DEPLOYMENT.md` → Deploy a producción  
- `RESUMEN-EJECUTIVO.md` → Visión general del proyecto

### **En caso de problemas:**
1. Revisar archivo README-MVP.md
2. Verificar que Supabase está configurado correctamente
3. Comprobar variables de entorno (.env)
4. Revisar consola de errores en navegador (F12)

---

**🎉 ¡El MVP está 100% funcional y listo para testing!**

**⚡ Tiempo total de setup: 30 minutos siguiendo README-MVP.md**

**📱 URLs listas para compartir con clientes de prueba una vez deployado**