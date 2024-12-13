
// Dark mode functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved theme
        htmlElement.setAttribute('data-theme', savedTheme);
        darkModeToggle.checked = savedTheme === 'dark';
    } else {
        // Set dark mode as default
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
        localStorage.setItem('theme', 'dark');
    }
    
    updateToggleIcon();
}

// Update toggle icon
function updateToggleIcon() {
    const toggleIcon = document.querySelector('.toggle-icon');
    if (toggleIcon) {
        toggleIcon.textContent = darkModeToggle.checked ? '☀️' : '🌙';
        toggleIcon.style.transform = darkModeToggle.checked ? 'rotate(180deg)' : 'rotate(0)';
    }
}

// Improved random function with better distribution
function getRandom(min, max) {
    return min + (Math.random() * (max - min));
}

// Handle theme toggle with subtle transitions
function toggleTheme() {
    const newTheme = darkModeToggle.checked ? 'dark' : 'light';
    
    document.body.classList.add('theme-transition');
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
    
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 1000);
}

// Event Listeners
darkModeToggle.addEventListener('change', toggleTheme);

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        darkModeToggle.checked = e.matches;
        toggleTheme();
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Intersection Observer for animations
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes to the section and its children
            entry.target.classList.add('animate');
            
            // Animate project cards individually
            if (entry.target.classList.contains('projects')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 200); // Stagger the animations
                });
            }
            
            // Animate about section components
            if (entry.target.classList.contains('about')) {
                const content = entry.target.querySelector('.about-content');
                content.classList.add('animate');
            }
            
            // Animate hero section components
            if (entry.target.classList.contains('hero')) {
                const content = entry.target.querySelector('.hero-content');
                content.classList.add('animate');
            }
            
            // Animate contact form
            if (entry.target.classList.contains('contact')) {
                const content = entry.target.querySelector('.contact-content');
                content.classList.add('animate');
            }
            
            // Animate grades section
            if (entry.target.classList.contains('grades')) {
                const gradeCards = entry.target.querySelectorAll('.grade-card');
                const header = entry.target.querySelector('.grades-header');
                const container = entry.target.querySelector('.grades-container');
                
                // Animate header
                header.style.opacity = '0';
                header.style.transform = 'translateY(20px)';
                requestAnimationFrame(() => {
                    header.style.transition = 'all 0.5s ease';
                    header.style.opacity = '1';
                    header.style.transform = 'translateY(0)';
                });
                
                // Animate container
                container.style.opacity = '0';
                container.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    container.style.transition = 'all 0.5s ease';
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }, 200);
                
                // Animate grade cards with stagger
                gradeCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 400 + (index * 100)); // Stagger each card's animation
                });
            }
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the element is visible
});

// Observe all sections for animations
document.querySelectorAll('section').forEach((section) => {
    animationObserver.observe(section);
});

// Enhanced form submission with loading animation
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitButton = this.querySelector('.submit-button');
    submitButton.classList.add('loading');
    
    try {
        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show custom modal
        const modal = document.getElementById('submissionModal');
        modal.style.display = 'block';
        
        // Close modal when clicking the close button
        modal.querySelector('.close-button').onclick = function() {
            modal.style.display = 'none';
        };
        
        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };
        
        this.reset();
    } catch (error) {
        alert('There was an error sending your message. Please try again.');
    } finally {
        submitButton.classList.remove('loading');
    }
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Move navLinks declaration outside the DOMContentLoaded event
const navLinks = document.querySelector('.nav-links');

// Wrap hamburger menu initialization in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        console.log('Hamburger menu clicked'); // Debugging log

        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        console.log('Nav links active:', navLinks.classList.contains('active')); // Debugging log

    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            toggleMenu();
        }
    });
});

// Prevent menu from staying open on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }, 250);
});

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
});

