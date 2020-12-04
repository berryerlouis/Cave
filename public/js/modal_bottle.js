var savedDatabase;

var addBottle = function( data )
{
    var xhr = new XMLHttpRequest();
    let url = "add";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            //update client db 
            savedDatabase = JSON.stringify(jsonBottle.bottles);
            //update header with nb bottles
            document.getElementById("title_nb_bottles").innerHTML = "Il y a " + jsonBottle.nbBottles + " bouteilles";
            //update list
            var bottle_list = 
            `<% for (var i = 0; i < bottles.length;  i++ ) { %>           
                <div class="card bg-dark text-white" id="bottle_<%=i%>" style="width: 320px;margin: 10px;">
                    <img style="margin: 2px;" id="bottle_<%=i%>_photo" class="card-img-top-shrink" src="<%= bottles[i].photo %>">
                    <div class="card-body">
                        <h5 class="card-title" id="bottle_<%=i%>_name" ><%= bottles[i].name %></h5>
                        <p class="card-text" id="bottle_<%=i%>_head_distillerie"><%= bottles[i].distillerie %></p>
                    </div>
                    <ul class="list-group list-group-flush bg-dark text-white">
                        <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_age">Age : <%= bottles[i].age %></li>
                        <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_alcool">Alcool : <%= bottles[i].alcool %></li>
                        <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_distillerie"style="display: none;">Nom du domaine : <%= bottles[i].distillerie %></li>
                        <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_address"style="display: none;">Adresse : <%= bottles[i].address %></li>
                        <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_message"style="display: none;">Message : <%= bottles[i].message %></li>
                    </ul>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3">
                                <button class="btn btn-secondary float-left" data-toggle="modal" data-target="#modalModifyForm" onclick="fillModalEdit(<%=i%>)">Edit</button>
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <button class="btn btn-danger float-left" onclick="removeBottleQty(<%=i%>)">-</button>
                                    </div>
                                    <div class="col-sm-4">
                                        <h5 class="text-center" style="margin-top: 5px;" id="bottle_<%=i%>_qty" ><%=bottles[i].qty%></h5>
                                    </div>
                                    <div class="col-sm-4">
                                        <button class="btn btn-success float-right" onclick="addBottleQty(<%=i%>)">+</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <button class="btn btn-secondary float-right" id="bottle_<%=i%>_show" onclick="modalShowDescription(<%=i%>)">Show</button>
                            </div>
                        </div>
                    </div>
                </div>
            <% } %>`;    
            $('#container_bottles').html(ejs.render(bottle_list, {bottles: jsonBottle.bottles}));
            $('.statusMsg').html(jsonBottle.error);  
            $('#modalAddForm').modal('toggle');
        }
        else if(xhr.status !== 200)
        {
            $('.statusModalMsg').html('<span style="color:red;">Erreur !</span>');   
        }
        $('.submitBtn').removeAttr("disabled");
        $('.modal-body').css('opacity', '');

        $('.statusModalMsg').html('<span style="color:red;">Erreur de database!</span>');    
    }
    $('#inputName').val("");
    $('#inputAge').val("");
    $('#inputAlcool').val("");
    $('#inputPhoto').val("");
    $('#inputDistillerie').val("");
    $('#inputAddress').val("");
    $('#inputMessage').val("");
   
    $('.submitBtn').attr("disabled","disabled");
    $('.modal-body').css('opacity', '.5');
    xhr.send(data);
};

var editBottle = function( data,card_id )
{
    var xhr = new XMLHttpRequest();
    let url = "edit";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            $('#statusMsg').html(jsonBottle.error);  
            
            $("#bottle_"+card_id+"_name").html(jsonBottle.bottle.name);
            $("#bottle_"+card_id+"_age").html("Age : " + jsonBottle.bottle.age + "an(s)");
            $("#bottle_"+card_id+"_alcool").html("Alcool : " + jsonBottle.bottle.alcool + "%");
            $("#bottle_"+card_id+"_qty").html(jsonBottle.bottle.qty);
            $("#bottle_"+card_id+"_photo").attr("src",jsonBottle.bottle.photo);
            $("#bottle_"+card_id+"_distillerie").html(jsonBottle.bottle.distillerie);
            $("#bottle_"+card_id+"_head_distillerie").html(jsonBottle.bottle.distillerie);
            $("#bottle_"+card_id+"_address").html("Adresse : " + jsonBottle.bottle.address);
            $("#bottle_"+card_id+"_message").html("Message : " + jsonBottle.bottle.message);
            $('#modalModifyForm').modal('toggle');
        }
        else if(xhr.status !== 200)
        {
            $('.statusModalMsg').html('<span style="color:red;">Erreur !</span>');   
        }
        $('.submitBtn').removeAttr("disabled");
        $('.modal-body').css('opacity', '');
    };
   
    $('.submitBtn').attr("disabled","disabled");
    $('.modal-body').css('opacity', '.5');
    xhr.send(data);
};


