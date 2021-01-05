const graphDBEndpoint = require ('../../config/db');
class NewsController {

  async index(req, res){
    let vitritrong = await graphDBEndpoint.query(
      `
     
      SELECT ?x ?vitri_trong WHERE { 
        ?x rdfs:subClassOf data:Dấu_hiệu_bên_trong;
            rdfs:label ?vitri_trong
      }
      `
      ,
    
    );
        let vitri_trong = vitritrong.results.bindings; 
        // console.log(vitri_trong)   
    //end vitri trong
    let vitringoai = await graphDBEndpoint.query(
      `
     
      SELECT ?x ?vitri_ngoai WHERE { 
        ?x rdfs:subClassOf data:Biểu_hiện_bên_ngoài;
            rdfs:label ?vitri_ngoai
      }
      `
      ,
    
    );
        let vitri_ngoai = vitringoai.results.bindings;   
        // console.log(vitri_ngoai) 
    //end vitri ngoai
    let trangthai = await graphDBEndpoint.query(
      `
     
      SELECT  ?x ?trangthai ?hinhtrieuchung
       WHERE 
      { 
        ?x rdf:type data:Trạng_thái;
            rdfs:label ?trangthai.
    optional{
            ?x	data:Hình_triệu_chứng ?hinhtrieuchung
        }

      }
      `
      ,
    
    );
        let trang_thai = trangthai.results.bindings;   
        // console.log(trang_thai) 
    //end vitri ngoai

    let databenh = await graphDBEndpoint.query(
      `
     
      SELECT DISTINCT ?ten_benh ?hinhanh 
      WHERE {?benh data:Có_triệu_chứng ?trieuchung.
            ?benh rdfs:label ?ten_benh.
        optional{
             ?benh data:Hình_ảnh ?hinhanh
        }
       
                
          
    }
      `
      ,
    
    );
        let data_benh = databenh.results.bindings;   
        // console.log(data_benh) 
    //end tên bệnh
    res.render('news',{vitri_trong,vitri_ngoai,trang_thai,data_benh})
    } 
  


}

module.exports = new NewsController;

