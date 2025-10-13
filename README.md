# 🏋️ FitPro - AI-Powered Fitness Planner

<div align="center">

![FitPro Banner](https://img.shields.io/badge/FitPro-AI%20Fitness%20Planner-6366f1?style=for-the-badge&logo=dumbbell)

**Transform Your Fitness Journey with Personalized AI-Generated Workout Plans**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

[Live Demo](#demo) • [Features](#features) • [Installation](#installation) • [Documentation](#documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Customization](#customization)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**FitPro** is a modern, responsive web application that leverages the power of **Google Gemini AI** to create personalized fitness plans tailored to individual goals, fitness levels, and schedules. Built with vanilla JavaScript, HTML5, and CSS3, it offers a stunning user interface with smooth animations and interactive elements.

### Key Highlights

- 🤖 **AI-Powered**: Real-time workout plan generation using Google Gemini 2.0 Flash API
- 🎨 **Modern Design**: Vibrant gradients, smooth animations, and 3D effects
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Zero Dependencies**: Pure vanilla JavaScript - no frameworks required
- 🚀 **Fast & Lightweight**: Optimized performance with hardware-accelerated animations
- ♿ **Accessible**: WCAG compliant with semantic HTML and proper contrast ratios

---

## ✨ Features

### 🎨 Visual Design
- **Vibrant Color Scheme**: Eye-catching gradients and modern color palette
- **Advanced Animations**: 
  - Fade-in/slide effects with Intersection Observer
  - Floating gradient orbs with parallax
  - 3D tilt effects on cards
  - Circular progress ring animations
  - Ripple click effects
  - Smooth scroll navigation
  - Typing effect animations

### 🚀 Interactive Elements
- **AI-Powered Demo**: Real-time fitness plan generation with Google Gemini AI
- **Animated Counters**: Dynamic number animations for statistics
- **Smart Forms**: Contact form with validation and submission feedback
- **Hover Effects**: Engaging micro-interactions on all interactive elements
- **Mobile Menu**: Responsive hamburger navigation for mobile devices

### 📱 Page Sections
1. **Hero Section**: Eye-catching introduction with floating cards and gradient orbs
2. **Features**: 6 key features with animated icon cards
3. **How It Works**: 3-step process with visual flow indicators
4. **Benefits**: Detailed benefits with animated phone mockup
5. **Demo**: Interactive AI-powered plan generator
6. **Contact**: Multi-field contact form with info cards
7. **Footer**: Complete footer with navigation and social links

### 📄 Additional Pages
- **About Us**: Company information and mission
- **Blog**: Fitness tips and articles
- **Careers**: Job opportunities
- **FAQ**: Frequently asked questions
- **Privacy Policy**: Data protection and privacy information

---

## 🎯 Technologies

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Advanced styling, animations, and responsive design |
| **JavaScript (ES6+)** | Interactive functionality and AI integration |
| **Google Gemini AI** | Real-time fitness plan generation |
| **Font Awesome 6.4.0** | Professional icon library |
| **Google Fonts** | Poppins font family |

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection (for external resources: fonts, icons, AI API)
- Optional: Google Gemini API key for AI features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitpro-fitness-planner.git
   cd fitpro-fitness-planner
   ```

2. **Open the project**
   - Simply double-click `index.html` or
   - Use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`

### Quick Start (No Installation)

Simply download the files and open `index.html` in your browser - no server required!

---

## 📂 Project Structure

```
fitness-planer/
│
├── index.html              # Main landing page
├── about.html              # About us page
├── blog.html               # Blog page
├── careers.html            # Careers page
├── faq.html                # FAQ page
├── privacy.html            # Privacy policy page
│
├── styles.css              # All styles and animations (25KB)
├── script.js               # Interactive functionality + AI integration (23KB)
│
├── README.md               # Project documentation (this file)
├── API_INTEGRATION.md      # Gemini AI integration guide
├── UPDATES.md              # Recent changes log
├── BUGFIX.md               # Bug fixes documentation
└── FINAL_SUMMARY.md        # Project summary
```

---

## ⚙️ Configuration

### Setting Up Google Gemini AI

To enable the AI-powered fitness plan generation:

1. **Get an API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key

2. **Add Your API Key**
   - Open `script.js`
   - Locate the `API_KEY` variable (around line 1)
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
     ```javascript
     const API_KEY = 'your-actual-api-key-here';
     ```

3. **Test the Integration**
   - Navigate to the Demo section
   - Select your preferences
   - Click "Generate My Plan"
   - You should see an AI-generated workout plan

> **Note**: The application includes a fallback system that generates sample plans if the API is unavailable.

---

## 📖 Usage

### Navigation

- **Smooth Scrolling**: Click any navigation link to smoothly scroll to sections
- **Mobile Menu**: Tap the hamburger icon on mobile devices
- **Footer Links**: Access additional pages (About, Blog, Careers, FAQ, Privacy)

### Interactive Features

1. **AI Plan Generator**
   - Select your fitness goal (Weight Loss, Muscle Gain, General Fitness, Athletic Performance)
   - Choose your fitness level (Beginner, Intermediate, Advanced)
   - Pick available days per week (3-6 days)
   - Click "Generate My Plan" for a personalized AI-generated workout schedule

2. **Contact Form**
   - Fill in your name and email
   - Describe your fitness goals
   - Submit to see the success animation

3. **Animated Statistics**
   - Scroll to the hero section to see numbers count up dynamically

4. **Parallax Effects**
   - Move your mouse in the hero section to see gradient orbs respond

---

## 🔌 API Integration

### Google Gemini AI Integration

The application uses the **Google Gemini 2.0 Flash Experimental API** for generating personalized fitness plans.

**Key Features:**
- Real-time plan generation based on user input
- Structured JSON response parsing
- Error handling with fallback system
- Optimized prompts for fitness-specific content

**API Endpoint:**
```javascript
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent
```

**Request Structure:**
```javascript
{
  "contents": [{
    "parts": [{
      "text": "Generate a personalized fitness plan..."
    }]
  }]
}
```

For detailed integration instructions, see [API_INTEGRATION.md](API_INTEGRATION.md).

---

## 🎨 Customization

### Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;      /* Indigo */
    --secondary-color: #ec4899;    /* Pink */
    --accent-color: #8b5cf6;       /* Purple */
    --success-color: #10b981;      /* Green */
    --dark-bg: #0f172a;            /* Navy */
    --card-bg: #1e293b;            /* Slate */
}
```

### Content Modification

**Update Text Content** (`index.html`):
- Section titles and descriptions
- Feature cards
- Statistics numbers
- Contact information

**Modify Animations** (`styles.css`):
```css
/* Adjust animation duration */
.feature-card {
    animation: fadeInUp 0.6s ease-out;
}

/* Change hover effects */
.btn:hover {
    transform: translateY(-2px);
}
```

### Adding New Sections

1. Create HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Implement interactions in `script.js`
4. Update navigation links

---

## 🎯 Key Features Explained

### 1. **AI-Powered Plan Generator** 🤖
- Powered by **Google Gemini 2.0 Flash API**
- Generates unique, personalized workout schedules
- Includes exercise names, durations, and descriptions
- Adapts to user's goals, level, and availability
- Fallback system ensures reliability

### 2. **Advanced Animations**
- **Hero Section**: Floating gradient orbs, parallax effects, typing animations
- **Feature Cards**: 3D tilt on hover, fade-in-up on scroll
- **Progress Elements**: Circular ring animations, counter animations
- **Interactive Effects**: Ripple clicks, smooth transitions

### 3. **Responsive Design**
- **Desktop** (1200px+): Full layout with all features
- **Tablet** (768px-1199px): Optimized grid layouts
- **Mobile** (< 768px): Stacked layout with hamburger menu

### 4. **Performance Optimizations**
- Hardware-accelerated CSS animations
- Intersection Observer for lazy animations
- Debounced scroll/resize handlers
- Optimized image loading

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Ideas for Contributions
- Add more workout categories
- Implement user authentication
- Create a backend for saving plans
- Add nutrition tracking features
- Integrate with fitness wearables
- Implement dark/light theme toggle

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🎓 Learning Resources

This project demonstrates:

- ✅ Modern CSS Grid and Flexbox layouts
- ✅ CSS animations and keyframes
- ✅ JavaScript ES6+ features (async/await, arrow functions)
- ✅ Intersection Observer API
- ✅ Fetch API for external requests
- ✅ DOM manipulation and event handling
- ✅ Responsive design techniques
- ✅ AI API integration

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For powering the intelligent fitness plan generation
- **Font Awesome** - For the beautiful icon library
- **Google Fonts** - For the Poppins font family
- **Shields.io** - For the README badges

---

## 📞 Contact & Support

For questions, suggestions, or support:

- 📧 **Email**: support@fitpro.com
- 💬 **Issues**: [GitHub Issues](https://github.com/yourusername/fitpro-fitness-planner/issues)
- 🌐 **Website**: [FitPro Official](https://fitpro.com)

---

## 📊 Project Stats

- **Lines of Code**: ~1,500
- **File Size**: ~70KB (uncompressed)
- **Load Time**: < 1 second
- **Lighthouse Score**: 95+

---

<div align="center">

**Made with ❤️ and AI**

⭐ **Star this repo if you find it helpful!** ⭐

[⬆ Back to Top](#-fitpro---ai-powered-fitness-planner)

</div>
