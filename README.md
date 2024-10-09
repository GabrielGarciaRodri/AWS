**AMAZON WEB SERVICE**

#### Arquitectura del servicio AWS

**AWS/**
**│**
**├── src/**
**│   ├── config/**
**│   │   └── aws-config.js**
**│   │**
**│   ├── middleware/**
**│   │   └── auth.js**
**│   │**
**│   ├── services/**
**│   │   ├── qrGenerator.js**
**│   │   └── s3Service.js**
**│   │**
**│   ├── routes/**
**│   │   └── qrRoutes.js**
**│   │**
**│   └── app.js**
**│**
**├── .env**
**├── package.json**
**└── README.md**

#### src/: 

**Contiene todo el código fuente.**

#### config/: 

Configuraciones, como la de AWS.

#### middleware/: 

Middleware para autenticación.

#### services/: 

Lógica de negocio (generación de QR, interacción con S3).

#### routes/: 

Definición de rutas para el servicio REST.

#### app.js:

Punto de entrada de la aplicación.

#### .env: 

Archivo para variables de entorno (claves de AWS, etc.).

#### package.json:

Configuración de npm y dependencias.

#### README.md: 

Documentación del proyecto.