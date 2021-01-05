const e = require('express');
const graphDBEndpoint = require('../config/db');

module.exports={
 
    map_named: (arr_tenthuoc)=>{
            
            let str = " "
            let temp = typeof arr_tenthuoc
            if(temp !== 'string'){
                arr_tenthuoc.map((x,y)=>{
                if(arr_tenthuoc[y+1] != undefined){
                 //   (x.vitri)
           //         ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) ||`
                     str += ` (regex(str(?ten_thuoc),"${x}","i")) ||`
                }else{
                  //  (x.vitri)
                //    ? str += `( (regex(str(?ten_trieuchung),"${x.ten_trieuchung}","i")) && (?vitri ="${x.vitri}")) `
                     str += `( regex(str(?ten_thuoc),"${x}","i")) `
                }
             })
            }else{
              str = `( regex(str(?ten_thuoc),"${arr_tenthuoc}","i")) `
            }
             return str;
    }
}