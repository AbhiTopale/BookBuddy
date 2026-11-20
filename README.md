# BookBuddy – Smart Library Mobile App 📚📱

> **College Practical**: Practical No. 06 – jQuery Mobile  
> **Task**: Create a simple, modern Mobile Website using jQuery Mobile.

---

## 🌟 Overview

**BookBuddy** is a polished, modern, mobile-first web application designed as a digital library companion for college students. It allows students to browse library catalogs, search books by title/author/ISBN, filter by category, check real-time availability, borrow books digitally, track due dates and overdue fines, manage a personal reading wishlist, and view library notices.

The app uses **jQuery Mobile (v1.4.5)** as its core mobile framework, enhanced with a modern custom CSS design system to replace dated 2014-era default themes with a modern 2026 mobile app aesthetic.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic document structure & single-page application (SPA) architecture.
- **CSS3**: Custom CSS theme variables, card layouts, rounded corners, subtle shadows, and responsive desktop preview frame.
- **JavaScript (ES6)**: Dynamic data handling, local storage synchronization, live search & filtering, SVG cover rendering, and event management.
- **jQuery (v2.1.4)**: DOM manipulation and AJAX/event handling support for jQuery Mobile.
- **jQuery Mobile (v1.4.5)**: Single-page navigation, page transitions, collapsible accordions, listviews, fixed navbar, and popups.
- **Font Awesome (v6.4.0 CDN)**: Modern vector icons for intuitive touch UI.

*Zero backend or Node.js required — runs directly by opening `index.html` in any browser!*

---

## 📱 Application Pages (9 Pages Architecture)

| Page ID | Page Name | Key Features & Components |
|---|---|---|
| `#home` | **Home Dashboard** | Welcome banner, quick statistics grid (Borrowed, Due Soon, Wishlist, Fine), quick action links, "Continue Reading" cards, and Popular Titles. |
| `#browse` | **Browse Books** | Instant search input, category filter pills, availability toggle, real-time result count, and book cards. |
| `#details` | **Book Details** | Book hero cover, full description, metadata table (ISBN, publisher, year, pages, copies), "Borrow Book" button, and "Wishlist" toggle. |
| `#my-books` | **My Borrowed Books** | List of borrowed items with status badges (🟢 Active, 🟠 Due Soon, 🔴 Overdue), return due dates, and "+7 Days Renew" action. |
| `#wishlist` | **Saved Wishlist** | Saved books with quick view links, remove buttons, and persistent state across reloads. |
| `#categories` | **Explore Categories** | Grid of 8 main library categories with icons, book counts, and instant filter links to `#browse`. |
| `#notices` | **Library Notices** | Announcements board with priority badges (High, New, Notice), dates, and descriptions. |
| `#profile` | **Student Profile** | Student avatar ("Abhijit Student"), department info, lifetime library stats, and quick account links using `data-role="listview"`. |
| `#rules` | **Library Regulations** | Expandable accordions using `data-role="collapsible-set"` for Borrowing Limits, Renewals, Fines, and Timings. |

---

## 🎓 Student Viva Explanation Guide

During practical exams or viva presentations, use the following points to explain your code:

### 1. Why jQuery Mobile is Used
jQuery Mobile is a touch-optimized HTML5 framework that enables developers to build responsive cross-device websites using a **Single-Page Application (SPA)** pattern. Instead of loading multiple separate `.html` files, jQuery Mobile links multiple `<div data-role="page">` containers inside `index.html` and provides smooth page transitions without page reloads.

### 2. Key jQuery Mobile Components (`data-role` Attributes)
- `data-role="page"`: Demarcates each individual view/page (e.g. `<div data-role="page" id="home">`).
- `data-role="header"`: Creates top navigation headers.
- `data-role="content"` or `class="ui-content"`: Main content container with default mobile padding.
- `data-role="footer"`: Bottom bar container.
- `data-role="navbar"`: Navigation tab bar supporting active tab indicators.
- `data-role="popup"`: Renders modal popup dialogs (used in BookBuddy for Borrow/Renew confirmations).
- `data-role="collapsible"` & `data-role="collapsible-set"`: Accordion expand/collapse containers (used on `#rules`).
- `data-role="listview"`: Formats lists into mobile-friendly inset lists (used on `#profile`).

### 3. How State & Persistence Work
- **Static Demo Data**: 12 rich book objects stored in `SAMPLE_BOOKS` array inside `js/app.js`.
- **Browser LocalStorage**:
  - `bookbuddy_borrowed`: Keeps track of borrowed books, progress, and renewed due dates.
  - `bookbuddy_wishlist`: Stores array of saved book IDs.
- **Dynamic Fine Calculation**: Calculated automatically based on differences between the current date and return due dates (`₹5 per day`).

### 4. Dynamic SVG Cover Generator
To prevent broken image links when running offline, `js/app.js` generates dynamic vector SVG covers (`generateSVGDataURI()`) styled per book category and theme.

---

## 🚀 How to Run the Project

1. Open the project folder `BookBuddy`.
2. Double-click `index.html` to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. On desktop browsers, the app will automatically center itself inside an authentic mobile preview frame shell (`max-width: 480px`). On mobile devices, it stretches seamlessly across full screen.

---

## 📂 Project Structure

```
BookBuddy/
│
├── index.html        # Single-Page layout with 9 pages, JQM annotations & popups
│
├── css/
│   └── style.css     # Modern custom CSS theme overriding default jQuery Mobile UI
│
├── js/
│   └── app.js        # Data arrays, localStorage sync, JQM page change event handlers
│
└── README.md         # Documentation & viva preparation guide
```
