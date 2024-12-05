# ms-clients

**1. Get all products:**

```bash
curl http://localhost:3002/products
```

**2. Get a specific product:**

```bash
curl http://localhost:3002/products/1
```

**3. Create a new product:**

```bash
curl -X POST http://localhost:3002/products -H "Content-Type: application/json" -d '{ "name": "New Product", "price": 19.99 }'
```

**4. Update a product (partial update):**

```bash
curl -X PUT http://localhost:3002/products/2 -H "Content-Type: application/json" -d '{ "price": 24.99 }'
```

**5. Delete a product:**

```bash
curl -X DELETE http://localhost:3002/products/3  # Replace 3 with the actual product ID
```
