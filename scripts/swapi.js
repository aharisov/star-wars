// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

// find people container
const peopleDiv = document.getElementById('people-list');

// find nav buttons
const nextBtn = document.getElementById('next-page');
const prevBtn = document.getElementById('prev-page');

// get people list
const getPeople = (url) => {
    
    $.ajax({
        url: url,
        beforeSend: () => {
            peopleDiv.classList.add('loading');
        },
        success: data => {
            //console.log( peopleDiv.innerHTML );      
            peopleDiv.classList.remove('loading');      

            data.results.forEach(personData => {
                console.log(personData);

                // create person card elements
                const cardDiv = document.createElement('div');
                const cardTitle = document.createElement('h3');
                const cardButton = document.createElement('button');

                // add data to card elements
                cardTitle.innerText = personData.name;
                cardButton.innerText = 'Détails';
                cardButton.setAttribute('data-url', personData.url);
                cardDiv.classList.add('people-item');

                // add title and button to card
                cardDiv.append(cardTitle, cardButton);

                // add cards to container
                peopleDiv.append(cardDiv);
            });

            // add prev and next links to nav buttons
            if (data.next) {
                nextBtn.setAttribute('data-url', data.next);
                nextBtn.removeAttribute('disabled');
            } else {
                nextBtn.setAttribute('disabled', 'disabled');
            }
        
            if (data.previous) {
                prevBtn.setAttribute('data-url', data.previous);
                prevBtn.removeAttribute('disabled');
            } else {
                prevBtn.setAttribute('disabled', 'disabled');
            }
        }
    });
}

// add prev and next links to nav buttons
nextBtn.addEventListener('click', function() {
    peopleDiv.innerHTML = '';
    
    getPeople(this.getAttribute('data-url'));
})

prevBtn.addEventListener('click', function() {
    peopleDiv.innerHTML = '';
    
    getPeople(this.getAttribute('data-url'));
})

getPeople(baseUrl + 'people/');