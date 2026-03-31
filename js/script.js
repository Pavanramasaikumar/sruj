/* ============================================
   GLAMOURGLOW BEAUTY PARLOUR - MAIN SCRIPT
   ============================================ */

// ============================================
// AUTH SYSTEM - LocalStorage
// ============================================

class AuthSystem {
    constructor() {
        this.usersKey = 'glamour_users';
        this.currentUserKey = 'glamour_current_user';
        this.initUsers();
    }

    initUsers() {
        if (!this.getAllUsers()) {
            localStorage.setItem(this.usersKey, JSON.stringify([]));
        }
    }

    getAllUsers() {
        const users = localStorage.getItem(this.usersKey);
        return users ? JSON.parse(users) : [];
    }

    getCurrentUser() {
        const user = localStorage.getItem(this.currentUserKey);
        return user ? JSON.parse(user) : null;
    }

    isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    userExists(email) {
        return this.getAllUsers().some(user => user.email === email);
    }

    register(userData) {
        if (this.userExists(userData.email)) {
            return { success: false, message: 'Email already registered!' };
        }

        const users = this.getAllUsers();
        users.push({
            id: Date.now(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
            createdAt: new Date().toISOString()
        });

        localStorage.setItem(this.usersKey, JSON.stringify(users));
        return { success: true, message: 'Registration successful! Please login.' };
    }

    login(email, password) {
        const user = this.getAllUsers().find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password!' };
        }

        const currentUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone
        };

        localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));
        return { success: true, message: 'Login successful!', user: currentUser };
    }

    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    updatePassword(email, oldPassword, newPassword) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.email === email && u.password === oldPassword);

        if (userIndex === -1) {
            return { success: false, message: 'Invalid email or password!' };
        }

        users[userIndex].password = newPassword;
        localStorage.setItem(this.usersKey, JSON.stringify(users));

        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.email === email) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(currentUser));
        }

        return { success: true, message: 'Password updated successfully!' };
    }
}

// ============================================
// UTILITIES
// ============================================

const auth = new AuthSystem();

function showMessage(elementId, message, isError = false) {
    const messageEl = document.getElementById(elementId);
    if (!messageEl) return;

    messageEl.textContent = message;
    messageEl.className = isError ? 'error-message show' : 'success-message show';
    messageEl.style.display = 'block';

    setTimeout(() => {
        messageEl.classList.remove('show');
        messageEl.style.display = 'none';
    }, 4000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasAtSymbol = /@/.test(password);

    return hasMinLength && hasUppercase && hasNumber && hasAtSymbol;
}

// ============================================
// NAVBAR & MOBILE MENU
// ============================================

function initNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
            }
        });
    }

    updateNavBar();
}

function updateNavBar() {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    const user = auth.getCurrentUser();

    if (user) {
        navButtons.innerHTML = `
            <div class="user-greeting">Welcome, ${user.fullName.split(' ')[0]}!</div>
            <button class="btn-profile" onclick="goToProfile()">${user.fullName}</button>
            <button class="btn-logout" onclick="handleLogout()">Logout</button>
        `;
    } else {
        navButtons.innerHTML = `
            <button class="btn-login" onclick="window.location.href='login-new.html'">Login</button>
            <button class="btn-register" onclick="window.location.href='register-new.html'">Register</button>
        `;
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        auth.logout();
        showMessage('message', 'Logged out successfully!');
        setTimeout(() => {
            window.location.href = 'login-new.html';
        }, 1500);
    }
}

function goToProfile() {
    alert('Profile page coming soon!');
}

// ============================================
// REGISTER PAGE
// ============================================

function handleRegister(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    // Validation
    if (!fullName) {
        showMessage('message', 'Full name is required!', true);
        return;
    }

    if (fullName.length < 6) {
        showMessage('message', 'Username must be at least 6 characters!', true);
        return;
    }

    if (!validateEmail(email)) {
        showMessage('message', 'Please enter a valid email!', true);
        return;
    }

    if (!phone || phone.length < 10) {
        showMessage('message', 'Please enter a valid phone number!', true);
        return;
    }

    if (!validatePassword(password)) {
        showMessage('message', 'Password must be at least 6 characters and include @, one capital letter, and one number!', true);
        return;
    }

    if (password !== confirmPassword) {
        showMessage('message', 'Passwords do not match!', true);
        return;
    }

    // Register
    const result = auth.register({ fullName, email, phone, password });

    if (result.success) {
        showMessage('message', result.message);
        document.querySelector('form').reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showMessage('message', result.message, true);
    }
}

