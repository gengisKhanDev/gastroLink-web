# Proyecto de Adopción de Mascotas

Este proyecto es una aplicación web para la adopción de mascotas, desarrollado utilizando Meteor.js. La aplicación permite a los usuarios registrarse, ver mascotas disponibles para adopción, agregar sus mascotas favoritas , agregar mascota para adopción, y contactar con los dueños de las mascotas a través de WhatsApp.

## Características

- **Registro y autenticación de usuarios:** Los usuarios pueden registrarse y acceder a la aplicación.
- **Ver mascotas disponibles:** Los usuarios pueden ver las mascotas disponibles para adopción con detalles como imagen, nombre, descripción, sexo, tamaño y edad.
- **Favoritos:** Los usuarios pueden marcar mascotas como favoritas.
- **Contactar al dueño:** Los usuarios pueden contactar a los dueños de las mascotas a través de WhatsApp.
- **Gestión de mascotas:** Los usuarios pueden agregar nuevas mascotas para adopción.
- **Envío de correos electrónicos:** La aplicación puede enviar correos electrónicos para restablecimiento de contraseña, verificación de correo y registro de cuenta.
- **Aplicación móvil:** La aplicación web puede ser accesible como una aplicación móvil utilizando una WebView en un proyecto de Kotlin.

## Tecnologías utilizadas

- **Meteor.js:** Framework principal para el desarrollo de la aplicación.
- **Blaze:** Motor de plantillas utilizado para la interfaz de usuario.
- **MongoDB:** Base de datos NoSQL para almacenar la información de los usuarios y las mascotas.
- **Bootstrap:** Framework CSS para el diseño responsivo.
- **SendGrid (Brevo):** Servicio de envío de correos electrónicos (requiere configuración de API Key).
- **Kotlin:** Utilizado para portar la webapp a una aplicación móvil mediante WebView.

## Requisitos

- Node.js
- Meteor.js
- MongoDB
- Android Studio (para el proyecto de Kotlin)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Instala Meteor.js (si aún no lo tienes):

   ```bash
   curl https://install.meteor.com/ | sh
   ```

3. Instala las dependencias del proyecto:

   ```bash
   meteor npm install
   ```

4. Configura el archivo `smtp.js` con tu clave API de SendGrid para enviar correos:

   ```javascript
   // smtp.js
   process.env.MAIL_URL =
     "smtps://apikey:<YOUR_SENDGRID_API_KEY>@smtp.sendgrid.net:465";
   ```

5. Inicia la aplicación:

   ```bash
   npm start
   ```

6. Abre tu navegador web y visita `http://localhost:3000` para ver la aplicación en acción.

## Uso

### Creación de Usuario Inicial

Cuando inicias la aplicación por primera vez, se crea un usuario por defecto. Puedes usar este usuario para iniciar sesión y gestionar la aplicación:

- **Correo:** admin@admin.com
- **Contraseña:** lJ1tdvewYbht4CsYP8IKmkiJBXI2eNo

### Configuración del proyecto de Kotlin

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Abrir el proyecto en Android Studio:

- Abre Android Studio.
- Selecciona "Open an existing Android Studio project".
- Navega hasta el directorio del proyecto clonado y selecciónalo.

3. Cambiar la URL en el archivo WebView.kt:
Actualiza la constante WEB_VIEW_URL con la IP del servidor del proyecto que está corriendo de manera local:

   ```bash
   const val WEB_VIEW_URL = "http://YOUR_LOCAL_IP:3000/"
   ```
4. Abrir el proyecto en Android Studio:

- Conecta un dispositivo Android o utiliza un emulador.
- Haz clic en "Run" para compilar y ejecutar la aplicación.

### Uso

- **Registro y autenticación:** Los usuarios pueden registrarse y acceder utilizando sus credenciales.
- **Ver mascotas:** Navega por las mascotas disponibles y marca tus favoritas.
- **Agregar mascotas:** Los usuarios pueden agregar nuevas mascotas para adopción.
- **Contactar al dueño:** Haz clic en el enlace de WhatsApp para contactar al dueño de la mascota.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
