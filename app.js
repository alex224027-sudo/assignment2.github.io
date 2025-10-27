// Art Gallery Application JavaScript

// Art pieces data
const artPieces = [
    {
        id: 1,
        title: "Starry Night",
        artist: "Vincent van Gogh",
        year: 1889,
        category: "classical",
        description: "A swirling night sky over a French village, one of the most recognized pieces in modern art. This masterpiece showcases van Gogh's unique post-impressionist style with bold brushstrokes and vivid colors.",
        image: "https://via.placeholder.com/600x400/1e3a5f/ffffff?text=Starry+Night"
    },
    {
        id: 2,
        title: "Composition VIII",
        artist: "Wassily Kandinsky",
        year: 1923,
        category: "modern",
        description: "An abstract geometric composition featuring circles, lines, and triangles in vibrant colors. Kandinsky's work represents the pinnacle of abstract art, exploring the relationship between color and form.",
        image: "https://via.placeholder.com/600x400/8b4513/ffffff?text=Composition+VIII"
    },
    {
        id: 3,
        title: "Mountain Mist",
        artist: "Ansel Adams",
        year: 1948,
        category: "landscape",
        description: "A breathtaking black and white photograph of mountain peaks emerging through morning mist. Adams' masterful use of light and shadow creates a dramatic and timeless landscape.",
        image: "https://via.placeholder.com/600x400/2f4f4f/ffffff?text=Mountain+Mist"
    },
    {
        id: 4,
        title: "Girl with a Pearl Earring",
        artist: "Johannes Vermeer",
        year: 1665,
        category: "portrait",
        description: "Often called the 'Mona Lisa of the North,' this captivating portrait features a young girl wearing an exotic dress and a large pearl earring. The painting is renowned for its intimate composition and the subject's enigmatic gaze.",
        image: "https://via.placeholder.com/600x400/4b0082/ffffff?text=Girl+with+Pearl+Earring"
    },
    {
        id: 5,
        title: "The Thinker",
        artist: "Auguste Rodin",
        year: 1904,
        category: "sculpture",
        description: "A bronze sculpture depicting a nude male figure sitting on a rock, chin resting on one hand, deep in thought. Originally part of 'The Gates of Hell,' this has become one of the most famous sculptures in the world.",
        image: "https://via.placeholder.com/600x400/cd853f/ffffff?text=The+Thinker"
    }
];

// Similar artworks mapping
const similarArtworks = {
    classical: [1, 4],
    modern: [2],
    landscape: [3],
    portrait: [4, 1],
    sculpture: [5]
};

// Application state
let currentUser = null;
let currentArtPiece = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    showPage('login');
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (no backend)
    if (email && password) {
        currentUser = { email: email };
        showSuccessMessage('Login successful!');
        
        setTimeout(() => {
            showPage('gallery-home');
        }, 1000);
    } else {
        showErrorMessage('Please fill in all fields.');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Simple validation (no backend)
    if (fullName && email && password) {
        currentUser = { email: email, name: fullName };
        showSuccessMessage('Account created successfully!');
        
        setTimeout(() => {
            showPage('gallery-home');
        }, 1000);
    } else {
        showErrorMessage('Please fill in all fields.');
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(page => {
        page.style.display = 'none';
    });
    
    // Show navbar for authenticated pages
    const navbar = document.getElementById('mainNavbar');
    if (pageId === 'login' || pageId === 'signup') {
        navbar.style.display = 'none';
    } else {
        navbar.style.display = 'block';
    }
    
    // Show requested page
    let targetPage;
    switch(pageId) {
        case 'login':
            targetPage = document.getElementById('login-page');
            break;
        case 'signup':
            targetPage = document.getElementById('signup-page');
            break;
        case 'gallery-home':
            targetPage = document.getElementById('gallery-home-page');
            loadFeaturedArt();
            break;
        case 'art-display':
            targetPage = document.getElementById('art-display-page');
            loadArtGrid();
            break;
        case 'art-detail':
            targetPage = document.getElementById('art-detail-page');
            break;
        default:
            targetPage = document.getElementById('login-page');
    }
    
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // Add animation
        targetPage.style.opacity = '0';
        targetPage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            targetPage.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            targetPage.style.opacity = '1';
            targetPage.style.transform = 'translateY(0)';
        }, 50);
    }
}

