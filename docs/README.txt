Este sitio se encuentra actualmente desarrollado en HTML, CSS y Javascript.



Configuración del Proyecto

Paso 1:

Se deben ubicar en la carpeta gatorade_lat_co_qr/html/public en el respositorio https://bitbucket.org/pepsicomx/gatorade_lat_co_qr

paso 2:

Dentro de la carpeta /html/public  encontrara el archivo index.html. Que es el archivo de arranque de la aplicación.

paso 3.

El apuntamiento del DocumentRoot debe ir direccionado a la ruta /html/public/index.html en el ambiente development.

Notas Adicionales:

Para el manejo de solicitudes debe estar disponible el uso de

  * Html
  * Javascript

para el manejo general se debe permitir las solicitudes por medio de:

  * GET
  * POST

debe ubicarse en la carpeta gatorade_lat_co_qr/html/public se debe crear una carpeta llamada co y despues de esto debe crearse un symlink
dentro de esta ln -s gatorade_lat_co_qr/html/public gatorade_lat_co_qr/html/public/co/qr

No es necesario generar ninguna compilación adicional.

