const express = require("express")
const router = express.Router()
const operatorCtrl = require("../controllers/operator")
const multer = require("multer")
const upload = multer()

router.post(`/`, upload.none(), operatorCtrl.createOperator)
router.get(`/`, operatorCtrl.getAllOperators)
router.get(`/:id`, operatorCtrl.getOneOperator)
router.put(`/:id`, upload.none(), operatorCtrl.modifyOneOperator)
router.delete(`/:id`, operatorCtrl.deleteOperator)

module.exports = router