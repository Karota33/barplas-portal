# 🚀 Guía de Deployment - Portal BARPLAS

## 📋 Opciones de Deployment

### **🟢 Opción 1: Vercel (Recomendada)**
- **Costo:** Gratis hasta 100GB de tráfico
- **Setup:** 5 minutos
- **SSL:** Automático
- **Dominio personalizado:** Gratis

### **🟡 Opción 2: Netlify**
- **Costo:** Gratis hasta 100GB de tráfico  
- **Setup:** 5 minutos
- **SSL:** Automático
- **Dominio personalizado:** Gratis

---

## 🚀 Deployment con Vercel (Paso a Paso)

### **Método A: Desde la terminal**

```bash
# 1. Instalar Vercel CLI globalmente
npm install -g vercel

# 2. Login en Vercel (abrirá el navegador)
vercel login

# 3. Ir a la carpeta del proyecto
cd barplas-portal

# 4. Iniciar deployment
vercel

# Responder las preguntas:
# "Set up and deploy?" → Yes
# "Which scope?" → [Su cuenta]
# "Link to existing project?" → No
# "What's your project name?" → barplas-portal
# "In which directory is your code located?" → ./
# "Want to modify settings?" → No

# 5. Deploy a producción
vercel --prod
```

### **Método B: Desde GitHub (Más fácil)**

```bash
# 1. Crear repositorio en GitHub
git init
git add .
git commit -m "Portal BARPLAS MVP"
git branch -M main
git remote add origin https://github.com/SU-USUARIO/barplas-portal.git
git push -u origin main

# 2. En vercel.com:
# - Conectar GitHub
# - Importar repositorio
# - Deploy automático
```

### **Configurar Variables de Entorno en Vercel:**

```
1. Ir a: vercel.com/dashboard
2. Click en su proyecto "barplas-portal"
3. Click "Settings" > "Environment Variables"
4. Agregar:
   - Name: VITE_SUPABASE_URL
     Value: https://su-proyecto.supabase.co
   
   - Name: VITE_SUPABASE_ANON_KEY
     Value: su-clave-anon
     
   - Name: VITE_ENV
     Value: production
     
   - Name: VITE_APP_URL
     Value: https://barplas-portal-abc123.vercel.app

5. Click "Save"
6. Ir a "Deployments" > Click los 3 puntos > "Redeploy"
```

---

## 🌐 Deployment con Netlify

### **Paso a Paso:**

```bash
# 1. Build para producción
npm run build

# 2. Ir a netlify.com
# 3. Drag & drop la carpeta "dist"
# 4. Se despliega automáticamente
```

### **Configurar Variables en Netlify:**

```
1. En netlify.com, ir a su sitio
2. Click "Site settings" > "Environment variables"
3. Agregar las mismas variables que Vercel
4. Click "Build & deploy" > "Trigger deploy"
```

---

## 🔧 Configuración de Dominio Personalizado

### **Para Vercel:**
```
1. En Vercel Dashboard > Settings > Domains
2. Agregar: pedidos.barplas.com
3. Configurar DNS en su proveedor:
   - Tipo: CNAME
   - Nombre: pedidos
   - Destino: cname.vercel-dns.com
4. SSL automático en ~15 minutos
```

### **Para Netlify:**
```
1. En Netlify Dashboard > Domain settings
2. Add custom domain: pedidos.barplas.com
3. Configurar DNS:
   - Tipo: CNAME  
   - Nombre: pedidos
   - Destino: SU-SITIO.netlify.app
```

---

## 📊 Configuración de Monitoreo

### **Analytics Básicos (Gratis):**
```javascript
// En src/main.jsx, agregar:
if (import.meta.env.VITE_ENV === 'production') {
  // Google Analytics, Plausible, etc.
  console.log('Portal BARPLAS iniciado');
}
```

### **Monitoreo de Errores:**
Vercel y Netlify incluyen logs básicos gratis.

