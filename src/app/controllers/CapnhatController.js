const graphDBEndpoint = require ('../../config/db');
const { multipleGraphtoObject } = require('../../util/graph');
const funct  = require('../../functions/function');
class CapnhatController {

    
    async index(req, res, next){
      let trieuchung = req.query.ten_trieuchung;
      console.log(trieuchung);
      let vitri = req.query.vi_tri;
        console.log(vitri);
      
    //  
     
        // res.render('capnhat',{});
        
   
    
       
    }
    
    
  
}

module.exports = new CapnhatController;