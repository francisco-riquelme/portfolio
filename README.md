# Portafolio Personal Futurista

Este es un portafolio personal con diseño futurista y moderno, creado con HTML, CSS y JavaScript vanilla. El sitio está diseñado como una Single Page Application (SPA) con secciones para Home, About y Projects, todo en una sola página con navegación suave entre secciones.

## Características

- ✨ Diseño futurista con efectos de glitch y neón
- 📱 Totalmente responsive para todos los dispositivos
- 🎯 Navegación suave entre secciones
- 🖱️ Efectos interactivos de cursor personalizado
- 🌟 Animaciones de aparición al hacer scroll
- ⚡ Rendimiento optimizado (sin frameworks pesados)
- 🚀 Listo para desplegar en Vercel

## Estructura del Proyecto

```
/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interactividad
└── README.md           # Documentación
```

## Cómo Usar

1. Clona este repositorio o descárgalo como ZIP
2. Personaliza el contenido en `index.html` con tu información
3. Modifica los estilos en `styles.css` si deseas cambiar colores o diseño
4. Añade tus propios proyectos en la sección Projects

## Personalización

### Cambiar Colores

Puedes modificar los colores principales editando las variables CSS en el archivo `styles.css`:

```css
:root {
    --primary-color: #0ff;      /* Color principal (cyan) */
    --secondary-color: #f0f;     /* Color secundario (magenta) */
    --bg-color: #050505;         /* Color de fondo */
    --text-color: #f5f5f5;       /* Color de texto */
    /* ... otras variables ... */
}
```

### Añadir Proyectos

Para añadir un nuevo proyecto, copia y pega el siguiente bloque HTML en la sección de proyectos y personalízalo:

```html
<div class="project-card">
    <div class="project-image">
        <div class="image-overlay"></div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Nombre del Proyecto</h3>
        <p class="project-description">Descripción del proyecto.</p>
        <div class="project-tags">
            <span class="project-tag">Tecnología 1</span>
            <span class="project-tag">Tecnología 2</span>
        </div>
        <div class="project-links">
            <a href="#" class="project-link"><i class="fas fa-external-link-alt"></i></a>
            <a href="#" class="project-link"><i class="fab fa-github"></i></a>
        </div>
    </div>
</div>
```

## Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en Vercel. Sigue estos pasos para desplegarlo:

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no tienes una
2. Instala la CLI de Vercel: `npm i -g vercel`
3. Navega a la carpeta del proyecto en tu terminal
4. Ejecuta `vercel login` y sigue las instrucciones
5. Ejecuta `vercel` para desplegar
6. Sigue las instrucciones en pantalla

Alternativamente, puedes conectar tu repositorio de GitHub directamente a Vercel para despliegues automáticos.

## Rendimiento

Este portafolio está diseñado para ser ligero y rápido:

- No utiliza frameworks pesados
- Carga mínima de recursos externos (solo Font Awesome para iconos)
- Optimizado para un buen rendimiento en PageSpeed Insights

## Licencia

Este proyecto está disponible como código abierto bajo la licencia MIT.

---

¡Disfruta de tu nuevo portafolio futurista! Si tienes preguntas o sugerencias, no dudes en contactarme.