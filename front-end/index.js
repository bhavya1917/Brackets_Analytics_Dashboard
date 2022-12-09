const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const athenaHandler = require("athena_handler.js");

// this is to tell express that static content is available
// on the directory 'public' to render
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.urlencoded({ extended: true }));

// setting the view engine
app.set("view engine", "ejs");

// URL Route mappings
app.get("/", (req, res) => {
    res.render("index"); // index refers to index.ejs
});

app.get("/map", (req, res) => {
    res.render("map"); // index refers to index.ejs
});

app.get("/predictions", (req, res) => {
    res.render("predictions"); // index refers to index.ejs
});

app.get("/event_metrics", (req, res) => {
    res.render("event_metrics"); // index refers to index.ejs
});

//AJAX Request Handling to render the data back
// User Metrics
// Getting active users
app.post("/getActiveUsers", (req, res) => {
    const result = athenaHandler.getting_active_users
    res.json({
       labels: result.labels,
       data: result.data 
    });
});

// Getting returning users
app.post("/getReturningUsers", (req, res) => {
    const result = athenaHandler.getting_returning_users
    res.json({
       labels: result.labels,
       data: result.data  
    });
});

// Getting per platform users
app.post("/perPlatformUsers", (req, res) => {
    const result = athenaHandler.getting_per_platform_users
    res.json({
       labels: result.labels,
       data: result.data 
    });
});

// Getting top countries 
app.post("/getTopCountries", (req, res) => {
    const result = athenaHandler.getting_top_countries
    res.json({
       labels: result.labels,
       data: result.data
    });
});




//User Action Metrics

// Most common user action performed
app.post("/getUserAction", (req, res) => {
    const result = athenaHandler.getting_user_action
    console.log("/getUserAction " + req.body.data);
    res.json({
       labels: result.labels,
       data: result.data 
    });
});

// Top Programming Languages being used
app.post("/topProgrammingLanguages", (req, res) => {
    const result = athenaHandler.getting_top_programming_languages
    console.log("/topProg " + req.body.data);
    res.json({
       labels: result.labels,
       data: result.data 
    });
});

// Getting count of users who performed live preview
app.post("/getLivePreview", (req, res) => {
    const result = athenaHandler.getting_live_preview
    console.log("/live " + req.body.data);
    res.json({
       labels: result.labels,
       data: result.data  
    });
});

// this method calls user's prediction
app.post("/getUsersPrediction", (req, res) => {
    const result = athenaHandler.getting_user_prediction
    console.log("/UsersPrediction " + req.body.data);
    res.json({
       labels: result.labels,
       data: result.data 
    });
});

//Server Listen with Port number
app.listen(port, () => {
  console.log("server started on port 3000");
});