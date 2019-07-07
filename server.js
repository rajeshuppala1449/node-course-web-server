var express=require('express');
var hbs=require('hbs');
var fs=require('fs');

var app=express();
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log=`${now} ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to file');
        }
    });
    next();  //to transfer request to next handlers, if next() is not caalled then handlers after this are not executed. 
});

//app.use((req,res,next)=>{
//    res.render('maintanence');
//})

//express reading static files
app.use(express.static(__dirname+'/public'));

//partials
hbs.registerPartials(__dirname+'/views/partials');

//helper functions
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.get('/',(req,res)=>{

    res.render('home',{
        title:'Home Page',
        msg:'Welcome',
        currentYear:new Date().getFullYear()
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        msg:'Know About Us ',
        currentYear:new Date().getFullYear()
    });
})

app.listen(3000);


