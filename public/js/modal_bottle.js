var addBottle = function( data, cb )
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
            createBottleCard(jsonBottle.bottles);
            document.getElementById("title_nb_bottles").innerHTML = "Il y a " + jsonBottle.nbBottles + " bouteilles";
            $('.statusMsg').html(jsonBottle.error);  
            cb();
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

var editBottle = function( data, cb )
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
            createBottleCard(jsonBottle.bottles);
            document.getElementById("title_nb_bottles").innerHTML = "Il y a " + jsonBottle.nbBottles + " bouteilles";
            $('.statusMsg').html(jsonBottle.error);  
            cb();
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


var offsetBottle = function( db, name, qty)
{
    var xhr = new XMLHttpRequest();
    let url = "offset";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            createBottleCard(jsonBottle.bottles);
            document.getElementById("title_nb_bottles").innerHTML = "Il y a " + jsonBottle.nbBottles + " bouteilles";
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
    addBottle(data, ()=>{
        context.clearRect(0, 0, canvas.width, canvas.height);
        $('#inputName').val("");
        $('#inputAge').val("");
        $('#inputAlcool').val("");
        $('#inputPhoto').val("");
        $('#inputDistillerie').val("");
        $('#inputAddress').val("");
        $('#inputMessage').val("");
        $('#modalAddForm').modal('toggle');
    });
}

function modalModifyBottle(){
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
    var photo = $('#inputModifyPhoto').val();
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
   
    var data = JSON.stringify(
        {
            "db": db,
            "name": name,
            "age": age,
            "alcool": alcool,
            "photo": photo,
            "distillerie": distillerie,
            "address": address,
            "message": message
        }
    );
    editBottle(data, ()=>{
        $('#inputModifyName').val("");
        $('#inputModifyAge').val("");
        $('#inputModifyAlcool').val("");
        $('#inputModifyPhoto').val("");
        $('#inputModifyDistillerie').val("");
        $('#inputModifyAddress').val("");
        $('#inputModifyMessage').val("");
        $('#modalModifyForm').modal('toggle');
    });
}