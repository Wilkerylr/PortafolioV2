# 🧪 Plan Completo de Tests para Portafolio
> Listado organizado por prioridad, tecnologías y paso a paso de implementación

---

## 🎯 Prioridad de Implementación
✅ **CRITICO** -> ⚠️ **ALTA** -> 🟡 **MEDIA** -> 🔵 **BAJA**

---

## 🖥️ TESTS DE BACKEND Y LOGICA (PRIORIDAD PRINCIPAL)

### 🧰 Herramientas Recomendadas:
- **Jest** - Framework de testing principal
- **Supertest** - Testing de endpoints HTTP
- **Sinon** / **Jest Mock** - Mocks y spies
- **dotenv** - Variables de entorno para testing
- **bcryptjs** - Para pruebas de contraseñas
- **jsonwebtoken** - Para validar tokens

---

### ✅ CRITICO - Tests Unitarios (Logica Pura)
| # | Caso de Test | Descripción |
|---|--------------|-------------|
| 1 | `Middleware verificarToken` | ✅ Token ausente devuelve 400<br/>✅ Token formato incorrecto devuelve error<br/>✅ Token expirado devuelve error correcto<br/>✅ Token valido inyecta `req.usuario` y llama `next()`<br/>✅ Maneja correctamente formato `Bearer <token>` y solo token |
| 2 | `Hashing de contraseñas` | ✅ bcrypt.hash genera hash diferente para misma contraseña<br/>✅ bcrypt.compare devuelve true para contraseña correcta<br/>✅ bcrypt.compare devuelve false para contraseña incorrecta |
| 3 | `Generacion JWT` | ✅ Token contiene los campos correctos (id, nombre, email)<br/>✅ Token expira despues de 1 hora<br/>✅ Token se verifica correctamente con el secret |

---

### ⚠️ ALTA - Tests de Endpoints API
#### 🔐 Autenticacion
| # | Caso de Test |
|---|--------------|
| 4 | `POST /api/registro` | <ul><li>✅ Email ya existente devuelve 400</li><li>✅ Contraseña se guarda hasheada NO texto plano</li><li>✅ Campos obligatorios (nombre, email, password) validados</li><li>✅ Email invalido formato maneja error</li><li>✅ Usuario creado devuelve 201 con datos correctos</li></ul> |
| 5 | `POST /api/login` | <ul><li>✅ Usuario no existe devuelve error generico</li><li>✅ Contraseña incorrecta devuelve mismo error</li><li>✅ Login exitoso devuelve token valido</li><li>✅ Campos vacios devuelven 400</li><li>✅ No se devuelve el hash de contraseña en ninguna respuesta</li></ul> |

#### 📦 CRUD Proyectos
| # | Caso de Test |
|---|--------------|
| 6 | `GET /api/proyectos` | <ul><li>✅ Devuelve array incluso si no hay proyectos</li><li>✅ Tags son formateados correctamente como array plano</li><li>✅ Ordenados por created_at descendente</li><li>✅ Respuesta 200 OK</li></ul> |
| 7 | `GET /api/proyectos/:id` | <ul><li>✅ ID existente devuelve proyecto</li><li>✅ ID no existente devuelve error 400</li><li>✅ ID formato invalido maneja error correctamente</li></ul> |
| 8 | `POST /api/proyectos/create` | <ul><li>✅ Datos validos crean proyecto correctamente</li><li>✅ Datos invalidos devuelven error de Supabase</li><li>✅ Campos faltantes manejan error</li></ul> |
| 9 | `PUT /api/proyectos/:id` | <ul><li>✅ Actualizacion parcial funciona</li><li>✅ ID no existente devuelve error</li></ul> |
| 10 | `DELETE /api/proyectos/:id` | <ul><li>✅ Elimina correctamente proyecto existente</li><li>✅ ID no existente devuelve error</li></ul> |
| 11 | `GET /api/repos` | <ul><li>✅ Devuelve listado de repositorios</li><li>✅ Maneja rate limit de GitHub correctamente</li><li>✅ Token de GitHub se usa cuando esta definido</li><li>✅ Error 500 cuando API GitHub falla</li></ul> |

---

### 🛡️ TESTS DE SEGURIDAD (OBLIGATORIOS)
| # | Test | Descripcion |
|---|------|-------------|
| 12 | **Inyeccion SQL/Supabase** | ✅ Intentar enviar caracteres maliciosos en todos los campos<br/>✅ Parametros de consulta se sanitizan correctamente |
| 13 | **Rate Limiting** | ✅ Prevenir ataques de fuerza bruta en login<br/>✅ Limitar cantidad de peticiones por IP |
| 14 | **Headers Seguridad** | ✅ Agregar helmet.js y probar todos los headers de seguridad<br/>✅ CORS configurado correctamente solo para dominios permitidos |
| 15 | **Variables Entorno** | ✅ JWT_SECRET nunca se devuelve en ninguna respuesta<br/>✅ Ninguna clave API se filtra en logs o respuestas |
| 16 | **Bug existente encontrado** | ❗ `DELETE /api/proyectos/:id` tiene doble `res.json()` y `res.status()` -> esto causa error "headers already sent" **TESTEAR ESTO PRIMERO** |

---

