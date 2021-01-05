const e = require('express');
const graphDBEndpoint = require('../config/db');

module.exports={
 
    map_named: (arr_tenbenh)=>{
            
            let str = " "
            let temp = typeof arr_tenbenh
            if(temp !== 'string'){
                arr_tenbenh.map((x,y)=>{
                if(arr_tenbenh[y+1] != undefined){
                 //   (x.vitri)
           //         ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) ||`
                     str += ` (regex(str(?ten_benh),"${x}","i")) ||`
                }else{
                  //  (x.vitri)
                //    ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) `
                     str += `( regex(str(?ten_benh),"${x}","i")) `
                }
             })
            }else{
              str = `( regex(str(?ten_benh),"${arr_tenbenh}","i")) `
            }
             return str;
    }
}