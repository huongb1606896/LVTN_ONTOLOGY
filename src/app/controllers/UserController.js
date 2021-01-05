const admin = require('../models/admin')
const graphDBEndpoint = require ('../../config/db');

class UserController {

    async index(req, res, next){
 
       let tongtrieuchung = await graphDBEndpoint.query(
           `
           SELECT DISTINCT  (COUNT(DISTINCT ?uri_trieuchung_all) AS ?so_trieuchung)
           WHERE {
           
               ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
           {
           }
           bind (coalesce(?totals, ?id) as ?key)
           } group by ?key
           `
    
        );
        let tong_trieuchung = tongtrieuchung.results.bindings;
        //end tong trieu chung
        //tong benh
        let tongbenh = await graphDBEndpoint.query(
            `
            SELECT DISTINCT  (COUNT(DISTINCT ?uri_benh) AS ?so_benh)
            WHERE {
            
                ?uri_trieuchung_all data:Là_triệu_chứng_của ?uri_benh.
            {
            }
            bind (coalesce(?totals, ?id) as ?key)
            } group by ?key
            `
     
         );
         let tong_benh = tongbenh.results.bindings;
        //end tong benh
        //tong phong
        let tongphong = await graphDBEndpoint.query(
            `
            SELECT DISTINCT  (COUNT(DISTINCT ?phong) AS ?so_phong)
            WHERE {
            
                ?phong data:Phòng_chống_cho ?uri_benh.
            {
            }
            bind (coalesce(?totals, ?id) as ?key)
            } group by ?key
            `
     
         );
         let tong_phong = tongphong.results.bindings;
        //end phong

        //tong dieutri
        let tongtri = await graphDBEndpoint.query(
            `
            SELECT DISTINCT  (COUNT(DISTINCT ?thuoc) AS ?so_thuoc)
            WHERE {
            
                ?thuoc data:Để_trị ?uri_benh.
            {
            }
            bind (coalesce(?totals, ?id) as ?key)
            } group by ?key
            `
     
         );
         let tong_tri = tongtri.results.bindings;
        //end tong dieu tri
   
      
      
 
   
     
        res.render('admin',{tong_trieuchung,tong_benh,tong_phong,tong_tri});
           
          
       
          
       }
       
     
   }

module.exports = new UserController;

