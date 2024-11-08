# conectenemos nuestra base de datos

Vamos a conectar nuestra base de datos MongoDB. Usaremos Prisma para la interacción con la base de datos, lo que nos permitirá abstraernos del trabajo directo con SQL o NoSQL. Solo nos centraremos en escribir código.

En los siguientes enlaces encontrarán más detalles sobre Prisma y MongoDB (Atlas):

- [visia prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/mongodb/connect-your-database-typescript-mongodb)  |  
- [visia mongo(atlas)](https://www.mongodb.com/docs/atlas/)
 
En este caso, usaremos MongoDB Atlas, que realiza configuraciones automáticamente, como la configuración del replica set que es tediosa, mongoDB Atlas la va a manejar por nosotros.


<h2>conecxion de url</h2>
<p>en el aerchivo .env tendran algo como esto</p>

```ts
# esto es ejemplo de una conexion local
// DATABASE_URL="mongodb://localhost:27017/miBaseDeDatosLocal"

# url que vamos a obtener la url de mongodb(atlas)
DIRECT_DATABASE_URL="mongodb+srv://<username>:<password>@clustertest.mmcuh.mongodb.net/DBpoloIT?retryWrites=true&w=majority"
```

<h2>obtener la url de mongodb(atlas)</h2>

<p>primero van a tendran que registrase y despues tener en cuenta que</p>

- el cluster de mongo ya esta creada con la base de datos
- los permisos para que podamos maneajar la base de datos ya estan credas
- se les asigana un usuario y contraseña

```ts
# la url se las paso por privado y iria en esta variable en el archivo .env
DIRECT_DATABASE_URL="mongodb+srv://<username>:<password>@clustertest.mmcuh.mongodb.net/myDBdata?retryWrites=true&w=majority"
```

<h2>la base de datos necesitara su ip publica para que tenga permisos</h2>
<p>se le pasa la ip publica al que este administrando el cluster para que agregue la red donde se la base de datos permitira la conexion</p>

<h2>Comandos para sincronizar el esquema y aplicar cambios</h2>

```bash
# Sincroniza el archivo schema.prisma con el esquema actual
bunx prisma db pull
# Envía los cambios del archivo schema.prisma a la base de datos.
bunx prisma db push
```

<h2>Consideraciones</h2>

<p>Una de las cosas que por las dudas lo digo estamos trabajando sin tener que instalar nada en nuestra maquina, la base de datos ya esta en produccion los cambios que se hagab impactaran directamente, lo cual no es importante en esta ocasion</p>

<p>Si por alguna razon quieren Trabajan en modo de desarrollo de manera local y despues hacer los cambios van a tener que intalar mongodb en su maquina</p>
