const selectedResolution = document.querySelector("#resolution");
const sketchContainer = document.querySelector(".sketch-container");
const redBtn = document.querySelector("#red-btn");
const greenBtn = document.querySelector("#green-btn");
const blueBtn = document.querySelector("#blue-btn");
const clearBtn = document.querySelector("#clear-btn");
const randBtn = document.querySelector("#rand-btn");

function createGridContainer(num) {
  sketchContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`;
  let ratio = num * num;

  for (let i = 0; i < ratio; i++) {
    let newPixel = document.createElement("div");
    newPixel.classList.add("pixel-style");
    // newPixel.addEventListener("mouseover", () => {
    //   setPixelColor(newPixel, currentColor);
    // });
    sketchContainer.appendChild(newPixel);
  }
}

function setPixelColor(pixel, color) {
  pixel.style.backgroundColor = color;
}

let currentColor = getRandomColor(); // Default color
let isMousePressed = false;

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  let isGridCreated = true;
  // Attach event listener
  selectedResolution.addEventListener("change", () => {
    if (!isGridCreated) {
      clearGrid();
    } else {
      isGridCreated = false;
    }
    createGridContainer(selectedResolution.value);
    redBtn.addEventListener("click", () => {
      currentColor = "red";
    });

    greenBtn.addEventListener("click", () => {
      currentColor = "green";
    });

    blueBtn.addEventListener("click", () => {
      currentColor = "blue";
    });
    clearBtn.addEventListener("click", () => {
      currentColor = "#ffffff";
    });
    randBtn.addEventListener("click", () => {
      currentColor = getRandomColor();
    });
    sketchContainer.addEventListener("mousedown", () => {
      isMousePressed = true;
    });

    sketchContainer.addEventListener("mouseup", () => {
      isMousePressed = false;
    });

    sketchContainer.addEventListener("mouseover", (event) => {
      if (isMousePressed) {
        const targetPixel = event.target;
        console.log(targetPixel);
        if (targetPixel.classList.contains("pixel-style")) {
          setPixelColor(targetPixel, currentColor);
        }
      }
    });
  });
});

function clearGrid() {
  const sketchContainer = document.querySelector(".sketch-container");
  sketchContainer.innerHTML = "";
}

function getRandomColor() {
  // Generate random values for RGB components
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Construct the color string
  const color = `rgb(${r},${g},${b})`;

  return color;
}
