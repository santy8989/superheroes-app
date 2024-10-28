# SuperheroesApp

  

**SuperheroesApp** es una aplicación desarrollada en Angular que permite gestionar un listado de superhéroes, proporcionando funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y opciones de búsqueda y filtrado. La aplicación fue creada como parte de un desafío técnico para demostrar el uso de Angular, Angular Material y las mejores prácticas de desarrollo front-end.

  

## Características

  

-  **Listado de Superhéroes**: Visualización de héroes en una tabla con paginación, ordenamiento, y filtrado.

-  **Gestión de Héroes**: Posibilidad de agregar, editar y eliminar héroes.

-  **Búsqueda en Tiempo Real**: Filtrado de héroes por nombre o identidad secreta.

-  **Confirmación de Eliminación**: Muestra un diálogo de confirmación antes de eliminar un héroe.

-  **Validaciones de Formulario**: Asegura que los datos ingresados sean correctos, incluyendo validación de URLs para imágenes.

  

## Tecnologías Utilizadas

  

-  **Angular** (versión 17.3.11): Framework principal para el desarrollo de la aplicación.

-  **Angular Material**: Biblioteca de componentes para mejorar la experiencia de usuario y el diseño visual.

-  **RxJS**: Para manejar el flujo de datos de forma reactiva.

-  **TypeScript**: Para un desarrollo tipado y más seguro.

-  **Karma y Jasmine**: Para pruebas unitarias.

  

## Requisitos Previos

  

-  **Node.js** y **npm**: Asegúrate de tener [Node.js](https://nodejs.org/) y npm instalados.

-  **Angular CLI**: Si aún no lo tienes, puedes instalarlo globalmente con el comando:

```bash

npm install -g @angular/cli
```

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu entorno local:

1.  **Clonar el Repositorio**
    
    Clona este repositorio en tu máquina local usando Git:
    
    ``` bash
    
   
    `git https://github.com/santy8989/superheroes-app.git` 
    ``` 
    
2.  **Acceder al Directorio del Proyecto**
    
    Navega al directorio del proyecto:
    ``` bash
    
   
     `cd superheroes-app` 
    ``` 
    
    
3.  **Instalar las Dependencias**
    
    Instala las dependencias necesarias utilizando npm:
      ``` bash
     `npm install` 
    ``` 
    
 
4.  **Ejecutar la Aplicación**
    
    Inicia el servidor de desarrollo de Angular:
    
      ``` bash
     `npm serve` 
    ``` 
    
5.  **Abrir en el Navegador**
    
    Abre tu navegador y visita `http://localhost:4200/` para ver la aplicación en funcionamiento.
    

## Uso

### Funcionalidades Principales

-   **Registrar un Nuevo Súper Héroe:**
    
    -   Haz clic en el botón "Agregar Héroe".
    -   Completa el formulario con los datos del héroe y guarda los cambios.
-   **Consultar Todos los Súper Héroes:**
    
    -   La lista principal muestra todos los héroes registrados con paginación.
-   **Filtrar Súper Héroes por Nombre o identidad:**
    
    -   Utiliza el campo de búsqueda para filtrar héroes que contengan el texto ingresado.
-   **Editar un Súper Héroe:**
    
    -   Haz clic en el botón "Editar" junto al héroe que deseas modificar.
    -   Actualiza la información en el formulario y guarda los cambios.
-   **Eliminar un Súper Héroe:**
    
    -   Haz clic en el botón "Borrar" y confirma la acción para eliminar al héroe seleccionado.
  
## Ejecución de Pruebas Unitarias

Ejecuta `ng test` para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io).

```bash


`ng test
```

## Cobertura de Código

Para obtener un reporte de cobertura de código, ejecuta el siguiente comando:

```bash

`ng test --code-coverage
```

Los resultados de cobertura se almacenarán en el directorio `coverage/`, donde podrás revisar el reporte de manera detallada.