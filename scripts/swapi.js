// base url to SWAPI
const baseUrl = "https://swapi.dev/api/";

// find people container
const peopleDiv = document.getElementById('people-list');

// find loader
const loader = document.querySelector('.loader-home');

// find popup
const popup = document.getElementById('popup');

// find nav buttons
const nextBtn = document.getElementById('next-page');
const prevBtn = document.getElementById('prev-page');

// open/close popup for details
const openPopup = () => {
    popup.classList.add('active');
}

const closePopup = () => {
    popup.classList.remove('active');
}

// get people list
const getPeople = (url) => {
    
    $.ajax({
        url: url,
        beforeSend: () => {
            loader.classList.remove('hidden');
        },
        success: data => {
            //console.log( peopleDiv.innerHTML );      
            loader.classList.add('hidden');   
            peopleDiv.innerHTML = '';   

            data.results.forEach(personData => {
                //console.log(personData);

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

                // treat click on details button and fill popup with data
                cardButton.addEventListener('click', () => {
                    getDetails(personData.url);
                });
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

// goto next page
nextBtn.addEventListener('click', function() {
    //peopleDiv.innerHTML = '';
    
    getPeople(this.getAttribute('data-url'));
})

// goto prev page
prevBtn.addEventListener('click', function() {
    //peopleDiv.innerHTML = '';
    
    getPeople(this.getAttribute('data-url'));
})

// get details of additional info
const getDetails = (url) => {
    const popupDataContainer = document.getElementById('popup-props');

    // clear container
    popupDataContainer.innerHTML = '';

    $.ajax({
        url: url,
        beforeSend: () => {
            loader.classList.remove('hidden');
        },
        success: data => {
            //console.log(data);
            loader.classList.add('hidden');

            // create elements
            const detailName = document.createElement('h3');
            const detailList = document.createElement('ul');

            // add popup title
            if (data.title) {
                detailName.innerText = data.title;
            } else {
                detailName.innerText = data.name;
            }

            // append elements to container
            popupDataContainer.append(detailName);

            // props which we don't display
            const doNotDisplay = ['name', 'created', 'edited', 'url', 'title'];

            // get all props and their values from object
            for (const [key, value] of Object.entries(data)) {
                if (!doNotDisplay.includes(key)) {
                    //console.log(Array.isArray(value));
                    let listElement = document.createElement('li');

                    // check if this is array of links
                    if (Array.isArray(value)) {
                        listElement.innerHTML = `<span>${key}:</span> `;
                        listElement.classList.add('has-links');

                        // create link for every element
                        value.forEach(link => {
                            let linkElem = document.createElement('a');
                            linkElem.setAttribute('href', '#');
                            //link.setAttribute('data-url', elem);
                            linkElem.innerText = link;
                            listElement.appendChild(linkElem);

                            linkElem.addEventListener('click', () => {
                                getDetails(link);
                            });
                        })
                    } else {
                        // check if value contains url and create link
                        if (typeof value == 'string' && value.includes('http')) {
                            listElement.innerHTML = `<span>${key}:</span> `;

                            let linkElem = document.createElement('a');
                            linkElem.setAttribute('href', '#');
                            //link.setAttribute('data-url', value);
                            linkElem.innerText = value;
                            listElement.appendChild(linkElem);

                            linkElem.addEventListener('click', () => {
                                getDetails(value);
                            });
                        } else {
                            listElement.innerHTML = `<span>${key}:</span> ${value}`;
                        }
                    }
                    
                    detailList.appendChild(listElement);
                }
            }

            popupDataContainer.append(detailList);

            openPopup();
        }
    })
}

getPeople(baseUrl + 'people/');