// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

const getPeople = () => {
    $.ajax({
        url: baseUrl + "people/",
        success: data => {
            //console.log( data );

            data.results.forEach(personData => {
                console.log(personData);

                // create person card elements
                const cardDiv = document.createElement('div');
                const cardTitle = document.createElement('h3');
                const cardButton = document.createElement('button');

                // add data to card
                cardTitle.innerText = personData.name;
                cardButton.innerText = 'Détails';
                cardButton.setAttribute('data-url', personData.url);
                cardDiv.classList.add('people-item');

                // add title and button to card
                cardDiv.append(cardTitle, cardButton);

                // add cards to container
                document.getElementById('people-list').append(cardDiv);
            });
        }
    });
}

getPeople();