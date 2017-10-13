const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toDateString();
    console.log(`${now} ${req.method}: ${req.path}`);
    fs.appendFile('server.log', `${now} ${req.method}: ${req.path}\n`);
    if(req.path === '/maintanence') {
        res.render('maintanence.hbs')
    } else {
        next();
    }
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to Chandru's homepage"
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to process",
        code: 400
    });
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {
        welcomeMessage: "This is my projects page"
    });
})

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});