const express = require("express");
const router = express.Router();

const mainController = require("./main.controller.js");
const searchController = require("./search.controller.js");
const appController = require("./app.controller.js");
const authController = require("../../src/controllers/auth.controller.js");
const downloadController = require("./download.controller.js");
const blogController = require("./blog.controller.js");
const libraryController = require("./extra/libandcartcontroller/library.controller.js");
const cartController = require("./extra/libandcartcontroller/cart.controller.js");
const wishlistController = require("./extra/libandcartcontroller/wishlist.controller.js");
const auth = require('../middleware/auth')
const userController = require("./user.controller.js");
const paymentController = require("./payment.controller.js");
const accountController = require("./extra/account/account.controller.js");
const editAccountController = require("./extra/account/edit.account.controller");
const pdfController = require("./extra/audioandpdfcontroller/pdf.controller");
const audioController = require("./extra/audioandpdfcontroller/audio.controller");
const threeController = require("./extra/threecontroller/three.controller");
const editorController = require("./extra/editorcontroller/editor.controller");
// const blogController = require("./blogcontroller/blog.controller");
const hostController = require("./extra/hostcontroller/host.controller");
const allwebsitesController = require("./allwebsite.controller")
const browseController = require("./browse.controller");
const webbrowseController = require("./webbrowse.controller");
const androidController = require("./extra/android/android.controller");
const homeController = require("./home.controller");
router.use("/search", searchController);
router.use('/app',appController);
router.use("/auth", authController);
router.use("/download", downloadController);
router.use("/cart", cartController);
router.use("/library", libraryController);
router.use("/wishlist", wishlistController);
// router.use("/blog", blogController);
router.use("/user", userController);
router.use("/payment", paymentController);
router.use("/store", accountController);
router.use("/editaccount", editAccountController);
router.use("/pdf", pdfController);
router.use("/audio", audioController);
router.use("/3d", threeController);
router.use("/web", editorController);
// router.use("/blog", blogController);
router.use("/host", hostController);
router.use("/all", allwebsitesController);
router.use("/explore", browseController);
router.use("/website", webbrowseController);
router.use("/android", androidController);
router.use("/blog", blogController);

router.use('/dashboard', (req,res)=>{
    res.redirect('/')
});


router.use("/home", mainController);
router.use("/", homeController);


  
module.exports = router;