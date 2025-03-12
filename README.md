# DigantaraAssignment

# Multi-Step Form

This is a multi-step form designed to collect user information across three stages. The form includes basic details, contact information, and a summary view where the user can review the information before submitting. The form uses JavaScript to handle dynamic navigation, validation, and progress tracking between steps.

 Features
1. Multi-Step Navigation: The form is split into three steps:
   - Step 1: Collect Basic Details (Name, Date of Birth, Gender).
   - Step 2: Collect Contact Information (Email, Phone, Address).
   - Step 3: Summary of information collected from Steps 1 and 2.
   
2. Form Validation: Input fields in each step are validated:
   - Required fields must be filled.
   - Email must be in a valid email format.
   - Phone must follow a valid 10-digit format.
   
3. Progress Bar: A progress bar with step indicators guides users through the form.

4. Data Persistence: The form data is saved to `localStorage`, enabling users to resume the form even if they refresh the page.

5. Error Handling: If any field is invalid, an error message is shown, and the user cannot proceed until the field is corrected.

6. Responsive Design: The form is designed to be fully responsive and works across different screen sizes.
