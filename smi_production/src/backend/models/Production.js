const mongoose = require("mongoose")

const productionSchema = mongoose.Schema ({
    pi: {type: String, required: true},
    client: {type: String, required: true},
    designation: {type: String, required: true},
    quantityTheorical: {type: Number, required: true},
    production: [{
        date: {type: Number, required: true},
        prodTime: {type: Number, required: true},
        operator: {type: Array, required: true},
        quantityProd: {type: Number, required: true},
        quantityWaste: {type: Number, required: true},
        comments: {type: String, required: true}
    }],
})

module.exports = mongoose.model("Production", productionSchema)