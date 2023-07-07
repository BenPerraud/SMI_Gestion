const Operator = require("../models/Operator")

exports.createOperator = (req, res) => {
    Operator.findOne ({
        name: req.body.name,
        firstname: req.body.firstname,
    })
        .then(operator => {
            if (operator) {
                return res.status(401).json("L'opérateur/trice existe déjà")
            } else {
                const operator = new Operator ({
                    firstname: req.body.firstname,
                    name: req.body.name,
                })
                operator.save()  
                    .then(() => res.status(201).json("Un(e) nouvel(le) opérateur/trice a été ajouté(e) à la base de données"))
                    .catch(error => res.status(400).json({ error }))}
        })
        .catch(error => res.status(400).json({ error }))
}


exports.getAllOperators = (req, res) => {
    Operator.find()
        .then(operators => res.status(200).json(operators))
        .catch(error => res.status(400).json({ error }))    
}

exports.deleteOperator = (req, res) => {
    Operator.findOneAndDelete({ _id: req.params.id})
        .then(() => res.status(201).json("Opérateur/trice supprimé(e) de la base de données"))
        .catch(error => res.status(401).json({ error }))
}

exports.getOneOperator = (req, res) => {
    Operator.findById(req.params.id)
        .then(operator => res.status(201).json(operator))
        .catch(error => res.status(400).json({ error }))
}

exports.modifyOneOperator = (req, res) => {
    Operator.updateOne({ _id: req.params.id}, {
        name: req.body.name,
        firstname: req.body.firstname,
        _id: req.params.id})
        .then(() => res.status(201).json("Opérateur/trice modifié(e)"))
        .catch(error => res.status(400).json({ error }))
}