const graphDBEndpoint = require ('../../config/db');
const funct  = require('../../functions/function');
const funct2  = require('../../functions/function2');
class GetTrieuChungController {

  async trieuchungtrong(req, res, next){
   
  let vitritrong = funct.map_symptom(req.query.dauhieu_trong);

  // console.log(vitritrong)
        let data = await graphDBEndpoint.query(
            `
            SELECT  ?ten_trieuchungtrong ?hinhtrieuchung
            WHERE {
    			    ?x rdfs:subClassOf data:Dấu_hiệu_bên_trong;
                rdfs:label ?ten_trieuchung.
                FILTER(${vitritrong}  )
            ?data rdf:type ?x.
            ?data rdfs:label ?ten_trieuchungtrong.
            optional{
              ?data data:Hình_triệu_chứng ?hinhtrieuchung
              }
           }
            
            `
       
        );
        // console.log(data.results.bindings)
        let trieu_chung_trong = data.results.bindings;
        res.send(trieu_chung_trong)
        


   
}
async trieuchungngoai(req, res, next){
    
    let vitringoai = funct.map_symptom(req.query.dauhieu_ngoai);
    
    let data = await graphDBEndpoint.query(
      `
      SELECT  DISTINCT ?ten_trieuchungngoai ?hinhtrieuchung
      WHERE {
      ?x rdfs:subClassOf data:Biểu_hiện_bên_ngoài;
          rdfs:label ?ten_trieuchung.
          FILTER(${vitringoai}  )
      ?data rdf:type ?x.
      ?data rdfs:label ?ten_trieuchungngoai.
      optional{
        ?data data:Hình_triệu_chứng ?hinhtrieuchung
    }
      
              
                  
          
      }
      
      `
 
    );
    // console.log(data.results.bindings)
    let trieu_chung_ngoai = data.results.bindings;
    res.send(trieu_chung_ngoai)
  
  
  
     
  }
  async ttngoai(req, res, next){
    // console.log(req.query.trieuchungngoai)
    let trieuchungngoai = funct.map_symptom(req.query.trieuchungngoai);

    // console.log(trieuchungngoai)
  //   let data = await graphDBEndpoint.query(
  //     `
  //     SELECT  DISTINCT ?ten_benh  ?hinhanh
	// WHERE {?trieuchung data:Là_triệu_chứng_của ?benh.
  //   ?trieuchung rdfs:label ?ten_trieuchung.
  //    ?benh rdfs:label ?ten_benh.
  //    optional{
  //            ?benh data:Hình_ảnh ?hinhanh
  //       }.
       
  //       FILTER(${trieuchungngoai})
  
  //   }
      
  //     `
 
  //   );
    // let get_trieu_chung_ngoai = data.results.bindings;

    //
    let trieuchung_all = await graphDBEndpoint.query(
      `
      SELECT DISTINCT ?ten_benh  ?hinhanh ?uri_benh (COUNT(DISTINCT ?uri_trieuchung_all) AS ?so_trieuchung)
      WHERE {
        ?uri_benh data:Có_triệu_chứng ?uri_trieuchung.
        ?uri_trieuchung rdfs:label ?ten_trieuchung.
        optional{
            ?uri_benh data:Hình_ảnh ?hinhanh
        }.
        FILTER(${trieuchungngoai} ).
        ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
        ?uri_benh rdfs:label ?ten_benh
      }
      GROUP BY ?ten_benh ?uri_benh ?hinhanh
      ORDER BY DESC (?so_trieuchung)
      `);
      

      // console.log(trieuchung_all);
      let tt_checked = await graphDBEndpoint.query( `
      SELECT DISTINCT  ?ten_benh ?hinhanh ?uri_benh  ( COUNT( ?uri_trieuchung) AS ?so_trieuchung )
                WHERE {
                ?uri_benh data:Có_triệu_chứng ?uri_trieuchung .
               
                ?uri_trieuchung rdfs:label ?ten_trieuchung.
                optional{
                  ?uri_benh data:Hình_ảnh ?hinhanh
                 }.
                FILTER(${trieuchungngoai} ) .
                ?uri_benh rdfs:label ?ten_benh.           
                }
                   groupby ?ten_benh ?uri_benh ?hinhanh
                   orderby DESC(?so_trieuchung)
                
      `);
      // res.send(tt_checked.results.bindings)

      let all_tt = trieuchung_all.results.bindings;
      let trieuchung_check = tt_checked.results.bindings;
      // console.log(all_tt)
      // console.log(trieuchung_check)

      let arr = []
      all_tt.map(x=>{
        arr.push({ten_trieuchung: x.ten_benh.value ,hinh_anh: x.hinhanh.value, value : parseFloat( x.so_trieuchung.value)})
      })
      
      let arr2 = []
      trieuchung_check.map(y=>{
        arr2.push({ten_trieuchung: y.ten_benh.value ,hinh_anh: y.hinhanh.value, value : parseFloat(y.so_trieuchung.value)})
      })
      // console.log(arr2)
     
      // let temp = [...arr]
      let tyle = []
      arr.map(x=>{
        arr2.map(y=>{
          if(x.ten_trieuchung === y.ten_trieuchung){
            // let kq [] = arr[]/results[]
            tyle.push({ten_trieuchung: x.ten_trieuchung ,hinh_anh: x.hinh_anh, value : Math.round((y.value/x.value)*100) })
          }
        })
      })
    let do_tin_cay = tyle.sort((a , b)=>{return b.value-a.value})    
    //
    // console.log(data.results.bindings)
      // console.log(tyle)
    res.send(do_tin_cay)
  
     
  }
  async tttrong(req, res, next){
    // console.log(req.query.trieuchungngoai)
    let trieuchungtrong = funct.map_symptom(req.query.trieuchungtrong);

    // console.log(trieuchungngoai)
//     let data = await graphDBEndpoint.query(
//       `
//       SELECT  DISTINCT ?ten_benh  ?hinhanh
// 	WHERE {?trieuchung data:Là_triệu_chứng_của ?benh.
//     ?trieuchung rdfs:label ?ten_trieuchung.
//      ?benh rdfs:label ?ten_benh.
//      optional{
//              ?benh data:Hình_ảnh ?hinhanh
//         }.
       
//         FILTER(${trieuchungtrong})
  
// }
      
//       `
 
//     );
//     // console.log(data.results.bindings)
//     let get_trieu_chung_trong = data.results.bindings;
let trieuchung_all = await graphDBEndpoint.query(
  `
  SELECT DISTINCT ?ten_benh  ?hinhanh ?uri_benh (COUNT(DISTINCT ?uri_trieuchung_all) AS ?so_trieuchung)
  WHERE {
    ?uri_benh data:Có_triệu_chứng ?uri_trieuchung.
    ?uri_trieuchung rdfs:label ?ten_trieuchung.
    optional{
        ?uri_benh data:Hình_ảnh ?hinhanh
    }.
    FILTER(${trieuchungtrong} ).
    ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
    ?uri_benh rdfs:label ?ten_benh
  }
  GROUP BY ?ten_benh ?uri_benh ?hinhanh
  ORDER BY DESC (?so_trieuchung)
  `);
  

  // console.log(trieuchung_all);
  let tt_checked = await graphDBEndpoint.query( `
  SELECT DISTINCT  ?ten_benh ?hinhanh ?uri_benh  ( COUNT( ?uri_trieuchung) AS ?so_trieuchung )
            WHERE {
            ?uri_benh data:Có_triệu_chứng ?uri_trieuchung .
           
            ?uri_trieuchung rdfs:label ?ten_trieuchung.
            optional{
              ?uri_benh data:Hình_ảnh ?hinhanh
             }.
            FILTER(${trieuchungtrong} ) .
            ?uri_benh rdfs:label ?ten_benh.           
            }
               groupby ?ten_benh ?uri_benh ?hinhanh
               orderby DESC(?so_trieuchung)
            
  `);
  // res.send(tt_checked.results.bindings)

  let all_tt = trieuchung_all.results.bindings;
  let trieuchung_check = tt_checked.results.bindings;
  // console.log(all_tt)
  // console.log(trieuchung_check)

  let arr = []
  all_tt.map(x=>{
    arr.push({ten_trieuchung: x.ten_benh.value ,hinh_anh: x.hinhanh.value, value : parseFloat( x.so_trieuchung.value)})
  })
  
  let arr2 = []
  trieuchung_check.map(y=>{
    arr2.push({ten_trieuchung: y.ten_benh.value ,hinh_anh: y.hinhanh.value, value : parseFloat(y.so_trieuchung.value)})
  })
  // console.log(arr2)
 
  // let temp = [...arr]
  let tyle = []
  arr.map(x=>{
    arr2.map(y=>{
      if(x.ten_trieuchung === y.ten_trieuchung){
        // let kq [] = arr[]/results[]
        tyle.push({ten_trieuchung: x.ten_trieuchung ,hinh_anh: x.hinh_anh, value : Math.round((y.value/x.value)*100) })
      }
    })
  })
  let do_tin_cay = tyle.sort((a , b)=>{return b.value-a.value})      
  //  console.log(do_tin_cay )
    res.send(do_tin_cay)
  
     
  }
  async trangthai(req, res, next){
    // console.log(req.query.trangthai)
    let trang_thai = funct.map_symptom(req.query.trangthai);

   
let trieuchung_all = await graphDBEndpoint.query(
  `
  SELECT DISTINCT ?ten_benh  ?hinhanh ?uri_benh (COUNT(DISTINCT ?uri_trieuchung_all) AS ?so_trieuchung)
  WHERE {
    ?uri_benh data:Có_triệu_chứng ?uri_trieuchung.
    ?uri_trieuchung rdfs:label ?ten_trieuchung.
    optional{
        ?uri_benh data:Hình_ảnh ?hinhanh
    }.
    FILTER(${trang_thai} ).
    ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
    ?uri_benh rdfs:label ?ten_benh
  }
  GROUP BY ?ten_benh ?uri_benh ?hinhanh
  ORDER BY DESC (?so_trieuchung)
  `);
  

  // console.log(trieuchung_all);
  let tt_checked = await graphDBEndpoint.query( `
  SELECT DISTINCT  ?ten_benh ?hinhanh ?uri_benh  ( COUNT( ?uri_trieuchung) AS ?so_trieuchung )
            WHERE {
            ?uri_benh data:Có_triệu_chứng ?uri_trieuchung .
           
            ?uri_trieuchung rdfs:label ?ten_trieuchung.
            optional{
              ?uri_benh data:Hình_ảnh ?hinhanh
             }.
            FILTER(${trang_thai} ) .
            ?uri_benh rdfs:label ?ten_benh.           
            }
               groupby ?ten_benh ?uri_benh ?hinhanh
               orderby DESC(?so_trieuchung)
            
  `);
  // res.send(tt_checked.results.bindings)

  let all_tt = trieuchung_all.results.bindings;
  let trieuchung_check = tt_checked.results.bindings;
  // console.log(all_tt)
  // console.log(trieuchung_check)

  let arr = []
  all_tt.map(x=>{
    arr.push({ten_trieuchung: x.ten_benh.value ,hinh_anh: x.hinhanh.value, value : parseFloat( x.so_trieuchung.value)})
  })
  
  let arr2 = []
  trieuchung_check.map(y=>{
    arr2.push({ten_trieuchung: y.ten_benh.value ,hinh_anh: y.hinhanh.value, value : parseFloat(y.so_trieuchung.value)})
  })
  // console.log(arr2)
 
  // let temp = [...arr]
  let tyle = []
  arr.map(x=>{
    arr2.map(y=>{
      if(x.ten_trieuchung === y.ten_trieuchung){
        // let kq [] = arr[]/results[]
        tyle.push({ten_trieuchung: x.ten_trieuchung ,hinh_anh: x.hinh_anh, value : Math.round((y.value/x.value)*100) })
      }
    })
  })
  let do_tin_cay = tyle.sort((a , b)=>{return b.value-a.value})      
  //  console.log(do_tin_cay )
    res.send(do_tin_cay)
  
     
  }
  async thongtinbenh (req,res,next){
    console.log(req.query.tenbenh)
    let ten_benh = funct2.map_named(req.query.tenbenh)
    
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
          let trieuchung = await graphDBEndpoint.query(
            `
      
        SELECT DISTINCT ?ten_benh  ?hinhanh ?ten_trieu_chung
        WHERE {?benh data:Có_triệu_chứng ?trieuchung.
            ?benh rdfs:label ?ten_benh.
            ?trieuchung rdfs:label ?ten_trieu_chung.
        optional{
            ?benh data:Hình_ảnh ?hinhanh
         
        }
        FILTER(${ten_benh} )    
      
                    
                    
        }
        `)
        // console.log(hinhanh_benh.results.bindings)
         let ten_trieu_chung =trieuchung.results.bindings;
         
         

          
  res.send({imgfish,phongchong,dieutri,chuan_Doan,phan_Bo,nguyen_Nhan,tenthuoc,ten_trieu_chung})

  }

      
}

module.exports = new GetTrieuChungController;