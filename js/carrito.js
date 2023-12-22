const productInCart = JSON.parse(
  localStorage.getItem('Products-in-shopping-car')
);

const carEmpty = document.getElementById('car-empty');
const carProducts = document.getElementById('car-products');
const carActions = document.getElementById('car-actions');
const carPurchased = document.getElementById('car-purchased');

carProducts.innerHTML = '';

if (productInCart) {
  carEmpty.classList.add('disabled');
  carProducts.classList.remove('disabled');
  carActions.classList.remove('disabled');
  carPurchased.classList.add('disabled');

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
