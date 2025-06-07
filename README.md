# Reto Técnico
Este proyecto es una aplicación React que puede ser desplegada fácilmente utilizando Docker.\
A continuación, se detallan los pasos necesarios para construir y ejecutar la aplicación en un contenedor Docker.

## Decisiones de Arquitectura y Tecnologías Elegidas
El proyecto fue desarrollado utilizando React como biblioteca principal para la construcción de la interfaz de usuario, esto porque es muy sencillo su implementación y manejo de componentes. Tiene una amplia gama de posibilidades para generar varias interfaces interactivas al hacer uso de estados, hooks, props, etc.

Para el despliegue, se optó por Docker con el objetivo de asegurar un entorno de ejecución consistente, facilitar el empaquetado de la aplicación como una imagen autocontenida, y simplificar tanto el desarrollo local como el despliegue en producción.

El servidor web elegido fue Nginx, utilizado para servir los archivos estáticos de la aplicación React en un contenedor ligero y de alto rendimiento. Además, se configuró para manejar rutas correctamente mediante try_files, garantizando una navegación fluida en aplicaciones Single Page Application.

En cuanto a la visualización de datos, se utilizó la librería Chart.js junto con su integración en React (react-chartjs-2), lo que permite incorporar gráficos dinámicos y responsivos de manera sencilla y eficiente.

Estas decisiones se tomaron priorizando:

Modularidad y mantenibilidad del código\
Compatibilidad con entornos multiplataforma\
Facilidad para escalar y desplegar en diferentes ambientes\
Buena experiencia de usuario con una interfaz clara y visualmente informativa

# Despliegue con Docker

## Requisitos Previos
Se debe de tener instalado Docker. En caso de querer correr localmente la aplicación se requiere instalar Node.js en la computaora.

### Navegar al Directorio del Proyecto
Abre una terminal y navega al directorio de la aplicación React:

`cd visual-data` 

### Construir la Imagen de Docker
Ejecuta el siguiente comando para construir la imagen de Docker:

`docker build -t reto-tecnico-app .`

### Ejecutar el Contenedor
Una vez construida la imagen, ejecuta el contenedor:

`docker run -d -p 3000:80 reto-tecnico-app`

La aplicación estará disponible en http://localhost:3000.

## Si deseas ejecutar la Aplicación sin Docker
Si prefieres ejecutar la aplicación sin Docker, puedes hacerlo siguiendo estos pasos:

###- Instalar Dependencias

`npm install`
`npm install chart.js react-chartjs-2`
   
###- Ejecutar la Aplicación en Modo Desarrollo

`npm start`

La aplicación estará disponible en http://localhost:3000.
