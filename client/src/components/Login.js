import React, { useState } from 'react'
import p1 from './loginpage.svg'
import { useNavigate } from 'react-router-dom';
import './css/login.css'

const Login = () => {

    const [credential, setCredential] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const mail = credential.email.toString();
        const pass = credential.password.toString();

       // const host = 'http://localhost:5000'
        const host = `https://cloudnotes123.herokuapp.com`;

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: mail, password: pass })
        });

        const json = await response.json();
        //console.log(json);

        if (json.authTocken) {
            localStorage.setItem('tocken', json.authTocken);
            navigate('/');
            alert("Logged in successfully")
        }
        else {
            alert("Enter valid credentials");
        }


    }

    const onChange = (e) => {

        setCredential({ ...credential, [e.target.name]: [e.target.value] });
        // console.log(notes);
    }

    return (
        <div className='p-4'>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={p1} alt="p" className="img-fluid" />
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-4">
                                    <div className="mb-4">
                                        <h3>Log In</h3>
                                        <p className="mb-4">WELCOME TO CLOUD-NOTES</p>
                                    </div>
                                    <form onSubmit={handlesubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credential.email} placeholder="example@gmail.com" onChange={onChange} required/>
                                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name='password' value={credential.password} onChange={onChange} minLength={6} required/>
                                        </div>
                                        <button type="submit" className="btn btn-primary loginbtn">Login</button>
                                    </form>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>




        </div>
    )
}

export default Login