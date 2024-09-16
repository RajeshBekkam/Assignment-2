function validateContactField(fieldId, errorId, countryCodeId, errorMessage) {
    const countryCode = document.getElementById(countryCodeId).value;
    const contact = document.getElementById(fieldId).value.trim();

    const regexPatterns = {
        "EN": /^\+44\d{10}$/,
        "IN": /^\+91\d{10}$/,
        "US": /^\+1\d{10}$/,
        "UK": /^\+44\d{10}$/
    };

    const selectedRegex = regexPatterns[countryCode];
    if (!selectedRegex.test(contact)) {
        displayError(errorId, errorMessage);
        return false;
    }
    return true;
}

function validateRequiredField(fieldId, errorId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (field.value.trim() === '') {
        displayError(errorId, errorMessage);
        return false;
    }
    return true;
}

function validateFieldWithRegex(fieldId, errorId, regex, errorMessage) {
    const field = document.getElementById(fieldId).value.trim();
    if (!regex.test(field)) {
        displayError(errorId, errorMessage);
        return false;
    }
    return true;
}

function displayError(errorId, errorMessage) {
    document.getElementById(errorId).innerText = errorMessage;
}

function clearErrors(errorIds) {
    errorIds.forEach(errorId => {
        document.getElementById(errorId).innerText = '';
    });
}

document.getElementById('addressForm').addEventListener('submit', function (event) {
    event.preventDefault();

    clearErrors(['nameError', 'emailError', 'billingAddressError', 'contactError', 'zipCodeError', 'vatNumberError']);

    let isValid = true;

    isValid = validateRequiredField('name', 'nameError', 'Name is required.') && isValid;
    isValid = validateFieldWithRegex('email', 'emailError', /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.') && isValid;
    isValid = validateRequiredField('billingAddress', 'billingAddressError', 'Billing Address is required.') && isValid;
    isValid = validateContactField('contact', 'contactError', 'CountryCode', 'Please enter a valid contact number.') && isValid;
    isValid = validateFieldWithRegex('zipCode', 'zipCodeError', /^\d{6}$/, 'Please enter a valid Zip Code (6 digits).') && isValid;
    isValid = validateFieldWithRegex('vatNumber', 'vatNumberError', /^\d{6}$/, 'Please enter a valid VAT Number (6 digits).') && isValid;

    if (isValid) {
        document.getElementById("failure").innerHTML = "";
        document.getElementById("success").innerHTML = "<div class = 'text-bold text-center'> Valid Form </div>";
    } else {
        document.getElementById("success").innerHTML = "";
        document.getElementById("failure").innerHTML = "<div class = 'text-bold text-center'>Not a Valid Form to submit </div>";
    }
});

document.getElementById("CountryCode").addEventListener("change", function () {
    var countryCode = this.value;
    var contactInput = document.getElementById("contact");

    var placeholders = {
        "EN": "+440000000000",
        "IN": "+910000000000",
        "US": "+10000000000",
        "UK": "+440000000000"
    };

    contactInput.placeholder = placeholders[countryCode];
});
