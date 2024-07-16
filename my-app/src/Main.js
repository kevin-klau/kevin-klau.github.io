import React, { useEffect, useState, useRef } from 'react';
import './main.css';
import Front from './Boxes/Front.js';
import Quick from './Boxes/Quick.js';

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function Main() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isScrolling = useRef(false);

    useEffect(() => {
        const boxes = document.querySelectorAll('.box');
        if (boxes.length > 0) {
            zoomIn(currentIndex);
        }

        const handleScroll = debounce(onScroll, 0);

        document.addEventListener('wheel', handleScroll, { passive: false });

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('wheel', handleScroll);
        };
    }, [currentIndex]);

    function zoomIn(index) {
        const boxes = document.querySelectorAll('.box');
        const box = boxes[index];
        if (box) {
            box.style.transform = 'scale(1)';
        }
    }

    function zoomOut(index) {
        const boxes = document.querySelectorAll('.box');
        const box = boxes[index];
        if (box) {
            box.style.transform = 'scale(0.9)';
        }
    }

    function scrollToBox(index) {
        isScrolling.current = true;
        const boxes = document.querySelectorAll('.box');
        const box = boxes[index];
        if (box) {
            box.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            setTimeout(() => {
                isScrolling.current = false;
            }, 500); // Reset isScrolling after the transition
        }
    }

    function goToBox(nextIndex) {
        zoomOut(currentIndex);
        setTimeout(() => {
            scrollToBox(nextIndex);
            setTimeout(() => {
                zoomIn(nextIndex);
                setCurrentIndex(nextIndex);
                isScrolling.current = false;  // Reset isScrolling after zoom-in effect
            }, 500); // Delay zoom-in by 1 second
        }, 300);
    }

    function onScroll(event) {
        if (isScrolling.current) return;

        event.preventDefault();

        const deltaY = event.deltaY;
        const deltaX = event.deltaX;

        if ((currentIndex === 0 || currentIndex === 2 || currentIndex === 3) && deltaY > 0) {
            goToBox(currentIndex + 1);
        } else if (currentIndex === 1 && deltaX > 0) {
            goToBox(currentIndex + 1);
        } else if ((currentIndex === 3 || currentIndex === 4 || currentIndex === 1) && deltaY < 0) {
            goToBox(currentIndex - 1);
        } else if (currentIndex === 2 && deltaX < 0) {
            goToBox(currentIndex - 1);
        } else if (currentIndex === 4 && deltaX < 0) {
            goToBox(1);
        }
    }

    return (
        <div className="container">
            <div className="box" id="box1"><Front gotoFunction={(msg) => goToBox(msg)}/></div>
            <div className="box" id="box2"><Quick /></div>
            <div className="box" id="box3">Box 3</div>
            <div className="box" id="box4">Box 4</div>
            <div className="box" id="box5">Box 5</div>
        </div>
    );
}

export default Main;
