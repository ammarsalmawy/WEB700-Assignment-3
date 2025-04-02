/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Loubna Almoussallam Student ID: 114741242 Date: 11 April, 2025
*
* Published URL: https://web-700-assignment-3-two.vercel.app/
*
********************************************************************************/

const LegoData = require("./Modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const path = require('path');

const app = express(); 
const HTTP_PORT = process.env.PORT || 8080;
app.set('view engine', 'ejs');

app.set('views', __dirname + '/Views');

app.use(express.static(__dirname + '/public'));



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


legoData.initialize()
  .then(() => {
    console.log("Initialization successful");
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

  })
  .catch((error) => console.error(error));



app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/about', (req, res) => {
    res.render('about');
  });

  app.get('/lego/sets', async (req, res) => {
    let sets;
    try {
        const theme = req.query.theme; 
    
        
        if (theme) {

       

          sets = await legoData.getSetsByTheme(theme);
          res.render('sets', {sets:sets});
          
        } else {
          sets = await legoData.getAllSets();
          res.render('sets', {sets: sets});
        }
    
      } catch (err) {
      
        res.render("404", {message: err});

      }
    
  });

  app.get('/lego/sets/:set_num', async (req, res) => {
    let sets;
    try {

        const num = req.params.set_num; 
        
        
        
          sets = await legoData.getSetByNum(num);
          res.render('set', {sets:sets});
          
        
    
      } catch (err) {
      
        res.render("404", {message: err});

      }
    
  });
  app.get('/lego/addSet', async(req, res) => {

    let themes;
    try{

      themes = await legoData.getAllThemes();
          res.render('addSets', {themes:themes});
          
    }
    catch(err){
      res.render("404", {message: err});
    }

});
app.post('/lego/addSet', async(req, res) => {

  try{
    const newSet = req.body;
    await legoData.addSet(newSet);
    res.redirect('/lego/sets');
  }
  catch(err){
    res.status(500).render("500", {message: err});
  }
});

app.get("/lego/deleteSet/:set_num",async (req,res)=>{
  try{
  await legoData.deleteSetByNum(req.params.set_num);
  res.redirect("/lego/sets");
  }catch(err){
    res.render("404", {message: err});
  }
  });


  app.use((req, res) => {
    res.render("404", {message: 'Page Not Found!'});
});