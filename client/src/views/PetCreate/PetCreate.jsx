import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CreateStyles.css'

const PetCreate = (props) => {
    const {pets, setPets} = props;
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const petForm = useFormik({
        initialValues: {
            name: '',
            type: '',
            description: '',
            skill1: '',
            skill2: '',
            skill3: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es requerido')
                .min(3, 'El nombre debe tener al menos 3 caracteres'),
            type: Yup.string()
                .required('El tipo de mascota es requerido')
                .min(3, "El tipo debe tener al menos 3 caracteres"),
            description: Yup.string()
                .required('La descripción es requerida')
                .min(3, 'La descripción debe tener al menos 3 caracteres')
        }),
        onSubmit: values => {
            axios.post('http://localhost:8080/api/pets', values)
                .then(res => {
                    if(res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setPets(pets, res.data);
                        navigate('/');
                    }
                })
                .catch(err => console.log(err));
        }
    });

    return (
        <div className="container">
            <div className="header1">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div>
                <h2>Know a pet needing a home?</h2>
                <div className='box1'>
                    <form onSubmit={petForm.handleSubmit} className="form">
                        <div>
                            <div>
                                <label htmlFor="name">Name:</label><br/>
                                <input type="text" name="name" onChange={petForm.handleChange} value={petForm.values.name} />
                                {errors.name ? <p>{errors.name.message}</p> : petForm.errors.name ? <p>{petForm.errors.name}</p> : ''}
                            </div><br></br>
                            <div>
                                <label htmlFor="type">Type:</label><br/>
                                <input type="text" name="type" onChange={petForm.handleChange} value={petForm.values.type} />
                                {errors.type ? <p>{errors.type.message}</p> : petForm.errors.type ? <p>{petForm.errors.type}</p> : ''}
                            </div>
                            <div>
                                <label htmlFor="description">Description:</label><br/>
                                <input type="text" name="description" onChange={petForm.handleChange} value={petForm.values.description} />
                                {errors.description ? <p>{errors.description.message}</p> : petForm.errors.description ? <p>{petForm.errors.description}</p> : ''}
                            </div>
                            <div>
                                <button className="btn" type="submit">Add Pet</button>
                            </div>
                        </div>
                        <div>
                            <h3>Skills (optional):</h3>
                            <div>
                                <label htmlFor="skill1">Skill 1:</label><br/>
                                <input type="text" name="skill1" onChange={petForm.handleChange} value={petForm.values.skill1} />
                            </div>
                            <div>
                                <label htmlFor="skill2">Skill 2:</label><br/>
                                <input type="text" name="skill2" onChange={petForm.handleChange} value={petForm.values.skill2} />
                            </div>
                            <div>
                                <label htmlFor="skill3">Skill 3:</label><br/>
                                <input type="text" name="skill3" onChange={petForm.handleChange} value={petForm.values.skill3} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default PetCreate;