function loadFeaturedArt() {
    const featuredContainer = document.getElementById('featuredArt');
    if (!featuredContainer) return;
    
    // Show first 3 art pieces as featured
    const featuredPieces = artPieces.slice(0, 3);
    
    featuredContainer.innerHTML = '';
    
    featuredPieces.forEach((piece, index) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-md-6 mb-4';
        colDiv.style.animationDelay = `${index * 0.1}s`;
        
        colDiv.innerHTML = `
            <div class="card art-card scale-in" onclick="showArtDetail(${piece.id})">
                <img src="${piece.image}" class="card-img-top" alt="${piece.title}">
                <div class="card-body">
                    <h5 class="card-title">${piece.title}</h5>
                    <p class="artist-name mb-1">${piece.artist}</p>
                    <small class="year">${piece.year}</small>
                </div>
            </div>
        `;
        
        featuredContainer.appendChild(colDiv);
    });
}

function loadArtGrid() {
    const artGrid = document.getElementById('artGrid');
    if (!artGrid) return;
    
    artGrid.innerHTML = '';
    
    artPieces.forEach((piece, index) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-md-6 mb-4';
        colDiv.style.animationDelay = `${index * 0.1}s`;
        
        colDiv.innerHTML = `
            <div class="card art-card slide-in-up" onclick="showArtDetail(${piece.id})">
                <img src="${piece.image}" class="card-img-top" alt="${piece.title}">
                <div class="card-body">
                    <h5 class="card-title">${piece.title}</h5>
                    <p class="artist-name mb-1">${piece.artist}</p>
                    <small class="year">${piece.year}</small>
                    <p class="card-text mt-2 text-muted">${piece.description.substring(0, 100)}...</p>
                </div>
            </div>
        `;
        
        artGrid.appendChild(colDiv);
    });
}

function showArtDetail(artId) {
    const artPiece = artPieces.find(piece => piece.id === artId);
    if (!artPiece) return;
    
    currentArtPiece = artPiece;
    
    // Populate art detail page
    document.getElementById('artDetailImage').src = artPiece.image;
    document.getElementById('artDetailImage').alt = artPiece.title;
    document.getElementById('artDetailTitle').textContent = artPiece.title;
    document.getElementById('artDetailArtist').textContent = artPiece.artist;
    document.getElementById('artDetailYear').textContent = artPiece.year;
    document.getElementById('artDetailDescription').textContent = artPiece.description;
    
    loadSimilarArtworks(artPiece.category, artPiece.id);
    showPage('art-detail');
}

function loadSimilarArtworks(category, currentId) {
    const similarContainer = document.getElementById('similarArtworks');
    if (!similarContainer) return;
    
    // Get similar artworks (excluding current piece)
    const categoryPieces = similarArtworks[category] || [];
    const otherPieces = artPieces.filter(piece => 
        categoryPieces.includes(piece.id) && piece.id !== currentId
    );
    
    // If not enough similar pieces, add random pieces
    if (otherPieces.length < 2) {
        const randomPieces = artPieces.filter(piece => 
            piece.id !== currentId && !otherPieces.includes(piece)
        );
        
        while (otherPieces.length < 2 && randomPieces.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomPieces.length);
            otherPieces.push(randomPieces.splice(randomIndex, 1)[0]);
        }
    }
    
    similarContainer.innerHTML = '';
    
    otherPieces.slice(0, 3).forEach((piece, index) => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 mb-3';
        colDiv.style.animationDelay = `${index * 0.1}s`;
        
        colDiv.innerHTML = `
            <div class="card similar-art-card scale-in" onclick="showArtDetail(${piece.id})">
                <img src="${piece.image}" class="card-img-top" alt="${piece.title}">
                <div class="card-body">
                    <h6 class="card-title">${piece.title}</h6>
                    <p class="artist-name">${piece.artist}</p>
                </div>
            </div>
        `;
        
        similarContainer.appendChild(colDiv);
    });
}

function logout() {
    currentUser = null;
    currentArtPiece = null;
    showSuccessMessage('Logged out successfully!');
    
    setTimeout(() => {
        showPage('login');
    }, 1000);
}

function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff';
    
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        font-weight: 500;
        max-width: 300px;
    `;
    
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button[type="submit"]')) {
        const button = e.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '<span class="loading"></span> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any modals or go back
        const currentPage = document.querySelector('.page-container[style*="block"]');
        if (currentPage && currentPage.id === 'art-detail-page') {
            showPage('art-display');
        }
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
function observeElements() {
    const elements = document.querySelectorAll('.art-card, .similar-art-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// Call observe elements when DOM is ready
setTimeout(observeElements, 100);