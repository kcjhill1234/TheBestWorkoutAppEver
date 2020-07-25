const express = require("express")
const PORT = process.env.PORT || 3002 
const app = express() 
const api = require ("./api/api")
// api();
app.listen(PORT, () => {
    console.log(`API server now listening on port ${PORT}`)
}); 