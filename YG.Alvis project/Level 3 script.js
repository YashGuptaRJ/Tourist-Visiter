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