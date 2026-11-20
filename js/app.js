/* ==========================================================================
   BookBuddy – Smart Library Mobile App
   JavaScript & jQuery Mobile Logic
   ========================================================================== */

// Global State & Selected Book Tracker
let currentBookId = null;
let activeCategory = "All";

/* --------------------------------------------------------------------------
   1. Sample Book Data (12 Realistic Books)
   -------------------------------------------------------------------------- */
const SAMPLE_BOOKS = [
  {
    id: "b1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Programming",
    isbn: "978-0132350884",
    publisher: "Prentice Hall",
    year: 2008,
    pages: 464,
    rating: 4.8,
    availableCopies: 3,
    totalCopies: 5,
    coverColor: "#2563eb",
    bgPattern: "code",
    description: "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn't have to be that way."
  },
  {
    id: "b2",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Development",
    isbn: "978-0735211292",
    publisher: "Avery",
    year: 2018,
    pages: 320,
    rating: 4.9,
    availableCopies: 4,
    totalCopies: 6,
    coverColor: "#d97706",
    bgPattern: "dots",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits and break bad ones."
  },
  {
    id: "b3",
    title: "Don't Make Me Think",
    author: "Steve Krug",
    category: "Design",
    isbn: "978-0321965516",
    publisher: "New Riders",
    year: 2014,
    pages: 216,
    rating: 4.7,
    availableCopies: 2,
    totalCopies: 3,
    coverColor: "#7c3aed",
    bgPattern: "waves",
    description: "Since Don't Make Me Think was first published in 2000, hundreds of thousands of Web designers and developers have relied on usability guru Steve Krug's guide to help them understand the principles of intuitive navigation and web design."
  },
  {
    id: "b4",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Programming",
    isbn: "978-0135957059",
    publisher: "Addison-Wesley",
    year: 2019,
    pages: 352,
    rating: 4.9,
    availableCopies: 1,
    totalCopies: 4,
    coverColor: "#059669",
    bgPattern: "lines",
    description: "The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code."
  },
  {
    id: "b5",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen et al.",
    category: "Computer Science",
    isbn: "978-0262046305",
    publisher: "MIT Press",
    year: 2022,
    pages: 1312,
    rating: 4.6,
    availableCopies: 5,
    totalCopies: 8,
    coverColor: "#dc2626",
    bgPattern: "grid",
    description: "A comprehensive update of the leading algorithms text, with new material on matchings in bipartite graphs, online algorithms, machine learning, and other topics."
  },
  {
    id: "b6",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self Development",
    isbn: "978-1455586691",
    publisher: "Grand Central Publishing",
    year: 2016,
    pages: 304,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 4,
    coverColor: "#475569",
    bgPattern: "minimal",
    description: "Deep work is the ability to focus without distraction on a cognitively demanding task. It's a skill that allows you to quickly master complicated information and produce better results in less time."
  },
  {
    id: "b7",
    title: "Designing Data Applications",
    author: "Martin Kleppmann",
    category: "Computer Science",
    isbn: "978-1449373320",
    publisher: "O'Reilly Media",
    year: 2017,
    pages: 616,
    rating: 4.9,
    availableCopies: 3,
    totalCopies: 5,
    coverColor: "#0891b2",
    bgPattern: "code",
    description: "Data is at the center of many challenges in system design today. Difficult issues such as scalability, consistency, reliability, efficiency, and maintainability need to be addressed thoroughly."
  },
  {
    id: "b8",
    title: "Sapiens: Brief History",
    author: "Yuval Noah Harari",
    category: "History",
    isbn: "978-0062316097",
    publisher: "Harper",
    year: 2015,
    pages: 443,
    rating: 4.7,
    availableCopies: 4,
    totalCopies: 5,
    coverColor: "#9333ea",
    bgPattern: "waves",
    description: "100,000 years ago, at least six human species inhabited the earth. Today there is just one. Us. Homo sapiens. How did our species succeed in the battle for dominance?"
  },
  {
    id: "b9",
    title: "The Personal MBA",
    author: "Josh Kaufman",
    category: "Business",
    isbn: "978-1591845577",
    publisher: "Portfolio",
    year: 2012,
    pages: 464,
    rating: 4.6,
    availableCopies: 3,
    totalCopies: 4,
    coverColor: "#4f46e5",
    bgPattern: "lines",
    description: "Master the fundamentals of business without going into massive debt. The Personal MBA distills the most valuable business lessons into simple, memorable mental models."
  },
  {
    id: "b10",
    title: "Astrophysics in a Hurry",
    author: "Neil deGrasse Tyson",
    category: "Science",
    isbn: "978-0393609394",
    publisher: "W. W. Norton",
    year: 2017,
    pages: 224,
    rating: 4.7,
    availableCopies: 2,
    totalCopies: 4,
    coverColor: "#6366f1",
    bgPattern: "dots",
    description: "What is the nature of space and time? How do we fit within the universe? How does the universe fit within us? There's no better guide through these mind-expanding questions than acclaimed astrophysicist Neil deGrasse Tyson."
  },
  {
    id: "b11",
    title: "Refactoring",
    author: "Martin Fowler",
    category: "Programming",
    isbn: "978-0134757681",
    publisher: "Addison-Wesley",
    year: 2018,
    pages: 448,
    rating: 4.8,
    availableCopies: 1,
    totalCopies: 3,
    coverColor: "#0284c7",
    bgPattern: "grid",
    description: "For more than twenty years, experienced programmers have relied on Martin Fowler's Refactoring to improve the design of existing code and enhance software maintainability."
  },
  {
    id: "b12",
    title: "Artificial Intelligence",
    author: "Stuart Russell & Peter Norvig",
    category: "Computer Science",
    isbn: "978-0134610993",
    publisher: "Pearson",
    year: 2020,
    pages: 1136,
    rating: 4.8,
    availableCopies: 2,
    totalCopies: 5,
    coverColor: "#e11d48",
    bgPattern: "code",
    description: "The long-anticipated revision of Artificial Intelligence: A Modern Approach offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence."
  }
];

