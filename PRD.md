# PRD: Prototipo Portal Clientes - BARPLAS

**Objetivo del Proyecto:**
Crear un prototipo web funcional para que un comercial de BARPLAS pueda tener portales de pedidos personalizados para sus clientes. El objetivo es validar la idea de negocio y obtener feedback real.

**Actores Principales (Usuarios):**
1.  **El Comercial (Rol: Admin):** Inicia sesión para gestionar a sus clientes y los catálogos de productos.
2.  **El Cliente Final (Rol: Usuario):** Un negocio (restaurante, tienda, etc.) que accede a un portal simplificado para hacer pedidos.

**Características - Panel del Comercial (Admin):**
- **Login Seguro:** El comercial inicia sesión con su email y contraseña.
- **Dashboard de Clientes:** Al entrar, ve una lista de sus clientes asignados.
- **Gestión de Catálogo Personalizado:**
  - Al hacer clic en un cliente, se muestra una vista con la lista completa de productos disponibles.
  - El comercial usa checkboxes para seleccionar/deseleccionar los productos que formarán el catálogo personalizado de ese cliente.
  - Hay un botón para "Guardar Catálogo".
- **Vista de Pedidos:** Una sección donde puede ver los pedidos que ha recibido de sus clientes, ordenados por fecha.

**Características - Portal del Cliente (Usuario):**
- **Acceso Directo:** El cliente accede a su portal a través de un link único y simple.
- **Catálogo Personalizado y Simplificado:** El cliente solo ve los productos que el comercial ha habilitado para él. Cada producto debe mostrar: imagen, nombre, SKU y precio.
- **Realizar Pedido:** El cliente puede especificar la cantidad de cada producto que desea y pulsar un botón de "Realizar Pedido".
- **Confirmación de Pedido:** Tras enviar el pedido, se muestra un mensaje de confirmación simple.

**Fuente de Datos:**
- La lista inicial de productos, con su SKU, nombre, precio e imagen, se leerá del archivo local `productos.json`. El sistema debe poblar la base de datos inicial con esta información.

**Pila Tecnológica (Stack):**
- **Framework Frontend:** React con Vite (usando Javascript).
- **Base de Datos y Backend:** Supabase (para la base de datos PostgreSQL, autenticación y APIs).
- **Estilos CSS:** Tailwind CSS.

**Despliegue:**
- El prototipo final se desplegará en Vercel o Netlify.