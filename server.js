//npm ninit -y
//npm install express
//npm i axios
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const apiKey = '7721bf92f8decccdjoussfcb7e72704f8f58b1';
const request = require('request');
const pone = 5;
const ptwo = 7;


//set pug template engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//Create folder called view to use html


//get url
app.get('/hello', (req, res) => {
    //res.send('Hello NodeJs')
    //res.render('index', { pone, ptwo });
    res.render('index', { pone: pone, ptwo: ptwo });
});
app.get('/Goodbye', (req, res) => {
    res.render('bye');
})

//Giving a port to the server <>
const server = app.listen(3300, () => {
    console.log('express is running');
});

//Weather aoo
app.post('/', function (req, res) {
    //res.render('index', { pone: pone, ptwo: ptwo });
    //console.log(req.body.city);
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                //convert the weather from F to C
                let weatherconvert = (weather.main.temp - 32) * 5 / 9;
                let weatherText = `It's ${weatherconvert} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    })

})