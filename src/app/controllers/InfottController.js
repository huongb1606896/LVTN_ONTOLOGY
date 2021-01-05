const graphDBEndpoint = require ('../../config/db');
const { multipleGraphtoObject } = require('../../util/graph');
const funct  = require('../../functions/function2');
class InfottController {

    
    async index(req, res, next){
        console.log(req.params)
        // let benh = req.body
        // let getbenh = Object.values(benh)
    //    console.log(getbenh)
        let ten_benh = funct.map_named(req.params.ten_benh)
     

        let hinhanh_benh = await graphDBEndpoint.query(
            `

        SELECT DISTINCT ?ten_benh  ?hinhanh
        WHERE {?benh data:Có_triệu_chứng ?trieuchung.
            ?benh rdfs:label ?ten_benh.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${ten_benh} )    
    
                    
                    
        }
        `)
        // console.log(hinhanh_benh.results.bindings)
         let imgfish =hinhanh_benh.results.bindings;

        let phong = await graphDBEndpoint.query(
            `
            SELECT  DISTINCT  ?duoc_phong_chong 
            WHERE
            {
            SELECT  DISTINCT  ?ten_benh  ?duoc_phong_chong
              WHERE {
                ?benh data:Được_phòng_chống ?phong_chong.
                ?benh rdfs:label ?ten_benh.
               
                ?phong_chong rdfs:label ?duoc_phong_chong.
                FILTER(${ten_benh} )
              
            }
            } 
            `)
            let phongchong =phong.results.bindings
            // get value phong chong
            // let newarr = []
            // console.log(phongchong)
            //  phongchong.map(item=>{
            //      newarr.push(item.duoc_phong_chong.value)
            //  })
            //  console.log(newarr)
             //end 
            let tri = await graphDBEndpoint.query(
                `
                SELECT  DISTINCT  ?duoc_dieu_tri
                WHERE
                {
                SELECT  DISTINCT  ?ten_benh ?duoc_dieu_tri 
                  WHERE {?benh data:Được_điều_trị ?dieu_tri.
                   
                    ?benh rdfs:label ?ten_benh.
                    ?dieu_tri rdfs:label ?duoc_dieu_tri.
                   
                    FILTER(${ten_benh} )
                  
                }
                }
                `)
                let dieutri = tri.results.bindings
                // console.log(dieutri)
                //
                //nguyennhan

                let nguyennhan = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?nguyen_nhan
                WHERE {?benh data:Có_triệu_chứng ?trieuchung.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:NguyenNhan ?nguyen_nhan
               
                FILTER(${ten_benh} )    
            
                            
                            
                }
                `)
               
                 let nguyen_Nhan =nguyennhan.results.bindings;
                //   console.log(nguyen_Nhan)
                //end nguyen nhan

                //Phan bố
                let phanbo = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?phan_bo
                WHERE {?benh data:Có_triệu_chứng ?trieuchung.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:phanBo ?phan_bo
               
                FILTER(${ten_benh} )    
            
                            
                            
                }
                `)
               
                 let phan_Bo =phanbo.results.bindings;
                //end phân bố

                //Chuẩn đoán
                let chuandoan = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?chuan_doan
                WHERE {?benh data:Có_triệu_chứng ?trieuchung.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:chuanDoan ?chuan_doan
               
                FILTER(${ten_benh} )    
            
                            
                            
                }
                `)
               
                 let chuan_Doan =chuandoan.results.bindings;
                //end chuẩn đoán
                let thuoc = await graphDBEndpoint.query(
                    `
        
                    SELECT DISTINCT ?ten_benh  ?ten_thuoc
                    WHERE {?benh data:Dùng_thuốc ?thuoc.
                        ?thuoc rdfs:label ?ten_thuoc.
                        ?benh rdfs:label ?ten_benh
                    
                   
                    FILTER(${ten_benh} )    
                
                                
                                
                    }
                `)
               
                 let tenthuoc =thuoc.results.bindings;
                
                //end thuoc
               
               

                
    res.render('infott',{imgfish,phongchong,dieutri,chuan_Doan,phan_Bo,nguyen_Nhan,tenthuoc})

   
       
    }
    
  
}

module.exports = new InfottController;