const {addBooks,selectbooks,displaybooksbytimes,updatebooks,getbookicon,getbookfile,uploadbookicon,uploadbookFile}=require('../users/users.controller');

const upload = require("../middleware/upload");
const uploadFileMiddleware = require("../middleware/uploadFile");

const router=require('express').Router();

router.get("/",selectbooks);
router.post('/',addBooks);
router.get("/time",displaybooksbytimes);
router.patch('/',updatebooks);

//TO fetch book and icon from DATABASE
router.get("/bookicon", getbookicon);

router.get("/bookfile", getbookfile);


//TO store book and icon from DATABASE
router.get("/uploadbookicon",(req, res) => {
   
    return res.sendFile(`/home/nishi/finalproject/finalprojectN/views/index.html`);
  });
router.post("/uploadimg",upload.single("file"), uploadbookicon);

router.get("/uploadbookFile",(req, res) => {
   
    return res.sendFile(`/home/nishi/finalproject/finalprojectN/views/bookfile.html`);
  });
router.post("/uploadfile",uploadFileMiddleware.single("file"), uploadbookFile);


module.exports=router;
