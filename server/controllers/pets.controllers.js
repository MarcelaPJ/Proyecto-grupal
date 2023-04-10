const { Pet } = require('../models/pets.model');

// Create a pet
module.exports.createPet = (req, res) => {
    const { name, type, description, skill1, skill2, skill3 } = req.body;
    Pet.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3
    })
        .then(newPet => res.json(newPet))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));     
}

// Get all pets
module.exports.findAllPets = (req, res) => {
    Pet.find({})
        .then(allPets => res.json(allPets))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Get one pet
module.exports.findOnePet = (req, res) => {
    Pet.findOne({ _id: req.params.id })
        .then(onePet => res.json({pet: onePet}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Update a pet
module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body,
        {new:true})
        .then(updatedPet => res.json({pet: updatedPet}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Delete a pet
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({pet: deleteConfirmation}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

