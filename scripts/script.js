// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

// get person's data from SWAPI
const getPersonData = () => {
    const peopleUrl = "people/1/";

    $.ajax({
        url: baseUrl + peopleUrl,
        success: function() {
            console.log('ready');
        }
    }).done(function( data ) {
        console.log( data );
    });
}

getPersonData();