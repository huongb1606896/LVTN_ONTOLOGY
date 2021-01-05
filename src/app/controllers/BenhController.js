const graphDBEndpoint = require ('../../config/db');
class BenhController {

    index(red, res){
        graphDBEndpoint.query(
          
            `SELECT ?benh
            WHERE { ?x rdf:type data:Bệnh.
                    ?x rdfs:label ?benh
                    
          
                   
       }`,
        
        { transform: "toJSON" }
      ) 
      .then((result) => {
 
     
      
    
     
        res.render('benh',{data : result.records});
      })
      .catch((err) => {
        console.log(err);
      });
    
        
           
        }
}

module.exports = new BenhController;