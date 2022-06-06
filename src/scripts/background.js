const images = [
    "main_background_0.jpg", 
    "main_background_1.jpg", 
    "main_background_2.jpg"
]

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

//document.body.prepend(bgImage); // 맨 뒤에.
document.body.appendChild(bgImage);