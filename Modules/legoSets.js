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

class LegoData{

     sets;
     constructor()
     {
        this.sets= [];
     }

     initialize()
     {  
      return new Promise((resolve,reject)=>{
        const setDat = require("../Data/setData"); 
        const themeData = require("../Data/themeData"); 

        let i=0;
        for(i=0;i<setDat.length;i++)
        {
            this.sets.push(setDat[i]);
        }

        this.sets.forEach(obj => {
         const matchingProperties = themeData.find((theme) => theme.id === obj.theme_id);
     
         if (matchingProperties) {
             obj.theme = matchingProperties.name; 
             resolve('the sets array is filled with objects');
         }
         else{
          reject('unable to fill the sets array!');
         }
       });

      });

     }

     getAllSets()
     {
      return new Promise((resolve,reject)=>{
        if(this.sets !=null)
        {
          resolve(this.sets);
        }
        else{
          reject('No objects!');
        }
      });

     }

     getSetByNum(setNum)
     {
      return new Promise((resolve,reject)=>{
        
        const result = this.sets.find(({ set_num }) => set_num === setNum);
        if(result != null)
        {
          resolve(result);
        }
        else
        {
          reject('Error with getSetByName: Unable to find requested set');
        }
     });
       
     }

     getSetsByTheme(theme)
     {
      return new Promise((resolve,reject)=>{

        const result1 = this.sets.filter((obj) => obj.theme.toLowerCase().includes(theme.toLowerCase()));
        if(result1 != '')
        {
          resolve(result1);
        }
        else{
          reject('Error with getSetsByTheme: Unable to find requested sets by theme');
        }
      });
     }
     addSet(newSet)
     {
      return new Promise((resolve,reject)=>{
        if (this.sets.some(set => set.set_num === newSet.set_num)) {
          reject('Set already exists');
        } else {
          this.sets.push(newSet);
          resolve();
        }

      });
     }

    

}
module.exports = LegoData;
// let data = new LegoData();



// async function executePromises() {
 
//   try {
//     let resultInit = await data.initialize();
//     console.log(resultInit);

//     let resultGetAll = await data.getAllSets();
//     console.log(resultGetAll);

//     try {
//         let resultGetByName = await data.getSetByNum("0012-1w");
//         console.log(resultGetByName);
//     } catch (err) {
//         console.error(err);
//     }

//     try {
//         let resultGetByTheme = await data.getSetsByTheme('tech');
//         console.log(resultGetByTheme);
//     } catch (err) {
//         console.error(err);
//     }
// } catch (err) {
//     console.log(err);
// }
// }

// console.log(executePromises());

// console.log(`Number of Sets: ${data.getAllSets().length}`);
// console.log(data.getSetByNum("0012-1"));
// console.log(`Number of 'tech' sets: ${data.getSetsByTheme('tech').length}`);