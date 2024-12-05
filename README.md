# ms-clients

**1. Get all users:**

```bash
curl http://localhost:3000/users
```

**2. Get a specific user:**

```bash
curl http://localhost:3000/users/1
```

**3. Create a new user:**

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{ "name": "New User", "email": "newuser@example.com" }'
```

**4. Update a user (partial update):**

```bash
curl -X PUT http://localhost:3000/users/2 -H "Content-Type: application/json" -d '{ "email": "updatedemail@example.com" }'
```

**5. Delete a user:**

```bash
curl -X DELETE http://localhost:3000/users/3  # Replace 3 with the actual user ID
```
