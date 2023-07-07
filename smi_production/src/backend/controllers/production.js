const Production = require ("../models/Production")

exports.getAllProduction = (req, res) => {
    Production.find()
        .then(productions => res.status(201).json(productions))
        .catch(error => res.status(401).json({ error }))
}

exports.createPi = (req, res) => {
    const production = new Production ({
        pi: req.body.pi,
        client: req.body.client,
        designation: req.body.designation,
        quantityTheorical: req.body.quantityTheorical,
        production: []
    })
    production.save()
        .then(() => res.status(201).json("Nouveau Pi bien enregistré"))
        .catch( error => res.status(401).json({ error }))
}

exports.getOneProduction = (req, res) => {
    Production.findOne({ pi: req.params.pi })
        .then(production => res.status(201).json(production))
        .catch(error => res.status(401).json({ error }))
}

exports.updateOneProduction = (req, res) => {
    Production.updateOne(
        {pi: req.params.pi, "production._id": req.params._id},
        { $set: {
            "production.$.date": req.body.date,
            "production.$.prodTime": req.body.prodTime,
            "production.$.operator": req.body.operator,
            "production.$.quantityProd": req.body.quantityProd,
            "production.$.quantityWaste": req.body.quantityWaste,
            "production.$.comments": req.body.comments,
        }})
        .then(() => res.status(201).json("La production a bien été modifiée au PI suivant : "))
        .catch(error => res.status(401).json({ error }))
}


exports.getProductionByDate = (req, res) => {
    Production.find({ "production.date": req.params.date })
        .then(productions => res.status(201).json(productions))
        .catch(error => res.status(401).json({ error }))
}

exports.addOneProduction = (req, res) => {
    Production.findOneAndUpdate(
        { pi: req.params.pi},
        { $push: {production: {
            date: req.body.date,
            prodTime: req.body.prodTime,
            operator: req.body.operator,
            quantityProd: req.body.quantityProd,
            quantityWaste: req.body.quantityWaste,
            comments: req.body.comments
        }}})
        .then(() => res.status(201).json("La production a bien été ajoutée au PI suivant : "))
        .catch(error => res.status(401).json({ error }))
}

/* exports.createPi = (req, res) => {
    const production = new Production ({
        pi: req.body.pi,
        client: req.body.client,
        designation: req.body.designation,
        production: [{
            date: req.body.date,
            prodTime: req.body.prodTime,
            operator: req.body.operator,
            quantityTheorical: req.body.quantityTheorical,
            quantityProd: req.body.quantityProd,
            quantityWaste: req.body.quantityWaste,
            comments: req.body.comments
        }]
    })
    production.save()
        .then(() => res.status(201).json("Nouveau Pi bien enregistrée "))
        .catch( error => res.status(401).json({ error }))
}*/