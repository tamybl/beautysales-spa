$(function() {
    $('.slider').slider();
  /* checkboxes.click(function () {
  // The checkboxes in our app serve the purpose of filters.
  // Here on every click we add or remove filtering criteria from a filters object.

  // Then we call this function which writes the filtering criteria in the url hash.
  createQueryHash(filters);
  }); */
  // Se obtiene la data completa de los elementos contenidos en el archivo json
  $.getJSON('https://raw.githubusercontent.com/tamybl/beautysales-spa/master/products.json', function(data) {
    // Funcion que imprime los datos contenido en data en el HTML
    generateProductsHTML(data);
    // Manually trigger a hashchange to start the app.
    $(window).trigger('hashchange');
  });

  $(window).on('hashchange', function() {
    // On every hash change the render function is called with the new hash.
    // This is how the navigation of our app happens.
    render(decodeURI(window.location.hash));
  });

  function render(url) {
  // This function decides what type of page to show
  // depending on the current url hash value.
  }


  $('.tab a').click(showByType);

  
});

function showByType() {
  var typeSelected = $(this);
  var typeName = typeSelected.attr('id');
  window.location.hash = 'product/' + typeName;
  // console.log(typeName);
  console.log(typeName);
  $('.all-products .products-list').find('li').remove();

  $.ajax({
    url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${typeName}`,
    type: 'GET',
    datatype: 'json'
  })
    .done(function(response) {
      // si el llamado fue exitoso, llama a showProductsByType
      //console.log(response);
      generateProductsHTML(response);

    })
    .fail(function(error) {
      // si el llamado falla, lanza un console.log
      console.log('error');
    });
}


function generateProductsHTML(data) {
    console.log(data)
    let list = $('.all-products .products-list');
    const theTemplateScript = $('#products-template').html();
    // Compile the template​
    var theTemplate = Handlebars.compile(theTemplateScript);
    const limit = 20;
    let resultsPerPage = [];
    for (let i = 0; i <= 20; i++) {
      resultsPerPage.push(data[i]);
    }
    console.log(resultsPerPage);
    list.append(theTemplate(data));

    // Each products has a data-index attribute.
    // On click change the url hash to open up a preview for this product only.
    // Remember: every hashchange triggers the render function.
    list.find('li').on('click', function(e) {
      e.preventDefault();

      var productIndex = $(this).data('index');

      window.location.hash = 'product/' + productIndex;
    });

    $('.cart').click(function(e){
      const jsonCart = {};
      jsonCart.products = [];
      let id = $(this).attr('data-id');
      let name = $(this).attr('data-name');


      jsonCart.products.push({id: id,name:name});
      localStorage.setItem("jsonCart", JSON.stringify(jsonCart));
      let db = localStorage.getItem("jsonCart");
      console.log(localStorage.jsonCart);

    })
  }



function pagination() {
  
}
