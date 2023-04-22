import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import './DetailsStyles.css'


const AcademyDetails = () => {
    const { id } = useParams();
    const [academia, setAcademia] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/academias/${id}`)
            .then(res => setAcademia(res.data.academia))
            .catch(err => console.log(err));
    }
    , [id]);

    const deleteAcademy = () => {
        axios.delete(`http://localhost:8080/api/academias/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    
    return (
        <div className="container">
            <div className="header">
                <h1>Detalle del estudiante</h1>
                <button><Link to="/home">Volver al home</Link></button>
            </div>
            <div className="sub">
                <h2>Academias inscritas para: {academia.alumno}</h2>
            </div>
            <div className="box">
                <p>Curso: {academia.curso}</p>
                <p>Academias: </p>
                <ul>
                    <li>{academia.academia1}</li>
                    <li>{academia.academia2}</li>
                    <li>{academia.academia3}</li>
                </ul>
            </div>
            <div>
                <button className="btn1" onClick={deleteAcademy}>
                    Borrar al estudiante {academia.alumno}
                </button>
            </div>
        </div>
    );
    
}

export default AcademyDetails;