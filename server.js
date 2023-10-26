const app = require("./app.js");
const port = process.env.PORT || 5555;

app.get("/", (req, res) => {
    res.send("Welcome to the Budgtr Budgeting App.");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});