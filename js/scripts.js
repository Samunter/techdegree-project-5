// Defined in fetch() as the returned json data
let people;

// Creates a card for each employee and displays them.
function createGallery(people) {
  let galleryHTML = '';
  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    galleryHTML += `
        <div class="card" data-index=${i}>
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${person.name.first}-${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}</p>
            </div>
        </div>
    `;
  }
  gallery.innerHTML = galleryHTML;
}

function formatDOB(person) {
  const dob = person.dob.date;
  const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
  const replacement = '$2/$3/$1';
  return dob.replace(regex, replacement);
}

// Creates popup window with additional employee info.
// Takes json data and an index number in order to access the appropriate
// employee data.
function createModal(people, index) {
  const person = people[index];
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${
                  person.picture.large
                }" alt="profile picture">
                <h3 id="${person.name.first}-${
    person.name.last
  }-modal" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="modal-text">${person.email}</p>
                <p class="modal-text cap">${person.location.city}</p>
                <hr>
                <p class="modal-text">${person.cell}</p>
                <p class="modal-text">${person.location.street.number} ${
    person.location.street.name
  }, ${person.location.city}, ${person.location.state} ${
    person.location.postcode
  }</p>
                <p class="modal-text">Birthday: ${formatDOB(person)}</p>
            </div>
        </div>
    `;
}

// Returns employee info and calls createGallery() to display it.
fetch(
  'https://randomuser.me/api/?results=15&inc=name,email,location,dob,picture,cell&nat=us&noinfo'
)
  .then(res => res.json())
  //.then(console.log);
  .then(json => {
    people = json.results;
    createGallery(people);
  });

// Attaches event listener to each employee card.
// Event handler creates popup window for the clicked employee.
// const cards = document.getElementsByClassName('card');
// for (let i = 0; i < cards.length; i++) {
//   const card = cards[i];
//   card.addEventListener('click', () => createModal(people, card.dataset.index));
// }

document.getElementById('gallery').addEventListener('click', e => {
  if (e.target.id !== 'gallery') {
    console.log('event listener gucci');
  }
});
