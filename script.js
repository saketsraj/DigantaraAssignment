class MultiStepForm {
    constructor() {
        this.form = document.getElementById('multiStepForm');
        this.steps = document.querySelectorAll('.form-step');
        this.progressSteps = document.querySelectorAll('.progress-bar .step');
        this.currentStep = 1;
        this.formData = this.loadFromLocalStorage() || {};

        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        document.querySelectorAll('.next').forEach(button => {
            button.addEventListener('click', () => this.nextStep());
        });

        document.querySelectorAll('.back').forEach(button => {
            button.addEventListener('click', () => this.previousStep());
        });

        this.form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => this.handleInput(input));
            
            if (this.formData[input.name]) {
                input.value = this.formData[input.name];
            }
        });

        this.updateProgressBar();
    }

    handleInput(input) {
        // Save to formData
        this.formData[input.name] = input.value;
        
        this.saveToLocalStorage();
        
        this.clearError(input);
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentStep++;
            this.updateFormDisplay();
            this.updateProgressBar();
            if (this.currentStep === 3) {
                this.updateSummary();
            }
        }
    }

    previousStep() {
        this.currentStep--;
        this.updateFormDisplay();
        this.updateProgressBar();
    }

    updateFormDisplay() {
        this.steps.forEach(step => {
            step.style.display = step.dataset.step == this.currentStep ? 'block' : 'none';
        });
    }

    updateProgressBar() {
        this.progressSteps.forEach((step, index) => {
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
                step.classList.add('active');
            } else if (index + 1 === this.currentStep) {
                step.classList.remove('completed');
                step.classList.add('active');
            } else {
                step.classList.remove('completed');
                step.classList.remove('active');
            }
        });
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${this.currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                this.showError(input);
                isValid = false;
            } else {
                this.clearError(input);
            }
        });

        return isValid;
    }

    showError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = input.validationMessage || 'This field is required';
        input.classList.add('error');
    }

    clearError(input) {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = '';
        input.classList.remove('error');
    }

    updateSummary() {
        const summaryDiv = document.getElementById('summary');
        summaryDiv.innerHTML = `
            <h3>Basic Details</h3>
            <p><strong>Name:</strong> ${this.formData.name || ''}</p>
            <p><strong>Date of Birth:</strong> ${this.formData.dob || ''}</p>
            <p><strong>Gender:</strong> ${this.formData.gender || ''}</p>
            
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> ${this.formData.email || ''}</p>
            <p><strong>Phone:</strong> ${this.formData.phone || ''}</p>
            <p><strong>Address:</strong> ${this.formData.address || ''}</p>
        `;
    }

    saveToLocalStorage() {
        localStorage.setItem('formData', JSON.stringify(this.formData));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('formData');
        return saved ? JSON.parse(saved) : null;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validateCurrentStep()) {


            console.log('Form submitted:', this.formData);
            alert('Form submitted successfully!');
            
            localStorage.removeItem('formData');
            this.form.reset();
            this.formData = {};
            
            this.currentStep = 1;
            this.updateFormDisplay();
            this.updateProgressBar();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MultiStepForm();
});