import { DataSource } from "typeorm";

const { DB_HOST, MYSQL_TCP_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
    process.env;

export const db = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(MYSQL_TCP_PORT),
    username: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    entities: ["dist/entity/*.js"],
    logging: true,
    synchronize: true,
});

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        console.log("total of ", db.entityMetadatas.length, "entities");
        db.entityMetadatas.forEach((entity) => {
            console.log("Entity:", entity.name);
        });
        db.runMigrations();
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
