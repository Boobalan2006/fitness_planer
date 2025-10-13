// Update current date in phone mockup
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const dayName = days[now.getDay()];
        const monthName = months[now.getMonth()];
        const date = now.getDate();
        
        dateElement.textContent = `${dayName}, ${monthName} ${date}`;
    }
}

// Call on page load
updateCurrentDate();

// Smooth scrolling function for buttons
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.feature-card, .step, .benefit-item, .stat-number').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// Gemini API Configuration
const API_KEY = "AIzaSyDf8-vSXxw7g68RF4cdARIIikeERFG7G94";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Function to call Gemini API
async function generateFitnessPlan(goal, level, days) {
    const numDays = parseInt(days.replace(' days', ''));
    const prompt = `Create a simple ${numDays}-day workout plan.

Goal: ${goal}
Level: ${level}

For each day, write:
Day: [Monday/Wednesday/Friday]
Workout: [workout name]
Duration: [time in minutes]
Exercises:
- [exercise 1]
- [exercise 2]
- [exercise 3]
- [exercise 4]

Use simple words. Be clear and specific.`;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        console.log('AI Response:', generatedText); // Debug log
        
        // Parse the text response into structured data
        return parseAIResponse(generatedText, numDays);
        
    } catch (error) {
        console.error('Error generating plan:', error);
        // Return fallback plan
        return getFallbackPlan(goal, level, days);
    }
}

