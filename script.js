document.addEventListener('DOMContentLoaded', () => {
    const cartList = document.getElementById('cart-list');
    const totalSpan = document.getElementById('total');

    let total = 0;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        if (!item.name || !item.price) return; // Skip invalid items

        total += Number(item.price);

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - Rs. ${item.price}
            <button class="remove-btn" onclick="removeItem(${index})">&times;</button>
        `;
        cartList.appendChild(li);
    });

    totalSpan.textContent = `Rs. ${total}`;
});

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function addToCart(name, price) {
    if (!name || !price) {
        console.error("Product name or price missing!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    showConfirmation(`${name} added to cart!`);
}

// Fancy confirmation instead of alert
function showConfirmation(message) {
    const box = document.createElement('div');
    box.className = 'confirmation';
    box.innerText = message;
    document.body.appendChild(box);

    setTimeout(() => {
        box.remove();
    }, 2000);
}