---

## 🔐 Configuración de Supabase para Producción

### **Configurar URL del Sitio:**
```
1. En Supabase Dashboard
2. Authentication > Settings
3. Site URL: https://su-dominio.com
4. Additional URLs:
   - https://su-dominio.vercel.app
   - http://localhost:5173 (para desarrollo)
```

### **Configurar Políticas de CORS:**
```sql
-- En Supabase SQL Editor:
-- Ya configurado en el schema, no necesita cambios
```

---

## 🚨 Checklist Pre-Deployment

### **Verificaciones Técnicas:**
- [ ] ✅ `npm run build` ejecuta sin errores
- [ ] ✅ `npm run preview` funciona localmente
- [ ] ✅ Variables .env configuradas
- [ ] ✅ Supabase schema ejecutado
- [ ] ✅ Datos de prueba cargados

### **Verificaciones Funcionales:**
- [ ] ✅ Login administrador funciona
- [ ] ✅ Portal de cliente accesible
- [ ] ✅ Productos se cargan correctamente
- [ ] ✅ Pedidos se crean en base de datos
- [ ] ✅ Responsive design en móvil

### **Verificaciones de Seguridad:**
- [ ] ✅ Solo variables VITE_ expuestas
- [ ] ✅ RLS activado en Supabase
- [ ] ✅ Políticas de seguridad configuradas
- [ ] ✅ HTTPS habilitado

---

## 📱 URLs Post-Deployment

### **Panel Administrativo:**
```
https://su-dominio.com/
```

### **Portales de Clientes (Ejemplos):**
```
https://su-dominio.com/client/b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
https://su-dominio.com/client/c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11
```

### **Testing en Móvil:**
Abrir URLs en celular para verificar responsive design.

---

## 🔄 Actualizaciones Futuras

### **Deployment Automático:**
Una vez conectado con Git, cada push a main despliega automáticamente.

### **Rollback en Caso de Error:**
```
# Vercel:
vercel --prod --target=DEPLOYMENT_ID

# Netlify:
En dashboard, ir a Deploys > Deploy anterior > "Publish"
```

---

## 📈 Optimizaciones Opcionales

### **Performance:**
```javascript
// En vite.config.js, agregar:
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  }
})
```

### **SEO Básico:**
```html
<!-- En index.html -->
<meta name="description" content="Portal de pedidos BARPLAS - Catálogos personalizados">
<meta name="keywords" content="barplas, pedidos, catálogo, productos plásticos">
```

---

## ❗ Troubleshooting Deployment

### **Error: "Build Failed"**
```bash
# Verificar build local:
npm run build

# Si falla, revisar:
npm run lint
```

### **Error: "Environment Variables Not Found"**
```
1. Verificar variables en plataforma (Vercel/Netlify)
2. Nombres deben empezar con VITE_
3. Redeploy después de cambiar variables
```

### **Error: "404 on Client Routes"**
```
# Verificar vercel.json tiene:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### **Error: "Supabase Connection Failed"**
```
1. Verificar URL y key en variables de entorno
2. Verificar Site URL en Supabase settings
3. Revisar políticas RLS
```

---

## 💰 Costos Estimados

### **MVP Gratuito:**
- ✅ Vercel: €0/mes (hasta 100GB)
- ✅ Supabase: €0/mes (hasta 50,000 usuarios)
- ✅ SSL: Incluido
- **Total: €0/mes**

### **Producción Básica:**
- 🔶 Dominio personalizado: ~€15/año
- 🔶 Email SMTP: ~€5/mes
- **Total: ~€20/mes**

### **Escalado Profesional:**
- 🔵 Vercel Pro: €20/mes
- 🔵 Supabase Pro: €25/mes
- **Total: ~€65/mes**

---

**🎉 ¡Portal deployado y listo para usar!**

**📞 Para soporte técnico, contacte al desarrollador.**