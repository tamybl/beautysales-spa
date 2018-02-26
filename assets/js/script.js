$(document).ready(function() {
    $('.slider').slider();
});


$(function() {

    /*checkboxes.click(function () {
        // The checkboxes in our app serve the purpose of filters.
        // Here on every click we add or remove filtering criteria from a filters object.

        // Then we call this function which writes the filtering criteria in the url hash.
        createQueryHash(filters);
    }); */

    $.getJSON("https://raw.githubusercontent.com/tamybl/beautysales-spa/master/products.json", function(data) {
        // Get data about our products from products.json.

        // Call a function that will turn that data into HTML.
        
       //console.log(data);

        generateAllProductsHTML(data);
        //generateAllCategoriesHTML(data);
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

    function generateAllProductsHTML(data) {

        let list = $('.all-products .products-list');

    let theTemplateScript = $("#products-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile (theTemplateScript);
    const limit = 20;
    let resultsPerPage = []
    for (let i = 0; i <= 20; i++) {
        resultsPerPage.push(data[i]);
    }
    console.log(resultsPerPage);
    list.append (theTemplate(resultsPerPage));


        // Each products has a data-index attribute.
        // On click change the url hash to open up a preview for this product only.
        // Remember: every hashchange triggers the render function.
        list.find('li').on('click', function(e) {
            e.preventDefault();

            var productIndex = $(this).data('index');

            window.location.hash = 'product/' + productIndex;
        })
    }


    $('.btn').click(showByType);

});


function showByType() {
    var typeSelected = $(this);
    var typeName = typeSelected.attr('id');
    console.log(typeName);

    $.ajax({
            url: `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${typeName}`,
            type: 'GET',
            datatype: 'json'
        })
        .done(function(response) {
            // si el llamado fue exitoso, llama a showProductsByType
            console.log(response);
            showProductsByType();
        })
        .fail(function(error) {
            // si el llamado falla, lanza un console.log
            console.log('error');
        })
}

function showProductsByType(typeOfProducts) {
    console.log('Entrando a los tipos de productos');
}

/*function generateAllCategoriesHTML(data) {
    let uniqueCat = Array.from(new Set(data))
    console.log(uniqueCat);

    let list = $('.categories');

    let theTemplateScript = $("#categories-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile (theTemplateScript);
    list.append (theTemplate(data));
}*/