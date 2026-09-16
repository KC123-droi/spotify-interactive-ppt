// ===================================
// SPOTIFY INTERACTIVE PRESENTATION
// JavaScript - Interactivity & Gamification
// ===================================

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
    loadState();
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
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
    }

    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(sectionName);
    if (selectedSection) {
        selectedSection.classList.add('active');
        currentSection = sectionName;

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            }
        });

        const titles = {
            'home': '🎵 Welcome to Spotify OD Presentation',
            'introduction': '🎵 Introduction - The Spotify Story',
            'problem': '⚠️ Problem Identified - The Challenge',
            'intervention': '🎯 Intervention Strategy - Solutions',
            'evaluation': '📊 Evaluation & Effect - Results',
            'theory': '📚 Learning & Theory - OD Framework'
        };

        document.getElementById('section-title').textContent = titles[sectionName] || 'Spotify OD Presentation';
        awardPoints(100, `Visited ${sectionName} section!`);
        updateProgress();
        document.querySelector('.content-container').scrollTop = 0;
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
    allContents.forEach(c => {
        if (c !== content) c.classList.add('hidden');
    });
    content.classList.toggle('hidden');
    if (!content.classList.contains('hidden')) {
        awardPoints(25, 'Card expanded!');
    }
}

// ===== PROBLEM SECTION =====
function showProblemDetail(cardElement) {
    const detail = cardElement.querySelector('.problem-detail');
    const allDetails = cardElement.parentElement.querySelectorAll('.problem-detail');
    allDetails.forEach(d => {
        if (d !== detail) d.classList.add('hidden');
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
        if (i !== info) i.classList.add('hidden');
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
    const theorySections = document.querySelectorAll('.theory-section');
    const tabs = document.querySelectorAll('.theory-tab');
    theorySections.forEach((section, i) => {
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
    const quizHTML = `<div class="quiz-questions"><div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;"><p style="margin-bottom: 12px;"><strong>Q1: What is the Spotify Model based on?</strong></p><div class="quiz-options"><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q1" value="a"> Small autonomous teams with clear ownership</label><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q1" value="b"> Centralized command structure</label><label style="display: flex; gap: 8px;"><input type="radio" name="q1" value="c"> Waterfall methodology</label></div></div><div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;"><p style="margin-bottom: 12px;"><strong>Q2: Which OD model did Spotify primarily follow?</strong></p><div class="quiz-options"><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q2" value="a"> Lewin's Unfreeze-Change-Refreeze</label><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q2" value="b"> Kotter's 8-step model</label><label style="display: flex; gap: 8px;"><input type="radio" name="q2" value="c"> Both A and B combined</label></div></div><div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;"><p style="margin-bottom: 12px;"><strong>Q3: What was the primary problem identified?</strong></p><div class="quiz-options"><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q3" value="a"> Organizational silos and declining innovation</label><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q3" value="b"> Lack of technology infrastructure</label><label style="display: flex; gap: 8px;"><input type="radio" name="q3" value="c"> Poor customer satisfaction</label></div></div><div class="quiz-q" style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #404040;"><p style="margin-bottom: 12px;"><strong>Q4: By what percentage did employee engagement improve?</strong></p><div class="quiz-options"><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q4" value="a"> 25%</label><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q4" value="b"> 42%</label><label style="display: flex; gap: 8px;"><input type="radio" name="q4" value="c"> 60%</label></div></div><div class="quiz-q" style="margin-bottom: 0;"><p style="margin-bottom: 12px;"><strong>Q5: What is the core principle of OD?</strong></p><div class="quiz-options"><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q5" value="a"> Maximize profit at all costs</label><label style="display: flex; gap: 8px; margin-bottom: 8px;"><input type="radio" name="q5" value="b"> Apply behavioral science to increase org effectiveness</label><label style="display: flex; gap: 8px;"><input type="radio" name="q5" value="c"> Minimize employee involvement in decisions</label></div></div></div>`;
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
    const correctAnswers = { q1: 'a', q2: 'c', q3: 'a', q4: 'b', q5: 'b' };
    let score = 0;
    Object.keys(answers).forEach(key => {
        if (answers[key] === correctAnswers[key]) score++;
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
    const resultHTML = `<div style="text-align: center; margin-bottom: 20px;"><h3 style="font-size: 32px; margin-bottom: 12px;">${score}/5</h3><p style="font-size: 16px; margin-bottom: 16px;">${percentage.toFixed(0)}% Score</p><p style="font-size: 14px; color: #B3B3B3; line-height: 1.6;">${message}</p></div><div style="background: rgba(29, 185, 84, 0.1); border: 1px solid #1DB954; border-radius: 8px; padding: 16px; margin-top: 16px;"><p style="font-size: 12px; margin-bottom: 8px;"><strong>Your Final Score: ${userPoints} pts</strong></p><p style="font-size: 12px; color: #B3B3B3;">Keep exploring to earn more badges and points!</p></div>`;
    document.getElementById('quizContent').innerHTML = resultHTML;
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
        elem.requestFullscreen?.() || elem.webkitRequestFullscreen?.() || elem.mozRequestFullScreen?.() || elem.msRequestFullscreen?.();
    } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.() || document.mozCancelFullScreen?.() || document.msExitFullscreen?.();
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
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

// ===== AUTO-SAVE STATE =====
function saveState() {
    localStorage.setItem('spotifyPptState', JSON.stringify({
        currentSection, userPoints, achievements,
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

setInterval(saveState, 30000);
console.log('🎵 Spotify Interactive Presentation Ready!');