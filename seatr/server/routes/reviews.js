const { Router } = require("express");
const { addReview, getReviews } = require("../controllers/reviews");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/review", getReviews);
router.post("/review", upload.single("streamfile"), addReview);

module.exports = router;
