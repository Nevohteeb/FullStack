console.log('frontend script is working');

$(document).ready(function(){

    let url;

    // Get Config.Json and variable from it
    $.ajax({
        url: 'config.json',
        type: 'GET',
        dataType: 'json',
        success: function(configData){
            console.log(configData.SERVER_URL, configData.SERVER_PORT);
            url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
            console.log(url);
        },
        error: function(error){
            console.log(error);
        }
    })

    //View Products onclick of View Products Button
    $('#viewProducts').click(function(){
        $.ajax({
            url: `http://${url}/allProductsFromDB`,
            type: 'GET',
            dataType: 'json',
            success: function(productsFromMongo) {
                for(let i = 0; i < productsFromMongo.length; i++ ){
                    console.log(productsFromMongo[i]);
                }
            },
            error: function() {
                alert('unable to get products')
            }
        })
    })

}) // Doc Ready function Ends