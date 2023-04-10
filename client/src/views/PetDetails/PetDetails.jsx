import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import './DetailsStyles.css'
import casa from './casa.png';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/pets/${id}`)
            .then(res => setPet(res.data.pet))
            .catch(err => console.log(err));
    }
    , [id]);

    const adoptPet = () => {
        axios.delete(`http://localhost:8080/api/pets/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    
    return (
        <div className="container">
            <div className="header">
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <div className="sub">
                <h2>Details about: {pet.name}</h2>
                <button className="btn1" onClick={adoptPet}>
                    <img src={ casa } alt="home"/>
                    Adopt {pet.name}
                </button>
            </div>
            <div className="box">
                <p>Pet type: {pet.type}</p>
                <p>Description: {pet.description}</p>
                <p>Skills: </p>
                <ul>
                    <li>{pet.skill1}</li>
                    <li>{pet.skill2}</li>
                    <li>{pet.skill3}</li>
                </ul>
            </div>
        </div>
    );
    
}

export default PetDetails;