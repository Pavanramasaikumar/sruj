# 💄 GlamourGlow Beauty Parlour - Complete Website

## 🌟 Overview
A complete, responsive beauty parlour website built with **pure HTML5, CSS3, and JavaScript** - no frameworks, no backend required. Features a beautiful modern design with full authentication system using LocalStorage.

---

## 📁 Project Structure

```
web site/
├── index-new.html          # Home page (Main landing page)
├── index.html              # Redirect to index-new.html
├── about.html              # About & Team page
├── services.html           # Services & Pricing page
├── gallery.html            # Gallery with filter system
├── booking.html            # Appointment booking (login required)
├── contact.html            # Contact information & form
├── login-new.html          # User login page
├── register-new.html       # User registration page
├── update-password-new.html # Password update page
├── css/
│   └── style.css           # Complete stylesheet (600+ lines)
├── js/
│   └── script.js           # All functionality (400+ lines)
└── images/                 # Image folder (for future use)
```

---

## 🚀 Quick Start

### 1. Open the Website
- Simply open `index-new.html` in your web browser
- Or open `index.html` which automatically redirects to `index-new.html`

### 2. Test the Demo Account
**Pre-registered Demo User:**
- **Email:** demo@beauty.com
- **Password:** demo123
- Click the "Use Demo" button on the login page to auto-fill

### 3. Create Your Own Account
- Go to **Register** page
- Fill in your details (Name, Email, Phone, Password)
- Click **Register**
- Login with your new credentials

---

## 🎨 Key Features

### ✅ Authentication System
- **Register:** Create new account with validation
- **Login:** Login with email/password
- **Remember Me:** Auto-fill credentials on login page
- **Update Password:** Change password after login
- **Demo Account:** Pre-loaded demo@beauty.com
- **Multiple Users:** Support for unlimited users
- **LocalStorage:** All data stored locally (no backend needed)

### ✅ Pages & Sections
| Page | Features |
|------|----------|
| **Home** | Hero, Services, Testimonials, Stats, Why Choose Us, CTA |
| **About** | Company Story, Mission/Vision/Values, Team Members |
| **Services** | 8 Services + 3 Packages with pricing and Book Now |
| **Gallery** | 8 Images with filtering (Hair, Makeup, Nails, Facial) |
| **Booking** | Appointment form (Login required) |
| **Contact** | Contact info, Contact form, Google Maps |
| **Login** | Email, Password, Remember Me, Demo button |
| **Register** | Full Name, Email, Phone, Password validation |
| **Update Password** | Change password securely |

### ✅ Interactive Features
- ✨ **Responsive Design:** Mobile (480px), Tablet (768px), Desktop
- 🎯 **Form Validation:** Email, password, required fields
- 🔐 **Login Protection:** Booking page requires authentication
- 🖼️ **Gallery Filtering:** Filter by category (5 filters)
- 💬 **Testimonials Slider:** 3 testimonials with prev/next
- ⬆️ **Scroll-to-Top Button:** Sticky button on scroll
- 📱 **Mobile Menu:** Hamburger menu for mobile
- 🔗 **Smooth Scrolling:** Internal page links
- 🎨 **Dynamic Navbar:** Changes based on login status

---

## 🎯 User Journey

### For New Visitors
1. Visit **Home** page → View services
2. Check **Gallery** → Filter by category
3. Check **Services** → See pricing
4. Click **Register** → Create account
5. Click **Book Now** → Redirects to login
6. **Login** with new credentials
7. **Book appointment** → Form submitted to LocalStorage
8. Click **Logout** → Redirected to login page

### For Registered Users
1. Open **Login** page
2. Enter credentials (or click "Use Demo")
3. Homepage navbar updates → Shows username
4. Click **Book Now** → Open booking form
5. Fill appointment details
6. Click **Update Password** → Change password
7. Click **Logout** → Confirmation dialog

---

## 💾 Data Storage (LocalStorage)

### Storage Keys
```javascript
// Users database
localStorage.getItem('glamour_users')
// Current logged-in user
localStorage.getItem('glamour_current_user')
// Bookings
localStorage.getItem('glamour_bookings')
// Contacts
localStorage.getItem('glamour_contacts')
```

### Sample User Object
```javascript
{
  id: 1234567890,
  fullName: "John Doe",
  email: "john@example.com",
  phone: "555-1234",
  password: "hashedPassword"
}
```

### Sample Booking Object
```javascript
{
  id: "booking_123",
  userEmail: "john@example.com",
  userName: "John Doe",
  phone: "555-1234",
  service: "Hair Styling",
  date: "2024-12-25",
  time: "14:00",
  notes: "Special occasion",
  timestamp: 1234567890
}
```

---

## 🎨 Color Scheme

