$.getJSON('products.json', function (data) {
  console.log(data);
});

$(function () {

    checkboxes.click(function () {
        // The checkboxes in our app serve the purpose of filters.
        // Here on every click we add or remove filtering criteria from a filters object.

        // Then we call this function which writes the filtering criteria in the url hash.
        createQueryHash(filters);
    });

    $.getJSON( "products.json", function( data ) {
        // Get data about our products from products.json.

        // Call a function that will turn that data into HTML.
        
        console.log(data);
        generateAllProductsHTML(data);
        // Manually trigger a hashchange to start the app.
        $(window).trigger('hashchange');
    });

    $(window).on('hashchange', function(){
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(decodeURI(window.location.hash));
    });

    function render(url) {
        // This function decides what type of page to show 
        // depending on the current url hash value.
    }

    

}); 
