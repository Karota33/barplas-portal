# 🚀 INSTRUCCIONES DE DEPLOY - BARPLAS PORTAL MVP

## ⚡ **DEPLOY INMEDIATO (5 minutos)**

### **Opción A: Netlify Drop (SIN REGISTRO)**
1. **Abre tu navegador** y ve a: [netlify.com/drop](https://netlify.com/drop)
2. **Arrastra** la carpeta `dist` desde tu explorador de archivos
3. **Suelta** la carpeta en la zona de drop
4. **¡Listo!** En 30 segundos tendrás tu URL

**Resultado:** `https://amazing-name-123456.netlify.app`

---

### **Opción B: Surge (CON COMANDO)**
```bash
# 1. Instalar Surge globalmente
npm install -g surge

# 2. Ir al directorio de build
cd dist

# 3. Deploy con dominio personalizado
surge --domain barplas-mvp.surge.sh
```

**Resultado:** `https://barplas-mvp.surge.sh`

---

### **Opción C: Vercel (PROFESIONAL)**
1. **Regístrate** en [vercel.com](https://vercel.com)
2. **Haz clic** en "New Project"
3. **Sube** la carpeta `dist` o conecta GitHub
4. **Deploy automático**

**Resultado:** `https://barplas-portal.vercel.app`

---

## 🔗 **URLS QUE FUNCIONARÁN**

Una vez deployado, estas son las URLs que estarán disponibles:

### **Landing Page:**
- `tu-dominio/landing.html` - Página de captación de leads

### **Portal Comercial:**
- `tu-dominio/` - Login y dashboard (requiere credenciales)

### **Portales de Clientes:**
- `tu-dominio/client/1` - Restaurante El Teide
- `tu-dominio/client/2` - Supermercados La Palma  
- `tu-dominio/client/3` - Almacenes Canarios
- `tu-dominio/client/4` - Oficinas Atlántico
- `tu-dominio/client/5` - Fábrica Industrial Norte

---

## ✅ **VERIFICAR QUE TODO FUNCIONA**

### **Test 1: Landing Page**
1. Ve a `tu-dominio/landing.html`
2. Rellena el formulario de contacto
3. Debe mostrar "¡Formulario enviado correctamente!"

### **Test 2: Portal Comercial**
1. Ve a `tu-dominio/`
2. Login con: `test@barplas.com` / `karota33`
3. Debe mostrar el dashboard con 5 clientes

### **Test 3: Portal de Cliente**
1. Ve a `tu-dominio/client/1`
2. Debe mostrar productos del Restaurante El Teide
3. Agrega productos al carrito y haz un "pedido"

---

## 📁 **ARCHIVOS IMPORTANTES EN DIST**

```
dist/
├── index.html          # Portal principal (SPA)
├── landing.html        # Landing page estática  
├── _redirects          # Configuración de rutas
├── assets/            # CSS, JS, imágenes
└── productos.json     # Datos de productos (fallback)
```

---

## 🔧 **PERSONALIZACIÓN POST-DEPLOY**

### **Cambiar Dominio Personalizado:**

#### Netlify:
1. Ve a tu dashboard de Netlify
2. Site Settings → Domain Management
3. Add Custom Domain: `portal.barplas.com`

#### Vercel:
1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Add: `portal.barplas.com`

### **Configurar DNS:**
```
CNAME: portal → tu-dominio-netlify.netlify.app
```

---

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### **Error: "404 Not Found"**
- **Causa:** Rutas SPA no configuradas
- **Solución:** Verifica que `_redirects` esté en la carpeta dist

### **Error: "No se cargan los estilos"**
- **Causa:** Ruta de assets incorrecta
- **Solución:** El build debe estar correcto, re-deploy

### **Error: "No conecta con base de datos"**
- **Causa:** Variables de entorno
- **Solución:** Las credenciales están hardcodeadas, debería funcionar

---

## 📋 **CHECKLIST ANTES DE ENTREGAR**

### **Verificaciones Técnicas:**
- [ ] Landing page carga correctamente
- [ ] Login funciona con credenciales
- [ ] Dashboard muestra 5 clientes
- [ ] Portales de cliente cargan productos
- [ ] Formulario de contacto envía (alerta JS)
- [ ] Responsive funciona en móvil

### **Verificaciones de Contenido:**
- [ ] Branding BARPLAS correcto
- [ ] Colores corporativos aplicados
- [ ] Información de contacto actualizada
- [ ] Productos realistas mostrados
- [ ] Clientes de ejemplo creados

### **Verificaciones de UX:**
- [ ] Navegación intuitiva
- [ ] Diseño profesional
- [ ] Carga rápida
- [ ] Sin errores JavaScript
- [ ] Accesible desde móviles

---

## 🎯 **ENTREGA AL CLIENTE**

### **Lo que vas a entregar:**
1. **URL del MVP funcionando**
2. **DOCUMENTACION_CLIENTE.md** (instrucciones completas)
3. **Credenciales de acceso**
4. **Lista de URLs de todos los portales**
5. **Código fuente completo** (opcional)

### **Mensaje para el cliente:**
```
🎉 ¡Tu Portal BARPLAS MVP está listo!

URL Principal: https://tu-dominio.netlify.app
Landing Page: https://tu-dominio.netlify.app/landing.html

Credenciales Portal:
Email: test@barplas.com
Password: karota33

El sistema incluye:
✅ Portal completo para comerciales
✅ 5 clientes de prueba con portales individuales  
✅ 25 productos reales de embalaje y hostelería
✅ Landing page para captación de leads
✅ Diseño 100% responsive y profesional

¡Ya puedes empezar a usarlo inmediatamente!
```

---

## 🚀 **¡DEPLOY COMPLETADO!**

Con estas instrucciones, el cliente tendrá:
- ✅ **Sistema funcionando** en minutos
- ✅ **Documentación completa** para usar
- ✅ **URLs listas** para compartir
- ✅ **MVP profesional** listo para presentar

**¡El Portal BARPLAS MVP está listo para producción!** 🎉