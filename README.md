# Product Microservice

## Dev
1. Clonar el repositorio
2. Instalar dependencias
3. Crear un archivo `.env` basado en el `env.template`
4. Levantar la base de datos con `docker compose up -d`
5. Ejecutar el script `npm run "db:reset-migrate"`
6. Levantar el servidor de NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
7. Ejecutar `npm run start:dev`