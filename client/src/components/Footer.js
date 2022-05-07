import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
            <h2>Cloud-Notes</h2>
            <p>Now manage you notes on cloud</p>
            <ul className="socials">
                <li><i className="fa fa-facebook"></i></li>
                <li><i className="fa fa-twitter"></i></li>
                <li><i className="fa fa-google-plus"></i></li>
                <li><i className="fa fa-youtube" ></i></li>
                <li><i className="fa fa-linkedin-square"> </i></li>
            </ul>
        </div>
        <div className="footer-bottom">
            <p>copyright &copy; Cloud-Notes  </p>
                    <div className="footer-menu">
                      <ul className="f-menu">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Blog</li>
                      </ul>
                    </div>
        </div>

    </footer>
  )
}

export default Footer