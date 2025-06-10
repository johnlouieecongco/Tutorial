/**
 * Banking Tutorial Interactive Script
 * Handles step navigation, progress tracking, and user interactions
 */

class BankingTutorial {
    constructor() {
        // DOM elements
        this.steps = document.querySelectorAll('.step');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.progressBar = document.getElementById('progressBar');
        this.stepIndicator = document.getElementById('stepIndicator');
        this.completionMessage = document.getElementById('completionMessage');
        
        // Current step tracker
        this.currentStep = 0;
        
        // Initialize the tutorial
        this.init();
    }
    
    /**
     * Initialize the tutorial
     */
    init() {
        this.createStepIndicators();
        this.bindEventListeners();
        this.updateProgress();
        this.updateSteps();
    }
    
    /**
     * Create clickable step indicator dots
     */
    createStepIndicators() {
        this.steps.forEach((step, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.setAttribute('data-step', index);
            dot.setAttribute('title', `Go to step ${index + 1}`);
            
            if (index === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => this.goToStep(index));
            this.stepIndicator.appendChild(dot);
        });
    }
    
    /**
     * Bind all event listeners
     */
    bindEventListeners() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.restartBtn.addEventListener('click', () => this.restart());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        
        // Prevent default form submission if any forms are added later
        document.addEventListener('submit', (e) => e.preventDefault());
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeyNavigation(event) {
        switch(event.key) {
            case 'ArrowRight':
                if (!this.nextBtn.disabled) {
                    this.nextStep();
                }
                break;
            case 'ArrowLeft':
                if (!this.prevBtn.disabled) {
                    this.previousStep();
                }
                break;
            case 'Home':
                this.goToStep(0);
                break;
            case 'End':
                this.goToStep(this.steps.length - 1);
                break;
        }
    }
    
    /**
     * Go to next step
     */
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.updateSteps();
        } else {
            this.showCompletion();
        }
    }
    
    /**
     * Go to previous step
     */
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateSteps();
        }
    }
    
    /**
     * Go to specific step
     */
    goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < this.steps.length) {
            this.currentStep = stepIndex;
            this.updateSteps();
        }
    }
    
    /**
     * Update step display and navigation
     */
    updateSteps() {
        // Hide all steps
        this.steps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step with animation
        setTimeout(() => {
            this.steps[this.currentStep].classList.add('active');
        }, 50);
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Update progress bar
        this.updateProgress();
        
        // Update step indicators
        this.updateStepIndicators();
        
        // Scroll to top of step
        this.scrollToTop();
    }
    
    /**
     * Update navigation button states
     */
    updateNavigationButtons() {
        // Previous button
        this.prevBtn.disabled = this.currentStep === 0;
        
        // Next button text and state
        if (this.currentStep === this.steps.length - 1) {
            this.nextBtn.innerHTML = 'Finish <i class="fas fa-check"></i>';
            this.nextBtn.className = 'btn-secondary';
        } else {
            this.nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
            this.nextBtn.className = 'btn-secondary';
        }
    }
    
    /**
     * Update progress bar
     */
    updateProgress() {
        const progress = ((this.currentStep + 1) / this.steps.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
    
    /**
     * Update step indicator dots
     */
    updateStepIndicators() {
        const dots = document.querySelectorAll('.indicator-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    /**
     * Show completion message
     */
    showCompletion() {
        // Hide all steps and navigation
        this.steps.forEach(step => {
            step.style.display = 'none';
        });
        
        document.querySelector('.navigation').style.display = 'none';
        document.querySelector('.step-indicator').style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        
        // Show completion message
        this.completionMessage.style.display = 'block';
        
        // Add confetti effect or celebration animation here if desired
        this.celebrateCompletion();
    }
    
    /**
     * Restart the tutorial
     */
    restart() {
        this.currentStep = 0;
        
        // Show all hidden elements
        document.querySelector('.navigation').style.display = 'flex';
        document.querySelector('.step-indicator').style.display = 'flex';
        document.querySelector('.progress-container').style.display = 'block';
        
        // Reset steps display
        this.steps.forEach(step => {
            step.style.display = '';
        });
        
        // Hide completion message
        this.completionMessage.style.display = 'none';
        
        // Update everything
        this.updateSteps();
    }
    
    /**
     * Scroll to top of current step
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    /**
     * Add celebration effect when tutorial is completed
     */
    celebrateCompletion() {
        const checkIcon = this.completionMessage.querySelector('i');
        if (checkIcon) {
            checkIcon.classList.add('bounce');
            
            // Remove bounce class after animation
            setTimeout(() => {
                checkIcon.classList.remove('bounce');
            }, 1000);
        }
    }
    
    /**
     * Get current step information
     */
    getCurrentStepInfo() {
        return {
            currentStep: this.currentStep,
            totalSteps: this.steps.length,
            progress: ((this.currentStep + 1) / this.steps.length) * 100,
            isFirstStep: this.currentStep === 0,
            isLastStep: this.currentStep === this.steps.length - 1
        };
    }
    
    /**
     * Add custom step (for future extensibility)
     */
    addStep(stepHTML, insertAfterIndex = null) {
        const stepElement = document.createElement('div');
        stepElement.className = 'step';
        stepElement.innerHTML = stepHTML;
        
        if (insertAfterIndex !== null && insertAfterIndex < this.steps.length) {
            this.steps[insertAfterIndex].insertAdjacentElement('afterend', stepElement);
        } else {
            document.querySelector('.navigation').insertAdjacentElement('beforebegin', stepElement);
        }
        
        // Update steps NodeList
        this.steps = document.querySelectorAll('.step');
        
        // Recreate indicators
        this.stepIndicator.innerHTML = '';
        this.createStepIndicators();
        
        // Update display
        this.updateSteps();
    }
}

// Initialize tutorial when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global instance
    window.bankingTutorial = new BankingTutorial();
    
    // Add some debugging helpers (remove in production)
    if (window.location.search.includes('debug=true')) {
        console.log('Banking Tutorial Debug Mode Enabled');
        window.tutorialDebug = {
            goToStep: (step) => window.bankingTutorial.goToStep(step),
            getCurrentInfo: () => window.bankingTutorial.getCurrentStepInfo(),
            restart: () => window.bankingTutorial.restart()
        };
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - could pause timers or save state
        console.log('Tutorial paused');
    } else {
        // Page is visible - resume
        console.log('Tutorial resumed');
    }
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BankingTutorial;
}