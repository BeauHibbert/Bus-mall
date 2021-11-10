'use strict';

// global variables
let currentRound = 0;
let totalClicks = 0;

const ProductImage = function(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.timesShown = 0;
  this.clicks = 0;
  ProductImage.allImages.push(this);
}
ProductImage.allImages = [];
ProductImage.currentLeftImage = null;
ProductImage.currentMiddleImage = null;
ProductImage.currentRightImage = null;

ProductImage.prototype.render = function(position) {
  const imgElement = document.getElementById(position + '-img');
  imgElement.src = this.filePath;
  imgElement.alt = this.productName;
  this.timesShown++;
}

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * ProductImage.allImages.length);
  return ProductImage.allImages[randomIndex];
}

const pickNewProducts = function() {
  let oldLeftImage = ProductImage.currentLeftImage
  let oldMiddleImage = ProductImage.currentMiddleImage
  let oldRightImage = ProductImage.currentRightImage

  do {
    ProductImage.currentLeftImage = getRandomImage();
    ProductImage.currentMiddleImage = getRandomImage();
    ProductImage.currentRightImage = getRandomImage();
  } while (
    ProductImage.currentLeftImage === oldLeftImage || 
    ProductImage.currentLeftImage === oldMiddleImage || 
    ProductImage.currentLeftImage === oldRightImage || 
    ProductImage.currentMiddleImage === oldLeftImage ||
    ProductImage.currentMiddleImage === oldMiddleImage ||
    ProductImage.currentMiddleImage === oldRightImage ||
    ProductImage.currentRightImage === oldLeftImage ||
    ProductImage.currentRightImage === oldMiddleImage ||
    ProductImage.currentRightImage === oldRightImage ||
    ProductImage.currentLeftImage === ProductImage.currentMiddleImage ||
    ProductImage.currentMiddleImage === ProductImage.currentRightImage ||
    ProductImage.currentLeftImage == ProductImage.currentRightImage
  );

  currentLeftImage = ProductImage.allImages[leftImage];
  currentMiddleImage = ProductImage.allImages[middleImage];
  currentRightImage = ProductImage.allImages[rightImage];
  renderNewProduct(leftImage,middleImage,rightImage);
}

const handleClick = function(event) {
  if (totalClicks < 25) {
    let clickedImage = event.target;
    let id = clickedImage.id;
    if (id === 'img1' || id === 'img2' || id === 'img3') {
      if (id === 'img1') {
        currentLeftImage.clicks++;
      }
      if (id === 'img2') {
        currentMiddleImage.clicks++;
      }
      if (id === 'img3') {
        currentRightImage.clicks++;
      }
      currentLeftImage.timesShown++;
      currentMiddleImage.timesShown++;
      currentRightImage.timesShown++;
    }
    pickNewProducts();
  }

  totalClicks++;
  if (totalClicks === 25) {
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

currentLeftImage = ProductImage.allImages[7];
currentMiddleImage = ProductImage.allImages[5];
currentRightImage = ProductImage.allImages[9];

pickNewProducts();