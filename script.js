// Function to validate a field is not empty
function validateRequiredField(fieldId, errorId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field.value.trim() === '') {
        displayError(errorId, errorMessage);
        return false;
    }
    return true;
}

// Function to validate a field with regex
function validateFieldWithRegex(fieldId, errorId, regex, errorMessage) {
    const field = document.getElementById(fieldId).value.trim();
    if (!regex.test(field)) {
        displayError(errorId, errorMessage);
        return false;
    }
    return true;
}

// Function to display validation errors
function displayError(errorId, errorMessage) {
    document.getElementById(errorId).innerText = errorMessage;
}

// Function to clear all errors
function clearErrors(errorIds) {
    errorIds.forEach(errorId => {
        document.getElementById(errorId).innerText = '';
    });
}

// Main form validation function
document.getElementById('addressForm').addEventListener('submit', function (event) {
    // Prevent form submission
    event.preventDefault();

    // Clear previous errors
    clearErrors(['nameError', 'emailError', 'billingAddressError', 'contactError', 'zipCodeError', 'vatNumberError']);

    let isValid = true;

    // Validate fields
    isValid = validateRequiredField('name', 'nameError', 'Name is required.') && isValid;
    isValid = validateFieldWithRegex('email', 'emailError', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.') && isValid;
    isValid = validateRequiredField('billingAddress', 'billingAddressError', 'Billing Address is required.') && isValid;
    isValid = validateFieldWithRegex('contact', 'contactError', /^\+?\d{10,15}$/, 'Please enter a valid contact number.') && isValid;
    isValid = validateFieldWithRegex('zipCode', 'zipCodeError', /^\d{6}$/, 'Please enter a valid Zip Code (6 digits).') && isValid;
    isValid = validateFieldWithRegex('vatNumber', 'vatNumberError', /^\d{6}$/, 'Please enter a valid VAT Number (6 digits).') && isValid;

    // If valid, submit the form
    if (isValid) {
        this.submit();
    }
});
