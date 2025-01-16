import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (validateForm()) {
            axios.post('http://localhost:3001/login', { email, password })
                .then(result => {
                    console.log(result);
                    if (result.data === "Success") {
                        console.log("Login Success");
                        alert('Login successful!');
                        navigate('/home');
                    } else {
                        alert('Incorrect password! Please try again.');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}>
                <div className="bg-white px-5 py-4 rounded" style={{ width: '30%' }}>

                    <div className='text'>LogIn</div>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <p className='container my-3'>Don&apos;t have an account?</p>
                    <Link to='/register' className="loginlink">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;