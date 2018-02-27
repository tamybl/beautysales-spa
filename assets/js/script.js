let car = 0;
$(function() {
    $('.slider').slider();
  // Se obtiene la data completa de los elementos contenidos en el archivo json
  $.getJSON('https://raw.githubusercontent.com/tamybl/beautysales-spa/master/products.json', function(data) {
    // Funcion que imprime los datos contenido en data en el HTML
    generateProductsHTML(data);
    $(window).trigger('hashchange');
  });

  $(window).on('hashchange', function() {
    render(decodeURI(window.location.hash));
  });

  $('.tab a').click(showByType);
});

function showByType() {
  var typeSelected = $(this);
  var typeName = typeSelected.attr('id');
  window.location.hash = 'product/' + typeName;
  $('.all-products .products-list').find('li').remove();

  $.ajax({
    url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${typeName}`,
    type: 'GET',
    datatype: 'json'
  })
    .done(function(response) {
      // si el llamado fue exitoso, llama a showProductsByType
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
    var theTemplate = Handlebars.compile(theTemplateScript);
    const limit = 20;
    let resultsPerPage = [];
    for (let i = 0; i <= 20; i++) {
      resultsPerPage.push(data[i]);
    }
    list.append(theTemplate(data));

        generateAllProductsHTML(data);
        
        $(window).trigger('hashchange');
    }

    $(window).on('hashchange', function() {
        render(decodeURI(window.location.hash));
    });

        function render(url) {
    }


    function generateAllProductsHTML(data) {
        const list = $('.all-products .products-list');
        const theTemplateScript = $('#products-template').html();
        var theTemplate = Handlebars.compile(theTemplateScript);
        const limit = 20;
        let resultsPerPage = [];
        for (let i = 0; i <= 20; i++) {
            resultsPerPage.push(data[i]);
        }
        list.append(theTemplate(resultsPerPage));
        list.find('li').on('click', function(e) {
            e.preventDefault();
            var productIndex = $(this).data('index');
            window.location.hash = 'product/' + productIndex;
        })
    }

function printProducts(response) {
    console.log('Imprimiendo en html');
    list = $('.all-products');
    list.empty();
    theTemplateScript = $('#productsbytype-template').html();
    let productsByTypeTemplateScript = $('#productsbytype-template').html();
    var productByTypeTemplate = Handlebars.compile(productsByTypeTemplateScript);
    list.append(productByTypeTemplate(response));
}

var shop = $('#shop');

$(shop).click(addToCart);
var counter = 1;
function addToCart() {
    $(shop).html('<i class="fas fa-shopping-cart"></i> Cart (' + ( counter ) + ')');
    counter++;
}

    $('.cart').click(function(e){
      car++;
      const jsonCart = {};
      jsonCart.products = [];
      let id = $(this).attr('data-id');
      let name = $(this).attr('data-name');
      jsonCart.products.push({id: id,name:name});
      localStorage.setItem("jsonCart", JSON.stringify(jsonCart));
      let db = localStorage.getItem("jsonCart");
    });