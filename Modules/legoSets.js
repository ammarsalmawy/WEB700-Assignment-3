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
     themes;
     constructor()
     {
        this.sets= [];
        this.themes = [];
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
        let j = 0;
        for(j=0;j<themeData.length;j++)
          {
              this.themes.push(themeData[j]);
          }

          let allThemesMatched = true;
          this.sets.forEach(obj => {
            const matchingTheme = themeData.find(theme => theme.id === obj.theme_id);
            
            if (matchingTheme) {
                obj.theme = matchingTheme.name;
            } else {
                allThemesMatched = false;
            }
        });

        
        if (allThemesMatched) {
            resolve("The sets array is filled with objects");
        } else {
            reject("Some sets could not be matched with themes.");
        }

      //   this.sets.forEach(obj => {
      //    const matchingProperties = themeData.find((theme) => theme.id === obj.theme_id);
     
      //    if (matchingProperties) {
      //        obj.theme = matchingProperties.name; 
      //        resolve('the sets array is filled with objects');
      //    }
      //    else{
      //     reject('unable to fill the sets array!');
      //    }
      //  });

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
     async addSet(newSet)
     {
      let allSets = await this.getAllSets();
      return new Promise((resolve,reject)=>{
        if (allSets.some(set => set.set_num === newSet.set_num)) {
          reject('Set already exists');
        } else {
          this.sets.push(newSet);
          resolve();
        }

      });
     }

    
//For themes
getAllThemes()
{
 return new Promise((resolve,reject)=>{
   if(this.themes !=null)
   {
     resolve(this.themes);
   }
   else{
     reject('No objects!');
   }
 });

}

getThemeById(id)
{
 return new Promise((resolve,reject)=>{
   
   const result = this.themes.find(({ id }) => id === id);
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


async deleteSetByNum(setNum){
  let allSets = await this.getAllSets();
  return new Promise((resolve,reject)=>{
    let foundSetIndex = allSets.findIndex(s => s.set_num == setNum);
    if(foundSetIndex != -1)
    {
      allSets.splice(foundSetIndex,1);
      resolve("Set deleted successfully!");
    }
    else{
      reject('Error with deleteSetByNum: Unable to find the set');

    }
  });

}
}
module.exports = LegoData;
