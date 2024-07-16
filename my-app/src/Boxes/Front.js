import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import './Front.css';
import { PiCaretDownThin } from "react-icons/pi";

const TypedComponent = ({ onComplete }) => {
    const el1 = useRef(null);
    const el2 = useRef(null);
    const typed1 = useRef(null);
    const typed2 = useRef(null);
    const [showSecond, setShowSecond] = useState(false);

    useEffect(() => {
        const options1 = {
            strings: [
                "A 1000 IQ Man,",  
                "A Genius, The Next Bill Gates",
                "A Genius, Entrepreneur, ",
                "A Genius, Entrepreneur, and a <br> Software Developer"
            ],
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 50,
            startDelay: 250,
            loop: false,
            smartBackspace: true,
            showCursor: true,
            cursorChar: '.',
            onComplete: () => {
                setShowSecond(true);
                typed1.current.cursor.remove(); // Remove cursor after typing is complete
            },
        };

        typed1.current = new Typed(el1.current, options1);

        return () => {
            typed1.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (showSecond) {
            const options2 = {
                strings: [
                    "all walk into a bar. The Bartender asks, \"Table for One?\" How is this possible??? <br> Well it's because that man is..."
                ],
                typeSpeed: 15,
                startDelay: 10,
                loop: false,
                showCursor: true,
                cursorChar: '_',
                onComplete: () => {
                    typed2.current.cursor.remove(); // Remove cursor after typing is complete
                    onComplete(); // Trigger the fade-in for KEVIN LAU
                },
            };

            typed2.current = new Typed(el2.current, options2);
            return () => {
                //typed2.current.destroy();
            };
        }
    }, [showSecond, onComplete]);

    return (
        <div id="typeContainer">
            <div id="typedtext"><span className="widththing" ref={el1}/></div>
            {showSecond && <div id="typedtext2"><span ref={el2}></span></div>}
        </div>
    );
};

function Front({ gotoFunction }) {
    const [showKevinLau, setShowKevinLau] = useState(false);

    return (
        <div className="thefront">
            <div className="thebackground">
                <TypedComponent onComplete={() => setShowKevinLau(true)} />
                <h1 id="KEVINLAU" className={showKevinLau ? 'fade-in' : ''}> KEVIN LAU </h1>
                <div id="page1buttonrow">
                    <button onClick={() => gotoFunction(1)} type="button" id="page1button" className={showKevinLau ? 'fade-in' : ''}>
                        <PiCaretDownThin id="downarrow" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Front;
