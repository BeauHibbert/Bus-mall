'use strict';

// global variables
let imgContainer = document.getElementById('image-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let totalClicks = 0;

let currentImage1 = null;
let currentImage2 = null;
let currentImage3 = null;

const ProductImage = function(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesShown = 0;
  this.clicks = 0;
  ProductImage.allImages.push(this);
}
ProductImage.allImages = [];

const renderNewProduct = function(leftIndex, middleIndex, rightIndex) {
  img1.src = ProductImage.allImages[leftIndex].filePath;
  img2.src = ProductImage.allImages[middleIndex].filePath;
  img3.src = ProductImage.allImages[rightIndex].filePath;
}

const pickNewProducts = function() {
  console.log('ProductImage.allImages: ', ProductImage.allImages);
  const leftIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  let middleIndex;
  let rightIndex;

  do {
    middleIndex = Math.floor(Math.random() * ProductImage.allImages.length);
    rightIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  } while(leftIndex === middleIndex || leftIndex === rightIndex || rightIndex === middleIndex);

  currentImage1 = ProductImage.allImages[leftIndex];
  currentImage2 = ProductImage.allImages[middleIndex];
  currentImage3 = ProductImage.allImages[rightIndex];
  renderNewProduct(leftIndex,middleIndex,rightIndex);
}

const handleClick = function(event) {
  if (totalClicks < 5) {
    let clickedImage = event.target;
    let id = clickedImage.id;
    if (id === 'img1' || id === 'img2' || id === 'img3') {
      if (id === 'img1') {
        currentImage1.clicks++;
      }
      if (id === 'img2') {
        currentImage2.clicks++;
      }
      if (id === 'img3') {
        currentImage3.clicks++;
      }
      currentImage1.timesShown++;
      currentImage2.timesShown++;
      currentImage3.timesShown++;
    }
    pickNewProducts();
  }



  totalClicks++;
  if (totalClicks === 5) {
    imgContainer.removeEventListener('click', handleClick);

    let resultsList = document.getElementById('results-list');

    for(let i=0; i < ProductImage.allImages.length; i++) {
      let listItem = document.createElement('li');
      listItem.textContent = ProductImage.allImages[i].productName + ' received ' + ProductImage.allImages[i].clicks + ' clicks and was shown ' + ProductImage.allImages[i].timesShown + ' times.'

      resultsList.appendChild(listItem);
    }
  }
}

imgContainer.addEventListener('click', handleClick);

new ProductImage('bag', './assets/bag.jpg');
new ProductImage('banana', './assets/banana.jpg');
new ProductImage('bathroom', './assets/bathroom.jpg');
new ProductImage('boots', './assets/boots.jpg');
new ProductImage('breakfast', './assets/breakfast.jpg');
new ProductImage('bubblegum', './assets/bubblegum.jpg');
new ProductImage('chair', './assets/chair.jpg');
new ProductImage('cthulhu', './assets/cthulhu.jpg');
new ProductImage('dog-duck', './assets/dog-duck.jpg');
new ProductImage('dragon', './assets/dragon.jpg');
new ProductImage('pen', './assets/pen.jpg');
new ProductImage('pet-sweep', './assets/pet-sweep.jpg');
new ProductImage('scissors', './assets/scissors.jpg');
new ProductImage('shark', './assets/shark.jpg');
new ProductImage('sweep', './assets/sweep.png');
new ProductImage('tauntaun', './assets/tauntaun.jpg');
new ProductImage('unicorn', './assets/unicorn.jpg');
new ProductImage('water-can', './assets/water-can.jpg');
new ProductImage('wine-glass', './assets/wine-glass.jpg');

currentImage1 = ProductImage.allImages[7];
currentImage2 = ProductImage.allImages[5];
currentImage3 = ProductImage.allImages[9];

pickNewProducts();