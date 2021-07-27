const countryContainer = document.querySelector('.container');

const timeout = function(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
 };

 const countryData = {
   data: 0,
 }

const getCountryData = async function(country) {
  try {
    const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const res = await request;
    const data = await res.json();
    
    console.log(data[0])
    // Put the data in the state.
    countryData.data = data[0];
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
        <div class="country__flag"></div>
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
}

getCountryData('brazil');