/* --------------------------------------------------------------------------
   2. Demo Initial Borrowed Books & Notices Data
   -------------------------------------------------------------------------- */
const INITIAL_BORROWED = [
  {
    bookId: "b1",
    borrowedDate: "2026-09-10",
    dueDate: "2026-09-24",
    progressPercent: 65,
    currentChapter: "Chapter 6: Objects & Data Structures"
  },
  {
    bookId: "b2",
    borrowedDate: "2026-09-01",
    dueDate: "2026-09-22",
    progressPercent: 90,
    currentChapter: "Chapter 18: How to Stick to Good Habits"
  },
  {
    bookId: "b4",
    borrowedDate: "2026-08-25",
    dueDate: "2026-09-18", // Overdue slightly for demonstration
    progressPercent: 30,
    currentChapter: "Topic 12: Tracer Code"
  }
];

const LIBRARY_NOTICES = [
  {
    id: "n1",
    title: "Extended Library Hours for Exam Week",
    description: "The central library will remain open until 8:00 PM on weekdays during the upcoming semester exams.",
    date: "Sep 20, 2026",
    priority: "High",
    icon: "fa-clock",
    badgeClass: "badge-borrowed"
  },
  {
    id: "n2",
    title: "New Computer Science & AI Books Arrived",
    description: "Over 40 new titles in Machine Learning, System Architecture, and Software Engineering have been added.",
    date: "Sep 18, 2026",
    priority: "New",
    icon: "fa-book-medical",
    badgeClass: "badge-available"
  },
  {
    id: "n3",
    title: "Important Notice: Timely Returns",
    description: "Please renew or return borrowed books on or before the due date to avoid fine charges of ₹5 per day.",
    date: "Sep 15, 2026",
    priority: "Notice",
    icon: "fa-triangle-exclamation",
    badgeClass: "badge-category"
  }
];

/* --------------------------------------------------------------------------
   3. SVG Cover Generator (Ensures crisp book covers without dead links)
   -------------------------------------------------------------------------- */
