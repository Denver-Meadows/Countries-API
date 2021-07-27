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
  const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`);
  const res = await request;
  const data = await res.json();

  // Put the data in the state.
  countryData.data = data[0];
  // Render the country with the data.  Must be called inside of the async function
  renderCountry(countryData.data)
};

const renderCountry = function(data) {
  const html = `
    <div class="container">
      <div class="country">
        <div class="country__flag"></div>
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">Americas</h4>
          <p class="country__row">323.9 people</p>
          <p class="country__row">English</p>
          <p class="country__row">United States Dollar</p>
          <p class="country__row">Washington, D.C.</p>
        </div>
      </div>
    </div>
  `;

  countryContainer.insertAdjacentHTML('beforeend', html)
}

getCountryData('brazil');
