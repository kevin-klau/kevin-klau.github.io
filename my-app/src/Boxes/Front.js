import React, { useEffect, useRef } from 'react';
import './Front.css';
import Typed from 'typed.js';

const TypedComponent = () => {
  const el = useRef(null); // create a ref for the element that will contain the text
  const typed = useRef(null); // store the Typed instance

  useEffect(() => {
    const options = {
      strings: [
          "A 1000 IQ Man,",  
          "A Genius, The Next Bill Gates",
          "A Genius, Entrepreneur,",
          "A Genius, Entrepreneur, and a Software Developer"],
      typeSpeed: 30,
      backSpeed: 20,
      backDelay: 50,
      startDelay: 250,
      loop: false,
      smartBackspace: true,   
      showCursor: true, // Ensures the cursor is shown
      cursorChar: '|', // The character used for the cursor
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Destroy Typed instance during cleanup to prevent memory leaks
      typed.current.destroy();
    };
  }, []);

  return (
    <div id={"typedtext"}>
      <span ref={el}></span>
    </div>
  );
};

function Main() {
    return (
        <div className="thefront">
           <div className="thebackground">
               <TypedComponent className="muck"/>
           </div>
        </div>
    )
}
export default Main;
