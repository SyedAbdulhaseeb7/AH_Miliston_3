// Get form, output, and theme toggle button elements
var resumeForm = document.getElementById("resumeForm");
var resumeOutput = document.getElementById("resumeOutput");
var themeToggle = document.getElementById("themeToggle");
function generateResume(data) {
    var skillsList = data.skills.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
    var resumeTemplate = "\n    <section class=\"resume-header\">\n      <h1>".concat(data.name, "</h1>\n      <p><strong>Phone:</strong> ").concat(data.phone, "</p>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Address:</strong> ").concat(data.address, "</p>\n    </section>\n\n    <section class=\"resume-section\">\n      <h2>Skills</h2>\n      <ul>").concat(skillsList, "\n</ul>\n    </section>\n\n    <section class=\"resume-section\">\n      <h2>Education</h2>\n      <p>").concat(data.education, "</p>\n    </section>\n\n    <section class=\"resume-section\">\n      <h2>Experience</h2>\n      <p>").concat(data.experience, "</p>\n    </section>\n  ");
    if (data.imageUrl) {
        // Insert the profile image into the resume template
        resumeTemplate = "\n      <section class=\"resume-header\">\n        <img src=\"".concat(data.imageUrl, "\" alt=\"Profile Image\" style=\"width: 150px; height: 150px;\" />\n        ").concat(resumeTemplate, "\n      </section>\n    ");
    }
    // Output the resume
    if (resumeOutput) {
        resumeOutput.innerHTML = resumeTemplate;
    }
}
// Form submit event listener
resumeForm.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var resumeData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        skills: document.getElementById("skills").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
    };
    // Check if an image is uploaded
    var profileImageFile = (_a = document.getElementById("profileImage").files) === null || _a === void 0 ? void 0 : _a[0];
    if (profileImageFile) {
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            resumeData.imageUrl = reader_1.result; // Set the base64 image data
            generateResume(resumeData); // Generate the resume after the image is loaded
        };
        reader_1.readAsDataURL(profileImageFile); // Read the image as base64
    }
    else {
        // No image provided, just generate the resume
        generateResume(resumeData);
    }
});
// Theme toggle functionality
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    var container = document.querySelector(".container");
    container.classList.toggle("dark-theme");
});