// Parse AI response into structured format
function parseAIResponse(text, numDays) {
    const plan = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Split by day sections
    const sections = text.split(/(?=\*\*Day|Day \d|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
    
    let dayIndex = 0;
    for (const section of sections) {
        if (!section.trim() || dayIndex >= numDays) continue;
        
        // Extract workout name
        const workoutMatch = section.match(/(?:Workout|Focus|Training):\s*(.+?)(?:\n|$)/i) || 
                           section.match(/\*\*(.+?)\*\*/);
        const workout = workoutMatch ? workoutMatch[1].trim() : 'Full Body Workout';
        
        // Extract duration
        const durationMatch = section.match(/(\d+)\s*(?:min|minutes)/i);
        const duration = durationMatch ? `${durationMatch[1]} minutes` : '45 minutes';
        
        // Extract exercises
        const exerciseMatches = section.match(/[-•*]\s*(.+?)(?:\n|$)/g) || [];
        const exercises = exerciseMatches
            .map(ex => ex.replace(/^[-•*]\s*/, '').trim())
            .filter(ex => ex.length > 0 && !ex.match(/^(Day|Workout|Duration|Focus)/i))
            .slice(0, 5);
        
        // Create description from exercises
        const description = exercises.length > 0 
            ? exercises.join(', ')
            : 'Complete workout session';
        
        plan.push({
            day: dayNames[dayIndex],
            workout: workout,
            duration: duration,
            exercises: exercises,
            description: description
        });
        
        dayIndex++;
    }
    
    // If parsing failed, use fallback
    if (plan.length === 0) {
        return parseTextResponseSimple(text, numDays);
    }
    
    return plan;
}

// Simple text parsing fallback
function parseTextResponseSimple(text, numDays) {
    const plan = [];
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const lines = text.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < numDays; i++) {
        plan.push({
            day: dayNames[i],
            workout: lines[i] || 'Full Body Workout',
            duration: '45 minutes',
            exercises: ['Push-ups: 3x12', 'Squats: 3x15', 'Plank: 3x30s'],
            description: 'Complete workout session'
        });
    }
    
    return plan;
}

// Fallback plan if API fails
function getFallbackPlan(goal, level, days) {
    const plans = {
        'Weight Loss': [
            { 
                day: 'Monday', 
                workout: 'HIIT Cardio', 
                duration: '40 minutes', 
                exercises: ['Burpees: 3x15', 'Mountain Climbers: 3x20', 'Jump Squats: 3x12', 'High Knees: 3x30s'],
                description: 'Burpees: 3x15, Mountain Climbers: 3x20, Jump Squats: 3x12, High Knees: 3x30s'
            },
            { 
                day: 'Wednesday', 
                workout: 'Full Body Circuit', 
                duration: '45 minutes', 
                exercises: ['Push-ups: 3x12', 'Squats: 3x15', 'Dumbbell Rows: 3x12', 'Lunges: 3x10 each'],
                description: 'Push-ups: 3x12, Squats: 3x15, Dumbbell Rows: 3x12, Lunges: 3x10 each'
            },
            { 
                day: 'Friday', 
                workout: 'Cardio & Core', 
                duration: '40 minutes', 
                exercises: ['Running: 20 min', 'Plank: 3x45s', 'Russian Twists: 3x20', 'Bicycle Crunches: 3x15'],
                description: 'Running: 20 min, Plank: 3x45s, Russian Twists: 3x20, Bicycle Crunches: 3x15'
            }
        ],
        'Muscle Gain': [
            { 
                day: 'Monday', 
                workout: 'Upper Body Strength', 
                duration: '50 minutes', 
                exercises: ['Bench Press: 4x8', 'Pull-ups: 4x6', 'Shoulder Press: 3x10', 'Bicep Curls: 3x12'],
                description: 'Bench Press: 4x8, Pull-ups: 4x6, Shoulder Press: 3x10, Bicep Curls: 3x12'
            },
            { 
                day: 'Wednesday', 
                workout: 'Lower Body Power', 
                duration: '50 minutes', 
                exercises: ['Squats: 4x8', 'Deadlifts: 4x6', 'Leg Press: 3x10', 'Calf Raises: 3x15'],
                description: 'Squats: 4x8, Deadlifts: 4x6, Leg Press: 3x10, Calf Raises: 3x15'
            },
            { 
                day: 'Friday', 
                workout: 'Full Body Hypertrophy', 
                duration: '55 minutes', 
                exercises: ['Deadlifts: 3x8', 'Bench Press: 3x10', 'Rows: 3x10', 'Overhead Press: 3x8'],
                description: 'Deadlifts: 3x8, Bench Press: 3x10, Rows: 3x10, Overhead Press: 3x8'
            }
        ],
        'General Fitness': [
            { 
                day: 'Monday', 
                workout: 'Cardio & Strength', 
                duration: '45 minutes', 
                exercises: ['Jogging: 15 min', 'Push-ups: 3x10', 'Squats: 3x12', 'Plank: 3x30s'],
                description: 'Jogging: 15 min, Push-ups: 3x10, Squats: 3x12, Plank: 3x30s'
            },
            { 
                day: 'Wednesday', 
                workout: 'Flexibility & Core', 
                duration: '40 minutes', 
                exercises: ['Yoga Flow: 15 min', 'Crunches: 3x15', 'Leg Raises: 3x12', 'Stretching: 10 min'],
                description: 'Yoga Flow: 15 min, Crunches: 3x15, Leg Raises: 3x12, Stretching: 10 min'
            },
            { 
                day: 'Friday', 
                workout: 'Total Body Conditioning', 
                duration: '45 minutes', 
                exercises: ['Burpees: 3x10', 'Lunges: 3x12 each', 'Dumbbell Press: 3x10', 'Rows: 3x12'],
                description: 'Burpees: 3x10, Lunges: 3x12 each, Dumbbell Press: 3x10, Rows: 3x12'
            }
        ],
        'Athletic Performance': [
            { 
                day: 'Monday', 
                workout: 'Speed & Agility', 
                duration: '50 minutes', 
                exercises: ['Sprint Intervals: 8x50m', 'Ladder Drills: 10 min', 'Box Jumps: 3x10', 'Cone Drills: 15 min'],
                description: 'Sprint Intervals: 8x50m, Ladder Drills: 10 min, Box Jumps: 3x10, Cone Drills: 15 min'
            },
            { 
                day: 'Wednesday', 
                workout: 'Strength & Power', 
                duration: '55 minutes', 
                exercises: ['Power Cleans: 4x5', 'Box Jumps: 4x8', 'Medicine Ball Slams: 3x12', 'Plyometric Push-ups: 3x10'],
                description: 'Power Cleans: 4x5, Box Jumps: 4x8, Medicine Ball Slams: 3x12, Plyometric Push-ups: 3x10'
            },
            { 
                day: 'Friday', 
                workout: 'Endurance & Recovery', 
                duration: '45 minutes', 
                exercises: ['Long Run: 30 min', 'Foam Rolling: 10 min', 'Dynamic Stretching: 5 min'],
                description: 'Long Run: 30 min, Foam Rolling: 10 min, Dynamic Stretching: 5 min'
            }
        ]
    };
    
    return plans[goal] || plans['General Fitness'];
}

// Demo plan generator
const generateBtn = document.querySelector('.generate-btn');
const outputPlaceholder = document.querySelector('.output-placeholder');
const outputResult = document.querySelector('.output-result');

if (generateBtn) {
    generateBtn.addEventListener('click', async () => {
        // Get user inputs
        const goalSelect = document.getElementById('fitness-goal');
        const levelSelect = document.getElementById('fitness-level');
        const daysSelect = document.getElementById('available-days');
        
        const goal = goalSelect.value;
        const level = levelSelect.value;
        const days = daysSelect.value;
        
        // Show loading state
        const originalText = generateBtn.innerHTML;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating with AI...';
        generateBtn.disabled = true;
        outputPlaceholder.style.display = 'none';
        
        try {
            // Call Gemini API
            const plan = await generateFitnessPlan(goal, level, days);
            
            // Update the output with generated plan
            const planWeek = document.querySelector('.plan-week');
            planWeek.innerHTML = '';
            
            plan.forEach((dayPlan, index) => {
                const planDay = document.createElement('div');
                planDay.className = 'plan-day';
                planDay.style.animationDelay = `${index * 0.1}s`;
                
                // Build exercises list HTML
                let exercisesHTML = '';
                if (dayPlan.exercises && Array.isArray(dayPlan.exercises) && dayPlan.exercises.length > 0) {
                    exercisesHTML = '<div class="day-exercises">';
                    dayPlan.exercises.forEach(exercise => {
                        exercisesHTML += `<div class="exercise-item"><i class="fas fa-check-circle"></i> ${exercise}</div>`;
                    });
                    exercisesHTML += '</div>';
                } else if (dayPlan.description) {
                    exercisesHTML = `<div class="day-description">${dayPlan.description}</div>`;
                }
                
                planDay.innerHTML = `
                    <div class="day-header"><i class="fas fa-calendar-day"></i> ${dayPlan.day}</div>
                    <div class="day-workout">${dayPlan.workout}</div>
                    <div class="day-duration"><i class="fas fa-clock"></i> ${dayPlan.duration}</div>
                    ${exercisesHTML}
                `;
                planWeek.appendChild(planDay);
            });
            
            outputResult.style.display = 'block';
            generateBtn.innerHTML = '<i class="fas fa-check"></i> Plan Generated!';
            
            setTimeout(() => {
                generateBtn.innerHTML = originalText;
                generateBtn.disabled = false;
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            generateBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error - Try Again';
            generateBtn.disabled = false;
            
            setTimeout(() => {
                generateBtn.innerHTML = originalText;
            }, 3000);
        }
    });
}

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });
}

// Parallax effect for hero orbs
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Floating cards parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 0.1;
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--x', x + 'px');
        this.style.setProperty('--y', y + 'px');
    });
});

// Feature cards tilt effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Progress ring animation
function animateProgressRing() {
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBar.style.animation = 'progressAnimation 2s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(progressBar);
    }
}

animateProgressRing();

// Add gradient animation to gradient text
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
    text.style.backgroundSize = '200% 200%';
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.feature-card, .step, .benefit-item, .info-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Add particle effect to hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(79, 172, 254, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${5 + Math.random() * 10}s linear infinite;
    `;
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 15000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(15, 23, 42, 0.98);
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(style);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Remove loading class if exists
    document.body.classList.add('loaded');
    
    // Start counter animations for visible stats
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
    });
});

// Add smooth reveal for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add click effect to all interactive elements
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn, .nav-link, .feature-card, .info-card')) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('🚀 AI Fitness Portfolio loaded successfully!');
