# Portafolio Futurista - React

Portafolio personal desarrollado con React, con diseño futurista y efectos visuales avanzados.

## 🚀 Deployment en Vercel

### Opción 1: Deployment desde GitHub (Recomendado)

1. **Sube el proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - React portfolio"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/portfolio-react.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio `portfolio-react`
   - Vercel detectará automáticamente que es un proyecto React
   - Haz clic en "Deploy"

### Opción 2: Deployment directo con Vercel CLI

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión en Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy el proyecto:**
   ```bash
   vercel
   ```

4. **Para deployments futuros:**
   ```bash
   vercel --prod
   ```

## 🛠️ Configuración

El proyecto incluye:
- `vercel.json` configurado para React SPA
- Scripts de build optimizados
- Configuración de cache para assets estáticos
- Rutas configuradas para SPA routing

## 📦 Scripts Disponibles

- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm test` - Ejecutar tests
- `npm run eject` - Eject de Create React App

## 🎨 Características

- Diseño futurista con efectos de neón
- Animaciones CSS avanzadas
- Cursor follower personalizado
- Efectos parallax
- Responsive design
- Optimizado para performance

## 🔧 Tecnologías

- React 19
- CSS3 con variables personalizadas
- Font Awesome para iconos
- Intersection Observer API
- CSS Grid y Flexbox

---

¡Tu portafolio estará listo para deployment en Vercel! 🚀
