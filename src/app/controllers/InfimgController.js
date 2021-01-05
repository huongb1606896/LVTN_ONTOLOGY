const graphDBEndpoint = require ('../../config/db');
const { multipleGraphtoObject } = require('../../util/graph');
const funct  = require('../../functions/function3');
class InfimgController {

    
    async index(req, res, next){
        // console.log(req.params)
        // let publicid = req.params.public_id
        // console.log(publicid)
        // let id_pb = p
        // let pb_id = publicid.src.slice(69,78)
        // console.log(publicid)
        //  res.send( req.params.public_id);
        let publicid = funct.map_named(req.params.public_id)
        // res.send(publicid)
        let tenbenh = await graphDBEndpoint.query(
            `

        SELECT DISTINCT ?ten_benh  
        WHERE {?benh data:Hình_ảnh ?hinhanh.
            ?benh rdfs:label ?ten_benh.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${publicid} )    
    
                    
                    
        }
        `)
        let tenn_benh = tenbenh.results.bindings
        // console.log(tenbenh.results.bindings)

        let phongchong = await graphDBEndpoint.query(
            `

        SELECT DISTINCT ?phongchong  
        WHERE {?benh data:Hình_ảnh ?hinhanh.
            ?benh data:Được_phòng_chống ?phong_chong.
            ?phong_chong rdfs:label ?phongchong.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${publicid} )    
    
                    
                    
        }
        `)
        let phongg_chong = phongchong.results.bindings
        // console.log(phongchong.results.bindings)
        let dieutri = await graphDBEndpoint.query(
            `

        SELECT DISTINCT ?dieutri  
        WHERE {?benh data:Hình_ảnh ?hinhanh.
            ?benh data:Được_điều_trị ?dieu_tri.
            ?dieu_tri rdfs:label ?dieutri.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${publicid} )    
    
                    
                    
        }
        `)
        let dieuu_tri = dieutri.results.bindings
        // console.log(dieutri.results.bindings)

        

        // let thongtin = await graphDBEndpoint.query(
        //     `
        //     SELECT  DISTINCT  ?ten_benh ?duoc_dieu_tri ?duoc_phong_chong ?hinhanh
        //       WHERE {?benh data:Hình_ảnh ?hinhanh.
   		// 		 ?benh data:Được_phòng_chống ?phong_chong.
    	// 		 ?benh data:Được_điều_trị ?dieu_tri.
        //         ?benh rdfs:label ?ten_benh.
        //         ?dieu_tri rdfs:label ?duoc_dieu_tri.
        //         ?phong_chong rdfs:label ?duoc_phong_chong.
        //         FILTER( ${publicid} )
               
              
        //     }
        //     `)
        //     // res.send(thongtin.results.bindings)
        //     console.log(thongtin.results.bindings)
        //     let data = thongtin.results.bindings;  
        //
        //
        let hinhanh_benh = await graphDBEndpoint.query(
            `

        SELECT DISTINCT ?ten_benh  ?hinhanh
        WHERE {?benh data:Có_triệu_chứng ?trieuchung.
            ?benh rdfs:label ?ten_benh.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${publicid} )    
    
                    
                    
        }
        `)
        // console.log(hinhanh_benh.results.bindings)
         let imgfish =hinhanh_benh.results.bindings;


                let nguyennhan = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?nguyen_nhan
                WHERE {?benh data:Hình_ảnh ?hinhanh.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:NguyenNhan ?nguyen_nhan
               
                FILTER(${publicid} )    
            
                            
                            
                }
                `)
               
                 let nguyen_Nhan =nguyennhan.results.bindings;
                //   console.log(nguyen_Nhan)
                //end nguyen nhan

                //Phan bố
                let phanbo = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?phan_bo
                WHERE {?benh data:Hình_ảnh ?hinhanh.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:phanBo ?phan_bo
               
                FILTER(${publicid} )    
            
                            
                            
                }
                `)
               
                 let phan_Bo =phanbo.results.bindings;
                //end phân bố
                
                //Chuẩn đoán
                let chuandoan = await graphDBEndpoint.query(
                    `
        
                SELECT DISTINCT ?ten_benh  ?chuan_doan
                WHERE {?benh data:Hình_ảnh ?hinhanh.
                    ?benh rdfs:label ?ten_benh.
                    ?benh rdfs:chuanDoan ?chuan_doan
               
                FILTER(${publicid} )    
            
                            
                            
                }
                `)
               
                 let chuan_Doan =chuandoan.results.bindings;
                 //thuoc
                 let thuoc = await graphDBEndpoint.query(
                    `
        
                    SELECT DISTINCT ?ten_benh  ?ten_thuoc
                    WHERE {?benh data:Hình_ảnh ?hinhanh.
                        ?benh data:Dùng_thuốc ?thuoc.
                        ?thuoc rdfs:label ?ten_thuoc.
                        ?benh rdfs:label ?ten_benh
                    
                   
                    FILTER(${publicid} )    
                
                                
                                
                    }
                `)
               
                 let tenthuoc =thuoc.results.bindings;
                
                
        
        
        
        
        
        
        
        
        
        //

            res.render('infimg',{imgfish,tenn_benh,phongg_chong,dieuu_tri,chuan_Doan,phan_Bo,nguyen_Nhan,tenthuoc})

  

        

       
    }
    
  
}

module.exports = new InfimgController;