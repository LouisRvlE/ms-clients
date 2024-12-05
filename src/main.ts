import express from "express";
import { Request, Response } from "express";
import { Product } from "./entity/product.entity.js";
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

app.get("/products", async function (req: Request, res: Response) {
    const products = await db.getRepository(Product).find();
    res.json(products);
});

app.get(
    "/products/:id",
    async function (req: Request<{ id: number }>, res: Response) {
        const results = await db.getRepository(Product).findOneBy({
            id: req.params.id,
        });
        res.send(results);
    }
);

app.post("/products", async function (req: Request, res: Response) {
    const product = db.getRepository(Product).create(req.body);
    const results = await db.getRepository(Product).save(product);
    res.send(results);
});

app.put("/products/:id", async function (req: Request, res: Response) {
    if (isNaN(Number(req.params.id))) {
        res.status(400).send({ error: "Invalid product ID" });
    }
    const id = parseInt(req.params.id);
    const product = await db.getRepository(Product).findOneBy({
        id,
    });
    db.getRepository(Product).merge(product, req.body);
    const results = await db.getRepository(Product).save(product);
    res.send(results);
});

app.delete("/products/:id", async function (req: Request, res: Response) {
    const results = await db.getRepository(Product).delete(req.params.id);
    res.send(results);
});

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
