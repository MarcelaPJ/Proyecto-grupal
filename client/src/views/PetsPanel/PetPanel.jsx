import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './PanelStyles.css'


const PetPanel = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/pets')
            .then(res => setPets(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/pets/new">add a pet to the shelter</Link>
            </div>
            <div>
                <h2>These pets are looking for a good home</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map(pet  => (
                        <tr key={pet._id}>
                            <td>{pet.name}</td>
                            <td>{pet.type}</td>
                            <td>
                                <Link to={`/pets/${pet._id}`}>details</Link> |
                                <Link to={`/pets/${pet._id}/edit`}>edit</Link>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default PetPanel;