const { Pizza } = require('../models');

const pizzaController = {
    //get all
    getAllPizza(req,res) {
        Pizza.find({})
        .populate({
            path: 'comments',
            select: '-__v'
        })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one
    getPizzaById({ params }, res) {
        Pizza.find({_id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
        if(!dbPizzaData) {
            res.status(400).json({ message: 'No pizza found with this id'});
            return;
        }
            res.json(dbPizzaData);
        })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    updatePizza({ params }, res) {
        Pizza.findOneAndUpdate({_id: params.id }, body, { new: true})
        .then(dbPizzaData => {
        if(!dbPizzaData) {
            res.status(400).json({ message: 'No pizza found with this id'});
            return;
        }
            res.json(dbPizzaData);
        })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({_id: params.id })
        .then(dbPizzaData => {
        if(!dbPizzaData) {
            res.status(400).json({ message: 'No pizza found with this id'});
            return;
        }
            res.json(dbPizzaData);
        })
            .catch(err => {
                res.status(400).json(err);
            });
    },

};

module.exports = pizzaController;