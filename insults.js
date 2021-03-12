




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
    res.render("random-insult", insult)
  } else {
    res.send("Insult not found")
  }
  
}) 

app.get("/insults", (req, res) => {
  res.render("add-insult")
})

app.post("/insults", (req, res) => {
  let newInsult = req.body
  newInsult.id = insults.length
  insults.push(newInsult)
  console.log(insults);
  res.redirect("/")
})



app.get("/:severity", (req, res) => {
  let severity = +req.params.severity
  let filteredInsults = insults.filter(insult => insult.severity === severity)
  let random = Math.floor(Math.random() * filteredInsults.length)
  res.render("random-insult", filteredInsults[random])

})



app.get("/", (req, res) => {
  let random = Math.floor(Math.random() * insults.length)
  res.render("random-insult", insults[random])
})










app.listen(3000, () => {
  console.log("Server started on port 3000");
})