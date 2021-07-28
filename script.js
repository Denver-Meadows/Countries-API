const countryContainer = document.querySelector('.container');
const countryFlag = document.querySelector('.country__flag');
const submitBtn = document.querySelector('.submit-btn');
const countryInput = document.querySelector('.country__input');


 const countryData = {
   data: 0,
   countryFlagUrl: 0,
 }

const getCountryData = async function(country) {
  try {
    const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const res = await request;
    const data = await res.json();
    
    console.log(data[0])
    // Put the data in the state.
    countryData.data = data[0];
    countryData.countryFlagUrl = data[0].flag;
    // Render the country with the data.  Must be called inside of the async function
    renderCountry(countryData.data)

  } catch (err) {
    console.error(err)
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



submitBtn.addEventListener('click', () => {
  console.log(countryInput.value);
  countryContainer.innerHTML = '';

  getCountryData(countryInput.value)
  countryInput.value = '';

});


