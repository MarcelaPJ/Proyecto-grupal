import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PetCreate from './views/PetCreate/PetCreate';
import PetDetails from './views/PetDetails/PetDetails';
import PetEdit from './views/PetEdit/PetEdit';
import PetPanel from './views/PetsPanel/PetPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PetPanel />} />
          <Route path='/pets/new' element={<PetCreate />}/>
          <Route path='/pets/:id/edit' element={<PetEdit />} />
          <Route path='/pets/:id' element={<PetDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
