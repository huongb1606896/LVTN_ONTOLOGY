const e = require('express');
const graphDBEndpoint = require('../config/db');

module.exports={
 
    map_symptom: (arr_trieuchung)=>{
            
            let str = " "
            let temp = typeof arr_trieuchung
            if(temp !== 'string'){
            arr_trieuchung.map((x,y)=>{
                if(arr_trieuchung[y+1] != undefined){
                 //   (x.vitri)
           //         ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) ||`
                     str += ` (regex(str(?ten_trieuchung),"${x}","i")) ||`
                }else{
                  //  (x.vitri)
                //    ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) `
                     str += `( regex(str(?ten_trieuchung),"${x}","i")) `
                }
             })
            }else{
              str = `( regex(str(?ten_trieuchung),"${arr_trieuchung}","i")) `
            }
             return str;
    }
}