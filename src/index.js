const express = require("express");
const PORT = process.env.PORT || 3002 
const app = express() 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));
}
app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now listening on port ${PORT}`)
}); 

