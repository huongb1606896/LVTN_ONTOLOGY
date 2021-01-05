const graphDBEndpoint = require ('../../config/db');
class FdimgController {

    async index(req, res){
    let fdimg = await graphDBEndpoint.query(
        `SELECT DISTINCT  ?hinhanh ?ten_benh
        WHERE {?benh data:Có_triệu_chứng ?trieuchung.
                ?benh rdfs:label ?ten_benh.  
                ?trieuchung rdfs:label ?trieu_chung.    
             ?benh data:Hình_ảnh ?hinhanh
                   
    }`); 
    let ifimg = fdimg.results.bindings;
    // console.log(ifimg)
 

 
    res.render('fdimg',{ifimg});
 

    
       
    }
    
    
}

module.exports = new FdimgController;

