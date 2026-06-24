# GAYATRI JUNIOR & DEGREE COLLEGE - Admission Management Portal

Welcome to the **GAYATRI JUNIOR & DEGREE COLLEGE Admission Management Portal**—a premium, fully responsive, and modern school registration system.

This codebase is a clean, dependency-free frontend Single Page / Multi-Page application architecture built using core web technologies (HTML, CSS, JavaScript) and utilizes `LocalStorage` for simulated database features. This allows the website to be fully self-contained and run on any static web hosting service (Vercel, Netlify, GitHub Pages, Firebase Hosting) without database configuration.

---

## 🚀 Getting Started

Since the project is built with vanilla HTML/CSS/JS, running it locally is extremely simple:

1. **Double-click `index.html`** to open the landing page directly in your web browser.
2. **Alternatively**, serve the folder using a local server extension such as VS Code's "Live Server", or run a simple python server in your terminal:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 📂 Project Architecture

```text
c:/Users/koree/Desktop/school/
├── index.html            # Landing Page
├── apply.html            # Multi-step Admission Form Wizard
├── status.html           # Application Status Tracking
├── admin.html            # Administrator Portal Sign-in
├── dashboard.html        # Admin Review & Processing Dashboard
├── README.md             # Documentation (This file)
├── css/
│   ├── variables.css     # CSS design tokens (academic colors, typography)
│   ├── styles.css        # Common structures (global elements, nav, footer)
│   ├── landing.css       # Landing page cards and layout styling
│   ├── form.css          # Admission wizard elements & drag-drop styles
│   ├── dashboard.css     # Statistics cards, grid grids, and modals
│   └── components.css    # Toast alerts, loader overlays, skeletons
└── js/
    ├── db.js             # LocalStorage database model (CRUD, Seed applications)
    ├── auth.js           # Session authentication manager for admin portal
    ├── app.js            # General page preloader transitions & menu triggers
    ├── form.js           # Step validation, file upload drop, success callbacks
    ├── status.js         # Tracking search query engine & status timelines
    ├── pdf-generator.js  # Print-to-PDF invoice/form letterhead layout generator
    └── dashboard.js      # Filter search queries, table logs, status adjustments
```

---

## 🛠️ Security & Admin Credentials

The administrative dashboard checks for an active session to protect the review portal. The mock database seeds with realistic data on its first load so you can immediately test filters.

* **Login URL:** `admin.html`
* **Default Username:** `admin`
* **Default Password:** `admin123`

---

## 📝 Key Features Supported

1. **Multi-Step Form Wizard (`apply.html`):**
   * Separates fields into logical categories (Student Info, Parent Contacts, Class & Uploads, Review).
   * Validates student age (must be at least 4 years old) and field formats before transitioning.
   * Responsive progress bar indicator.

2. **Drag & Drop Document Upload:**
   * Interactive drag-over zone validating document format (PDF, PNG, JPG) and size limit (Max: 2MB).
   * Caches file metadata to prevent memory overflow in `LocalStorage`.

3. **Live Status Tracking (`status.html`):**
   * Search box mapping application reference IDs (e.g. `ADM-2026-3941`).
   * Visual timeline checkpoints displaying review steps (`Form Submitted`, `Under Review`, `Final Decision`).
   * Renders instructions context dynamically matching the status state (Pending, Approved, Rejected).

4. **PDF Generator (`js/pdf-generator.js`):**
   * Generates a clean, high-resolution letterhead receipt certificate complete with signature lines, stamp boxes, and verification details.
   * Triggers native print overlays to save directly as a PDF.

5. **Simulated Email Confirmation Audits (`dashboard.html`):**
   * Automatically simulates receipt notifications when candidates apply.
   * Simulates updates notifications when administrators approve or reject submissions.
   * Provides an audit panel on the dashboard to review sent communications.

---

## 🌐 Production Deployment

Since the website contains no server-side compilation, you can deploy the codebase directly:

* **GitHub Pages:** Create a repository, push the codebase, and set source build to the main branch.
* **Netlify / Vercel:** Drag and drop the folder directly into the host dashboard.

