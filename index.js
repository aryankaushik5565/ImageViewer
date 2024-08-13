const urlContainer = document.getElementById('url-container');
const addBtn = document.getElementById('add');
const imgContainer = document.getElementById('img-container');
const next = document.getElementById('btn1');
const previous = document.getElementById('btn2');
const clear = document.getElementById('btn3');

const IMAGES = JSON.parse(localStorage.getItem("images"))||[];
let currentIndex = JSON.parse(localStorage.getItem("index"))|| -1;



function saveImage()
{
    localStorage.setItem("images",JSON.stringify(IMAGES));
    localStorage.setItem("index",JSON.stringify(currentIndex));
}










function updateImage() {
    if (currentIndex >= 0 && currentIndex < IMAGES.length) {
        imgContainer.setAttribute("src", IMAGES[currentIndex]);
    } else {
        imgContainer.setAttribute("src", "");
    }
}

function moveRightIndex() {
    currentIndex++;
    if (currentIndex === IMAGES.length) {
        currentIndex = 0;
    }
}

function moveLeftIndex() {
    currentIndex--;
    if (currentIndex === -1) {
        currentIndex = IMAGES.length - 1;
    }
}

function goToClearImage() {
    if (IMAGES.length > 0) {
        IMAGES.splice(currentIndex, 1);
        if (currentIndex === IMAGES.length) {
            currentIndex = 0;
        }
        updateImage();
        saveImage();
    }
}

function goToNextImage() {
    moveRightIndex();
    updateImage();
    saveImage();
}

function goToPreviousImage() {
    moveLeftIndex();
    updateImage();
    saveImage();
}

addBtn.addEventListener('click', () => {
    const imageUrl = urlContainer.value;
    if (imageUrl) {
        IMAGES.push(imageUrl);
        currentIndex = IMAGES.length - 1;
        updateImage();
        saveImage();
    }
});

document.addEventListener('keypress', (event) => {
    const keypressed = event.key;
    if (keypressed === 'n') {
        goToNextImage();
    }
    if (keypressed === 'p') {
        goToPreviousImage();
    }
    if (keypressed === 'c') {
        goToClearImage();
    }
});


next.addEventListener('click',()=>{
    goToNextImage();
})
previous.addEventListener('click',()=>{
    goToPreviousImage();
})
clear.addEventListener('click',()=>{
    goToClearImage();
})









updateImage();