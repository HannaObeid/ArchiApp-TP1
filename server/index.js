const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let counter = 0;

// Routes
app.get("/", (req, res) => {
    res.send("Hello")
})

// ------------------------------
app.get('/test/*', (req, res) => {
    const parm = req.params[0];

    const responseObject = { msg: parm };

    res.json(responseObject);
});

app.get("/cpt/query", (req, res) => {
    res.json({ value: counter });
});

app.get("/cpt/inc", (req, res) => {
    const incrementValue = parseInt(req.query.v);

    if (req.query.v && isNaN(incrementValue)) {
        res.json({ code: -1 });
    } else {
        counter += incrementValue || 1;

        res.json({ code: 0 });
    }
});

// ------------------------------
const allMsgs = ["Hello World", "foobar", "CentraleSupelec Forever"];

app.get("/msg/getAll", (req, res) => {
    res.json(allMsgs);
});

app.get("/msg/nber", (req, res) => {
    res.json(allMsgs.length);
});

app.post("/msg/:message", (req, res) => {
    const newMessage = decodeURIComponent(req.params.message);
    allMsgs.push(newMessage);
    const msgNumber = allMsgs.length - 1;
    res.json({ code: 1, msgNumber });
});

app.get("/msg/:number", (req, res) => {
    const msgNumber = parseInt(req.params.number);
    if (!isNaN(msgNumber) && msgNumber >= 0 && msgNumber < allMsgs.length) {
        res.json({ code: 1, msg: allMsgs[msgNumber] });
    } else {
        res.json({ code: 0 });
    }
});

app.delete("/msg/:number", (req, res) => {
    const msgNumber = parseInt(req.params.number);
    if (!isNaN(msgNumber) && msgNumber >= 0 && msgNumber < allMsgs.length) {
        allMsgs.splice(msgNumber, 1);
        res.json({ code: 1 });
    } else {
        res.json({ code: 0 });
    }
});

app.listen(8080);
console.log("App listening on port 8080...");

