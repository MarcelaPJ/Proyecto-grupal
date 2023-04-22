import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './PanelStyles.css'


const AcademyPanel = () => {
    const [academias, setAcademias] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/academias')
            .then(res => setAcademias(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Estudiantes inscritos en academias</h1>
                <button><Link to="/academias/new">Inscribir una academia</Link></button>
            </div>
            <div>
               
                <table>
                    <thead>
                        <tr>
                            <th>Estudiante</th>
                            <th>Curso</th>
                            <th>Apoderado</th>
                            <th>Teléfono</th>
                            <th>Academia 1</th>
                            <th>Academia 2</th>
                            <th>Academia 3</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {academias.map(academia  => (
                        <tr key={academia._id}>
                            <td>{academia.alumno}</td>
                            <td>{academia.curso}</td>
                            <td>{academia.apoderado}</td>
                            <td>{academia.telefono}</td>
                            <td>{academia.academia1}</td>
                            <td>{academia.academia2}</td>
                            <td>{academia.academia3}</td>
                            <td>
                                <button className="edit"><Link to={`/academias/${academia._id}/edit`}>Editar Datos</Link></button> ||
                                <button className="delete"><Link to={`/academias/${academia._id}`}>Eliminar estudiante</Link></button>  
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default AcademyPanel;