const graphDBEndpoint = require ('../../config/db');
class TrieuChungController {

  async index(req, res, next){
    let trieuchung = await graphDBEndpoint.query(
      `SELECT ?trieuchung
      WHERE { ?x rdf:type data:Triệu_chứng.
              ?x rdfs:label ?trieuchung
              
    
             
    }`)
    
      let trieu_chung =trieuchung.results.bindings;

    //end trieuchung
    let vitri = await graphDBEndpoint.query(
      `SELECT ?vitri WHERE { 
        ?x rdfs:subClassOf data:Triệu_chứng;
            rdfs:label ?vitri
      }
        
    
             
    `)
    
      let vi_tri =vitri.results.bindings;


           
           

            
res.render('trieuchung',{trieu_chung,vi_tri})


   
}

      
}

module.exports = new TrieuChungController;