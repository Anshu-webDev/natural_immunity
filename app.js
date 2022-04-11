const express = require('express');
const bodyParse = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const exphbs = require('express-handlebars');
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(express.static('public'));

app.engine('html', exphbs.engine({
    extname: '.html',
    defaultLayout: false
}));

app.set('view engine', 'ejs');

const connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'natural',
});

connection.getConnection((err, result) => {
    if (err) throw err;
    console.log("connected as ID" + result.threadId);
})

app.get('', (req, res) => {
    res.render('index', { name: "Anshu" });

});
app.get('/about', (req, res) => {
    res.render('about');

});
app.get('/signup', (req, res) => {
    res.render('signup');

});
app.get('/contact', (req, res) => {
    res.render('contact');

});

app.post('/register', (req, res) => {
    const { name, email, pswd } = req.body;

    // connection.query("Select * from users", (err, row) => {
    //     if (!err) {
    //         console.log(row);
    //     }
    // })
    connection.query('select email from users where email = ? OR name = ?', [email, name],
        (err, result) => {
            const emailNotExist = Object.entries(result).length === 0;
            if (emailNotExist) {
                connection.query('INSERT INTO `users` ( `name`, `email`, `password`) VALUES (?, ?, ?)',
                    [name, email, pswd],
                    (err, result) => {
                        if (err) return reject(err);
                        res.render('index-2');
                    });
            } else if (err) return reject(err);
            else res.send('Email or Username already exist');
        });
    res.send("Html");
})








app.listen(port, () => console.log('server started succesfulluy on port', port));

