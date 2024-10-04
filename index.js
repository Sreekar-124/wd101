// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  var form = document.getElementById("registrationForm");

  // Listen for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission

    // Retrieve form data
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var dob = document.getElementById("dob").value;
    var acceptTerms = document.getElementById("acceptTerms").checked;

    // Validate the form data (similar to what you already have in the HTML file)
    var isValid = true;

    function showError(id, message) {
      document.getElementById(id).textContent = message;
      isValid = false;
    }

    // Clear previous errors
    [
      "nameError",
      "emailError",
      "passwordError",
      "dobError",
      "termsError",
    ].forEach(function (id) {
      document.getElementById(id).textContent = "";
    });

    if (!name) showError("nameError", "Name is required");
    if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email))
      showError("emailError", "Please enter a valid email");
    if (password.length < 6)
      showError("passwordError", "Password must be at least 6 characters long");
    if (dob && new Date(dob) > new Date())
      showError("dobError", "Date of birth cannot be in the future");
    if (!acceptTerms)
      showError("termsError", "You must accept the terms and conditions");

    // If form is valid, store data in localStorage
    if (isValid) {
      var userData = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptTerms: acceptTerms,
      };

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // You can redirect or display a success message here
      alert("Form submitted successfully and data stored in localStorage!");
    }
  });
});

// Function to retrieve and display user data
function retrieveUserData() {
  // Retrieve the string from localStorage
  const retrievedUserData = localStorage.getItem("userData");

  // Check if the data exists
  if (retrievedUserData) {
    // Parse the JSON string back into an object
    const parsedUserData = JSON.parse(retrievedUserData);

    // Display the user data (for example, in the console or on the page)
    console.log("User Data Retrieved:");
    console.log("Name:", parsedUserData.name);
    console.log("Email:", parsedUserData.email);
    console.log("Password:", parsedUserData.password); // Be cautious with logging sensitive data
    console.log("Date of Birth:", parsedUserData.dob);
    console.log("Terms Accepted:", parsedUserData.acceptTerms);

    // Optionally, you can display this data in the HTML
    // Example: Display in a div with id "displayData"
    const displayData = document.getElementById("displayData");
    if (displayData) {
      displayData.innerHTML = `
          <p>Name: ${parsedUserData.name}</p>
          <p>Email: ${parsedUserData.email}</p>
          <p>Date of Birth: ${parsedUserData.dob}</p>
          <p>Terms Accepted: ${parsedUserData.acceptTerms ? "Yes" : "No"}</p>
        `;
    }
  } else {
    console.log("No user data found in localStorage.");
  }
}

// Call the function to retrieve user data when the page loads
document.addEventListener("DOMContentLoaded", retrieveUserData);
