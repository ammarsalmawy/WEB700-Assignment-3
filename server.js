const LegoData = require("./Modules/legoSets");
const legoData = new LegoData();
const express = require('express');
const path = require('path');

const app = express(); 
const HTTP_PORT = process.env.PORT || 8080;

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));



legoData.initialize()
  .then(() => {
    console.log("Initialization successful");
    app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

  })
  .catch((error) => console.error(error));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Views/home.html'));
  });

  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
  });

  app.get('/lego/sets', async (req, res) => {
    let sets;
    try {
        const theme = req.query.theme; 
    
        
        if (theme) {
          sets = await legoData.getSetsByTheme(theme);
          res.send(sets);
          
        } else {
          sets = await legoData.getAllSets();
          res.send(sets);
        }
    
      } catch (error) {
      
        res.sendFile(path.join(__dirname, '/views/404.html'));

      }
    
  });

  app.get('/lego/sets/:set_num', async (req, res) => {
    let sets;
    try {

        const num = req.params.set_num; 
        
        
        
          sets = await legoData.getSetByNum(num);
          res.send(sets);
          
        
    
      } catch (error) {
      
        res.sendFile(path.join(__dirname, '/views/404.html'));

      }
    
  });
