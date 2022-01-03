const express = require("express")
const app = express()
const path = require("path")
const redditData = require("./data.json")

app.use(express.static(path.join(__dirname, "public")))
app.use((req, res, next) => {
  res.locals.redditData = redditData;
  next();
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params
  const data = redditData[subreddit]
  if (data) {
    res.render("subreddit", { ...data  })
  } else {
    res.render("notfound", { subreddit })
  }
})

app.get("/", (req, res) => {
  res.render("notfound", "Could not find that subreddit category")
})

app.post("/", function (req, res) {
  res.send("post request to the homepage")
})

app.listen(3000, () => {
  console.log("subreddit demo listening on port 3000")
})
