import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        // Email validation
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // Confirm password validation
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            axios.post('http://localhost:3001/register', { name, email, password })
                .then(result => {
                    console.log(result);
                    if (result.data === "Already registered") {
                        alert("E-mail already registered! Please Login to proceed.");
                        navigate('/login');
                    } else {
                        alert("Registered successfully! Please Login to proceed.");
                        navigate('/login');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#2A00B7, #42006C)" }}>
                <div className="bg-white px-5 py-4 rounded" style={{ width: '30%' }}>

                    <div className='text'>Sign Up</div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputName" className="form-label">
                                <strong>Name</strong>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="exampleInputName"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="exampleInputEmail1"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="exampleInputPassword1"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputConfirmPassword1" className="form-label">
                                <strong>Confirm Password</strong>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                id="exampleInputConfirmPassword1"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                required
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-3'>Already have an account ?</p>
                    <Link to='/login' className="loginlink">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;