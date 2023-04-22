import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './EditStyles.css';

const AcademyEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [academia, setAcademia] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/academias/${id}`)
            .then(res => {setAcademia(res.data.academia);
                console.log(res.data.academia);
            })

            .catch(err => console.log(err));
    }, [id]);


    return (
        <div className="container">
            <div className="header2">
                <h1>Inscripción de academias</h1>
                <button><Link to="/home">Volver al home</Link></button>
            </div>
            <div>
            <h2>Editar a {academia ? academia.alumno : ""}</h2>
                <div className="box2">

                {academia ? <Formik
                    initialValues={academia}
                    validationSchema={Yup.object({
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
                            .min(8, "Debe tener al menos 8 caracteres"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        axios.put(`http://localhost:8080/api/academias/${id}`, values)
                        .then(res => {
                            if(res.data.errors) {
                                setErrors(res.data.errors);
                            } else {
                                setAcademia(academia, res.data.academia);
                                navigate('/home');
                            }
                        })
                        .catch(err => console.log(err));
                    }}
                    >
                    {formik => (
                        <form onSubmit={formik.handleSubmit} className="form1">
                            <div>
                                <div>
                                    <label htmlFor="alumno">Nombre del estudiante:</label><br/>
                                    <input id="alumno" type="text" name="alumno"  onChange={formik.handleChange} value={formik.values.alumno} />
                                    {errors.alumno ? <p>{errors.alumno.message}</p> : formik.errors.alumno ? <p>{formik.errors.alumno}</p> : ''}
                                </div>
                                <div>
                                    <label htmlFor="curso">Curso:</label><br/>
                                    <input id="curso" type="text" name="curso" onChange={formik.handleChange} value={formik.values.curso} />
                                    {errors.curso ? <p>{errors.curso.message}</p> : formik.errors.curso ? <p>{formik.errors.curso}</p> : ''}
                                </div>
                                <div>
                                    <label htmlFor="apoderado">Nombre del apoderado:</label><br/>
                                    <input id="apoderado" type="text" name="apoderado" onChange={formik.handleChange} value={formik.values.apoderado} />
                                    {errors.apoderado ? <p>{errors.apoderado.message}</p> : formik.errors.apoderado ? <p>{formik.errors.apoderado}</p> : ''}
                                </div>
                                <div>
                                    <label htmlFor="telefono">Teléfono de contacto:</label><br/>
                                    <input id="telefono" type="text" name="telefono" onChange={formik.handleChange} value={formik.values.telefono} />
                                    {errors.telefono ? <p>{errors.telefono.message}</p> : formik.errors.telefono ? <p>{formik.errors.telefono}</p> : ''}
                                </div>
                                <div>
                                    <button className="btn3"type="submit">Editar estudiante</button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3>Academias:</h3>
                                    <label htmlFor="academia1">Academia 1:</label><br/>
                                    <input id="skill1" type="text" name="skill1" onChange={formik.handleChange} value={formik.values.academia1} />
                                </div>
                                <div>
                                    <label htmlFor="academia2">Academia 2:</label><br/>
                                    <input id="academia2" type="text" name="academia2" onChange={formik.handleChange} value={formik.values.academia2} />
                                </div>
                                <div>
                                    <label htmlFor="academia3">Academia 3:</label><br/>
                                    <input id="academia3" type="text" name="academia3" onChange={formik.handleChange} value={formik.values.academia3} />
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
export default AcademyEdit;