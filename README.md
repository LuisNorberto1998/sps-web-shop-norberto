# SPS-WEB-SHOP-NORBERTO

Este proyecto ha sido generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.1.4.

## Tabla de Contenidos

- [Creación de Código](#creación-de-código)
- [Construcción](#construcción)
- [Entornos de Construcción](#entornos-de-construcción)
- [Ejecución del Servidor de Desarrollo](#ejecución-del-servidor-de-desarrollo)
- [Ejecución de Pruebas Unitarias](#ejecución-de-pruebas-unitarias)
- [Ejecución de Pruebas de Extremo a Extremo (E2E)](#ejecución-de-pruebas-de-extremo-a-extremo-e2e)
- [Despliegue en Firebase Hosting](#despliegue-en-firebase-hosting)
- [Ayuda Adicional](#ayuda-adicional)

---

## Creación de Código

Ejecuta el siguiente comando para generar un nuevo componente:

```bash
ng generate component nombre-del-componente
```

También puedes usar:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

# Construcción

Ejecuta el siguiente comando para construir el proyecto:

```
npm run build
```

Los archivos generados se almacenarán en el directorio dist/sps-web-shop.

# Entornos de Construcción

- Producción: `npm run build --prod`
- Desarrollo: `npm run watch`
- Staging: `npm run build --configuration=staging`

# Ejecución del Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:

```
npm start
```

El servidor se ejecutará en http://localhost:4200/ por defecto.

# Ejecución de Pruebas Unitarias

Ejecuta el siguiente comando para ejecutar las pruebas unitarias a través de Karma:

```
npm test
```

# Ejecución de Pruebas de Extremo a Extremo (E2E)

### Instalar Cypress:

Primero, necesitas instalar Cypress en tu proyecto. Puedes hacerlo con npm o yarn:

**_*Usando npm:*_**

```
npm install cypress --save-dev
```

**Usando yarn:**

```
yarn add cypress --dev
```

### Configurar Cypress

Después de la instalación, **Cypress** crea automáticamente una estructura de carpetas y archivos de configuración en tu proyecto. Si no lo hace, puedes generar la configuración inicial con el siguiente comando y aparecera la guia para configurar o tener test de prueba:

```
npx cypress open
```

### Si ya esta configurado solo ejecuta

Ejecuta el siguiente comando para ejecutar las pruebas de extremo a extremo a través de **Cypress**:

```
npx cypress open
```

El archivo de configuración se encuentra en cypress.config.ts y la URL base para las pruebas es http://localhost:4200/.

# Despliegue en Firebase Hosting

## 1. Configurar Firebase en el Proyecto

### 1.1. Instalar Firebase CLI

Primero, debes instalar la **'Firebase CLI (Command Line Interface)'** globalmente en tu sistema:

```
npm install -g firebase-tools
```

### 1.2. Iniciar Firebase en tu Proyecto

Navega al directorio de tu proyecto Angular y ejecuta el siguiente comando para inicializar Firebase:

```
firebase init
```

Durante la inicialización, selecciona las siguientes opciones:

- **Hosting:** Configura y despliega Firebase Hosting.
- **Use an existing project:** Selecciona el proyecto Firebase existente que quieres usar.
- **Public directory:** Especifica dist/tu-proyecto (donde tu-proyecto es el nombre de tu aplicación Angular).
- **Single-page app:** Responde "Yes" para configurar como una aplicación de una sola página.
- **GitHub Actions:** Si te pregunta, puedes omitir la configuración automática de GitHub Actions aquí, ya que lo haremos manualmente en un paso posterior.

### 1.3. Construir tu Aplicación

Para preparar tu aplicación Angular para el despliegue, construye el proyecto con el siguiente comando:

```
ng build --prod
```

Esto generará los archivos estáticos en la carpeta **dist/tu-proyecto**.

## 2. Desplegar Manualmente en Firebase Hosting

Para realizar un despliegue manual de tu aplicación en **Firebase Hosting**, ejecuta el siguiente comando:

```
firebase deploy
```

Esto subirá los archivos construidos a **Firebase Hosting** y te proporcionará una URL para acceder a tu aplicación.

## 3. Configurar GitHub Actions para Despliegues Automáticos

### 3.1. Despliegue en la Rama Principal

Para configurar un flujo de trabajo que despliegue automáticamente tu aplicación en Firebase Hosting cuando se realiza un merge en la rama principal, sigue estos pasos:

Crea un archivo llamado **.github/workflows/firebase-hosting-merge.yml** en tu repositorio.

Agrega el siguiente contenido al archivo:

```
name: Deploy to Firebase Hosting on merge

on:
push:
branches: - main # o 'master' dependiendo de tu rama principal

jobs:
build:
runs-on: ubuntu-latest

    steps:
    - name: Check out the repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'  # o la versión que uses en tu proyecto

    - name: Install dependencies
      run: npm install

    - name: Build the project
      run: npm run build --prod

    - name: Deploy to Firebase Hosting
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: "${{ secrets.GITHUB_TOKEN }}"
        firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
        channelId: live
        projectId: tu-id-de-proyecto-firebase  # Reemplaza con tu ID de proyecto
```

Este flujo de trabajo se ejecutará cada vez que se realice un merge en la **rama principal (main)**, construyendo y desplegando tu aplicación en el canal **"live"** de **Firebase Hosting**.

### 3.2. Despliegue durante un Pull Request

Para configurar un despliegue en un canal de vista previa cada vez que se abre un pull request, sigue estos pasos:

Crea un archivo llamado **.github/workflows/firebase-hosting-pr.yml** en tu repositorio.

Agrega el siguiente contenido al archivo:

```
name: Preview Deploy to Firebase Hosting on PR

on:
pull_request:
branches: - main # o 'master' dependiendo de tu rama principal

jobs:
build:
runs-on: ubuntu-latest

    steps:
    - name: Check out the repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'  # o la versión que uses en tu proyecto

    - name: Install dependencies
      run: npm install

    - name: Build the project
      run: npm run build --prod

    - name: Deploy to Firebase Hosting Preview Channel
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: "${{ secrets.GITHUB_TOKEN }}"
        firebaseServiceAccount: "${{ secrets.FIREBASE_SERVICE_ACCOUNT }}"
        projectId: tu-id-de-proyecto-firebase  # Reemplaza con tu ID de proyecto
        channelId: pr-${{ github.event.number }}
        expires: 7d
```

Este flujo de trabajo se ejecutará cada vez que se abra un pull request hacia la rama principal. Creará un canal de vista previa con una URL única que expira en **7 días**.

## 4. Configurar Secretos en GitHub

Para que GitHub Actions pueda desplegar en _Firebase_, debes configurar los secretos necesarios en el repositorio:

**1. FIREBASE_SERVICE_ACCOUNT:** Crea un nuevo secreto en tu repositorio en GitHub que contenga la clave JSON de tu cuenta de servicio de Firebase. Para obtener esta clave:

- Ve a Firebase Console.
- Navega a **"Project Settings"** > **"Service accounts"**.
- Genera una nueva clave privada y descárgala como JSON.
- Copia el contenido del archivo y agrégalo como un secreto llamado **FIREBASE_SERVICE_ACCOUNT** en la configuración de tu repositorio en GitHub.

## 5. Despliegue en Firebase Hosting

Con los flujos de trabajo de GitHub Actions configurados, el despliegue de tu aplicación en Firebase Hosting se realiza automáticamente:

- **Despliegue en la Rama Principal:** El archivo .github/workflows/firebase-hosting-merge.yml se utiliza para desplegar automáticamente cuando hay un merge en la rama principal.
- **Despliegue durante un Pull Request:** El archivo .github/workflows/firebase-hosting-pr.yml se utiliza para desplegar una versión de vista previa cada vez que se crea o actualiza un pull request.

# Estructura del proyecto

```

├── index.html
├── main.ts
├── styles.scss
├── tree.txt
├── app
│ ├── app.component.html
│ ├── app.component.scss
│ ├── app.component.spec.ts
│ ├── app.component.ts
│ ├── app.config.ts
│ ├── app.routes.ts
│ ├── core
│ │ ├── guards
│ │ │ ├── auth.guard.spec.ts
│ │ │ ├── auth.guard.ts
│ │ │ ├── product.guard.spec.ts
│ │ │ └── product.guard.ts
│ │ ├── interceptors
│ │ ├── models
│ │ │ ├── login.model.ts
│ │ │ └── products.model.ts
│ │ └── services
│ │ ├── global.service.spec.ts
│ │ └── global.service.ts
│ ├── features
│ │ ├── auth
│ │ │ ├── components
│ │ │ │ ├── login
│ │ │ │ │ ├── login.component.html
│ │ │ │ │ ├── login.component.scss
│ │ │ │ │ ├── login.component.spec.ts
│ │ │ │ │ └── login.component.ts
│ │ │ │ └── register
│ │ │ │ ├── register.component.html
│ │ │ │ ├── register.component.scss
│ │ │ │ ├── register.component.spec.ts
│ │ │ │ └── register.component.ts
│ │ │ └── services
│ │ │ ├── auth.service.spec.ts
│ │ │ └── auth.service.ts
│ │ ├── cart
│ │ │ ├── components
│ │ │ │ └── cart
│ │ │ │ ├── cart.component.html
│ │ │ │ ├── cart.component.scss
│ │ │ │ ├── cart.component.spec.ts
│ │ │ │ └── cart.component.ts
│ │ │ └── services
│ │ │ ├── cart.service.spec.ts
│ │ │ └── cart.service.ts
│ │ ├── dashboard
│ │ │ ├── components
│ │ │ │ └── dashboard
│ │ │ │ ├── dashboard.component.html
│ │ │ │ ├── dashboard.component.scss
│ │ │ │ ├── dashboard.component.spec.ts
│ │ │ │ └── dashboard.component.ts
│ │ │ └── services
│ │ │ ├── dashboard.service.spec.ts
│ │ │ └── dashboard.service.ts
│ │ ├── not-found
│ │ │ └── not-found
│ │ │ ├── not-found.component.html
│ │ │ ├── not-found.component.scss
│ │ │ ├── not-found.component.spec.ts
│ │ │ └── not-found.component.ts
│ │ ├── products
│ │ │ ├── components
│ │ │ │ ├── product-detail
│ │ │ │ │ ├── product-detail.component.html
│ │ │ │ │ ├── product-detail.component.scss
│ │ │ │ │ ├── product-detail.component.spec.ts
│ │ │ │ │ └── product-detail.component.ts
│ │ │ │ └── product-list
│ │ │ │ ├── product-list.component.html
│ │ │ │ ├── product-list.component.scss
│ │ │ │ ├── product-list.component.spec.ts
│ │ │ │ └── product-list.component.ts
│ │ │ └── services
│ │ │ ├── categories.service.spec.ts
│ │ │ ├── categories.service.ts
│ │ │ ├── product.service.spec.ts
│ │ │ └── product.service.ts
│ │ ├── shared
│ │ │ ├── components
│ │ │ │ ├── footer
│ │ │ │ │ ├── footer.component.html
│ │ │ │ │ ├── footer.component.scss
│ │ │ │ │ ├── footer.component.spec.ts
│ │ │ │ │ └── footer.component.ts
│ │ │ │ ├── header
│ │ │ │ │ ├── header.component.html
│ │ │ │ │ ├── header.component.scss
│ │ │ │ │ ├── header.component.spec.ts
│ │ │ │ │ └── header.component.ts
│ │ │ │ ├── rating
│ │ │ │ │ ├── rating.component.html
│ │ │ │ │ ├── rating.component.scss
│ │ │ │ │ ├── rating.component.spec.ts
│ │ │ │ │ └── rating.component.ts
│ │ │ │ ├── review
│ │ │ │ │ ├── review.component.html
│ │ │ │ │ ├── review.component.scss
│ │ │ │ │ ├── review.component.spec.ts
│ │ │ │ │ └── review.component.ts
│ │ │ │ ├── search-bar
│ │ │ │ │ ├── search-bar.component.html
│ │ │ │ │ ├── search-bar.component.scss
│ │ │ │ │ ├── search-bar.component.spec.ts
│ │ │ │ │ └── search-bar.component.ts
│ │ │ │ └── spinner
│ │ │ │ ├── spinner.component.html
│ │ │ │ ├── spinner.component.scss
│ │ │ │ ├── spinner.component.spec.ts
│ │ │ │ └── spinner.component.ts
│ │ │ ├── directives
│ │ │ ├── pipes
│ │ │ └── services
│ │ │ ├── search-bar.service.spec.ts
│ │ │ └── search-bar.service.ts
│ │ │ ├── spinner.service.spec.ts
│ │ │ └── spinner.service.ts
├── assets
│ ├── css
│ ├── img
│ │ ├── Branding-eagle.png
│ │ ├── logo-eagle.png
│ │ └── sps-logo.png
│ └── svg
├── e2e
└── environments
├── environment.prod.ts
├── environment.staging.ts
└── environment.ts
```
