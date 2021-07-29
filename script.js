const countryContainer = document.querySelector('.container');
const countryFlag = document.querySelector('.country__flag');
const submitBtn = document.querySelector('.submit-btn');
const countryInput = document.querySelector('.country__input');

 const countryData = {
   data: '',
   countryFlagUrl: '',
 };

const getCountryData = async function(country) {
  try {
    const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const res = await request;
    const data = await res.json();
    
    countryData.data = data[0];
    countryData.countryFlagUrl = data[0].flag;

    countryContainer.classList.add('active')
    renderCountry(countryData.data)

  } catch (err) {
    renderError();
  }
};

const renderCountry = function(data) {
  const html = `
    <div class="container">
      <div class="country">
        <img src="${data.flag}" alt="#" class="country__flag">
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row">👨‍👩‍👧‍👦  ${+data.population} people</p>
          <p class="country__row">🗣  ${data.languages[0].name}</p>
          <p class="country__row">💰  ${data.currencies[0].symbol}  ${data.currencies[0].name}</p>
          <p class="country__row">🏛  ${data.capital}</p>
        </div>
      </div>
    </div>
  `;

  countryContainer.insertAdjacentHTML('beforeend', html)
};

const renderError = function() {
  const html = `
    <div class="container">
      <div class="country">
        <p class="render__error-msg">Sorry, country not found. <br> Please try searching for another country.</p>
        </div>
      </div>
    </div>
  `;

  countryContainer.insertAdjacentHTML('beforeend', html)
};

submitBtn.addEventListener('click', () => {
  formSubmit();
});

const formSubmit = function() {
  countryContainer.innerHTML = '';
  getCountryData(countryInput.value)
  countryInput.value = '';
};

countryInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitBtn.click();
  }
});


