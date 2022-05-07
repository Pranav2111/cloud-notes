import React from 'react';
import p3 from './ab.png'

const About = () => {
  return (
    <div className='p-4'>
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={p3} alt="p" className="img-fluid" />
            </div>
            <div className="col-md-6 my-auto">
               <h2>OUR APPLICATION WILL ENABLE YOU TO STORE YOUR NOTES ON CLOUD AND ACCESS IT FROM ANY WHERE</h2>
                
            </div>

          </div>
        </div>
      </div>




    </div>
  )
}

export default About