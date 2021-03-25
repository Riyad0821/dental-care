import React from 'react';
import './Hero.css';

import MaskGroup1 from '../../img/MaskGroup1.png';

const Hero = () => {
    return (
        <section className="hero">
            <div className="heroInner container">
                <div className="half">
                    <h1 className="heroHeading">Your New Smile <br /> Starts Here</h1>

                    <p className="heroIntro">At Doctors Portal Dental Care, our patients are our top priority. We focus on providing high quality patient care, whether that's through our Govt services or private treatment plans We’re committed to increasing access to quality dental care, providing our patients with a clear choice of treatment options, so you can find the right dental care to meet your needs.</p>
                    <a href="/appointment" className="btn">Get appointment</a>
                </div>
                <div className="half">
                    <img src={MaskGroup1} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Hero;