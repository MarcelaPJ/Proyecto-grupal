const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        unique: [true, "El nombre de esta mascota ya existe"]
    },
    
    type: {
        type: String,
        required: [true, "El tipo de mascota es requerido"],
        minlength: [3, "El tipo debe tener al menos 3 caracteres"]
    },

    description: {
        type: String,
        required: [true, "La descripción es requerida"],
        minlength: [3, "La descripción debe tener al menos 3 caracteres"]
    },
    skill1: {
        type: String,
    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    },

}, { timestamps: true });

module.exports.Pet = mongoose.model('Pet', PetSchema);