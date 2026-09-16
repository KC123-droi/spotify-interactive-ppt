/* ===================================
   SPOTIFY INTERACTIVE PRESENTATION
   JavaScript - Interactivity & Gamification
   =================================== */

// ===== STATE MANAGEMENT =====
let currentSection = 'home';
let userPoints = 0;
let achievements = {
    firstClick: false,
    allSectionsVisited: false,
    quizzesCompleted: false
};

const sections = ['home', 'introduction', 'problem', 'intervention', 'evaluation', 'theory'];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    updateProgress();
});

function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            navigateToSection(section);
        });
    });

    // Hamburger menu for mobile
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }
}

// ===== NAVIGATION =====
function navigateToSection(sectionName) {
    // Close sidebar on mobile
    const sidebar = document.querySelector('.sidebar');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
        currentSection = sectionName;

        // Update navigation active state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            }
        });

        // Update header title
        const titles = {
            'home': '🎵 Welcome to Spotify OD Presentation',
            'introduction': '🎵 Introduction - The Spotify Story',
            'problem': '⚠️ Problem Identified - The Challenge',
            'intervention': '🎯 Intervention Strategy - Solutions',
            'evaluation': '📊 Evaluation & Effect - Results',
            'theory': '📚 Learning & Theory - OD Framework'
        };

        document.getElementById('section-title').textContent = titles[sectionName] || 'Spotify OD Presentation';

        // Award points for visiting new section
        awardPoints(100, `Visited ${sectionName} section!`);
        updateProgress();

        // Scroll to top
        document.querySelector('.content-container').scrollTop = 0;

        // Check if all sections visited
        checkAllSectionsVisited();
    }
}

// ===== GAMIFICATION =====
function awardPoints(points, message = '') {
    userPoints += points;
    document.getElementById('points').textContent = userPoints;

    if (message) {
        showNotification(`+${points} pts ${message}`, 'success');
    }

    // Animate points
    const pointsElement = document.getElementById('points');
    pointsElement.style.animation = 'bounce 0.6s ease';
    setTimeout(() => {
        pointsElement.style.animation = '';
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

function checkAllSectionsVisited() {
    const allVisited = sections.every(section => {
        return document.getElementById(section).style.display !== 'none' || 
               section === 'home' || 
               currentSection === section;
    });

    if (!achievements.allSectionsVisited && currentSection !== 'home') {
        achievements.allSectionsVisited = true;
        unlockBadge(0, '🏆 Explorer Badge', 'Visited all sections!');
    }
}

function unlockBadge(badgeIndex, title, description) {
    const badge = document.getElementById(`badge${badgeIndex + 1}`);
    if (badge) {
        badge.classList.add('earned');
        awardPoints(250, `${title} - ${description}`);
        showNotification(`🎉 Achievement Unlocked: ${title}`, 'success');
    }
}

function updateProgress() {
    const totalSections = sections.length;
    const visitedSections = sections.filter(s => s === currentSection).length;
    const currentIndex = sections.indexOf(currentSection);
    const percentage = ((currentIndex + 1) / totalSections) * 100;

    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
}

// ===== CARD INTERACTIONS =====
function expandCard(cardElement, contentId) {
    const content = document.getElementById(contentId);
    const allContents = cardElement.parentElement.querySelectorAll('.card-content');

    // Close other cards in same container
    allContents.forEach(c => {
        if (c !== content) {
            c.classList.add('hidden');
        }
    });

    // Toggle current card
    content.classList.toggle('hidden');

    if (!content.classList.contains('hidden')) {
        awardPoints(25, 'Card expanded!');
        cardElement.style.animation = 'none';
        setTimeout(() => {
            cardElement.style.animation = '';
        }, 10);
    }
}

// ===== PROBLEM SECTION =====
function showProblemDetail(cardElement) {
    const detail = cardElement.querySelector('.problem-detail');
    const allDetails = cardElement.parentElement.querySelectorAll('.problem-detail');

    allDetails.forEach(d => {
        if (d !== detail) {
            d.classList.add('hidden');
        }
    });

    detail.classList.toggle('hidden');

    if (!detail.classList.contains('hidden')) {
        awardPoints(30, 'Problem analyzed!');
    }
}

// ===== QUIZ INTERACTIONS =====
function checkQuiz(isCorrect) {
    if (isCorrect) {
        awardPoints(50, 'Quiz answered correctly!');
        showNotification('✅ Correct! Great job!', 'success');
    } else {
        showNotification('❌ Not quite right, try again!', 'error');
    }
}

// ===== INTERVENTION SECTION =====
function showIntervention(index) {
    const interventions = document.querySelectorAll('.intervention-content');
    const timelines = document.querySelectorAll('.timeline-item');

    interventions.forEach((intervention, i) => {
        if (i === index) {
            intervention.classList.add('active');
            timelines[i].classList.add('active');
            awardPoints(40, 'Intervention explored!');
        } else {
            intervention.classList.remove('active');
            timelines[i].classList.remove('active');
        }
    });
}

function showInfo(infoId) {
    const info = document.getElementById(infoId);
    const allInfos = info.parentElement.querySelectorAll('.info-content');

    allInfos.forEach(i => {
        if (i !== info) {
            i.classList.add('hidden');
        }
    });

    info.classList.toggle('hidden');

    if (!info.classList.contains('hidden')) {
        awardPoints(20, 'Info revealed!');
    }
}

// ===== EVALUATION SECTION =====
function switchTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabs.forEach((tab, i) => {
        if (i === tabIndex) {
            tab.classList.add('active');
            tabBtns[i].classList.add('active');
        } else {
            tab.classList.remove('active');
            tabBtns[i].classList.remove('active');
        }
    });

    awardPoints(35, 'Tab switched!');
}

function expandMetric(cardElement) {
    cardElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        cardElement.style.transform = '';
    }, 300);

    awardPoints(25, 'Metric explored!');
}

