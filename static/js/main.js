// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('header nav');
    const navContainer = document.querySelector('header .container');
    navContainer.insertBefore(mobileToggle, nav);
    
    mobileToggle.addEventListener('click', function() {
        const navList = document.querySelector('header nav ul');
        navList.classList.toggle('show');
        
        // Change icon based on menu state
        if (navList.classList.contains('show')) {
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelector('header nav ul').classList.remove('show');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll reveal animations
    const revealElements = document.querySelectorAll('.section');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 150) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Portfolio Gallery Modal
    const galleryItems = document.querySelectorAll('.gallery .item');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.innerHTML = '&times;';
    
    modal.appendChild(modalContent);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const mediaElement = this.querySelector('img, video');
            
            if (mediaElement.tagName === 'IMG') {
                const img = document.createElement('img');
                img.src = mediaElement.src;
                modalContent.innerHTML = '';
                modalContent.appendChild(img);
            } else if (mediaElement.tagName === 'VIDEO') {
                const video = document.createElement('video');
                video.controls = true;
                video.autoplay = true;
                
                const source = document.createElement('source');
                source.src = mediaElement.querySelector('source').src;
                source.type = mediaElement.querySelector('source').type;
                
                video.appendChild(source);
                modalContent.innerHTML = '';
                modalContent.appendChild(video);
            }
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal functionality
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Stop video if playing
        const video = modalContent.querySelector('video');
        if (video) {
            video.pause();
        }
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill out all fields');
                return;
            }
            
            // Here you would normally send the data to a server
            // For now, we'll just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                for (let i = 0; i < formElements.length; i++) {
                    formElements[i].disabled = false;
                }
                submitButton.textContent = originalText;
            }, 3000);
        });
    }
    
    // Animate the navbar on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down & not at the top
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at the top
            header.style.transform = 'translateY(0)';
        }
        
        // Add shadow and change opacity based on scroll position
        if (scrollTop > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS class to header for smooth transitions
    header.style.transition = 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
    
    // Add 'reveal' class to all sections for animation
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
});
