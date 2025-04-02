/********************************************************************************
* WEB700 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Loubna Almoussallam Student ID: 114741242 Date: 30 Jan, 2025
********************************************************************************/
require('dotenv').config();
require('pg');
const Sequelize = require('sequelize');

class LegoData{

  sequelize
  Set
  Theme
  
     constructor()
     {
        this.sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
          host: process.env.PGHOST,
          dialect: 'postgres',
          port: 5432,
          dialectOptions: {
            ssl: { rejectUnauthorized: false },
          },
        });

        this.Theme = this.sequelize.define('Theme', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          }, 
          name: Sequelize.STRING
        });

        this.Set = this.sequelize.define('Set', {
          set_num: {
            type: Sequelize.STRING,
            primaryKey: true,
          }, 
          name: Sequelize.STRING,
          year: Sequelize.INTEGER,
          num_parts: Sequelize.INTEGER,
          theme_id: Sequelize.INTEGER,
          img_url: Sequelize.STRING
        });
        this.Set.belongsTo(this.Theme, {foreignKey: 'theme_id'});

     }

     initialize()
     {  
      return new Promise((resolve,reject)=>{
        this.sequelize.sync()
        .then(() => {
          resolve('Database connection successful');
        })
        .catch((err) => {
          reject('Database connection failed');
        });
   

      });

     }

     getAllSets()
     {
      return new Promise((resolve,reject)=>{
        this.Set.findAll({include: this.Theme})
        .then((sets) => {
          resolve(sets);
        })
        .catch((err) => {
          reject('No objects found');
        });
      });

     }

     getSetByNum(setNum)
     {
      return new Promise((resolve,reject)=>{
        
        this.Set.findAll({where: {set_num: setNum}, include: this.Theme})
        .then((set) => {
          resolve(set[0]);
        })
        .catch((err) => {
          reject('Error with getSetByNum: Unable to find requested set');
        });
      }
     );
       
     }

     getSetsByTheme(theme)
     {
      return new Promise((resolve,reject)=>{

        this.Set.findAll({include: [this.Theme], where: {
          '$Theme.name$': {
          [Sequelize.Op.iLike]: `%${theme}%`
          }
         }})
        .then((sets) => {
          resolve(sets);
        }
        )    
        .catch((err) => {
          reject('Error with getSetsByTheme: Unable to find requested set');
        });     
      });
    }
     async addSet(newSet)
     {
      
      return new Promise((resolve,reject)=>{
        
          this.Set.create(newSet)
          .then((set) => {
            resolve('Set added successfully!');
          })
          .catch((err) => {
            reject( err.errors[0].message);
          });
        }
      );
     
     }

    
//For themes
getAllThemes()
{
 return new Promise((resolve,reject)=>{
    this.Theme.findAll()
    .then((themes) => {
      resolve(themes);
    })
    .catch((err) => {
      reject('No objects found');
    });
 });

}




async deleteSetByNum(setNum){
  
  return new Promise((resolve,reject)=>{
    this.Set.destroy({where: {set_num: setNum}})
    .then((set) => {
      resolve('Set deleted successfully!');
    })
    .catch((err) => {
      reject(err.errors[0].message);
    });
  });

}
}
module.exports = LegoData;