// ===== THEORY SECTION =====
function switchTheoryTab(tabIndex) {
    const sections = document.querySelectorAll('.theory-section');
    const tabs = document.querySelectorAll('.theory-tab');

    sections.forEach((section, i) => {
        if (i === tabIndex) {
            section.classList.add('active');
            tabs[i].classList.add('active');
        } else {
            section.classList.remove('active');
            tabs[i].classList.remove('active');
        }
    });

    awardPoints(40, 'Theory section explored!');
}

function toggleModel(cardElement) {
    const content = cardElement.querySelector('.model-content');
    content.classList.toggle('hidden');

    if (!content.classList.contains('hidden')) {
        awardPoints(30, 'Model expanded!');
    }
}

// ===== FINAL QUIZ =====
function completePresentationQuiz() {
    const quizHTML = `
        <div class="quiz-questions">
            <div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;">
                <p style="margin-bottom: 12px;"><strong>Q1: What is the Spotify Model based on?</strong></p>
                <div class="quiz-options">
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q1" value="a"> Small autonomous teams with clear ownership
                    </label>
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q1" value="b"> Centralized command structure
                    </label>
                    <label style="display: flex; gap: 8px;">
                        <input type="radio" name="q1" value="c"> Waterfall methodology
                    </label>
                </div>
            </div>

            <div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;">
                <p style="margin-bottom: 12px;"><strong>Q2: Which OD model did Spotify primarily follow?</strong></p>
                <div class="quiz-options">
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q2" value="a"> Lewin's Unfreeze-Change-Refreeze
                    </label>
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q2" value="b"> Kotter's 8-step model
                    </label>
                    <label style="display: flex; gap: 8px;">
                        <input type="radio" name="q2" value="c"> Both A and B combined
                    </label>
                </div>
            </div>

            <div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;">
                <p style="margin-bottom: 12px;"><strong>Q3: What was the primary problem identified?</strong></p>
                <div class="quiz-options">
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q3" value="a"> Organizational silos and declining innovation
                    </label>
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q3" value="b"> Lack of technology infrastructure
                    </label>
                    <label style="display: flex; gap: 8px;">
                        <input type="radio" name="q3" value="c"> Poor customer satisfaction
                    </label>
                </div>
            </div>

            <div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;">
                <p style="margin-bottom: 12px;"><strong>Q4: By what percentage did employee engagement improve?</strong></p>
                <div class="quiz-options">
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q4" value="a"> 25%
                    </label>
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q4" value="b"> 42%
                    </label>
                    <label style="display: flex; gap: 8px;">
                        <input type="radio" name="q4" value="c"> 60%
                    </label>
                </div>
            </div>

            <div class="quiz-q" style="margin-bottom: 0;">
                <p style="margin-bottom: 12px;"><strong>Q5: What is the core principle of OD?</strong></p>
                <div class="quiz-options">
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q5" value="a"> Maximize profit at all costs
                    </label>
                    <label style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="radio" name="q5" value="b"> Apply behavioral science to increase org effectiveness
                    </label>
                    <label style="display: flex; gap: 8px;">
                        <input type="radio" name="q5" value="c"> Minimize employee involvement in decisions
                    </label>
                </div>
            </div>
        </div>
    `;

    document.getElementById('quizContent').innerHTML = quizHTML;
    document.getElementById('quizModal').classList.remove('hidden');
}

