const graphDBEndpoint = require ('../../config/db');
const { multipleGraphtoObject } = require('../../util/graph');
const funct  = require('../../functions/function4');
class InfothuocController {

    
    async index(req, res, next){
        let tenthuoc = funct.map_named(req.params.thuoc);
        // console.log(tenthuoc)
        let thongtinthuoc = await graphDBEndpoint.query(
            `

         SELECT DISTINCT  ?lbthuoc ?cdthuoc ?dgthuoc ?hcthuoc ?qcthuoc ?sdkthuoc ?hinhthuoc
        WHERE {?benh data:Dùng_thuốc ?ten_thuoc.

            ?ten_thuoc rdfs:label ?lbthuoc.
            ?ten_thuoc rdfs:congDung ?cdthuoc.
            ?ten_thuoc rdfs:dangDongGoi ?dgthuoc.
            ?ten_thuoc rdfs:hoatChatChinh ?hcthuoc.
            ?ten_thuoc rdfs:quyCachDongGoi ?qcthuoc.
            ?ten_thuoc rdfs:soDangKy ?sdkthuoc.
        optional{
            ?ten_thuoc data:Hình_thuốc ?hinhthuoc
         
        }
        FILTER(${tenthuoc} )    
    
                    
                    
        }
        `)
        let thongtin_thuoc = thongtinthuoc.results.bindings;
        console.log(thongtin_thuoc)

        res.render('infothuoc',{thongtin_thuoc})

  

        

       
    }
    
  
}

module.exports = new InfothuocController;