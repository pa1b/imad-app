var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user : 'pavanbellamkonda98',
  database : 'pavanbellamkonda98',
  host : 'db.imad.hasura.io',
  port : '5432',
  password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var counter = 0;

var names = [];
app.get('/submit-name', function (req, res) { //URL : /submit-name?name=xxxx
    //Get name
    var name = req.query.name ;
    
    names.push(name) ;
    res.send(JSON.stringify(names));
});


var articles = {
 'article-one' : {
    title : 'Article One | Pavan B',
    heading : 'Article One',
    date : 'Aug 26, 2017',
    content :`<p>
            This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
        </p>
        <p>
            This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
        </p>
        <p>
            This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.This is the content of article one.
        </p>` 
},
 'article-two' : {
        title : 'Article Two | Pavan B',
        heading : 'Article Teo',
        date : 'Aug 26, 2017',
        content :`<p>
            This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.
        </p>
        <p>
            This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.
        </p>
        <p>
            This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.This is the content of article two.
        </p>` 
    
}
};
function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate = `
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href='/'>Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>

`;
return htmlTemplate; 
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
   pool.query('SELECT * FROM test', function(err, result){
       if (err){
           res.status(500).send(err.toString());
           
       } else {
           res.send(JSON.stringify(result));
       }
   }); 
});

app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});


/*app.get('/article-one',function(req,res){
    res.send(createTemplate(articles['article-one']));
});
app.get('/article-two',function(req,res){
    res.send(createTemplate(articles['article-two']));
}); */



app.get('/:articleName',function(req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});





app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});







// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
