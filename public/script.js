document.getElementById('searchInput').addEventListener('input', updateProducts);
document.getElementById('minPrice').addEventListener('input', filterProducts);
document.getElementById('maxPrice').addEventListener('input', filterProducts);
document.getElementById('type').addEventListener('change', filterProducts);
document.getElementById('freeShipping').addEventListener('change', filterProducts);

//priceValue
async function updateProducts() {
  try {
    const name = document.getElementById('searchInput').value;

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const products = await response.json();
      const container = document.getElementById('productsList');
      container.innerHTML = '';
      products.forEach(product => {
        const productElement = `
            <div>
              <img src="${product.image}" alt="Product Image">
              <p><strong>${product.name}</strong></p>
              <p>$${product.price}.00</p>
              <p>Shipping: $${product.shipping}.00</p>
              <form class="mt-3" action="/addToCart" method="POST">
                <label for="quantity-${product.name}">Quantity:</label>
                <input type="number" class="quantity-input" id="quantity-${product.name}" name="quantity" value="1">
                <input type="hidden" name="productId" value="${product._id}">
                <button type="submit" class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
              </form>
            </div>
        `;
        container.innerHTML += productElement;
      });
    } else {
      console.error('Response not ok with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}

updateProducts();


async function filterProducts() {
  try {
    const type = document.getElementById('type').value;
    
    const minPrice = document.getElementById('minPrice').value;
    
    const maxPrice = document.getElementById('maxPrice').value;
    
    const freeShipping = document.getElementById('freeShipping').checked;

    if (minPrice == "" || maxPrice == ""){
      return;
    }
    console.log(type + " " + minPrice + " " +maxPrice);

    const response = await fetch('/api/filterProducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, minPrice, maxPrice, freeShipping }),
    });

    if (response.ok) {
      const products = await response.json();
      const container = document.getElementById('productsList');
      container.innerHTML = '';
      products.forEach(product => {
        const productElement = `
            <div>
              <img src="${product.image}" alt="Product Image">
              <p><strong>${product.name}</strong></p>
              <p>$${product.price}.00</p>
              <p>Shipping: $${product.shipping}.00</p>
              <form class="mt-3" action="/addToCart" method="POST">
                <label for="quantity-${product.name}">Quantity:</label>
                <input type="number" class="quantity-input" id="quantity-${product.name}" name="quantity" value="1">
                <input type="hidden" name="productId" value="${product._id}">
                <button type="submit" class="add-to-cart"><i class="fa-solid fa-cart-plus"></i></button>
              </form>
            </div>
        `;
        container.innerHTML += productElement;
      });
    } else {
      console.error('Response not ok with status:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
}



