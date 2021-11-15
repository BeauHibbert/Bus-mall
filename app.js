'use strict';

// global variables
let currentRound = 0;

const ProductImage = function(productName, filePath) {
  const test = true;
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

function pickNewProducts() {
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
}

function renderNewProducts() {
  ProductImage.currentLeftImage.render('left');
  ProductImage.currentMiddleImage.render('middle');
  ProductImage.currentRightImage.render('right');
}

function populateProductImages() {
  const productsInLocalStorage = localStorage.getItem('products');
  if(productsInLocalStorage) {
    recreateStoredProducts(productsInLocalStorage);
  } else {
    createProductImages();
  }
}

function recreateStoredProducts(storedItem) {
  const rawProducts = JSON.parse(storedItem);
  for(let i = 0; i < rawProducts.length; i++) {
    const rawProduct = rawProducts[i];
    const productInstance = new ProductImage(rawProduct.productName, rawProduct.filePath);
    productInstance.clicks = rawProduct.clicks;
    productInstance.timesShown = rawProduct.timesShown;
  }
}

function handleClick(event) {
  let clickedImage = event.target;
  let id = clickedImage.id;
  if (id === 'left-img' || id === 'middle-img' || id === 'right-img') {
    if (id === 'left-img') {
      ProductImage.currentLeftImage.clicks++;
    }
    if (id === 'middle-img') {
      ProductImage.currentMiddleImage.clicks++;
    }
    if (id === 'right-img') {
      ProductImage.currentRightImage.clicks++;
    }
    ProductImage.currentLeftImage.timesShown++;
    ProductImage.currentMiddleImage.timesShown++;
    ProductImage.currentRightImage.timesShown++;
  }

  currentRound++;

  if (currentRound === 25) {
    console.log('allimages', ProductImage.allImages)
    document.getElementById('results-container').hidden = false;
    destroyEventListener();
    createChart();
    createList();
    localStorage.setItem('products', JSON.stringify(ProductImage.allImages));
  } else {
    pickNewProducts();
    renderNewProducts();
  }
}

function createChart() {
  const productNameArray = [];
  const productClicksArray = [];

  for(let i=0; i < ProductImage.allImages.length; i++) {
    const product = ProductImage.allImages[i];

    const singleProductName = product.productName;
    console.log("product.test", product.test)
    productNameArray.push(singleProductName);

    const singleProductClicks = product.clicks;
    productClicksArray.push(singleProductClicks);
  }

  console.log('productNameArray: ', productNameArray);
  console.log('productClicksArray: ', productClicksArray);

  const ctx = document.getElementById('results-chart').getContext('2d');
  const productImageChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNameArray,
      datasets: [{
        label: 'Product Votes',
        backgroundColor: 'rgb(32, 42, 68)',
        borderColor: 'rgb(0, 0, 0)',
        data: productClicksArray
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function createList() {
  let resultsList = document.getElementById('results-list');

  for(let i=0; i < ProductImage.allImages.length; i++) {
    let listItem = document.createElement('li');
    listItem.textContent = ProductImage.allImages[i].productName + ' received ' + ProductImage.allImages[i].clicks + ' clicks and was shown ' + ProductImage.allImages[i].timesShown + ' times.'

    resultsList.appendChild(listItem);
  }
}

function createEventListener() {
  const imgContainer = document.getElementById('image-container');
  imgContainer.addEventListener('click', handleClick);
}

function destroyEventListener() {
  const imgContainer = document.getElementById('image-container');
  imgContainer.removeEventListener('click', handleClick);
}

function createProductImages(){
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
}

function start() {
  createEventListener();
  populateProductImages();
  pickNewProducts();
  renderNewProducts();
}

start();