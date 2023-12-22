let productInCart = localStorage.getItem('Products-in-shopping-car');
productInCart = JSON.parse(productInCart);

const carEmpty = document.getElementById('car-empty');
const carProducts = document.getElementById('car-products');
const carActions = document.getElementById('car-actions');
const carPurchased = document.getElementById('car-purchased');
let buttonsDelete = document.querySelectorAll('.car-product-delete');
const buttonEmptyCar = document.querySelector('#car-actions-empty');
const total = document.querySelector('#total');
const buttonBuy = document.querySelector('#car-actions-buy');

function uploadProductsCar() {
  if (productInCart && productInCart.length > 0) {
    carEmpty.classList.add('disabled');
    carProducts.classList.remove('disabled');
    carActions.classList.remove('disabled');
    carPurchased.classList.add('disabled');

    carProducts.innerHTML = '';

    productInCart.forEach((products) => {
      const div = document.createElement('div');
      div.classList.add('car-product');
      div.innerHTML = `
    <img
    class="car-product-img"
    src="${products.img}"
    alt="${products.title}"/>
    <div class="car-product-title">
        <small>Title</small>
        <h3>${products.title}</h3>
    </div>
    <div class="car-product-amount">
        <small>Amount</small>
        <p>${products.amount}</p>
    </div>
    <div class="car-product-price">
        <small>Price</small>
        <p>${products.price}</p>
    </div>
    <div class="car-product-subtotal">
        <small>Subtotal</small>
        <p>${products.price * products.amount}</p>
    </div>
    <button id="${products.id}" class="car-product-delete">
        <i class="fa-solid fa-trash"></i>
    </button>
    `;

      carProducts.append(div);
    });
  } else {
    carEmpty.classList.remove('disabled');
    carProducts.classList.add('disabled');
    carActions.classList.add('disabled');
    carPurchased.classList.add('disabled');
  }
  updateAddButtonsDelete();
  updateTotal();
}
uploadProductsCar();

function updateAddButtonsDelete() {
  buttonsDelete = document.querySelectorAll('.car-product-delete');

  buttonsDelete.forEach((button) => {
    button.addEventListener('click', deleteFromCar);
  });
}

function deleteFromCar(e) {
  const idButton = e.currentTarget.id;
  const index = productInCart.findIndex((products) => products.id === idButton);

  productInCart.splice(index, 1);
  uploadProductsCar();

  localStorage.setItem(
    'Products-in-shopping-car',
    JSON.stringify(productInCart)
  );
}

buttonEmptyCar.addEventListener('click', emptyCar);

function emptyCar() {
  productInCart.length = 0;
  localStorage.setItem(
    'Products-in-shopping-car',
    JSON.stringify(productInCart)
  );
  uploadProductsCar();
}

function updateTotal() {
  const calculatedTotal = productInCart.reduce(
    (acc, products) => acc + products.price * products.amount,
    0
  );
  total.innerText = `$ ${calculatedTotal}`;
}

buttonBuy.addEventListener('click', buyCar);

function buyCar() {
  productInCart.length = 0;
  localStorage.setItem(
    'Products-in-shopping-car',
    JSON.stringify(productInCart)
  );

  carEmpty.classList.add('disabled');
  carProducts.classList.add('disabled');
  carActions.classList.add('disabled');
  carPurchased.classList.remove('disabled');
}
