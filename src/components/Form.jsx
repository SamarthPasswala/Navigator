import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Form() {
    const [data, setData] = useState({}); 
    const [hobby, setHobby] = useState([]); 
    const navigate = useNavigate(); 

    const handleInput = (e) => {
        const { name, value } = e.target;
        const updatedHobby = [...hobby]; 

        if (name === 'hobby') {
            if (e.target.checked) {
                updatedHobby.push(value);
            } else {
                const pos = updatedHobby.indexOf(value);
                if (pos !== -1) {
                    updatedHobby.splice(pos, 1);
                }
            }
        }

        setHobby(updatedHobby);
        setData({ ...data, [name]: name === 'hobby' ? updatedHobby : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, hobby }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            toast.success("Data Added.");
            navigate('/Record');
        })
        .catch((err) => {
            console.error(err);
            toast.error("Failed to add data.");
        });
    };
    

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center">Add User Data</h2>
                <Link to="/Record" className="btn btn-link">View Records</Link>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group">
                        <label>UserName</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={handleInput}
                            required // Required field
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            onChange={handleInput}
                            required // Required field
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            onChange={handleInput}
                            required // Required field
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label><br />
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleInput}
                        /> Male
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleInput}
                        /> Female
                    </div>
                    <div className="form-group">
                        <label>Hobby</label><br />
                        <input
                            type="checkbox"
                            name="hobby"
                            value="Code"
                            onChange={handleInput}
                        /> Code
                        <input
                            type="checkbox"
                            name="hobby"
                            value="Paint"
                            onChange={handleInput}
                        /> Paint
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <select
                            name="city"
                            className="form-control"
                            onChange={handleInput}
                            required // Required field
                        >
                            <option value="">--select-city--</option>
                            <option value="surat">Surat</option>
                            <option value="pune">Pune</option>
                            <option value="rajkot">Rajkot</option>
                            <option value="vadodra">Vadodra</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="address"
                            className="form-control"
                            onChange={handleInput}
                            required // Required field
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Record</button>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default Form;
