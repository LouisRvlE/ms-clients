import express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user.entity.js";
import { db } from "./db.js";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/users", async function (req: Request, res: Response) {
    try {
        console.log("Fetching users...");
        const users = await db.getRepository(User).find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "An error occurred while fetching users",
        });
    }
});

app.get(
    "/users/:id",
    async function (req: Request<{ id: number }>, res: Response) {
        try {
            const results = await db.getRepository(User).findOneBy({
                id: req.params.id,
            });
            res.send(results);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                error: "An error occurred while fetching the user",
            });
        }
    }
);

app.post("/users", async function (req: Request, res: Response) {
    try {
        const user = db.getRepository(User).create(req.body);
        const results = await db.getRepository(User).save(user);
        res.send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "An error occurred while creating the user",
        });
    }
});

app.put("/users/:id", async function (req: Request, res: Response) {
    try {
        if (isNaN(Number(req.params.id))) {
            res.status(400).send({ error: "Invalid user ID" });
            return;
        }
        const id = parseInt(req.params.id);
        const user = await db.getRepository(User).findOneBy({
            id,
        });
        db.getRepository(User).merge(user, req.body);
        const results = await db.getRepository(User).save(user);
        res.send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "An error occurred while updating the user",
        });
    }
});

app.delete("/users/:id", async function (req: Request, res: Response) {
    try {
        const results = await db.getRepository(User).delete(req.params.id);
        res.send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "An error occurred while deleting the user",
        });
    }
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
