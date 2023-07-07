const express = require("express")
const router = express.Router()
const productionCtrl = require("../controllers/production")
const multer = require("multer")
const upload = multer()

router.post(`/`, upload.none(), productionCtrl.createPi)
router.post(`/:pi`, upload.none(), productionCtrl.addOneProduction)
router.put(`/:pi/:_id`, upload.none(), productionCtrl.updateOneProduction)
router.get(`/`, productionCtrl.getAllProduction)
router.get(`/:pi`, productionCtrl.getOneProduction)
router.get(`/date/:date`, productionCtrl.getProductionByDate)

module.exports = router