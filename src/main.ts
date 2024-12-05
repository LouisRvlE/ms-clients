import express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity.js";
import { db } from "./db.js";
import * as dotenv from "dotenv";
dotenv.config();

console.log("coucou", process.env);

db.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

const app = express();
app.use(express.json());

app.get("/users", async function (req: Request, res: Response) {
    const users = await db.getRepository(User).find();
    res.json(users);
});

app.get(
    "/users/:id",
    async function (req: Request<{ id: number }>, res: Response) {
        const results = await db.getRepository(User).findOneBy({
            id: req.params.id,
        });
        res.send(results);
    }
);

app.post("/users", async function (req: Request, res: Response) {
    const user = db.getRepository(User).create(req.body);
    const results = await db.getRepository(User).save(user);
    res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
    if (isNaN(Number(req.params.id))) {
        res.status(400).send({ error: "Invalid user ID" });
    }
    const id = parseInt(req.params.id);
    const user = await db.getRepository(User).findOneBy({
        id,
    });
    db.getRepository(User).merge(user, req.body);
    const results = await db.getRepository(User).save(user);
    res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await db.getRepository(User).delete(req.params.id);
    res.send(results);
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
