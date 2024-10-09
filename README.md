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



## Ejemplo de uso de las variables de entorno

```bash
AWS_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxxxxx
COGNITO_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
S3_BUCKET_NAME=my-qr-code-bucket
```

