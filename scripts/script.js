// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

// loader 
const loader = document.querySelector('.loader');

// counter for getting people
let cnt = 1;

// add previous btn 
const addPrevBtn = () => {
    // previous btn
    const btnPrevIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
    `;

    // add previous btn after moving to 2nd person
    const btnPrevDiv = document.createElement("div");
    const arrowsContainer = document.getElementById("arrows");
    const btnPrev = document.getElementById("prev-arrow");
    btnPrevDiv.setAttribute("id", "prev-arrow");
    btnPrevDiv.setAttribute("class", "arrow");
    btnPrevDiv.setAttribute("onclick", "getPrevPerson()");
    btnPrevDiv.innerHTML = btnPrevIcon;

    // if counter is 2 and previous button does not exist, create one
    if (cnt == 2 && !btnPrev) {    
        arrowsContainer.appendChild(btnPrevDiv);
        arrowsContainer.classList.add("has-elements");
    } 
    
    // remove previous button if counter is 1
    if (cnt == 1 && btnPrev) {    
        btnPrev.remove();
        arrowsContainer.classList.remove("has-elements");
    }
}

// get person's data from SWAPI
const getPersonData = () => {
    // url to get person data
    const peopleUrl = `people/${cnt}/`;

    // find html elements for person
    const personNameElement = document.querySelector("#person-card h2");
    const personHeightElement = document.querySelector("#person-card .height");
    const personPlanetElement = document.querySelector("#person-card .planet");

    // ajax request to get person data
    $.ajax({
        url: baseUrl + peopleUrl,
        beforeSend: () => {
            loader.classList.remove("hidden");
        },
        success: data => {
            console.log( data );

            loader.classList.add("hidden");
    
            // save person's data
            const personName = data.name;
            const personHeight = `La taille: ${data.height} cm`;
    
            // add person's data to html
            personNameElement.innerHTML = personName;
            personHeightElement.innerHTML = personHeight;
            personPlanetElement.setAttribute("href", `/pages/planet.html?num=${cnt}`);
        }
    });

    addPrevBtn();
}

// get next person
const getNextPerson = () => {
    // increase counter by 1 to get next page number
    cnt++;
    
    getPersonData("next");
}

// get previous person
const getPrevPerson = () => {
    // decrease counter by 1 to get previous page number
    // set counter to 1 if it goes to 0
    cnt > 0 ? cnt-- : cnt = 1;

    getPersonData("prev");
}

// get planet's data from SWAPI
const getPlanetData = () => {
    // get url param 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id;

    if (urlParams.has('num')) {
        id = urlParams.get('num');    
    } else {
        id = 1;
    }

    // url to get planet data
    const url = `planets/${id}/`;

    // find html elements for planet
    const planetNameElement = document.querySelector("#planet-card h2");
    const planetTerrainElement = document.querySelector("#planet-card .terrain");

    // ajax request to get planet data
    $.ajax({
        url: baseUrl + url,
        beforeSend: () => {
            loader.classList.remove("hidden");
        },
        success: data => {
            console.log( data );

            loader.classList.add("hidden");

            // save person's data
            const planetName = data.name;
            const planetTerrain = data.terrain;

            // add person's data to html
            planetNameElement.innerHTML = planetName;
            planetTerrainElement.innerHTML = planetTerrain;
        }
    });
}