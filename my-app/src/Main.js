import React, { useEffect, useState } from 'react';
import './main.css';
import Front from './Boxes/Front.js';

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function Main() {
    const [isTextVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const boxes = document.querySelectorAll('.box');
        let currentIndex = 0;
        let isScrolling = false;

        function zoomIn(index) {
            const box = boxes[index];
            if (box) {
                box.style.transform = 'scale(1)';
            }
        }

        function zoomOut(index) {
            const box = boxes[index];
            if (box) {
                box.style.transform = 'scale(0.9)';
            }
        }

        function scrollToBox(index) {
            isScrolling = true;
            const box = boxes[index];
            if (box) {
                box.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
                setTimeout(() => {
                    isScrolling = false;
                }, 500); // Reset isScrolling after the transition
            }
        }

        function goToNextBox() {
            if (currentIndex < boxes.length - 1) {
                isScrolling = true;  // Set isScrolling to true to prevent further scrolling
                zoomOut(currentIndex);
                currentIndex++;
                setTimeout(() => {
                    scrollToBox(currentIndex);
                    setTimeout(() => {
                        zoomIn(currentIndex);
                        isScrolling = false;  // Reset isScrolling after zoom-in effect
                    }, 500);
                }, 500);
            }
        }

        function goToPreviousBox() {
            if (currentIndex > 0) {
                isScrolling = true;  // Set isScrolling to true to prevent further scrolling
                zoomOut(currentIndex);
                currentIndex--;
                setTimeout(() => {
                    scrollToBox(currentIndex);
                    setTimeout(() => {
                        zoomIn(currentIndex);
                        isScrolling = false;  // Reset isScrolling after zoom-in effect
                    }, 500);
                }, 500);
            }
        }

        function onScroll(event) {
            if (isScrolling) return;

            event.preventDefault();

            const deltaY = event.deltaY;
            const deltaX = event.deltaX;

            if (currentIndex === 0 && deltaY > 0) {
                goToNextBox();
            } else if (currentIndex === 2 && deltaY > 0) {
                goToNextBox();
            } else if (currentIndex === 1 && deltaX > 0) {
                goToNextBox();
            } else if (currentIndex === 3 && deltaY > 0) {
                goToNextBox();
            } else if (currentIndex === 4 && deltaY < 0) {
                goToPreviousBox();
            } else if (currentIndex === 3 && deltaY < 0) {
                goToPreviousBox();
            } else if (currentIndex === 1 && deltaY < 0) {
                goToPreviousBox();
            } else if (currentIndex === 2 && deltaX < 0) {
                goToPreviousBox();
            } else if (currentIndex === 4 && deltaX < 0) {
                isScrolling = true;  // Set isScrolling to true to prevent further scrolling
                zoomOut(currentIndex);
                currentIndex = 1;
                setTimeout(() => {
                    scrollToBox(1);
                    setTimeout(() => {
                        zoomIn(1);
                        isScrolling = false;  // Reset isScrolling after zoom-in effect
                    }, 500);
                }, 500);
            }
        }

        document.addEventListener('wheel', debounce(onScroll, 0), { passive: false });

        // Initial zoom in for the first box
        if (boxes.length > 0) {
            zoomIn(currentIndex);
        }

        // Show text after 2 seconds
        setTimeout(() => {
            setTextVisible(true);
        }, 6000);

    }, []);

    return (
        <div className="container">
            <div className="box" id="box1"><Front>{isTextVisible ? "KEVIN LAU" : "Box 1"}</Front></div>
            <div className="box" id="box2">Box 2</div>
            <div className="box" id="box3">Box 3</div>
            <div className="box" id="box4">Box 4</div>
            <div className="box" id="box5">Box 5</div>
        </div>
    );
}

export default Main;
