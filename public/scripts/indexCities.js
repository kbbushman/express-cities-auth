console.log('The spice must flow...');
const cityElement = document.getElementById('city');

fetch('/api/v1/cities')
  .then((buffer) => buffer.json())
  .then((data) => {
    console.log(data);
    render(data);
  })
  .catch((err) => console.log(err));


function render(citiesArr) {
  const cityTemplates = citiesArr.map((city) => {
    return getCityTemplate(city);
  }).join('');

  cityElement.insertAdjacentHTML('beforeend', cityTemplates);
}


function getCityTemplate(city) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card">
        <img src="${city.image}" class="card-img-top" alt="${city.name}" />
        <div class="card-body">
          <h5 class="card-title">${city.name}</h5>
          <p class="card-text">
            ${city.description}
            (${city.posts.length} ${city.posts.length === 1 ? 'post' : 'posts'})
          </p>
          <a href="/cities/${city._id}" class="btn btn-primary float-right">View Details</a>
        </div>
      </div>
    </div>
  `;
}
