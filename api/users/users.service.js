const pool=require('../../controllers/database');
const uploadFile = require('../middleware/upload');
const fs = require("fs");

module.exports={
    addBook:(data,callback)=>{
        pool.query(`insert into books(bname,bauthor,bdescription,bcategory,bratings,bimage) values(?,?,?,?,?,?)`,[
            data.b_name,
            data.b_author,
            data.b_description,
            data.b_category,
            data.b_ratings,
            data.b_image
        ],(error,results,fields)=>{
            if(error)
            {
                return callback(error);
            }
            else
            {
                return callback(null,results);
            }
            
        })
    },
    selectbook:(callback)=>{
        pool.query(`select bid,bname,bauthor,bdescription,bcategory,bratings,bimage from books`,[],(error,results,fields)=>{
            if(error)
            {
                return callback(error);
            }
            else{
                 return callback(null,results);
            }
        })
    },
    displaybooksbytime:(callback)=>{
        pool.query(`select bid,bname,bauthor,bdescription,bcategory,bratings,bimage,timestamp(btime) as time from books order by 1 desc`,(error,results,fields)=>{
            if(error)
            {
                 return callback(error); 
            }
            else{
                 return callback(null,results);
               }
            
        })
    },
    updateBook:(data,callback)=>{
        pool.query(`update books set bname=?,bauthor=?,bdescription=?,bcategory=?,bratings=?,bimage=? where bid=?`,[data.b_name,data.b_author,data.b_description,data.b_category,data.b_ratings,data.b_image,data.id],(error,results,fields)=>{
            if(error)
            {
                 return callback(error); 
            }
            else{
                 return callback(null,results);
               }
            
        })
    },

    uploadbookicon:(body,callback)=>{

        try {
            console.log(body);
        
            if (body== undefined) {
              //return res.send(`You must select a file.`);
              console.log("no file found");
            }
            else{
    
                const data= fs.readFileSync(
                  __basedir + "/resources/static/assets/uploads/" + body.filename
                )
               const type= body.mimetype;
                const name= body.originalname;
                
                pool.query(`INSERT INTO img(name,data) VALUES (?,?)`,[
                 name,data
              
              
              ],(error,results,fields)=>{
                  if(error)
                  {
                    console.log('error occure'+ error);
                   // return res.send(`File has not been uploaded.`);
              
                      return callback(error);
                  }
                  else
                  {
              
                    console.log('error not occured');
                   // return res.send(`File has been uploaded.`);
              
                      return callback(null,results);
                  }
                  
              })
             // return res.send(`File has been uploaded.`);
                 
              
              }
              
              
                } catch (error) {
                  console.log(error);
                 // return res.send(`Error when trying upload images: ${error}`);
                }
                  
    },
    
    selectbookicon:(callback)=>{
        pool.query(`select name,data from img where name ="wlogo.png"`,[],(error,results,fields)=>{
            if(error)
            {
                console.log('error occur while retrieving');
                return callback(error);
            }
            else{
                console.log(results);
               
                 return callback(null,results);
            }
        })
    },

uploadbookFile:(body,callback)=>{

    try {
        console.log(body);
    
        if (body== undefined) {
          //return res.send(`You must select a file.`);
          console.log("no file found");
        }
        else{

            const data= fs.readFileSync(
              __basedir + "/resources/static/assets/uploads/" + body.filename
            )
           const type= body.mimetype;
            const name= body.originalname;
            
            pool.query(`INSERT INTO txtfile(name,data) VALUES (?,?)`,[
             name,data
          
          
          ],(error,results,fields)=>{
              if(error)
              {
                console.log('error occure'+ error);
               // return res.send(`File has not been uploaded.`);
          
                  return callback(error);
              }
              else
              {
          
                console.log('error not occured');
               // return res.send(`File has been uploaded.`);
          
                  return callback(null,results);
              }
              
          })
         // return res.send(`File has been uploaded.`);
             
          
          }
          
          
            } catch (error) {
              console.log(error);
             // return res.send(`Error when trying upload images: ${error}`);
            }
              
},

selectbookfile:(callback)=>{
    pool.query(`select name ,data from txtfile where name ="localhost (copy).txt"`,[],(error,results,fields)=>{
        if(error)
        {
            console.log('error occur while retrieving');
            return callback(error);
        }
        else{
            console.log(results);
           
             return callback(null,results);
        }
    })
},


}

//`select convert(data using utf8), name from img where name ="wlogo.png"`
//select data, name from img where name ="wlogo.png"