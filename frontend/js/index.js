/*jshint esversion: 6 */ 

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
    });

    //View Products onclick of View Products Button
    $('#viewProducts').click(function(){
        $.ajax({
            url: `http://${url}/allProductsFromDB`,
            type: 'GET',
            dataType: 'json',
            success: function(productsFromMongo) {
                document.getElementById('result').innerHTML = '';
                for(let i = 0; i < productsFromMongo.length; i++ ){
                    console.log(productsFromMongo[i]);
                    document.getElementById('result').innerHTML += `
                    <div class="col-4 mt-3 mb-3">
                        <div class="card">
                            <img class="card-img-top" src="${productsFromMongo[i].image_url}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${productsFromMongo[i].name}</h5>
                                 <p class="card-text">${productsFromMongo[i].price}</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                    `;
                }
            },
            error: function() {
                alert('unable to get products');
            }
        });
    });// End of View Products

    //add a product form a click
    $('#addProduct').click(function(event){
        event.preventDefault();
        let name = $('#a-name').val();
        let price = $('#a-price').val();
        let image_url = $('#a-imageurl').val();
        console.log(name,price, image_url);
        if (name == '' || price == '' || image_url == ''){
        alert('Please login and enter all details');
        } else {
        $.ajax({
            url : `http://${url}/addProduct`,
            type : 'POST',
            data :{
            name: name,
            price: price,
            image_url:image_url,
            },
            success : function(product){
            console.log(product);
            alert ('product added');
            },
            error : function(){
            console.log('error: cannot call api');
            }//error
          });//ajax
        }//else
    });//addProduct Click

    $('#updateProduct').click(function(event){
        event.preventDefault();
        let productId = $('#productId').val();
        let productName = $('#productName').val();
        let productPrice = $('#productPrice').val();
        let productImageUrl = $('#imageurl').val();
        console.log(productId, productName, productPrice, productImageUrl);
        if (productId == '') {
            alert('Please enter a product to update');
        } else {
            $.ajax({
                url: `http://${url}/updateProduct/${productId}`,
                type: 'PATCH',
                data: {
                    name: productName,
                    price: productPrice,
                    image_url: productImageUrl
                },
                success: function(data){
                    console.log(data);
                },
                error: function(){
                    console.log('error: cannot update post');
                }// error
            }); // ajax
        }// if
    });// update click

    // DELETE PRODUCT
    $('#deleteProduct').click(function(event){
        event.preventDefault();
        let productId =$('#delProductId').val();
        console.log(productId);
        if (productId == '') {
            alert('Please eneter product id to delete');
        } else {
            $.ajax({
                url: `http://${url}/deleteProduct/${productId}`,
                type: 'DELETE',
                success: function() {
                    console.log('deleted');
                    alert('Product Deleted');
                },
                error: function() {
                    console.log('error: cannot delete due to call on api');
                }// error
            }); // ajax
        }// if
    }); // delete product


    // ---------------------- ADD USER API CALLS -------------------

    // Register User
    $('#r-submit').click(function (event) {
        event.preventDefault();
        let username =$('#r-username').val();
        let email =$('#r-email').val();
        let password =$('#r-password').val();
        console.log(username, email, password);

        if (username == '' || email == '' || password == '') {
            alert('Please enter all details');
        } else {
            $.ajax({
                url: `http://${url}/registerUser`,
                type: 'POST',
                data: {
                    username: username,
                    email: email,
                    password: password
                },
                success: function(user) {
                    console.log(user); // remove when dev is finished
                    if (user !== 'username already taken'){
                        alert('Thank you for registering')
                    } else {
                        alert('Username taken already. Please try again');
                        $('#r-username').val('');
                        $('#r-email').val('');
                        $('#r-password').val('');
                    } // else
                },
                error: function() {
                    console.log('error: cannot call add user api');
                }// error
            }); // end of ajax
        } // end of else
    }); // end of submit user click


}); // Doc Ready function Ends