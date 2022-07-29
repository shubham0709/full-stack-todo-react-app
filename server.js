const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    let dbData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    res.send(JSON.stringify(dbData));
})

app.post("/", (req, res) => {
    let dbData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let payload = req.body;

    dbData.todos.push({ ...payload, id: Math.random() * Math.random() })
    let updatedData = JSON.stringify(dbData);

    fs.writeFile("./db.json", updatedData, { encoding: "utf-8" }, (err, response) => {
        console.log(response);
    });
    res.send(payload);
})

app.patch("/", (req, res) => {
    let dbData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let payload = req.body;

    let temp = dbData.todos.map((x, i) => {
        return (x.id === payload.id) ? { ...x, ...payload } : x;
    })

    dbData.todos = temp;
    let updatedData = JSON.stringify(dbData);

    fs.writeFile("./db.json", updatedData, { encoding: "utf-8" }, (err, response) => {
        console.log(response);
    });
    res.send(payload);
})

app.put("/", (req, res) => {
    let dbData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let payload = req.body;
    let newID = Math.random() * Math.random();
    let temp = dbData.todos.map((x, i) => {
        return (x.id === payload.id) ? { ...payload, id: newID } : x;
    })

    dbData.todos = temp;
    let updatedData = JSON.stringify(dbData);

    fs.writeFile("./db.json", updatedData, { encoding: "utf-8" }, (err, response) => {
        console.log(response);
    });
    res.send({ ...payload, id: newID });
})

app.delete("/", (req, res) => {
    let dbData = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let payload = req.body;

    let temp = dbData.todos.filter((x, i) => (x.id !== payload.id));

    dbData.todos = temp;
    let updatedData = JSON.stringify(dbData);

    fs.writeFile("./db.json", updatedData, { encoding: "utf-8" }, (err, response) => {
        console.log(response);
    });
    res.send(payload);
})

app.get("*", (req, res) => {
    res.setHeader("Content-Type: text/html");
    res.send("<h1>ERROR PAGE! invalid request</h1>")
})

app.listen(PORT, () => {
    console.log("server started at PORT : ", PORT);
})
