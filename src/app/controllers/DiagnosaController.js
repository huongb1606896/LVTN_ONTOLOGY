const graphDBEndpoint = require ('../../config/db');
const { multipleGraphtoObject } = require('../../util/graph');
const funct  = require('../../functions/function');
class DiagnosaController {

    
    async index(req, res, next){
      
     let trieuchung = funct.map_symptom(req.body.trieuchung)
    let trieuchung_dachon= req.body.trieuchung
    // console.log(trieuchung_dachon)
   



      
    let data = await graphDBEndpoint.query(
        `
        SELECT  DISTINCT  ?benh
        WHERE
        {
        SELECT  DISTINCT  ?trieuchung ?benh ?ten_trieuchung ?ten_benh
          WHERE {?trieuchung data:Là_triệu_chứng_của ?benh.
            ?trieuchung rdfs:label ?ten_trieuchung.
            ?benh rdfs:label ?ten_benh.
            FILTER(${trieuchung} )
          
        }
        }
        `
        ,
      { transform: "toJSON" }
      );
      // console.log(data);
      //
    //  let get_name = await data.records
    //  res.send(get_name);
       
    let get_trieuchung = await graphDBEndpoint.query(
      `
     
      SELECT DISTINCT  ?xtrieuchung
      WHERE {
        ?uri_benh data:Có_triệu_chứng ?uri_trieuchung.
        ?uri_trieuchung rdfs:label ?ten_trieuchung.
          ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
        ?uri_benh rdfs:label ?ten_benh.
        FILTER(${trieuchung} ).     
         { SELECT DISTINCT ?xtrieuchung ?uri_benh
            WHERE {
              ?x data:Là_triệu_chứng_của ?uri_benh . 
              ?x rdfs:label ?xtrieuchung
            }
            ORDER BY ?xtrieuchung 
           
        }
      
          
            
      }
      `
      ,
    
    );
        let trieuchunglienquan = get_trieuchung.results.bindings;
      //
      //
      //
      let trieuchung_all = await graphDBEndpoint.query(`
      SELECT DISTINCT ?ten_benh ?uri_benh (COUNT(DISTINCT ?uri_trieuchung_all) AS ?so_trieuchung)
      WHERE {
        ?uri_benh data:Có_triệu_chứng ?uri_trieuchung.
        ?uri_trieuchung rdfs:label ?ten_trieuchung
        FILTER(${trieuchung} ).
        ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
        ?uri_benh rdfs:label ?ten_benh
      }
      GROUP BY ?ten_benh ?uri_benh
      ORDER BY DESC (?so_trieuchung)
      `);
      

      // console.log(rstt);
      let tt_checked = await graphDBEndpoint.query( `
      SELECT DISTINCT  ?ten_benh ?uri_benh  ( COUNT( ?uri_trieuchung) AS ?so_trieuchung )
                WHERE {
                ?uri_benh data:Có_triệu_chứng ?uri_trieuchung .
               
    		      	?uri_trieuchung rdfs:label ?ten_trieuchung
                FILTER(${trieuchung} ) .
                ?uri_benh rdfs:label ?ten_benh.           
                }
                   groupby ?ten_benh ?uri_benh 
                   orderby DESC(?so_trieuchung)
                
      `);
      // res.send(tt_checked.results.bindings)

      let all_tt = trieuchung_all.results.bindings;
      let trieuchung_check = tt_checked.results.bindings;

      let arr = []
      all_tt.map(x=>{
        arr.push({ten_trieuchung: x.ten_benh.value , value : parseFloat( x.so_trieuchung.value)})
      })

     
      let arr2 = []
      trieuchung_check.map(y=>{
        arr2.push({ten_trieuchung: y.ten_benh.value , value : parseFloat(y.so_trieuchung.value)})
      })
      
      // let temp = [...arr]
      let results = []
      arr.map(x=>{
        arr2.map(y=>{
          if(x.ten_trieuchung === y.ten_trieuchung){
            // let kq [] = arr[]/results[]
            results.push({ten_trieuchung: x.ten_trieuchung , value : Math.round((y.value/x.value)*100) })
          }
        })
      })
      
      // console.log(results)
      // let data = []

      // res.send(results)
      // res.send(all_tt)
      // res.send(tt_checked.results.bindings)
      // console.log(tt_checked.results.bindings);
      
  
      
      // .then((result) => {
        // console.log("Read the classes name:\n" + JSON.stringify(result, null, 2));
   
        // res.send(result)
        res.render('diagnosa',{results,trieuchunglienquan,trieuchung_dachon});
        
        // console.log("Read the classes name:\n" + JSON.stringify(result, null, 2));
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    
       
    }
    
  
}

module.exports = new DiagnosaController;