// Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            if (!password || password.length < 6) {
                alert('Password must be at least 6 characters.');
                return;
            }
            alert('Login successful!');
            window.location.href = 'profile.html';
        });
    }

    // Register Form Validation
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            if (!name) {
                alert('Please enter your name.');
                return;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            if (!password || password.length < 6) {
                alert('Password must be at least 6 characters.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            alert('Registration successful!');
            window.location.href = 'login.html';
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            if (!name || !email || !message) {
                alert('All fields are required.');
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email.');
                return;
            }
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            cart.push({ product, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product} added to cart!`);
        });
    });

    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><button class="btn btn-danger btn-sm remove-item">Remove</button></td>
            `;
            cartItems.appendChild(row);
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const product = row.cells[0].textContent;
                cart = cart.filter(item => item.product !== product);
                localStorage.setItem('cart', JSON.stringify(cart));
                row.remove();
                const newTotal = cart.reduce((sum, item) => sum + item.price, 0);
                cartTotal.textContent = newTotal.toFixed(2);
            });
        });
    }

    // Payment Form Validation
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cardholderName = document.getElementById('cardholder-name').value;
            const cardNumber = document.getElementById('card-number').value;
            const expiryMonth = document.getElementById('expiry-month').value;
            const expiryYear = document.getElementById('expiry-year').value;
            const cvv = document.getElementById('cvv').value;

            // Basic validation
            if (!cardholderName) {
                alert('Please enter the cardholder name.');
                return;
            }
            if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }
            if (!expiryMonth || !/^(0[1-9]|1[0-2])$/.test(expiryMonth)) {
                alert('Please enter a valid expiry month (MM).');
                return;
            }
            if (!expiryYear || !/^\d{4}$/.test(expiryYear) || parseInt(expiryYear) < 2025) {
                alert('Please enter a valid expiry year (YYYY, not in the past).');
                return;
            }
            if (!cvv || !/^\d{3}$/.test(cvv)) {
                alert('Please enter a valid 3-digit CVV.');
                return;
            }
            if (cart.length === 0) {
                alert('Your cart is empty. Add items before proceeding to payment.');
                return;
            }

            // Simulate payment processing
            alert('Payment successful! Thank you for your purchase.');
            localStorage.removeItem('cart'); // Clear cart
            window.location.href = 'index.html'; // Redirect to home
        });
    }