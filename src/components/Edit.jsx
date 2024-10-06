import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
    const [data, setData] = useState({});
    const [hobby, setHobby] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`http://localhost:3000/user/${id}`);
                const userData = await res.json();
                setData(userData);
                setHobby(userData.hobby || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch user data.");
            }
        };
        fetchUser();
    }, [id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        const updatedHobby = [...hobby];

        if (name === 'hobby') {
            if (e.target.checked) {
                updatedHobby.push(value);
            } else {
                const pos = updatedHobby.indexOf(value);
                updatedHobby.splice(pos, 1);
            }
        }
        setHobby(updatedHobby);
        setData({ ...data, [name]: name === 'hobby' ? updatedHobby : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3000/user/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, hobby }),
            });
            toast.info("Record Updated.");
            navigate('/Record');
        } catch (err) {
            toast.error("Failed to update record.");
            console.error(err);
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h2 className="text-center">Edit User Data</h2>
                <Link to="/Record" className="btn btn-link">View Records</Link>
                <form onSubmit={handleSubmit} className="mt-4">
                    {/* Form Fields */}
                    <div className="form-group">
                        <label>UserName</label>
                        <input type="text" name="username" value={data.username || ''} className="form-control" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={data.email || ''} className="form-control" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" value={data.password || ''} className="form-control" onChange={handleInput} required />
                    </div>
                    <div className="form-group">
                        <label>Gender</label><br />
                        <input type="radio" name="gender" value="male" checked={data.gender === 'male'} onChange={handleInput} /> Male
                        <input type="radio" name="gender" value="female" checked={data.gender === 'female'} onChange={handleInput} /> Female
                    </div>
                    <div className="form-group">
                        <label>Hobby</label><br />
                        <input type="checkbox" name="hobby" value="Code" checked={hobby.includes('Code')} onChange={handleInput} /> Code
                        <input type="checkbox" name="hobby" value="Paint" checked={hobby.includes('Paint')} onChange={handleInput} /> Paint
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <select name="city" className="form-control" onChange={handleInput} value={data.city || ''} required>
                            <option value="">--select-city--</option>
                            <option value="surat">Surat</option>
                            <option value="pune">Pune</option>
                            <option value="rajkot">Rajkot</option>
                            <option value="vadodra">Vadodra</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea name="address" className="form-control" onChange={handleInput} value={data.address || ''} />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Record</button>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} closeOnClick draggable pauseOnHover theme="dark" />
        </>
    );
}

export default Edit;
