const charactersContainer = document.getElementById('characters-container');
const statusFilter = document.getElementById('status-filter');
const nameFilterInput = document.getElementById('name-filter');
const nameFilterButton = document.getElementById('name-filter-btn');

statusFilter.addEventListener('change', () => {
    const selectedStatus = statusFilter.value;
    fetchCharacters(selectedStatus);
});

nameFilterButton.addEventListener('click', () => {
    const name = nameFilterInput.value.trim();
    filterCharactersByName(name);
});

async function fetchCharacters(status) {
    charactersContainer.innerHTML = 'Cargando...';
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?status=${status}`);
        const data = await response.json();
        displayCharacters(data.results);
    } catch (error) {
        charactersContainer.innerHTML = 'Error al cargar los personajes';
        console.log('Error: ', error);
    }
}

function displayCharacters(characters) {
    charactersContainer.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.setAttribute('data-status', character.status);

        const image = document.createElement('img');
        image.src = character.image;

        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';

        const name = document.createElement('h3');
        name.textContent = character.name;

        const status = document.createElement('p');
        status.textContent = `Status: ${character.status}`;

        const species = document.createElement('p');
        species.textContent = `Species: ${character.species}`;

        cardInfo.appendChild(name);
        cardInfo.appendChild(status);
        cardInfo.appendChild(species);

        card.appendChild(image);
        card.appendChild(cardInfo);

        charactersContainer.appendChild(card);
    });
}

function filterCharactersByStatus(status) {
    const characterCards = document.getElementsByClassName('character-card');
    for (let card of characterCards) {
        const characterStatus = card.getAttribute('data-status');
        if (status === 'all' || characterStatus === status) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

function filterCharactersByName(name) {
    const characterCards = document.getElementsByClassName('character-card');
    for (let card of characterCards) {
        const characterName = card.querySelector('h3').textContent;
        if (characterName.toLowerCase().includes(name.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

fetchCharacters('alive');