var changeBottleQty = function( db, name,card_id, qty)
{
    var xhr = new XMLHttpRequest();
    let url = "bottleQty";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            $("#bottle_"+card_id+"_qty").html(jsonBottle.bottle.qty);
            $("#title_nb_bottles").html("Il y a "+ jsonBottle.nbBottles+" bouteilles.");
        }
    };
    var data = JSON.stringify(
        {
            "db": db,
            "qty": qty,
            "name": name,
        }
    );
    xhr.send(data);
};


function modalNewBottle(){
    var db = $('.modal-add-title').html().replace("Ajout d'une bouteille de ","")
    if(db == "whisky")
    {
        db = "whiskies"
    }
    else if(db == "vin")
    {
        db = "vins"
    }
    else if(db == "autres")
    {
        db = "autres"
    }
    else{
        $('.statusModalMsg').html('<span style="color:red;">Erreur de database!</span>');    
    }
    var name = $('#inputName').val();
    if(name.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez un nom !</span>');  
        return false; 
    }
    var age = $('#inputAge').val();
    /*if(age.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez un age !</span>'); 
        return false;   
    }*/
    var alcool = $('#inputAlcool').val();
    /*if(alcool.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez le degré d\'alcool !</span>'); 
        return false;   
    }*/
    var photo = $('#inputPhoto').val();
    /*if(photo.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez une photo !</span>'); 
        return false;   
    }*/
    var distillerie = $('#inputDistillerie').val();
    /*if(distillerie.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez le nom de la distillerie !</span>'); 
        return false;   
    }*/
    var address = $('#inputAddress').val();
    /*if(address.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez une adresse !</span>'); 
        return false;   
    }*/
    var message = $('#inputMessage').val();
    /*if(message.trim() == '' ){
        $('.statusModalMsg').html('<span style="color:red;">Ajoutez un message !</span>'); 
        return false;   
    }*/
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    image = canvas.toDataURL();
   
    var data = JSON.stringify(
        {
            "db": db,
            "qty": 0,
            "name": name,
            "base64image": image,
            "age": age,
            "alcool": alcool,
            "photo": image,
            "distillerie": distillerie,
            "address": address,
            "message": message
        }
    );
    addBottle(data);
}

function modalModifyBottle(card_id){
    var db = $('.modal-modify-title').html().replace("Modification d'une bouteille de ","")
    if(db == "whisky")
    {
        db = "whiskies"
    }
    else if(db == "vin")
    {
        db = "vins"
    }
    else if(db == "autres")
    {
        db = "autres"
    }
    else{
        $('.statusModalModifyMsg').html('<span style="color:red;">Erreur de database!</span>');    
    }
    var name = $('#inputModifyName').val();
    if(name.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez un nom !</span>');  
        return false; 
    }
    var age = $('#inputModifyAge').val();
    /*if(age.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez un age !</span>'); 
        return false;   
    }*/
    var alcool = $('#inputModifyAlcool').val();
    /*if(alcool.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez le degré d\'alcool !</span>'); 
        return false;   
    }*/
    var photo = $('#inputModifyPhoto').attr("src");
    /*if(photo.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez une photo !</span>'); 
        return false;   
    }*/
    var distillerie = $('#inputModifyDistillerie').val();
    /*if(distillerie.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez le nom de la distillerie !</span>'); 
        return false;   
    }*/
    var address = $('#inputModifyAddress').val();
    /*if(address.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez une adresse !</span>'); 
        return false;   
    }*/
    var message = $('#inputModifyMessage').val();
    /*if(message.trim() == '' ){
        $('.statusModalModifyMsg').html('<span style="color:red;">Ajoutez un message !</span>'); 
        return false;   
    }*/
    var qty = $('#inputModifyQty').val();
   
    var data = JSON.stringify(
        {
            "db": db,
            "qty": qty,
            "name": name,
            "age": age,
            "alcool": alcool,
            "photo": photo,
            "distillerie": distillerie,
            "address": address,
            "message": message
        }
    );
    editBottle(data,card_id);
}