function generateSVGDataURI(title, author, bgColor) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="280" viewBox="0 0 200 280">
    <rect width="200" height="280" fill="${bgColor}" rx="12" />
    <rect x="12" y="12" width="176" height="256" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" rx="8" />
    <circle cx="100" cy="70" r="32" fill="rgba(255,255,255,0.15)" />
    <path d="M88 70 L112 70 M100 58 L100 82" stroke="white" stroke-width="3" stroke-linecap="round" />
    <text x="100" y="140" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">
      ${escapeXML(truncateText(title, 20))}
    </text>
    <text x="100" y="162" fill="rgba(255,255,255,0.8)" font-family="sans-serif" font-size="11" text-anchor="middle">
      ${escapeXML(truncateText(author, 24))}
    </text>
    <rect x="35" y="210" width="130" height="24" fill="rgba(0,0,0,0.2)" rx="12" />
    <text x="100" y="226" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="600" text-anchor="middle">BOOKBUDDY</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function truncateText(str, maxLen) {
  return str.length > maxLen ? str.substring(0, maxLen - 2) + ".." : str;
}

function escapeXML(str) {
  return str.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

/* --------------------------------------------------------------------------
   4. LocalStorage Helper Functions
   -------------------------------------------------------------------------- */
function getStoredWishlist() {
  const data = localStorage.getItem("bookbuddy_wishlist");
  return data ? JSON.parse(data) : ["b2", "b3", "b5", "b7", "b9"];
}

function saveWishlist(wishlistArray) {
  localStorage.setItem("bookbuddy_wishlist", JSON.stringify(wishlistArray));
  updateGlobalBadgeCounts();
}

function toggleWishlist(bookId) {
  let list = getStoredWishlist();
  const index = list.indexOf(bookId);
  let isAdded = false;
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(bookId);
    isAdded = true;
  }
  saveWishlist(list);
  return isAdded;
}

function getStoredBorrowed() {
  const data = localStorage.getItem("bookbuddy_borrowed");
  return data ? JSON.parse(data) : INITIAL_BORROWED;
}

function saveBorrowed(borrowedArray) {
  localStorage.setItem("bookbuddy_borrowed", JSON.stringify(borrowedArray));
  updateGlobalBadgeCounts();
}

/* --------------------------------------------------------------------------
   5. Dynamic Date & Fine Calculations
   -------------------------------------------------------------------------- */
function getDaysRemaining(dueDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateStr);
  due.setHours(0, 0, 0, 0);
  const diffTime = due - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function calculateTotalFine() {
  const borrowed = getStoredBorrowed();
  let totalFine = 0;
  borrowed.forEach(item => {
    const days = getDaysRemaining(item.dueDate);
    if (days < 0) {
      totalFine += Math.abs(days) * 5; // ₹5 fine per day overdue
    }
  });
  return totalFine;
}

/* --------------------------------------------------------------------------
   6. UI RENDERERS FOR JQUERY MOBILE PAGES
   -------------------------------------------------------------------------- */

// Global Badge Updates (Home & Profile Stats)
function updateGlobalBadgeCounts() {
  const borrowed = getStoredBorrowed();
  const wishlist = getStoredWishlist();
  
  let dueSoonCount = 0;
  borrowed.forEach(item => {
    const days = getDaysRemaining(item.dueDate);
    if (days >= 0 && days <= 3) dueSoonCount++;
  });

  const fine = calculateTotalFine();

  // Update DOM Elements
  $("#stat-borrowed-count").text(borrowed.length);
  $("#stat-due-count").text(dueSoonCount);
  $("#stat-wishlist-count").text(wishlist.length);
  $("#stat-fine-amount").text("₹" + fine);
  
  // Profile Stats
  $("#profile-borrowed-count").text(borrowed.length + 9); // Total lifetime
  $("#profile-wishlist-count").text(wishlist.length);
  $("#profile-fine-amount").text("₹" + fine);
}

