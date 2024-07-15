document.addEventListener('wheel', debounce(onScroll, 0), { passive: false });

let currentIndex = 0;
const boxes = document.querySelectorAll('.box');
let isScrolling = false;

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
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
          currentIndex == 1;
          setTimeout(() => {
          scrollToBox(1);
          setTimeout(() => {
               zoomIn(1);
               isScrolling = false;  // Reset isScrolling after zoom-in effect
          }, 500);
          }, 500);
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

function scrollToBox(index) {
    isScrolling = true;
    const box = boxes[index];
    box.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    setTimeout(() => {
        isScrolling = false;
    }, 500);  // Reset isScrolling after the transition
}

function zoomIn(index) {
    boxes[index].style.transform = 'scale(1)';
    boxes[index].style.opacity = '1';
}

function zoomOut(index) {
    boxes[index].style.transform = 'scale(0.8)';
    boxes[index].style.opacity = '0.7';
}

document.addEventListener('DOMContentLoaded', () => {
    zoomIn(currentIndex);
});
