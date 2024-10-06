import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

function Record() {
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = () => {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const deleteData = (id) => {
        fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                console.log("Data Deleted.");
                fetchRecords();
            })
            .catch(err => {
                console.error(err);
            });
    };

    const editData = (id) => {
        navigator(`/edit/${id}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">User Records</h2>
            <Link to="/" className="btn btn-primary mb-3">Add Record</Link>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Gender</th>
                            <th>Hobby</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>{user.gender}</td>
                                <td>{user.hobby.toString() || ''}</td>
                                <td>{user.city}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteData(user.id)}>Delete</button>
                                    <button className="btn btn-warning btn-sm" onClick={() => editData(user.id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Record;
