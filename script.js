function paint() {
    if (pen === 'DRAW') {
        this.setAttribute("style", "background-color:black;");
    } else if (pen === 'ERASE') {
        this.setAttribute("style", "background-color:white;");
    } else if (pen === 'SHADES') {
        let currentColor = this.getAttribute('style');

        if ((currentColor) && (currentColor.match(/hwb/))) {
            let a = currentColor.substr( -3, 1);
            if (a < 9) {
                let b = Number(a) + 1;
                currentColor = currentColor.replaceAll(a, b);
                if (currentColor.match(/200/)) {
                    currentColor = currentColor.replaceAll(200, 100);
                }
                
            } else {
                currentColor = currentColor.replace(".9", "1");
            }
            this.setAttribute("style", currentColor);
        } else {
            this.setAttribute("style", "background-color:hwb(0 0% 100% / .1);");
        }
    } else if (pen === 'RAINBOW') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const attributeValue = "background-color:#" + randomColor + ";";
        this.setAttribute("style", attributeValue);
    }
}

function setupGrid(columns, rows) {
    grid.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    grid.style.gridTemplateRows = `repeat(${rows}, auto)`;
    const sizeOfGrid = columns * rows;

    for (let i = 0; i < sizeOfGrid; i++) {
        const element = document.createElement('div');
        element.classList.add('gridElement');
        element.addEventListener("mouseover", paint);
        grid.appendChild(element);
    }
}

function resetGrid(columns, rows) {
    const elements = document.querySelectorAll('.gridElement');
    elements.forEach(element => {element.remove();});

    setupGrid(columns, rows);
}

function adjustSlider(size) {
    newGridSizeSlider.setAttribute("value", size);
    
    const oldSliderText = document.querySelector(".sliderText");
    if (oldSliderText) {oldSliderText.remove()};
    
    const sliderText = document.createElement('p');
    sliderText.textContent = "Size of the new grid will be: " + size + " x " + size;
    sliderText.classList.add("sliderText");
    newGridSizeText.appendChild(sliderText);
}

// EVENTS 
resetButton.onclick = function() {modal.style.display = "block";}
drawButton.onclick = function() {pen = 'DRAW';}
eraseButton.onclick = function() {pen = 'ERASE';}
shadesButton.onclick = function() {pen = 'SHADES';}
rainbowButton.onclick = function() {pen = 'RAINBOW';}
  
closeButton.onclick = function() {
    modal.style.display = "none";
    resetGrid(numberOfRows, numberOfColumns);     
}

newGridSizeSlider.onchange = function(size) {    
    numberOfRows = size.target.value;
    numberOfColumns = size.target.value;
    adjustSlider(numberOfRows);
    resetGrid(numberOfRows, numberOfColumns);    
}

// INITIALIZATION
let numberOfRows = 16;
let numberOfColumns = 16;
let pen = 'DRAW';

adjustSlider(numberOfColumns);
setupGrid(numberOfColumns, numberOfRows);
