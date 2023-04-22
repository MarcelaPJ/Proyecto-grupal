import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CreateStyles.css';

const AcademyCreate = (props) => {
    //const {academias, setAcademias} = props;
    const [academias, setAcademias] = useState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const academiaForm = useFormik({
        initialValues: {
            alumno: '',
            curso: '',
            apoderado: '',
            telefono: '',
            academia1: '',
            academia2: '',
            academia3: ''
        },
        validationSchema: Yup.object({
            alumno: Yup.string()
                .required('El nombre del estudiante es requerido')
                .min(3, 'El nombre debe tener al menos 3 caracteres'),
            curso: Yup.string()
                .required('El curso del estudiante es requerido')
                .min(1, "El curso debe tener al menos 1 caracter"),
            apoderado: Yup.string()
                .required('El nombre del apoderado es requerido')
                .min(3, 'El nombre debe tener al menos 3 caracteres'),
            telefono: Yup.number()
                .required('El teléfono de contacto es requerido')
                .min(8, "Debe tener al menos 8 caracteres")
        }),
        onSubmit: values => {
            axios.post('http://localhost:8080/api/academias', values)
                .then(res => {
                    if(res.data.errors) {
                        setErrors(res.data.errors);
                    } else {
                        setAcademias(academias, res.data);
                        navigate('/academias');
                    }
                })
                .catch(err => console.log(err));
        }
    });

    return (
        <div className="container">
            <div className='volver'>
                <button><Link to="/home">Volver al home</Link></button>
            </div>
            <div className="header1">
                <h1>Inscripción de Estudiantes</h1>
            </div>
            
            <div>
                <h2>Complete el siguiente formulario</h2>
                <div className='box1'>
                    <form onSubmit={academiaForm.handleSubmit} className="form">
                        <div>
                            <div>
                                <label htmlFor="alumno">Nombre del estudiante:</label><br/>
                                <input type="text" name="alumno" onChange={academiaForm.handleChange} value={academiaForm.values.alumno} />
                                {errors.alumno ? <p>{errors.alumno.message}</p> : academiaForm.errors.alumno ? <p>{academiaForm.errors.alumno}</p> : ''}
                            </div><br></br>
                            <div>
                                <label htmlFor="curso">Curso:</label><br/>
                                <input type="text" name="curso" onChange={academiaForm.handleChange} value={academiaForm.values.curso} />
                                {errors.curso ? <p>{errors.curso.message}</p> : academiaForm.errors.curso ? <p>{academiaForm.errors.curso}</p> : ''}
                            </div>
                            <div>
                                <label htmlFor="apoderado">Nombre del apoderado:</label><br/>
                                <input type="text" name="apoderado" onChange={academiaForm.handleChange} value={academiaForm.values.apoderado} />
                                {errors.apoderado ? <p>{errors.apoderado.message}</p> : academiaForm.errors.apoderado ? <p>{academiaForm.errors.apoderado}</p> : ''}
                            </div>
                            <div>
                                <label htmlFor="telefono">Teléfono de contacto:</label><br/>
                                <input type="text" name="telefono" onChange={academiaForm.handleChange} value={academiaForm.values.telefono} />
                                {errors.telefono ? <p>{errors.telefono.message}</p> : academiaForm.errors.telefono ? <p>{academiaForm.errors.telefono}</p> : ''}
                            </div>
                            <div>
                                <label htmlFor="academia1">Academia 1:</label><br/>
                                <input type="text" name="academia1" onChange={academiaForm.handleChange} value={academiaForm.values.academia1} />
                            </div>
                            <div>
                                <label htmlFor="academia2">Academia 2:</label><br/>
                                <input type="text" name="academia2" onChange={academiaForm.handleChange} value={academiaForm.values.academia2} />
                            </div>
                            <div>
                                <label htmlFor="academia3">Academia 3:</label><br/>
                                <input type="text" name="academia3" onChange={academiaForm.handleChange} value={academiaForm.values.academia3} />
                            </div>
                            <div>
                                <button className="btn" type="submit">Agregar estudiante</button>
                                <button className='btn' type="submit"><Link to="/academias">Ver inscripción</Link></button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}

export default AcademyCreate;