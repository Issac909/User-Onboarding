import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';



function App() {
  const [user, setUser] = useState([]);

  const addUser = users =>  {
  setUser([...user, users])
};

  return (
    <div className="App">
      <Form addUser = {addUser} />
    </div>
  );
}

export default App;
