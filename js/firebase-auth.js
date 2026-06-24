import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAexN8Tq8w-IWNFm8P-QmRiYctPgV0HH70",
  authDomain: "gayatri-junior-college.firebaseapp.com",
  projectId: "gayatri-junior-college",
  storageBucket: "gayatri-junior-college.firebasestorage.app",
  messagingSenderId: "348258857161",
  appId: "1:348258857161:web:b02b30d59cc300cec65d18",
  measurementId: "G-TJS886E4DW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.loginAdmin = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  const pageLoader = document.getElementById('pageLoader');
  const submitBtn = document.querySelector('#adminLoginForm button[type="submit"]');
  const forgotBtn = document.querySelector('#adminLoginForm button[onclick="forgotPassword()"]');

  msg.innerText = "";
  msg.style.color = "";

  try {
    // show loader and disable form while authenticating
    if (pageLoader) {
      pageLoader.style.display = 'flex';
      pageLoader.classList.remove('fade-out');
    }
    if (submitBtn) submitBtn.disabled = true;
    if (forgotBtn) forgotBtn.disabled = true;

    await signInWithEmailAndPassword(auth, email, password);
    msg.style.color = "green";
    msg.innerText = "Login successful. Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  } catch (error) {
    console.error('Firebase login failed:', error);
    msg.style.color = "red";
    msg.innerText = "Invalid email or password";
    // hide loader and re-enable form on failure
    if (pageLoader) {
      pageLoader.classList.add('fade-out');
      setTimeout(() => { pageLoader.style.display = 'none'; }, 400);
    }
    if (submitBtn) submitBtn.disabled = false;
    if (forgotBtn) forgotBtn.disabled = false;
  }
};

window.forgotPassword = async function () {
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("msg");

  msg.innerText = "";
  msg.style.color = "";

  if (!email) {
    msg.style.color = "red";
    msg.innerText = "Enter your email first";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    msg.style.color = "green";
    msg.innerText = "Password reset email sent. Check your inbox.";
  } catch (error) {
    console.error('Password reset failed:', error);
    msg.style.color = "red";
    msg.innerText = "Unable to send reset email";
  }
};

window.logoutAdmin = async function () {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase sign out failed:', error);
  }
  window.location.href = "admin.html";
};

window.checkDashboardAuth = function () {
  onAuthStateChanged(auth, function (user) {
    const currentPath = window.location.pathname;

    if (!user && currentPath.includes('dashboard.html')) {
      window.location.href = 'admin.html';
      return;
    }

    if (user && currentPath.includes('admin.html')) {
      window.location.href = 'dashboard.html';
    }
  });
};