| Color | Value | Usage |
|-------|-------|-------|
| Primary Pink | `#d946a6` | Buttons, Headers, Accents |
| Secondary Purple | `#9333ea` | Secondary elements |
| Gold | `#fbbf24` | Highlights, Icons |
| Light Purple | `#f3e8ff` | Backgrounds |
| Dark Gray | `#1f2937` | Text |
| Light Gray | `#f3f4f6` | Borders |
| White | `#ffffff` | Main backgrounds |

---

## 📱 Responsive Design

### Desktop (1200px+)
- Full navbar with all links
- 4-column grid for gallery/services
- Hero image with content overlay

### Tablet (768px - 1199px)
- Condensed navbar
- 2-column grid
- Optimized spacing

### Mobile (480px - 767px)
- Hamburger menu
- 1-column layout
- Stacked elements
- Larger touch targets

---

## 🛠️ File Details

### css/style.css (600+ lines)
- CSS Variables for colors and transitions
- Navbar styling (fixed, gradient, mobile menu)
- Hero section with gradient overlays
- Card grid system (responsive)
- Form styling with validation states
- Gallery with filter buttons
- Testimonials slider
- Footer with 4-column layout
- Media queries for all breakpoints
- Smooth transitions and animations

### js/script.js (400+ lines)
- `AuthSystem` class with methods:
  - `register()` - Create new user
  - `login()` - Authenticate user
  - `logout()` - Clear session
  - `updatePassword()` - Change password
  - `getCurrentUser()` - Get logged-in user
  - `isLoggedIn()` - Check auth status
- Form handlers:
  - `handleRegister(e)` - Process registration
  - `handleLogin(e)` - Process login
  - `handleUpdatePassword(e)` - Update password
  - `handleBooking(e)` - Save appointment
  - `handleContact(e)` - Save contact inquiry
- UI functions:
  - `updateNavBar()` - Dynamic navbar update
  - `filterGallery(category)` - Filter gallery items
  - `initScrollToTop()` - Scroll button
  - `initSmoothScrolling()` - Smooth page scrolling

---

## 🔐 Password Requirements

- **Minimum Length:** 6 characters
- **Confirmation:** Must match confirm password field
- **Email Validation:** Valid email format required

---

## ✨ Special Features

### 1. Demo Account
- Pre-registered demo account for testing
- Auto-fill button on login page
- Credentials: demo@beauty.com / demo123

### 2. Testimonials Slider
- 3 testimonials with rotate functionality
- Previous/Next buttons
- Automatic cycling not implemented (manual only)

### 3. Gallery Filtering
- 5 filter options: All, Hair, Makeup, Nails, Facial
- Smooth show/hide animation
- Images from Unsplash (can be replaced)

### 4. Responsive Gallery Grid
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1 column

### 5. Booking Protection
- Booking page checks if user is logged in
- Redirects to login if not authenticated
- Stores bookings with timestamp

---

## 🚫 Limitations & Future Enhancements

### Current Limitations
- ❌ No backend (data lost on browser clear)
- ❌ No email notifications
- ❌ No admin panel
- ❌ No payment integration
- ❌ No file uploads

### Future Enhancements
- ✅ Add WhatsApp floating button
- ✅ Add FAQ section
- ✅ Add admin panel to view bookings
- ✅ Add password strength indicator
- ✅ Add dark mode toggle
- ✅ Replace placeholder images
- ✅ Add more testimonials
- ✅ Add team member social links
- ✅ Add service appointment calendar

---

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers
- ⚠️ IE 11 (Not recommended)

---

## 📝 License

This project is free to use and modify for personal or commercial purposes.

---

## 👨‍💻 Developer Notes

### To Customize
1. **Colors:** Edit CSS variables in `css/style.css` (line 1-15)
2. **Images:** Replace URLs in `gallery.html` and `index-new.html`
3. **Contact Info:** Update phone/email in `contact.html` and `footer`
4. **Services:** Modify prices and descriptions in `services.html`
5. **Text Content:** Edit copy directly in HTML files

### To Add Features
1. **Add page:** Create new HTML file with navbar
2. **Add form:** Create form in HTML, add handler in `js/script.js`
3. **Add style:** Add CSS to `css/style.css`
4. **Add data:** Update LocalStorage method in `AuthSystem`

### Testing Checklist
- [ ] Registration with new email
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should fail)
- [ ] Book appointment without login (should redirect)
- [ ] Book appointment after login
- [ ] Update password
- [ ] Logout
- [ ] Gallery filtering works
- [ ] Mobile responsive design
- [ ] Form validation (empty fields, email format, password)
- [ ] LocalStorage data persistence

---

## 📞 Support

For issues or questions:
1. Check browser console for errors (F12)
2. Clear localStorage and refresh (Ctrl+Shift+Del)
3. Test with demo account first
4. Try in different browser

---

**Built with ❤️ using HTML, CSS & JavaScript**

Version 1.0 | Created: 2024
