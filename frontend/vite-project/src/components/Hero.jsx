import React, { useRef } from "react";
import './Hero.css';

function Hero() {
    const targetRef = useRef(null);

    const handleScroll = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="hero">
            </div>
            
        </div>
    );
}

export default Hero;
