import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './EditStyles.css';

const PetEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${id}`)
            .then(res => {setPet(res.data.pet);
                console.log(res.data.pet);
            })

            .catch(err => console.log(err));
    }, [id]);


    return (
        <div className="container">
            <div className="header2">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div>
            <h2>Edit {pet ? pet.name : ""}</h2>
                <div className="box2">

                {pet ? <Formik
                    initialValues={pet}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('Name is required')
                            .min(3, 'Name must be at least 3 characters'),
                        type: Yup.string()
                            .required('Type is required')
                            .min(3, 'Type must be at least 3 characters'),
                        description: Yup.string()
                            .required('Description is required')
                            .min(3, 'Description must be at least 3 characters')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.put(`http://localhost:8080/api/pets/${id}`, values)
                        .then(res => {
                            if(res.data.errors) {
                                setErrors(res.data.errors);
                            } else {
                                setPet(pet, res.data.pet);
                                navigate('/');
                            }
                        })
                        .catch(err => console.log(err));
                    }}
                    >
                    {formik => (
                        <form onSubmit={formik.handleSubmit} className="form1">
                            <div>
                                <div>
                                    <label htmlFor="name">Name:</label><br/>
                                    <input id="name" type="text" name="name"  onChange={formik.handleChange} value={formik.values.name} />
                                    {errors.name ? <p>{errors.name.message}</p> : formik.errors.name ? <p>{formik.errors.name}</p> : ''}
                                </div>
                                <div>
                                    <label htmlFor="type">Type:</label><br/>
                                    <input id="type" type="text" name="type" onChange={formik.handleChange} value={formik.values.type} />
                                    {errors.type ? <p>{errors.type.message}</p> : formik.errors.type ? <p>{formik.errors.type}</p> : ''}
                                </div>
                                <div>
                                    <label htmlFor="description">Description:</label><br/>
                                    <input id="description" type="text" name="description" onChange={formik.handleChange} value={formik.values.description} />
                                    {errors.description ? <p>{errors.description.message}</p> : formik.errors.description ? <p>{formik.errors.description}</p> : ''}
                                </div>
                                <div>
                                    <button className="btn3"type="submit">Edit Pet</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>Skills (optional):</h3>
                                    <label htmlFor="skill1">Skill 1:</label><br/>
                                    <input id="skill1" type="text" name="skill1" onChange={formik.handleChange} value={formik.values.skill1} />
                                </div>
                                <div>
                                    <label htmlFor="skill2">Skill 2:</label><br/>
                                    <input id="skill2" type="text" name="skill2" onChange={formik.handleChange} value={formik.values.skill2} />
                                </div>
                                <div>
                                    <label htmlFor="skill3">Skill 3:</label><br/>
                                    <input id="skill3" type="text" name="skill3" onChange={formik.handleChange} value={formik.values.skill3} />
                                </div>
                            </div>
                        </form>
                    )}
                    </Formik> : null }

                </div>  
            </div>
        </div>
    )
}
export default PetEdit;