// Render Page 1: Home Dashboard
function renderHomePage() {
  updateGlobalBadgeCounts();

  // Continue Reading Section
  const borrowed = getStoredBorrowed();
  let progressHTML = "";
  if (borrowed.length === 0) {
    progressHTML = `<div class="bb-card"><p style="color:var(--text-muted); margin:0;">No active books currently borrowed.</p></div>`;
  } else {
    borrowed.slice(0, 2).forEach(item => {
      const book = SAMPLE_BOOKS.find(b => b.id === item.bookId);
      if (book) {
        progressHTML += `
          <div class="progress-card">
            <div class="progress-header">
              <span style="font-weight:700; font-size:0.9rem; color:var(--text-main);">${escapeXML(book.title)}</span>
              <span class="badge badge-category">${item.progressPercent}%</span>
            </div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${escapeXML(item.currentChapter)}</div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${item.progressPercent}%;"></div>
            </div>
            <a href="#details" onclick="openBookDetails('${book.id}')" class="ui-btn bb-btn bb-btn-outline" style="width:100%; margin-top:8px;">
              <i class="fa-solid fa-book-open"></i> Continue Reading
            </a>
          </div>
        `;
      }
    });
  }
  $("#home-continue-reading").html(progressHTML);

  // Popular Books Horizontal/Grid
  const popularBooks = SAMPLE_BOOKS.filter(b => b.rating >= 4.8).slice(0, 3);
  let popularHTML = "";
  popularBooks.forEach(book => {
    const coverURI = generateSVGDataURI(book.title, book.author, book.coverColor);
    popularHTML += `
      <div class="book-card" onclick="openBookDetails('${book.id}')" style="cursor:pointer;">
        <img src="${coverURI}" alt="${escapeXML(book.title)}" class="book-cover" />
        <div class="book-details-content">
          <div>
            <h4 class="book-title">${escapeXML(book.title)}</h4>
            <div class="book-author">by ${escapeXML(book.author)}</div>
          </div>
          <div class="book-meta-row">
            <span class="badge badge-category">${escapeXML(book.category)}</span>
            <span class="rating-stars"><i class="fa-solid fa-star"></i> ${book.rating}</span>
          </div>
        </div>
      </div>
    `;
  });
  $("#home-popular-books").html(popularHTML);
}