// ============================================
// LOGIN PAGE
// ============================================

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;
    const rememberMe = document.getElementById('rememberMe')?.checked;

    if (!validateEmail(email)) {
        showMessage('message', 'Please enter a valid email!', true);
        return;
    }

    if (!password) {
        showMessage('message', 'Password is required!', true);
        return;
    }

    const result = auth.login(email, password);

    if (result.success) {
        if (rememberMe) {
            localStorage.setItem('rememberMe', JSON.stringify(result.user));
        }
        showMessage('message', 'Login successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showMessage('message', result.message, true);
    }
}

// ============================================
// UPDATE PASSWORD PAGE
// ============================================

function handleUpdatePassword(e) {
    e.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const oldPassword = document.getElementById('oldPassword')?.value;
    const newPassword = document.getElementById('newPassword')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;

    if (!validateEmail(email)) {
        showMessage('message', 'Please enter a valid email!', true);
        return;
    }

    if (!oldPassword) {
        showMessage('message', 'Old password is required!', true);
        return;
    }

    if (!validatePassword(newPassword)) {
        showMessage('message', 'New password must be at least 6 characters and include @, one capital letter, and one number!', true);
        return;
    }

    if (newPassword !== confirmPassword) {
        showMessage('message', 'New passwords do not match!', true);
        return;
    }

    const result = auth.updatePassword(email, oldPassword, newPassword);

    if (result.success) {
        showMessage('message', result.message);
        document.querySelector('form').reset();
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        showMessage('message', result.message, true);
    }
}

// ============================================
// BOOKING PAGE - PROTECTED
// ============================================

function checkBookingAccess() {
    if (!auth.isLoggedIn()) {
        alert('Please login to book an appointment!');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function handleBooking(e) {
    e.preventDefault();

    if (!checkBookingAccess()) return;

    const name = document.getElementById('name')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const date = document.getElementById('date')?.value;
    const time = document.getElementById('time')?.value;

    if (!name || !phone || !service || !date || !time) {
        showMessage('message', 'All fields are required!', true);
        return;
    }

    const booking = {
        id: Date.now(),
        user: auth.getCurrentUser(),
        name,
        phone,
        service,
        date,
        time,
        createdAt: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('glamour_bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('glamour_bookings', JSON.stringify(bookings));

    showMessage('message', 'Booking confirmed! We will contact you soon.');
    document.querySelector('form').reset();

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ============================================
// CONTACT FORM
// ============================================

function handleContact(e) {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !validateEmail(email) || !phone || !message) {
        showMessage('message', 'Please fill all fields correctly!', true);
        return;
    }

    const contact = {
        id: Date.now(),
        name,
        email,
        phone,
        message,
        createdAt: new Date().toISOString()
    };

    let contacts = JSON.parse(localStorage.getItem('glamour_contacts') || '[]');
    contacts.push(contact);
    localStorage.setItem('glamour_contacts', JSON.stringify(contacts));

    showMessage('message', 'Message sent! We will reply within 24 hours.');
    document.querySelector('form').reset();
}

// ============================================
// GALLERY FILTERING
// ============================================

function filterGallery(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = item.dataset.category === category ? 'block' : 'none';
        }
    });
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================

let currentTestimonial = 0;

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;

    if (index >= testimonials.length) currentTestimonial = 0;
    if (index < 0) currentTestimonial = testimonials.length - 1;

    testimonials.forEach(t => t.style.display = 'none');
    testimonials[currentTestimonial].style.display = 'block';
}

function nextTestimonial() {
    currentTestimonial++;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial--;
    showTestimonial(currentTestimonial);
}

function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 0) {
        showTestimonial(0);
    }
}

// ============================================
// SCROLL TO TOP
// ============================================

function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// SMOOTH SCROLLING FOR LINKS
// ============================================

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// INIT ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollToTop();
    initSmoothScrolling();
    initTestimonials();

    // Auto-fill login email if "Remember Me" was checked
    const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
    if (rememberMe && document.getElementById('email')) {
        document.getElementById('email').value = rememberMe.email;
    }
});

// ============================================
// PRELOADER
// ============================================

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