// Grades functionality
const gradesData = [
    {
        "subject": "Information Management",
        "code": "IMAN",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Information Management"
    },
    {
        "subject": "Applied Machine Learning",
        "code": "MLAP",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Applied Machine Learning"
    },
    {
        "subject": "Enterprise Performance Architecture",
        "code": "EPAC",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Enterprise Performance Architecture"
    },
    {
        "subject": "Enterprise Application Development",
        "code": "EAD",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Enterprise Application Development"
    },
    {
        "subject": "Interactive Media Design",
        "code": "IMDE",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Interactive Media Design"
    },
    {
        "subject": "Final Year Project",
        "code": "FYP",
        "grade": "A",
        "year": "4",
        "semester": "Fall",
        "description": "Final Year Project"
    },
    {
        "subject": "Experiential Learning",
        "code": "EXLE",
        "grade": "Pass",
        "year": "3",
        "semester": "Fall",
        "description": "Experiential Learning"
    },
    {
        "subject": "Server-side Web Development",
        "code": "WEBD",
        "grade": "B",
        "year": "3",
        "semester": "Spring",
        "description": "Server-side Web Development"
    },
    {
        "subject": "Operating Systems",
        "code": "OPSY",
        "grade": "B",
        "year": "3",
        "semester": "Spring",
        "description": "Operating Systems"
    },
    {
        "subject": "Cloud Service & Distributed Computing",
        "code": "COMP",
        "grade": "B",
        "year": "3",
        "semester": "Spring",
        "description": "Cloud Service & Distributed Computing"
    },
    {
        "subject": "Big Data Technologies",
        "code": "DBAS",
        "grade": "B+",
        "year": "3",
        "semester": "Spring",
        "description": "Big Data Technologies"
    },
    {
        "subject": "Data Structures & Algorithms",
        "code": "ALGO",
        "grade": "B+",
        "year": "3",
        "semester": "Spring",
        "description": "Data Structures & Algorithms"
    },
    {
        "subject": "Data Analysis",
        "code": "DATA",
        "grade": "B",
        "year": "3",
        "semester": "Spring",
        "description": "Data Analysis"
    },
    {
        "subject": "Software Development 4",
        "code": "SWDV",
        "grade": "B+",
        "year": "2",
        "semester": "Fall",
        "description": "Software Development 4"
    },
    {
        "subject": "Project",
        "code": "PROJ",
        "grade": "A",
        "year": "2",
        "semester": "Fall",
        "description": "Project"
    },
    {
        "subject": "Routing & Switching Essentials",
        "code": "NETW",
        "grade": "A",
        "year": "2",
        "semester": "Fall",
        "description": "Routing & Switching Essentials"
    },
    {
        "subject": "Management Science",
        "code": "MNSC",
        "grade": "A",
        "year": "2",
        "semester": "Fall",
        "description": "Management Science"
    },
    {
        "subject": "Database Admin & Analysis",
        "code": "DATA",
        "grade": "B+",
        "year": "2",
        "semester": "Fall",
        "description": "Database Administration and Analysis"
    },
    {
        "subject": "Information Security",
        "code": "SRTY",
        "grade": "B+",
        "year": "2",
        "semester": "Fall",
        "description": "Information Security"
    },
    {
        "subject": "Software Development 3",
        "code": "SWDV",
        "grade": "A",
        "year": "2",
        "semester": "Spring",
        "description": "Software Development 3"
    },
    {
        "subject": "Software Quality Assessment & Testing",
        "code": "SOEN",
        "grade": "B+",
        "year": "2",
        "semester": "Spring",
        "description": "Software Quality Assessment and Testing"
    },
    {
        "subject": "Network Fundamentals",
        "code": "NETW",
        "grade": "B+",
        "year": "2",
        "semester": "Spring",
        "description": "Network Fundamentals"
    },
    {
        "subject": "Advanced Database Technologies",
        "code": "DBAS",
        "grade": "B",
        "year": "2",
        "semester": "Spring",
        "description": "Advanced Database Technologies"
    },
    {
        "subject": "Discrete Mathematics 2",
        "code": "MATH",
        "grade": "A",
        "year": "2",
        "semester": "Spring",
        "description": "Discrete Mathematics 2"
    },
    {
        "subject": "Client Side Web Development",
        "code": "WEBD",
        "grade": "A",
        "year": "2",
        "semester": "Spring",
        "description": "Client-Side Web Development"
    }
];

function getGradeClass(grade) {
    if (grade === 'A+' || grade === 'A') return 'excellent';
    if (grade === 'A-') return 'good';
    return 'average';
}

function createGradeCard(grade) {
    const gradeClass = getGradeClass(grade.grade);
    return `
        <div class="grade-card" data-year="${grade.year}" data-subject="${grade.code}">
            <div class="grade-info">
                <h3>${grade.subject}</h3>
                <p>${grade.description}</p>
            </div>
            <div class="grade-semester">Year ${grade.year} - ${grade.semester}</div>
            <div class="grade-value ${gradeClass}">${grade.grade}</div>
        </div>
    `;
}

function filterGrades() {
    const yearFilter = document.getElementById('yearFilter').value;
    const subjectFilter = document.getElementById('subjectFilter').value;
    const gradeCards = document.querySelectorAll('.grade-card');

    gradeCards.forEach(card => {
        const year = card.dataset.year;
        const subject = card.dataset.subject;
        const yearMatch = yearFilter === 'all' || year === yearFilter;
        const subjectMatch = subjectFilter === 'all' || subject === subjectFilter;

        if (yearMatch && subjectMatch) {
            card.classList.remove('hidden');
            // Add fade-in animation
            card.style.opacity = '0';
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            });
        } else {
            card.classList.add('hidden');
        }
    });
}

// Initialize grades section
function initializeGrades() {
    const gradesList = document.getElementById('gradesList');
    if (!gradesList) return;

    // Populate grades
    const gradesHTML = gradesData
        .sort((a, b) => {
            // Sort by year (descending) and then by semester (Fall before Spring)
            if (b.year !== a.year) return b.year - a.year;
            if (a.semester === b.semester) return a.subject.localeCompare(b.subject);
            return a.semester === 'Fall' ? -1 : 1;
        })
        .map(grade => createGradeCard(grade))
        .join('');
    
    gradesList.innerHTML = gradesHTML;

    // Add filter event listeners
    const yearFilter = document.getElementById('yearFilter');
    const subjectFilter = document.getElementById('subjectFilter');

    yearFilter.addEventListener('change', filterGrades);
    subjectFilter.addEventListener('change', filterGrades);

    // Initial filtering (show Year 4 by default)
    filterGrades();
}

// Initialize grades when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGrades();
});

// Timeline animations
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

// Observe timeline items
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Add staggered animation delay
        item.style.transitionDelay = `${index * 0.2}s`;
        timelineObserver.observe(item);
    });
});

// Add smooth scroll animation for timeline dots
document.querySelectorAll('.timeline-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const item = dot.closest('.timeline-item');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}); 