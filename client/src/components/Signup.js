import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import p2 from './loginpage.svg'
import './css/signin.css'


const Signup = () => {

  const [details, setDetails] = useState({ name:"", email: "", password: "" ,confirm:""})
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

  
    const mail = details.email.toString();
    const pass = details.password.toString();
    const conf = details.confirm.toString();
    const nam = details.name.toString();

    if(pass !== conf)
    {
      alert("Confirm password once again");
      setDetails({password: "" ,confirm:""})
      return;
    }

   // const host = 'http://localhost:5000'
     const host = `https://cloudnotes123.herokuapp.com`;

    const response = await fetch(`${host}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nam, email: mail, password: pass })
    });

    const json = await response.json();
        //console.log(json);

        if (json.authTocken) {
            localStorage.setItem('tocken', json.authTocken);
            navigate('/');
            alert("Your account is succesfully created");
        }
        else {
            alert("User alreay exist");
        }



  }

  const onChange = (e) => {

    setDetails({ ...details, [e.target.name]: [e.target.value] });
    // console.log(notes);
  }

  return (
    <div className='p-4'>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={p2} alt="p" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8 mt-4">
                  <div className="mb-4">
                    <h3>SignUp</h3>
                    <p className="mb-4">WELCOME TO CLOUD-NOTES</p>
                  </div>

                  <form className="row g-3" onSubmit={handlesubmit}>

                    <div className="col-md-6">
                      <label htmlFor="firstname" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" name='name' value={details.name} onChange={onChange} required/>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" name='email' value={details.email} placeholder="example@gmail.com" onChange={onChange} required/>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" className="form-control" id="password" name='password' value={details.password} onChange={onChange} minLength={6} required/>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirm" className="form-label">Confirm Password</label>
                      <input type="confirm" className="form-control" id="confirm" name='confirm' value={details.confirm} onChange={onChange} minLength={6} required/>
                    </div>

                    <div className="col-12">
                      <button type="submit" className="btn btn-primary signinbtn">Sign in</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div >




    </div >
  )
}

export default Signup