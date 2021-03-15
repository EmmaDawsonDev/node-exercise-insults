// Shakespeare Insult Generator
// Manipulate insults.json so that each insult as a unique ID. Build a web site that uses manipulated insults.json and renders a random insult.

// EndPoints
// GET / - Renders a random insult

// GET /:severity - Renders a random insult with supplied severity

// Level Up
// GET /insults - Serves a form to create a new insult

// POST /insults - Creates a new insult with a form

// GET /insults/:id - Renders a form to update a given insult

// POST /insults/:id - Updates the insult with supplied ID

const express = require("express")
const insultsObject = require("./insults.json")

const insults = insultsObject.insults.map((insult, index) => ({...insult, id: index}))



const app = express()
app.use(express.static("public"))
app.use(express.urlencoded())
app.set("view engine", "ejs")

app.get("/insults/:id", (req, res) => {
  const insult = insults.find(insult => insult.id === +req.params.id)
  if (insult) {
    res.render("add-insult", {insult})
  } else {
    res.send("Insult not found")
  }
  
}) 


app.post("/insults/:id", (req, res) => {
  const insultIndex = insults.findIndex(insult => insult.id === +req.params.id)
  let updatedInsult = req.body
  updatedInsult.id = +req.params.id;
  insults.splice(insultIndex, 1, updatedInsult)
  
  res.redirect("/")
})


app.get("/insults", (req, res) => {
  res.render("add-insult", {insult: null})
})


app.post("/insults", (req, res) => {
  let newInsult = req.body
  newInsult.id = insults.length
  insults.push(newInsult)
  res.redirect("/")
})


app.get("/:severity", (req, res) => {
  let severity = +req.params.severity
  let filteredInsults = insults.filter(insult => insult.severity === severity)
  let random = Math.floor(Math.random() * filteredInsults.length)
  if (filteredInsults.length > 0) {
    res.render("random-insult", filteredInsults[random])
  }
  else {
    res.send(`No insults found with severity ${severity} `)
  }
  

})


app.get("/", (req, res) => {
  let random = Math.floor(Math.random() * insults.length)
  res.render("random-insult", insults[random])
})


app.listen(3000, () => {
  console.log("Server started on port 3000");
})