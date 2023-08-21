// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

// get person's data from SWAPI
const getPersonData = () => {
    // url to get person data
    const peopleUrl = "people/1/";

    // find html elements for person
    const personNameElement = document.querySelector("#person-card h2");
    const personHeightElement = document.querySelector("#person-card .height span");
    const personPlanetElement = document.querySelector("#person-card .planet");

    // ajax request to get person data
    $.ajax({
        url: baseUrl + peopleUrl
    }).done(function( data ) {
        console.log( data );

        const personName = data.name;
        const personHeight = data.height;
        const personPlanetUrl = data.homeworld;

        personNameElement.innerHTML = personName;
        personHeightElement.innerHTML = personHeight;
        personPlanetElement.setAttribute("data-num", personPlanetUrl);
    });
}

getPersonData();