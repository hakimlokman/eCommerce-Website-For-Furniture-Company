
function addToCart(productName, productPrice, productTag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};

    const existingProduct = cartItems[productTag];
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cartItems[productTag] = {
            name: productName,
            price: productPrice,
            quantity: 1,
        };
    }
    alert(`${productName} added to cart!`);
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    displayCart();
    
}
function getProductByTag(productTag) {
    const products = {
        // Add other product as same
        'MarvelousBed': { price: 2000.00 },
        'DressingTable': { price: 2500.00 },
        'ReadingTable': { price: 3500.00 },
        'Everestbed': { price: 5000.00 },
        'DainingTable': { price: 8000.00 },
        'PremiumSofaset': { price: 10000.00 },
        'LaxariousSofa': { price: 15000.00 },
        'CEOChair': { price: 25000.00 },
    };
    return products[productTag] || { price: 0.00 }; 
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};
    let productContainer = document.getElementById('cart-body');
    let cartTotal = document.getElementById('cart-total');
    if (productContainer) {
        productContainer.innerHTML = '';
        let subtotal = 0;
        Object.entries(cartItems).map(([tag, item]) => {
            const product = getProductByTag(tag);

            productContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>$${(product.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="deleteItem('${tag}')">Delete</button></td>
                </tr>
            `;
            subtotal += product.price * item.quantity;
        });
        cartTotal.textContent = 'Subtotal: $' + subtotal.toFixed(2);
    }
}
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');
  
    products.forEach((product) => {
      const productName = product.getElementsByTagName('h3')[0].textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
      }
  }
displayCart();

function deleteItem(productTag) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = cartItems ? JSON.parse(cartItems) : {};
    const deletedProduct = cartItems[productTag];
    if (deletedProduct) {
        deletedProduct.quantity--;
        if (deletedProduct.quantity === 0) {
            delete cartItems[productTag];
        }
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
    }
}

