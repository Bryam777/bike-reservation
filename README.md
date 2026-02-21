# Sistema de Reserva de Bicicletas

Sistema web para reservar bicicletas por hora en diferentes estaciones.

## Tecnologías utilizadas

- **Next.js 14** — Framework principal
- **TypeScript** — Tipado estático
- **Supabase** — Base de datos PostgreSQL
- **Tailwind CSS** — Estilos
- **Vercel** — Despliegue

## Arquitectura

Se utilizó una arquitectura por capas inspirada en principios SOLID, separando presentación,
dominio, lógica de negocio y acceso a datos para mejorar mantenibilidad y escalabilidad.

Se utilizó un campo booleano para la disponibilidad de la bicicleta, ya que el dominio solo requiere
distinguir si está disponible o no. Un enum se consideró innecesario
para el alcance actual y se priorizó simplicidad.

- **domain/** — Modelos e interfaces del negocio
- **repositories/** — Acceso a datos con Supabase
- **services/** — Lógica de negocio
- **app/api/** — Endpoints de la API
- **app/** — Interfaz visual

## Cómo levantar el proyecto

1. Clona el repositorio:
   git clone https://github.com/Bryam777/bike-reservation.git

2. Instala las dependencias:
   npm install

3. Crea el archivo .env.local en la raíz del proyecto:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=

4. Inicia el servidor:
   npm run dev

5. Abre en el navegador:
   http://localhost:3000

## Ramas del proyecto
Las ramas se organizaron por funcionalidades para reflejar el flujo de negocio,
permitiendo integrar cada feature de forma independiente siguiendo buenas prácticas
de Git Flow simplificado.

Se agregó una rama adicional para aislar la implementación del flujo de reservas,
ya que representa un caso de uso independiente dentro del dominio, facilitando revisiones
y pruebas incrementales.

| main | Rama principal con todo el código |
| feature/listar-bicicletas | Listado de estaciones y bicicletas |
| feature/reservations | Flujo completo de reservas |
| feature/admin | CRUD de bicicletas |

## Base de datos

NOTA: Por manejar Supabase, solo se puede hacer consultas SELECT, ya que demas operaciones
se necesita privilegios para hacerlas, por ende, NO se puede eliminar, actualizar y crear.

El sistema utiliza Supabase como base de datos y está estructurado en cuatro tablas
principales que representan las entidades clave del dominio.

- **usuarios** — Datos de los usuarios
Almacena la información de las personas que interactúan con la plataforma.

- **estaciones** — Puntos de retiro de bicicletas
Representa los puntos físicos donde se pueden retirar y devolver bicicletas.

- **bicicletas** — Inventario de bicicletas
Contiene el inventario de bicicletas disponibles en el sistema.

- **reservas** — Historial de reservas
Registra el historial de préstamos de bicicletas.

## Decisiones técnicas

Durante el desarrollo del proyecto se tomaron las siguientes decisiones con el objetivo de garantizar mantenibilidad,
escalabilidad y claridad en la arquitectura.

- **Clean Architecture** para separar responsabilidades
Se implementó una estructura basada en Clean Architecture, permitiendo:

- Separación clara entre dominio, aplicación e infraestructura
- Independencia del framework
- Mayor facilidad para pruebas unitarias
- Escalabilidad del sistema

Esto asegura que la lógica de negocio permanezca aislada de detalles externos como la base de datos o la interfaz.

- **bigserial** como IDs para mayor legibilidad
Se utilizaron claves primarias tipo bigserial en la base de datos para:

- Garantizar unicidad sin lógica adicional
- Mejor legibilidad y simplicidad en relaciones
- Evitar colisiones en escenarios de crecimiento

- **DTOs** para controlar los datos de entrada
Se emplearon DTOs para el manejo de datos de entrada y salida, con el fin de:

- Validar información antes de llegar al dominio
- Evitar exponer entidades directamente
- Mantener contratos claros entre capas

- **Ramas por funcionalidad** para facilitar revisiones
Se trabajó con una estrategia de ramas por funcionalidad (feature branches), lo que permitió:

- Aislar cambios
- Facilitar revisiones de código
- Mantener un historial más limpio
- Reducir conflictos al integrar