// Render Page 2: Browse Books
function renderBrowsePage() {
  const query = ($("#browse-search-input").val() || "").toLowerCase().trim();
  const availableOnly = $("#browse-available-toggle").is(":checked");

  let filtered = SAMPLE_BOOKS.filter(book => {
    const matchesCategory = activeCategory === "All" || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(query) ||
                          book.author.toLowerCase().includes(query) ||
                          book.isbn.includes(query);
    const matchesAvailability = !availableOnly || book.availableCopies > 0;
    return matchesCategory && matchesSearch && matchesAvailability;
  });

  $("#browse-count").text(`${filtered.length} books found`);

  if (filtered.length === 0) {
    $("#browse-books-list").html(`
      <div class="empty-state">
        <i class="fa-solid fa-magnifying-glass empty-icon"></i>
        <div class="empty-title">No books match your criteria</div>
        <div class="empty-desc">Try resetting your search filter or selecting another category.</div>
      </div>
    `);
    return;
  }

  let html = "";
  filtered.forEach(book => {
    const coverURI = generateSVGDataURI(book.title, book.author, book.coverColor);
    const isAvail = book.availableCopies > 0;
    html += `
      <div class="book-card">
        <img src="${coverURI}" alt="${escapeXML(book.title)}" class="book-cover" />
        <div class="book-details-content">
          <div>
            <h4 class="book-title">${escapeXML(book.title)}</h4>
            <div class="book-author">by ${escapeXML(book.author)}</div>
          </div>
          <div class="book-meta-row">
            <span class="badge ${isAvail ? 'badge-available' : 'badge-borrowed'}">
              <i class="fa-solid ${isAvail ? 'fa-circle-check' : 'fa-clock'}"></i>
              ${isAvail ? book.availableCopies + ' Available' : 'All Borrowed'}
            </span>
            <span class="rating-stars"><i class="fa-solid fa-star"></i> ${book.rating}</span>
          </div>
          <div style="margin-top:10px;">
            <a href="#details" onclick="openBookDetails('${book.id}')" class="ui-btn bb-btn" style="width:100%; margin:0;">
              View Details <i class="fa-solid fa-chevron-right" style="font-size:0.75rem;"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  });
  $("#browse-books-list").html(html);
}

// Open & Render Page 3: Book Details
function openBookDetails(bookId) {
  currentBookId = bookId;
  $.mobile.changePage("#details");
}

function renderDetailsPage() {
  if (!currentBookId) currentBookId = "b1";
  const book = SAMPLE_BOOKS.find(b => b.id === currentBookId);
  if (!book) return;

  const coverURI = generateSVGDataURI(book.title, book.author, book.coverColor);
  const isWishlisted = getStoredWishlist().includes(book.id);
  const isAvail = book.availableCopies > 0;

  $("#detail-cover-img").attr("src", coverURI);
  $("#detail-title").text(book.title);
  $("#detail-author").text("by " + book.author);
  $("#detail-category-badge").text(book.category);
  $("#detail-rating").html(`<i class="fa-solid fa-star"></i> ${book.rating} / 5.0`);
  $("#detail-description").text(book.description);

  $("#detail-isbn").text(book.isbn);
  $("#detail-publisher").text(book.publisher);
  $("#detail-year").text(book.year);
  $("#detail-pages").text(book.pages + " pages");
  $("#detail-copies").text(`${book.availableCopies} of ${book.totalCopies} available`);

  // Wishlist Button Text & Icon
  const wishBtn = $("#btn-toggle-wishlist");
  if (isWishlisted) {
    wishBtn.addClass("bb-btn-danger").removeClass("bb-btn-outline");
    wishBtn.html(`<i class="fa-solid fa-heart"></i> Saved in Wishlist`);
  } else {
    wishBtn.removeClass("bb-btn-danger").addClass("bb-btn-outline");
    wishBtn.html(`<i class="fa-regular fa-heart"></i> Add to Wishlist`);
  }

  // Borrow Button State
  const borrowBtn = $("#btn-borrow-book");
  if (!isAvail) {
    borrowBtn.addClass("ui-state-disabled").text("Currently Unavailable");
  } else {
    borrowBtn.removeClass("ui-state-disabled").html(`<i class="fa-solid fa-book-bookmark"></i> Borrow Book`);
  }
}

// Render Page 4: My Borrowed Books
function renderMyBooksPage() {
  const borrowed = getStoredBorrowed();
  if (borrowed.length === 0) {
    $("#my-books-list").html(`
      <div class="empty-state">
        <i class="fa-solid fa-box-open empty-icon"></i>
        <div class="empty-title">No Borrowed Books</div>
        <div class="empty-desc">Explore the library catalog to borrow your first book!</div>
      </div>
    `);
    return;
  }

  let html = "";
  borrowed.forEach(item => {
    const book = SAMPLE_BOOKS.find(b => b.id === item.bookId);
    if (!book) return;

    const daysLeft = getDaysRemaining(item.dueDate);
    let statusBadge = "";
    let statusClass = "";

    if (daysLeft < 0) {
      statusBadge = `<span class="badge" style="background:var(--danger-bg); color:var(--danger);"><i class="fa-solid fa-circle-exclamation"></i> Overdue (${Math.abs(daysLeft)} days)</span>`;
    } else if (daysLeft <= 3) {
      statusBadge = `<span class="badge" style="background:var(--warning-bg); color:var(--warning);"><i class="fa-solid fa-clock"></i> Due Soon (${daysLeft} days left)</span>`;
    } else {
      statusBadge = `<span class="badge" style="background:var(--success-bg); color:var(--success);"><i class="fa-solid fa-circle-check"></i> Active (${daysLeft} days left)</span>`;
    }

    const coverURI = generateSVGDataURI(book.title, book.author, book.coverColor);

    html += `
      <div class="bb-card">
        <div style="display:flex; gap:12px; margin-bottom:12px;">
          <img src="${coverURI}" alt="${escapeXML(book.title)}" class="book-cover" style="width:65px; height:90px;" />
          <div style="flex:1;">
            <div style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin-bottom:2px;">${escapeXML(book.title)}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">${escapeXML(book.author)}</div>
            ${statusBadge}
          </div>
        </div>

        <div style="background:var(--surface-alt); border-radius:var(--radius-sm); padding:10px; font-size:0.8rem; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:var(--text-muted);">Borrowed Date:</span>
            <span style="font-weight:600;">${item.borrowedDate}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="color:var(--text-muted);">Due Return Date:</span>
            <span style="font-weight:700; color:${daysLeft < 0 ? 'var(--danger)' : 'var(--text-main)'};">${item.dueDate}</span>
          </div>
        </div>

        <button onclick="handleRenewClick('${book.id}')" class="ui-btn bb-btn bb-btn-outline" style="width:100%; margin:0;">
          <i class="fa-solid fa-rotate-right"></i> Renew Book (+7 Days)
        </button>
      </div>
    `;
  });

  $("#my-books-list").html(html);
}

// Render Page 5: Wishlist
function renderWishlistPage() {
  const list = getStoredWishlist();
  if (list.length === 0) {
    $("#wishlist-container").html(`
      <div class="empty-state">
        <i class="fa-regular fa-heart empty-icon"></i>
        <div class="empty-title">Your Wishlist is Empty</div>
        <div class="empty-desc">Save books you want to read later by clicking the heart icon.</div>
      </div>
    `);
    return;
  }

  let html = "";
  list.forEach(id => {
    const book = SAMPLE_BOOKS.find(b => b.id === id);
    if (!book) return;

    const coverURI = generateSVGDataURI(book.title, book.author, book.coverColor);
    const isAvail = book.availableCopies > 0;

    html += `
      <div class="book-card">
        <img src="${coverURI}" alt="${escapeXML(book.title)}" class="book-cover" />
        <div class="book-details-content">
          <div>
            <h4 class="book-title">${escapeXML(book.title)}</h4>
            <div class="book-author">by ${escapeXML(book.author)}</div>
          </div>
          <div class="book-meta-row">
            <span class="badge ${isAvail ? 'badge-available' : 'badge-borrowed'}">
              ${isAvail ? 'Available' : 'Borrowed'}
            </span>
            <span class="rating-stars"><i class="fa-solid fa-star"></i> ${book.rating}</span>
          </div>
          <div style="display:flex; gap:8px; margin-top:10px;">
            <a href="#details" onclick="openBookDetails('${book.id}')" class="ui-btn bb-btn" style="flex:1; margin:0;">
              View
            </a>
            <button onclick="removeFromWishlist('${book.id}')" class="ui-btn bb-btn bb-btn-secondary" style="width:40px; margin:0; padding:0; justify-content:center;">
              <i class="fa-solid fa-trash" style="color:var(--danger);"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
  $("#wishlist-container").html(html);
}

function removeFromWishlist(bookId) {
  toggleWishlist(bookId);
  renderWishlistPage();
}

// Render Page 6: Categories
function renderCategoriesPage() {
  const categoryDefs = [
    { name: "Computer Science", icon: "fa-laptop-code", color: "blue" },
    { name: "Programming", icon: "fa-code", color: "emerald" },
    { name: "Fiction", icon: "fa-book-open-reader", color: "amber" },
    { name: "Science", icon: "fa-flask", color: "purple" },
    { name: "Business", icon: "fa-chart-line", color: "indigo" },
    { name: "Self Development", icon: "fa-brain", color: "teal" },
    { name: "History", icon: "fa-landmark", color: "rose" },
    { name: "Design", icon: "fa-compass-drafting", color: "amber" }
  ];

  let html = "";
  categoryDefs.forEach(cat => {
    const count = SAMPLE_BOOKS.filter(b => b.category === cat.name).length;
    html += `
      <div class="category-card" onclick="filterByCategory('${cat.name}')" style="cursor:pointer;">
        <div class="category-icon">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <div>
          <h4 class="category-name">${escapeXML(cat.name)}</h4>
          <div class="category-count">${count} Titles Available</div>
        </div>
      </div>
    `;
  });
  $("#categories-grid").html(html);
}

function filterByCategory(catName) {
  activeCategory = catName;
  $(".filter-pill").removeClass("active");
  $(`.filter-pill[data-category="${catName}"]`).addClass("active");
  $.mobile.changePage("#browse");
}

// Render Page 7: Notices
function renderNoticesPage() {
  let html = "";
  LIBRARY_NOTICES.forEach(notice => {
    html += `
      <div class="bb-card" style="border-left: 4px solid var(--primary);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <span class="badge ${notice.badgeClass}">
            <i class="fa-solid ${notice.icon}"></i> ${notice.priority}
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted);">${notice.date}</span>
        </div>
        <h4 style="font-weight:700; font-size:0.95rem; color:var(--text-main); margin:6px 0;">${escapeXML(notice.title)}</h4>
        <p style="font-size:0.83rem; color:var(--text-muted); margin:0; line-height:1.4;">${escapeXML(notice.description)}</p>
      </div>
    `;
  });
  $("#notices-container").html(html);
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE ACTION HANDLERS & POPUPS
   -------------------------------------------------------------------------- */
function handleBorrowBook() {
  if (!currentBookId) return;
  const book = SAMPLE_BOOKS.find(b => b.id === currentBookId);
  if (!book || book.availableCopies <= 0) return;

  const borrowed = getStoredBorrowed();
  const alreadyBorrowed = borrowed.some(item => item.bookId === book.id);
  
  if (alreadyBorrowed) {
    $("#popup-message").text(`You have already borrowed "${book.title}". You can manage it under "My Books".`);
    $("#action-popup").popup("open");
    return;
  }

  // Update copies & save
  book.availableCopies--;
  const today = new Date();
  const dueDate = new Date();
  dueDate.setDate(today.getDate() + 14); // 14-day borrowing duration

  const newBorrowItem = {
    bookId: book.id,
    borrowedDate: today.toISOString().split("T")[0],
    dueDate: dueDate.toISOString().split("T")[0],
    progressPercent: 0,
    currentChapter: "Chapter 1: Getting Started"
  };

  borrowed.push(newBorrowItem);
  saveBorrowed(borrowed);

  $("#popup-title").text("Book Borrowed Success! 🎉");
  $("#popup-message").html(`You have successfully borrowed <strong>"${escapeXML(book.title)}"</strong>.<br>Due date: <strong>${newBorrowItem.dueDate}</strong>.`);
  $("#action-popup").popup("open");

  renderDetailsPage();
}

function handleRenewClick(bookId) {
  const borrowed = getStoredBorrowed();
  const item = borrowed.find(b => b.bookId === bookId);
  const book = SAMPLE_BOOKS.find(b => b.id === bookId);

  if (item && book) {
    const currentDue = new Date(item.dueDate);
    currentDue.setDate(currentDue.getDate() + 7);
    item.dueDate = currentDue.toISOString().split("T")[0];

    saveBorrowed(borrowed);

    $("#popup-title").text("Book Renewed! 🔄");
    $("#popup-message").html(`The return due date for <strong>"${escapeXML(book.title)}"</strong> has been extended to <strong>${item.dueDate}</strong>.`);
    $("#action-popup").popup("open");

    renderMyBooksPage();
  }
}

/* --------------------------------------------------------------------------
   8. JQUERY MOBILE EVENT LISTENERS & NAVIGATION SYNC
   -------------------------------------------------------------------------- */

// Global Navbar Active State Sync
function syncActiveNavbar(pageId) {
  $(".ui-navbar a").removeClass("ui-btn-active");
  $(`.ui-navbar a[href="#${pageId}"]`).addClass("ui-btn-active");
}

// Bind jQuery Mobile Page Change Events
$(document).on("pagecontainerchange", function(event, ui) {
  const activePageId = ui.toPage.attr("id");
  syncActiveNavbar(activePageId);

  switch (activePageId) {
    case "home":
      renderHomePage();
      break;
    case "browse":
      renderBrowsePage();
      break;
    case "details":
      renderDetailsPage();
      break;
    case "my-books":
      renderMyBooksPage();
      break;
    case "wishlist":
      renderWishlistPage();
      break;
    case "categories":
      renderCategoriesPage();
      break;
    case "notices":
      renderNoticesPage();
      break;
    case "profile":
      updateGlobalBadgeCounts();
      break;
  }
});

// Document Ready Setup
$(document).ready(function() {
  // Category Filter Pill Click Handlers
  $(document).on("click", ".filter-pill", function(e) {
    e.preventDefault();
    $(".filter-pill").removeClass("active");
    $(this).addClass("active");
    activeCategory = $(this).data("category") || "All";
    renderBrowsePage();
  });

  // Search Bar Live Filtering
  $("#browse-search-input").on("keyup search", function() {
    renderBrowsePage();
  });

  // Availability Toggle
  $("#browse-available-toggle").on("change", function() {
    renderBrowsePage();
  });

  // Details Wishlist Toggle Button
  $("#btn-toggle-wishlist").on("click", function() {
    if (!currentBookId) return;
    const added = toggleWishlist(currentBookId);
    renderDetailsPage();
  });

  // Borrow Button Click Handler
  $("#btn-borrow-book").on("click", function() {
    handleBorrowBook();
  });

  // Initial Page Trigger
  renderHomePage();
});
