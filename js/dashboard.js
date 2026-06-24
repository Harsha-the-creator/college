/**
 * School Admission Management System - Dashboard Panel Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Verify admin session login state first
  if (typeof window.Auth !== 'undefined') {
    window.Auth.checkAuthAndRedirect();
  }

  // DOM Elements
  const tableBody = document.getElementById('applicationsTableBody');
  const searchInput = document.getElementById('dbSearchInput');
  const classFilter = document.getElementById('filterClass');
  const statusFilter = document.getElementById('filterStatus');
  const clearApplicationsBtn = document.getElementById('clearApplicationsBtn');
  const topperName = document.getElementById('topperName');
  const topperClass = document.getElementById('topperClass');
  const topperMarks = document.getElementById('topperMarks');
  const topperPhoto = document.getElementById('topperPhoto');
  const addTopperBtn = document.getElementById('addTopperBtn');
  const clearToppersBtn = document.getElementById('clearToppersBtn');
  const topperTableBody = document.getElementById('topperTableBody');
  const tabBtnToppers = document.getElementById('tabBtnToppers');
  const tabContentToppers = document.getElementById('tabContentToppers');
  
  // Stats Elements
  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statApproved = document.getElementById('statApproved');
  const statRejected = document.getElementById('statRejected');
  
  // Tab elements
  const tabBtnApps = document.getElementById('tabBtnApplications');
  const tabBtnMessages = document.getElementById('tabBtnMessages');
  const tabContentApps = document.getElementById('tabContentApplications');
  const tabContentMessages = document.getElementById('tabContentMessages');
  const messagesTableBody = document.getElementById('messagesTableBody');
  const messagesCount = document.getElementById('messagesCount');
  const messagesEmptyState = document.getElementById('messagesEmptyState');

  // Modal elements
  const modalOverlay = document.getElementById('appDetailsModal');
  const btnModalClose = document.getElementById('btnModalClose');
  const btnModalCloseFooter = document.getElementById('btnModalCloseFooter');
  const btnModalTrack = document.getElementById('btnModalTrack');
  const btnModalViewDoc = document.getElementById('btnModalViewDoc');
  
  // Init page data loads
  loadDashboardData();

  // Tab Toggling Action Bindings
  [tabBtnApps, tabBtnToppers, tabBtnMessages].forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = btn.getAttribute('data-tab');
      
      tabBtnApps.classList.remove('active');
      tabBtnToppers.classList.remove('active');
      tabBtnMessages.classList.remove('active');
      tabContentApps.classList.remove('active');
      tabContentToppers.classList.remove('active');
      tabContentMessages.classList.remove('active');
      
      btn.classList.add('active');
      
      if (targetTab === 'applications') {
        tabContentApps.classList.add('active');
        loadDashboardData();
      } else if (targetTab === 'toppers') {
        tabContentToppers.classList.add('active');
        renderToppersTable();
      } else if (targetTab === 'messages') {
        tabContentMessages.classList.add('active');
        renderMessagesTable();
      }
    });
  });

  // Filters change bindings
  [searchInput, classFilter, statusFilter].forEach(el => {
    el.addEventListener('input', () => {
      renderApplicationsTable();
    });
  });

  // Clear all applications button
  if (clearApplicationsBtn) {
    clearApplicationsBtn.addEventListener('click', () => {
      if (confirm('This will delete all application records permanently. Are you sure you want to continue?')) {
        clearAllApplications();
      }
    });
  }

  // Topper management actions
  if (addTopperBtn) {
    addTopperBtn.addEventListener('click', () => {
      addTopperEntry();
    });
  }

  if (clearToppersBtn) {
    clearToppersBtn.addEventListener('click', () => {
      if (confirm('This will clear all topper entries displayed on the homepage. Continue?')) {
        clearAllToppers();
      }
    });
  }

  // Loader master coordinator function
  function loadDashboardData() {
    renderApplicationsTable();
    calculateStatsMetrics();
    renderToppersTable();
  }

  // Render Datatable applications list rows
  function renderApplicationsTable() {
    tableBody.innerHTML = '';
    
    // Fetch latest rows from DB layer
    const appsList = window.DB.getApplications();
    const query = searchInput.value.toLowerCase().trim();
    const selectedClass = classFilter.value;
    const selectedStatus = statusFilter.value;
    
    // Apply searches & filters
    const filteredApps = appsList.filter(app => {
      const matchQuery = app.studentName.toLowerCase().includes(query) || 
                         app.id.toLowerCase().includes(query) || 
                         app.parentName.toLowerCase().includes(query);
                         
      const matchClass = selectedClass === '' ? true : app.classApplying === selectedClass;
      const matchStatus = selectedStatus === '' ? true : app.status === selectedStatus;
      
      return matchQuery && matchClass && matchStatus;
    });

    // Handle empty table lists
    if (filteredApps.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="empty-table-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 0.5rem;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div>No matching applications found.</div>
          </td>
        </tr>
      `;
      return;
    }

    // Sort newest applications first
    filteredApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Populate rows
    filteredApps.forEach(app => {
      const tr = document.createElement('tr');
      
      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--brand);">${app.id}</td>
        <td style="font-weight: 600;">${app.studentName}</td>
        <td><span class="badge badge-brand">${app.classApplying}</span></td>
        <td>${formatDate(app.createdAt)}</td>
        <td><span class="status-badge ${app.status}">${app.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-btn btn-view" title="View Application Details" data-id="${app.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="action-btn btn-approve" title="Approve Application" data-id="${app.id}" ${app.status === 'approved' ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </button>
            <button class="action-btn btn-reject" title="Reject Application" data-id="${app.id}" ${app.status === 'rejected' ? 'disabled style="opacity: 0.4; cursor: not-allowed;"' : ''}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </td>
      `;
      
      tableBody.appendChild(tr);
    });

    // Bind clicks to dynamically loaded actions buttons
    bindRowActions();
  }

  // Bind row elements actions triggers
  function bindRowActions() {
    // View Click Handlers
    document.querySelectorAll('.btn-view').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openDetailsModal(id);
      });
    });

    // Approve Click Handlers
    document.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Are you sure you want to APPROVE application ${id}?`)) {
          processStatusChange(id, 'approved');
        }
      });
    });

    // Reject Click Handlers
    document.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Are you sure you want to REJECT application ${id}?`)) {
          processStatusChange(id, 'rejected');
        }
      });
    });
  }

  // Handle updates in statuses
  function processStatusChange(id, status) {
    const updated = window.DB.updateApplicationStatus(id, status);
    
    if (updated) {
      loadDashboardData();
      
      const type = status === 'approved' ? 'success' : 'error';
      showToast(
        'Application Updated', 
        `Status of ${id} set to ${status.toUpperCase()}. Simulated email sent.`, 
        type
      );
    }
  }

  // Clear all application records
  function clearAllApplications() {
    window.DB.clearApplications();
    loadDashboardData();
    renderApplicationsTable();
    showToast('Application Database Cleared', 'All application records have been removed.', 'success');
  }

  function addTopperEntry() {
    const name = topperName?.value.trim();
    const topperClassValue = topperClass?.value.trim();
    const marks = topperMarks?.value.trim();
    const file = topperPhoto?.files?.[0];

    if (!name || !topperClassValue || !marks) {
      showToast('Missing Topper Details', 'Please provide name, class, and marks for the topper.', 'error');
      return;
    }

    if (!file) {
      showToast('Please add a photo', 'Upload a topper photo so it appears on the homepage slider.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      const imageData = event.target.result;
      window.DB.createTopper({
        name,
        class: topperClassValue,
        marks,
        image: imageData
      });
      topperName.value = '';
      topperClass.value = '';
      topperMarks.value = '';
      topperPhoto.value = '';
      renderToppersTable();
      showToast('Topper Added', 'The topper has been added to the homepage highlights.', 'success');
    };
    reader.readAsDataURL(file);
  }

  function clearAllToppers() {
    window.DB.clearToppers();
    renderToppersTable();
    showToast('Topper Highlights Cleared', 'Homepage topper entries have been removed.', 'success');
  }

  function renderToppersTable() {
    if (!topperTableBody) return;

    const toppers = window.DB.getToppers();
    topperTableBody.innerHTML = '';

    if (toppers.length === 0) {
      topperTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="empty-table-placeholder">
            <div>No topper highlights have been added yet.</div>
          </td>
        </tr>
      `;
      return;
    }

    toppers.forEach(topper => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${topper.image}" alt="${topper.name}" style="width:72px; height:72px; object-fit:cover; border-radius: .75rem; border: 1px solid var(--border);" /></td>
        <td style="font-weight: 600;">${topper.name}</td>
        <td>${topper.class}</td>
        <td>${topper.marks}</td>
        <td>
          <button class="action-btn btn-delete" data-id="${topper.id}" title="Delete Topper">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
          </button>
        </td>
      `;
      topperTableBody.appendChild(tr);
    });

    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const topperId = btn.getAttribute('data-id');
        if (confirm('Delete this topper entry?')) {
          window.DB.deleteTopper(topperId);
          renderToppersTable();
          showToast('Topper Removed', 'The topper entry has been deleted.', 'success');
        }
      });
    });
  }

  // Open Details Modal and populate values
  function openDetailsModal(id) {
    const app = window.DB.getApplicationById(id);
    if (!app) return;

    // Set Text Contents
    document.getElementById('mHeaderId').textContent = `Application Details: ${app.id}`;
    document.getElementById('mStudentName').textContent = app.studentName;
    document.getElementById('mDob').textContent = formatDate(app.dob);
    document.getElementById('mGender').textContent = app.gender;
    document.getElementById('mClass').textContent = app.classApplying;
    document.getElementById('mParentName').textContent = app.parentName;
    document.getElementById('mPhone').textContent = app.parentPhone;
    document.getElementById('mEmail').textContent = app.email;
    document.getElementById('mPrevSchool').textContent = app.prevSchool || 'N/A';
    document.getElementById('mAddress').textContent = app.address;
    
    // File upload data details
    const mDocName = document.getElementById('mDocName');
    const mDocMeta = document.getElementById('mDocMeta');
    
    mDocName.textContent = app.docName;
    mDocMeta.textContent = `${app.docType.split('/')[1].toUpperCase()} • ${formatBytes(app.docSize)}`;
    
    // Bind modal viewer action
    btnModalViewDoc.onclick = () => {
      alert(`[SIMULATION] Viewing File Document: ${app.docName}\nType: ${app.docType}\nSize: ${formatBytes(app.docSize)}`);
    };

    // Bind status tracking redirection
    btnModalTrack.onclick = () => {
      window.open(`status.html?id=${app.id}`, '_blank');
    };

    // Activate modal dialog
    modalOverlay.classList.add('active');
  }

  // Close modals click triggers
  [btnModalClose, btnModalCloseFooter, modalOverlay].forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el !== modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  });

  // Calculate top totals metrics panels counts
  function calculateStatsMetrics() {
    const list = window.DB.getApplications();
    
    const total = list.length;
    const pending = list.filter(a => a.status === 'pending').length;
    const approved = list.filter(a => a.status === 'approved').length;
    const rejected = list.filter(a => a.status === 'rejected').length;
    
    statTotal.textContent = total;
    statPending.textContent = pending;
    statApproved.textContent = approved;
    statRejected.textContent = rejected;
  }

  // Render Contact Messages table
  function renderMessagesTable() {
    messagesTableBody.innerHTML = '';
    const messages = window.DB.getContactMessages();
    
    messagesCount.textContent = messages.length;

    if (messages.length === 0) {
      messagesTableBody.innerHTML = '';
      messagesEmptyState.style.display = 'block';
      return;
    }

    messagesEmptyState.style.display = 'none';

    // Sort newest messages first
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Populate rows
    messages.forEach(msg => {
      const tr = document.createElement('tr');
      
      const truncatedMessage = msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message;
      
      tr.innerHTML = `
        <td style="font-weight: 600;">${msg.name}</td>
        <td>${msg.email}</td>
        <td style="font-weight: 500;">${msg.subject}</td>
        <td title="${msg.message}" style="cursor: help; color: var(--text-muted);">${truncatedMessage}</td>
        <td style="font-size: 0.9rem; color: var(--text-muted);">${formatDate(msg.createdAt)} ${new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
        <td>
          <div class="table-actions" style="gap: 0.5rem;">
            <button class="action-btn btn-view-message" title="View Full Message" data-id="${msg.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="action-btn btn-delete-message" title="Delete Message" data-id="${msg.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
            </button>
          </div>
        </td>
      `;
      
      messagesTableBody.appendChild(tr);
    });

    // Bind message actions
    bindMessageActions();
  }

  // Bind message action handlers
  function bindMessageActions() {
    // View message click handlers
    document.querySelectorAll('.btn-view-message').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgId = btn.getAttribute('data-id');
        const messages = window.DB.getContactMessages();
        const message = messages.find(m => m.id === msgId);
        
        if (message) {
          alert(`From: ${message.name} (${message.email})\nSubject: ${message.subject}\nDate: ${formatDate(message.createdAt)}\n\nMessage:\n${message.message}`);
          window.DB.markMessageAsRead(msgId);
          renderMessagesTable();
        }
      });
    });

    // Delete message click handlers
    document.querySelectorAll('.btn-delete-message').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgId = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this message?')) {
          deleteMessage(msgId);
        }
      });
    });
  }

  // Delete a message
  function deleteMessage(msgId) {
    let messages = JSON.parse(localStorage.getItem('contact_messages')) || [];
    messages = messages.filter(m => m.id !== msgId);
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    
    showToast('Message Deleted', 'The message has been removed.', 'success');
    renderMessagesTable();
  }

  // Size helper formatter
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Date layout formatter
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', options);
  }

  // Toast Alerts Generator
  function showToast(title, desc, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let svgIcon = '';
    if (type === 'success') {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
    } else {
      svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon flex-center">${svgIcon}</div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4500);
  }
});
