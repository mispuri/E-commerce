//products

const products = [
  //jackets
  {
    id: 'jacket-01',
    title: 'Jacket 01',
    img: './img/jackets/jacket-1.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },
  {
    id: 'jacket-02',
    title: 'Jacket 02',
    img: './img/jackets/jacket-2.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },
  {
    id: 'jacket-03',
    title: 'Jacket 03',
    img: './img/jackets/jacket-3.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },
  {
    id: 'jacket-04',
    title: 'Jacket 04',
    img: './img/jackets/jacket-4.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },
  {
    id: 'jacket-05',
    title: 'Jacket 05',
    img: './img/jackets/jacket-5.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },
  {
    id: 'jacket-06',
    title: 'Jacket 06',
    img: './img/jackets/jacket-6.jpg',
    category: {
      name: 'Jackets',
      id: 'jackets',
    },
    price: 1000,
  },

  //Pants

  {
    id: 'pants-01',
    title: 'Pants 01',
    img: './img/pants/pants-1.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },
  {
    id: 'pants-02',
    title: 'Pants 02',
    img: './img/pants/pants-2.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },
  {
    id: 'pants-03',
    title: 'Pants 03',
    img: './img/pants/pants-3.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },
  {
    id: 'pants-04',
    title: 'Pants 04',
    img: './img/pants/pants-4.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },
  {
    id: 'pants-05',
    title: 'Pants 05',
    img: './img/pants/pants-5.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },
  {
    id: 'pants-06',
    title: 'Pants 06',
    img: './img/pants/pants-6.jpg',
    category: {
      name: 'Pants',
      id: 'pants',
    },
    price: 1000,
  },

  //Shirts

  {
    id: 'shirts-01',
    title: 'Shirts 01',
    img: './img/shirts/shirt-1.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
  {
    id: 'shirts-02',
    title: 'Shirts 02',
    img: './img/shirts/shirt-2.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
  {
    id: 'shirts-03',
    title: 'Shirts 03',
    img: './img/shirts/shirt-3.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
  {
    id: 'shirts-04',
    title: 'Shirts 04',
    img: './img/shirts/shirt-4.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
  {
    id: 'shirts-05',
    title: 'Shirts 05',
    img: './img/shirts/shirt-5.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
  {
    id: 'shirts-06',
    title: 'Shirts 06',
    img: './img/shirts/shirt-6.jpg',
    category: {
      name: 'Shirts',
      id: 'shirts',
    },
    price: 1000,
  },
];

const containerProducts = document.getElementById('container-products');
const categoryButtons = document.querySelectorAll('.button-category');
const categoryTitle = document.getElementById('title-main');
let addButtons = document.querySelectorAll('.product-add');
const numberCar = document.getElementById('number-car');

function uploadProducts(chosenProducts) {
  containerProducts.innerHTML = '';
  chosenProducts.forEach((products) => {
    let div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
        <div class="product">
        <img
          class="product-img"
          src="${products.img}"
          alt="${products.title}"
        />
        <div class="product-details">
          <h3 class="product-title">${products.title}</h3>
          <p class="product-price">${products.price}</p>
          <button class="product-add" id="${products.id}">Add</button>
        </div>
        </div>`;

    containerProducts.append(div);
  });
  updateAddButtons();
}

uploadProducts(products);

categoryButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    categoryButtons.forEach((button) => button.classList.remove('active'));
    e.currentTarget.classList.add('active');

    if (e.currentTarget.id != 'all') {
      const categoryProduct = products.find(
        (products) => products.category.id === e.currentTarget.id
      );
      categoryTitle.innerText = categoryProduct.category.name;
      const productsButton = products.filter(
        (products) => products.category.id === e.currentTarget.id
      );
      uploadProducts(productsButton);
    } else {
      categoryTitle.innerText = 'All products';
      uploadProducts(products);
    }
  });
});

function updateAddButtons() {
  addButtons = document.querySelectorAll('.product-add');

  addButtons.forEach((button) => {
    button.addEventListener('click', addCart);
  });
}

let productInCart;

let productInCartLs = localStorage.getItem('Products-in-shopping-car');
if (productInCartLs) {
  productInCart = JSON.parse(productInCartLs);
  updateNumerCar();
} else {
  productInCart = [];
}

function addCart(e) {
  const idButton = e.currentTarget.id;
  const addedProduct = products.find((products) => products.id === idButton);

  if (productInCart.some((products) => products.id === idButton)) {
    const index = productInCart.findIndex(
      (products) => products.id === idButton
    );
    productInCart[index].amount++;
  } else {
    addedProduct.amount = 1;
    productInCart.push(addedProduct);
  }
  updateNumerCar();

  localStorage.setItem(
    'Products-in-shopping-car',
    JSON.stringify(productInCart)
  );
}

function updateNumerCar() {
  let newNumberCar = productInCart.reduce(
    (acc, products) => acc + products.amount,
    0
  );
  numberCar.innerText = newNumberCar;
}
