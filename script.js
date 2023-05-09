// Skapar layout på startsidan
const displayCard = () => {
    const search = document.createElement("div");
    search.classList.add("search");

    search.innerHTML = `
        <input type="text" class="search-bar" placeholder="Sök på ort">
            <button><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16"
                    height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z">
                    </path>
                </svg>
            </button>
    `;

    document.querySelector("#card").appendChild(search);
};

const displayWeatherDetails = () => {
    const details = document.createElement("div");
    details.classList.add("weather");
    details.classList.add("loading");

    details.innerHTML = `
    <h2 class="city">Vädret i Jönköping, Sverige</h2>
    <h1 class="temp">18°C</h1>
    <img src="" alt="" class="icon">
    <h3 class="humidity">Luftfuktighet: 36%</h3>
    <h3 class="wind">Vindhastighet: 5 m/s</h3>
    `;

    document.querySelector("#card").appendChild(details);
};

displayCard();
displayWeatherDetails();
