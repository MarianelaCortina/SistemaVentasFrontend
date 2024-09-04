El Sistema de Ventas, lo realicé utilizando Angular.

![Dashboard-Admin](https://github.com/MarianelaCortina/SistemaVentasFrontend/assets/73797352/738e41f0-5b18-4749-96ae-29568b373613)

Para ingresar al sistema: tester@gmail.com pwd: 123

Comandos usados en Sistema de venta:

Para instalar Angular Cli: npm install -g @angular/cli

Angular material: ng add @angular/material

Para trabajar con alertas personalizadas: npm i sweetalert2

Para trabajar con fechas: npm i moment

npm i @angular/material-moment-adapter@ (misma version que angular/material)

Para trabajar con los gráficos: npm install chart.js 

Para los reportes en excel: npm i xlsx 

Para correr el frontend: ng serve


El Sistema de Ventas cuenta con un Login para poder iniciar sesión

![Login2](https://github.com/MarianelaCortina/SistemaVentasFrontend/assets/73797352/141d0d32-6cd1-48c2-a6a6-8f2846d3b1e1)



En el Home del Rol Administrador se podrá visualizar:

Menú Dashboard: Se visualiza un gráfico de barras verticales, con las ventas realizadas en la última semana, además del monto total de ventas y cantidades de ventas de la última semana.

Menú Usuarios: Manejo de roles por parte del user admin, también podrá dar de alta un nuevo usuario y agregarle el rol. Además de editar y eliminar un usuario existente.

Menú Productos: que incluye categoría, stock y precio de cada producto. Que consiste en un ABM.

Menú Ventas: Desde el formulario se puede buscar un producto, el cual se puede agregar, tipo de pago. Se puede registrar la venta y nos da un número de venta.

Menú Historial de Ventas: Que muestra un listado de ventas, que se puede buscar por un rango de fechas o por el número de venta. También se puede ver el detalle de la venta.

Menú Reportes: muestra toda la información de las ventas, que se puede buscar por rango de fechas y descargar el reporte en formato Excel.


![Admin-pantalla-Usuarios](https://github.com/user-attachments/assets/fda5e9f7-dc13-4014-ab24-19f7f36c8694)




El rol del Supervisor, tiene acceso a las pantallas y funcionalidades de: Productos, Venta, Historial de Venta y Reportes

![Rol-Supervisor](https://github.com/MarianelaCortina/SistemaVentasFrontend/assets/73797352/234c740b-ed45-467e-b7fb-3fb262a3938e)



El Rol del Empleado, tiene aceeso a las funcionalidades de: Venta e Historial de Ventas:

![Rol-Empleado-HistorialVentas](https://github.com/MarianelaCortina/SistemaVentasFrontend/assets/73797352/019bc326-10da-48e4-b476-7dbafc19d495)