### 🧪 Tests de Integración
| # | Caso |
|---|------|
| 17 | Flujo completo: Registro -> Login -> Ruta protegida |
| 18 | Crear proyecto -> Obtener proyecto -> Editar proyecto -> Eliminar proyecto |
| 19 | Manejo de caida de conexion con Supabase |
| 20 | Manejo de caida de API GitHub |

---

## 🎨 TESTS DE FRONTEND E INTERFAZ

### 🛠️ Herramientas Recomendadas Paso a Paso:

#### 📌 Nivel 1: Tests Unitarios Componentes / Hooks
> **Tecnologias**: Vitest + React Testing Library
> ✅ Ya compatible con Vite, no requiere configuracion extra

| # | Caso de Test |
|---|--------------|
| 21 | `useProjects Hook` | <ul><li>✅ Estado inicial: loading = true, error = null, projects = []</li><li>✅ Cuando fetch exitoso: loading pasa a false, projects llenos</li><li>✅ Cuando falla fetch: loading pasa a false, error seteado</li><li>✅ Maneja correctamente respuesta que no es array</li><li>✅ Transformacion de datos funciona correctamente (nombre -> title, etc)</li></ul> |
| 22 | `useGithubRepos Hook` | Mismos casos que useProjects |
| 23 | **Componentes** | <ul><li>✅ ProjectCard renderiza correctamente con props</li><li>✅ Navbar se abre/cierra correctamente</li><li>✅ Hero muestra todos los elementos</li><li>✅ Loading state muestra skeleton correctamente</li><li>✅ Error state muestra mensaje adecuado</li></ul> |

---

#### 📌 Nivel 2: Tests de Integración Frontend
> **Tecnologias**: Vitest + MSW (Mock Service Worker)
> ✅ Simula la API real sin modificar codigo

| # | Test |
|---|------|
| 24 | Pagina de proyectos carga correctamente cuando API responde OK |
| 25 | Pagina muestra estado de error cuando API falla |
| 26 | Busqueda / Filtrado de proyectos funciona |
| 27 | Navegacion entre rutas funciona correctamente |

---

#### 📌 Nivel 3: Tests E2E (End to End)
> **Tecnologias**: Playwright
> ✅ Mejor opcion actualmente, mas rapido que Cypress, multi navegador nativo

| # | Caso E2E |
|---|----------|
| 28 | Usuario entra a la pagina, ve proyectos cargados |
| 29 | Click en proyecto abre detalle correctamente |
| 30 | Filtrado por tags funciona |
| 31 | Responsividad: pagina funciona en mobile, tablet y desktop |
| 32 | Todos los links externos abren correctamente |
| 33 | Dark mode / Light mode cambia correctamente |
| 34 | Formulario de contacto envía mensaje correctamente |

---

## 🚀 PASO A PASO DE IMPLEMENTACION

### 1️⃣ Setup Testing Backend
```bash
cd api
npm install --save-dev jest supertest @types/jest cross-env
```

Agregar en `api/package.json`:
```json
"scripts": {
  "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

Crear archivo `jest.config.js` en api:
```javascript
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  verbose: true
}
```

---

### 2️⃣ Estructura de Carpetas Recomendada
```
api/
└── tests/
    ├── unit/
    │   ├── middleware.test.js
    │   ├── auth.test.js
    │   └── jwt.test.js
    ├── integration/
    │   ├── auth-flow.test.js
    │   └── proyectos-crud.test.js
    └── e2e/
        └── api.test.js

frontend/
└── tests/
    ├── hooks/
    │   ├── useProjects.test.js
    │   └── useGithubRepos.test.js
    ├── components/
    │   ├── ProjectCard.test.jsx
    │   └── Navbar.test.jsx
    └── e2e/
        └── playwright/
```

---

### 3️⃣ Setup Testing Frontend
```bash
cd frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

---

### 4️⃣ Setup Playwright
```bash
npm init playwright@latest
```

---

## 📊 Metricas Objetivo
- **Cobertura de codigo Backend**: > 85%
- **Cobertura de codigo Frontend**: > 70%
- **Todos los tests criticos pasan antes de cada deploy**
- **Pipeline CI/CD**: Ejecutar todos los tests automaticamente en cada PR

---

## ⚠️ Bugs Encontrados Durante Analisis
1. ❗ Endpoint DELETE `/api/proyectos/:id` tiene doble respuesta:
   ```javascript
   res.json({ message: 'Proyecto eliminado', proyectos: data });
   res.status(200).json({ proyectos: data });
   ```
   Esto causa error `Cannot set headers after they are sent to the client`
   **ESTE DEBERIA SER TU PRIMER TEST**

2. ❗ Middleware verificarToken usa `jws` como variable pero importa `jsonwebtoken` (typo)

3. ❗ Endpoint `/api/proyectos/create`, `PUT`, `DELETE` NO tienen proteccion de autenticacion! Cualquiera puede modificar/eliminar tus proyectos.

---

## ✅ Checklist de Primeros Pasos
- [ ] Corregir el bug del doble response en DELETE
- [ ] Instalar Jest + Supertest en backend
- [ ] Escribir primer test para middleware verificarToken
- [ ] Escribir tests para login y registro
- [ ] Agregar proteccion JWT a los endpoints de escritura
- [ ] Instalar Vitest en frontend
- [ ] Escribir test para useProjects hook