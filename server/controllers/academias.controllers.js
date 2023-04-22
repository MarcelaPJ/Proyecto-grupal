const { Academia } = require('../models/academias.model');

// Crear academia
module.exports.createAcademia = (req, res) => {
    const { alumno, curso, apoderado, telefono, academia1, academia2, academia3 } = req.body;
    Academia.create({
        alumno,
        curso,
        apoderado,
        telefono,
        academia1,
        academia2,
        academia3
    })
        .then(newAcademia => res.json(newAcademia))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));     
}

// Obtener todas las academias
module.exports.findAllAcademias = (req, res) => {
    Academia.find({})
        .then(allAcademias => res.json(allAcademias))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Obtener una academia
module.exports.findOneAcademia = (req, res) => {
    Academia.findOne({ _id: req.params.id })
        .then(oneAcademia => res.json({academia: oneAcademia}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Actualizar una academia
module.exports.updateAcademia = (req, res) => {
    Academia.findOneAndUpdate({_id: req.params.id}, req.body,
        {new:true})
        .then(updatedAcademia => res.json({academia: updatedAcademia}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

// Borrar una academia
module.exports.deleteAcademia = (req, res) => {
    Academia.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json({academia: deleteConfirmation}))
        .catch(err => res.json({message: "something went wrong!", error: err}));
}