function submitQuiz() {
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value
    };

    const correctAnswers = {
        q1: 'a',
        q2: 'c',
        q3: 'a',
        q4: 'b',
        q5: 'b'
    };

    let score = 0;
    Object.keys(answers).forEach(key => {
        if (answers[key] === correctAnswers[key]) {
            score++;
        }
    });

    const percentage = (score / 5) * 100;
    let message = '';

    if (percentage === 100) {
        message = '🏆 Perfect Score! You are an OD Expert!';
        awardPoints(500, 'Perfect Quiz!');
        unlockBadge(1, '⭐ OD Master', 'Perfect presentation quiz!');
    } else if (percentage >= 80) {
        message = '🎉 Excellent! Great understanding of OD concepts!';
        awardPoints(300, 'Great Quiz Performance!');
    } else if (percentage >= 60) {
        message = '👍 Good job! You understand the key concepts!';
        awardPoints(200, 'Good Quiz Performance!');
    } else {
        message = '📚 Keep learning! Review the materials for better understanding!';
        awardPoints(100, 'Quiz Completed!');
    }

    const resultHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="font-size: 32px; margin-bottom: 12px;">${score}/5</h3>
            <p style="font-size: 16px; margin-bottom: 16px;">${percentage.toFixed(0)}% Score</p>
            <p style="font-size: 14px; color: #B3B3B3; line-height: 1.6;">${message}</p>
        </div>
        <div style="background: rgba(29, 185, 84, 0.1); border: 1px solid #1DB954; border-radius: 8px; padding: 16px; margin-top: 16px;">
            <p style="font-size: 12px; margin-bottom: 8px;"><strong>Your Final Score: ${userPoints} pts</strong></p>
            <p style="font-size: 12px; color: #B3B3B3;">Keep exploring to earn more badges and points!</p>
        </div>
    `;

    document.getElementById('quizContent').innerHTML = resultHTML;

    // Unlock completion badge
    if (!achievements.quizzesCompleted) {
        achievements.quizzesCompleted = true;
        unlockBadge(2, '🔥 Completion Badge', 'Completed the full presentation!');
    }
}

function closeModal() {
    document.getElementById('quizModal').classList.add('hidden');
}

// ===== FULLSCREEN =====
function toggleFullscreen() {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
        elem.requestFullscreen?.() ||
        elem.webkitRequestFullscreen?.() ||
        elem.mozRequestFullScreen?.() ||
        elem.msRequestFullscreen?.();
    } else {
        document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.msExitFullscreen?.();
    }
}

// ===== ANALYTICS TRACKING =====
function trackInteraction(element, type) {
    console.log(`[Analytics] ${type}: ${element}`);
}

// ===== DRAG & DROP FOR MATCHING GAME =====
document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('match-item')) {
        e.target.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
    }
});

document.addEventListener('dragend', (e) => {
    if (e.target.classList.contains('match-item')) {
        e.target.style.opacity = '1';
    }
});

document.addEventListener('dragover', (e) => {
    if (e.target.classList.contains('match-slot')) {
        e.preventDefault();
        e.target.style.background = 'rgba(29, 185, 84, 0.3)';
    }
});

document.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('match-slot')) {
        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

document.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('match-slot')) {
        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
        awardPoints(50, 'Correct match! 🎯');
        showNotification('✅ Great match!', 'success');
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Arrow keys for navigation
    if (e.key === 'ArrowRight') {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex < sections.length - 1) {
            navigateToSection(sections[currentIndex + 1]);
        }
    } else if (e.key === 'ArrowLeft') {
        const currentIndex = sections.indexOf(currentSection);
        if (currentIndex > 0) {
            navigateToSection(sections[currentIndex - 1]);
        }
    } else if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== PRINTING/PRESENTATION MODE =====
window.print = function() {
    console.log('Print functionality can be added here');
};

// ===== CHART INITIALIZATION (if using chart library) =====
function initCharts() {
    // Placeholder for chart initialization
    // You can integrate Chart.js or similar library here
    console.log('Charts initialized');
}

// Initialize charts on load
setTimeout(initCharts, 500);

// ===== SOUND EFFECTS (Optional) =====
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playPointSound() {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ===== AUTO-SAVE STATE =====
function saveState() {
    localStorage.setItem('spotifyPptState', JSON.stringify({
        currentSection,
        userPoints,
        achievements,
        timestamp: new Date().toISOString()
    }));
}

function loadState() {
    const saved = localStorage.getItem('spotifyPptState');
    if (saved) {
        const state = JSON.parse(saved);
        userPoints = state.userPoints || 0;
        achievements = state.achievements || {};
        document.getElementById('points').textContent = userPoints;
    }
}

// Save state periodically
setInterval(saveState, 30000); // Every 30 seconds

// Load state on initialization
loadState();

// ===== EASTER EGGS =====
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiPattern.join('')) {
        unlockBadge(1, '🎮 Hacker Badge', 'Found the secret code!');
        awardPoints(999, 'SECRET CODE FOUND!');
        showNotification('🎉 EASTER EGG FOUND! Secret badge unlocked!', 'success');
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load content
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .metric-card, .story-card').forEach(el => {
    observer.observe(el);
});

// ===== SOCIAL SHARING =====
function sharePresentation() {
    const text = `I just scored ${userPoints} points on the interactive Spotify OD Presentation! 🎵📊 Check it out: `;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: 'Spotify OD Interactive Presentation',
            text: text,
            url: url
        });
    } else {
        showNotification('Share feature not available on this browser', 'info');
    }
}

// ===== ACCESSIBILITY =====
// Add ARIA labels
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('aria-label', btn.textContent.trim());
    }
});

// ===== EXPORT FUNCTIONALITY =====
function exportResults() {
    const results = {
        timestamp: new Date().toISOString(),
        finalScore: userPoints,
        sectionsVisited: currentSection,
        achievements: achievements,
        feedback: 'Great learning experience!'
    };

    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `spotify-ppt-results-${Date.now()}.json`;
    link.click();

    showNotification('✅ Results exported!', 'success');
}

// Add export button functionality
document.addEventListener('DOMContentLoaded', () => {
    // You can add export button to any section
    console.log('Spotify Interactive Presentation Ready!');
    console.log(`Current Points: ${userPoints}`);
});
