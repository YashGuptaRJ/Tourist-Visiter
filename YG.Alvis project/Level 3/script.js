document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('usernameError').style.display = 'none';
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('confirmPasswordError').style.display = 'none';

    let isValid = true;

    // Validate username
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        document.getElementById('usernameError').textContent = 'Username is required.';
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validate password
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validate confirm password
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (confirmPassword !== password) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        // Here, you can add code to actually submit the form if using a backend server.
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('search');
    const locationsContainer = document.getElementById('locations');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetchLocations(query);
        }
    });

    function fetchLocations(query) {
        fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${query}&limit=10`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4382a0e146mshb75b78d700080e4p1d389ejsn5b56e596a480', // Replace with your actual API key
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        })
        .then(response => response.json())
        .then(data => {
            const locations = data.data;
            displayLocations(locations);
        })
        .catch(error => console.error('Error fetching locations:', error));
    }

    function displayLocations(locations) {
        locationsContainer.innerHTML = ''; // Clear previous results
        locations.forEach(location => {
            const locationElement = document.createElement('div');
            locationElement.classList.add('location');
            locationElement.innerHTML = `
                <h2>${location.result_object.name}</h2>
                <p>${location.result_object.location_string || 'No location information available.'}</p>
                ${location.result_object.photo ? `<img src="${location.result_object.photo.images.large.url}" alt="${location.result_object.name}">` : 'No image available.'}
            `;
            locationsContainer.appendChild(locationElement);
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('background-changer');
    const body = document.body;
  
    button.addEventListener('click', () => {
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      body.style.backgroundColor = "#" + randomColor;
    });
  });