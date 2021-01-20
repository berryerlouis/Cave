var savedDatabase;

var showBottles = function(jsonBottles, page)
{
    var bottle_list = 
    `<% for (var i = page; i < 4+page;  i++ ) { if(bottles[i]!=null){ %>    

        <div class="card bg-dark text-white" id="bottle_<%=i%>" style="width: 300px; margin:5px; border-radius: 2%">
            <div class="row justify-content-center">
                <img style="margin: 10px; width: 150px; height: 185px;border-radius: 20%" class="float-center" id="bottle_<%=i%>_photo" class="card-img-top-shrink" src="<%= bottles[i].photo %>">
            </div>
            <div class="card-header">
                <div class="row h-100">
                    <div class="col-7 align-self-start">
                        <div class="row">
                            <h5 class="card-title float-center" id="bottle_<%=i%>_name" ><%= bottles[i].name %></h5>
                        </div>
                        <div class="row">
                            <p class="card-text float-center" id="bottle_<%=i%>_head_distillerie"><%= bottles[i].distillerie %></p>
                        </div>
                    </div>
                    <div class="col-5 align-self-center h-100">
                        <div class="row h-100">
                            <div class="col my-auto">
                                <div class="w-100">
                                    <h6 class="card-text card-text text-center h-100" id="bottle_<%=i%>_note"><% if (bottles[i].note == "") {%>0<%} else { %><%=bottles[i].note%><% } %> / 5</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
               
            <ul class="list-group list-group-flush bg-dark text-white">
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_age"><% if (bottles[i].age != "") { %> Age : <%= bottles[i].age %> an(s) <% } else { %> Assemblage <% } %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_alcool">Alcool : <%= bottles[i].alcool %> %</li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_genre">Genre : <%= bottles[i].genre %></li>
            </ul>
            <ul class="list-group list-group-flush bg-dark text-white">
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_nez"style="display: none;">Nez : <%= bottles[i].nez %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_bouche"style="display: none;">Bouche : <%= bottles[i].bouche %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_final"style="display: none;">Final : <%= bottles[i].final %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_distillerie"style="display: none;">Distillerie : <%= bottles[i].distillerie %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_address"style="display: none;">Adresse : <%= bottles[i].address %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_zip"style="display: none;">Code Postal : <%= bottles[i].zip %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_pays"style="display: none;">Pays : <%= bottles[i].pays %></li>
                <li class="list-group-item bg-dark text-white" id="bottle_<%=i%>_message"style="display: none;">Message : <%= bottles[i].message %></li>
            </ul>
            <div class="card-footer">
                <div class="row">
                    <div class="col-3">
                        <button class="btn btn-secondary float-left" data-toggle="modal" data-target="#modalModifyForm" onclick="fillModalEdit(<%=i%>)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-4">                            
                                <button type="button" class="btn btn-danger float-left" onclick="removeBottleQty(<%=i%>)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                      </svg>
                                </button>
                            </div>
                            <div class="col-4">
                                <h5 class="text-center" style="margin-top: 5px;" id="bottle_<%=i%>_qty" ><%=bottles[i].qty%></h5>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-success float-right" onclick="addBottleQty(<%=i%>)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <button class="btn btn-secondary float-right" id="bottle_<%=i%>_show" onclick="modalShowDescription(<%=i%>)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                    </div>
                </div>
            </div>
        </div>
    <% }} %>                               
    `;    
    $('#container_bottles').html(ejs.render(bottle_list, {bottles: jsonBottles, page: page*4}));
    
    document.getElementById('page_number').innerHTML = page+1 +" / "+ (Math.ceil(jsonBottles.length/4));
    ma_page = page;
}

var getBottles = function( db )
{
    var xhr = new XMLHttpRequest();
    let url = "bottles";
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            let nbBottles = 0;
            for(let i = 0 ; i < jsonBottle.bottles.length; i++)
            {
                nbBottles += 1 * parseInt(jsonBottle.bottles[i].qty);
            }
            $("#title_nb_types_bottles").html("Nombre de type de bouteilles : "+ jsonBottle.bottles.length);
            $("#title_nb_bottles").html("Nombre de bouteilles : "+ nbBottles);
            showBottles(jsonBottle.bottles,ma_page);
        }
    }
    xhr.send(JSON.stringify({"db": db}));
}

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
            let nbBottles = 0;

            for(let i = 0 ; i < jsonBottle.bottles.length; i++)
            {
                nbBottles += 1 * parseInt(jsonBottle.bottles[i].qty);
            }

            //update header with nb bottles
            document.getElementById("title_nb_bottles").innerHTML = "Nombre de type de bouteilles : " + jsonBottle.nbBottles + " bouteilles";
            document.getElementById("title_nb_bottles").innerHTML = "Nombre de bouteilles : " + jsonBottle.nbBottles;
            //update list
            showBottles(jsonBottle.bottles,ma_page);
            
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
    $('#inputGenre').val("");
    $('#inputNote').val("");
    $('#inputNez').val("");
    $('#inputBouche').val("");
    $('#inputFinal').val("");
    $('#inputZip').val("");
    $('#inputPays').val("");
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
            if(parseInt(jsonBottle.bottle.age) > 0)
            {
                $("#bottle_"+card_id+"_age").html("Age : " + jsonBottle.bottle.age + "an(s)");
            }
            else{
                $("#bottle_"+card_id+"_age").html("Assemblage");
            }
            $("#bottle_"+card_id+"_alcool").html("Alcool : " + jsonBottle.bottle.alcool + "%");
            $("#bottle_"+card_id+"_qty").html(jsonBottle.bottle.qty);
            $("#bottle_"+card_id+"_photo").attr("src",jsonBottle.bottle.photo);
            $("#bottle_"+card_id+"_note").html(jsonBottle.bottle.note + " / 5");
            $("#bottle_"+card_id+"_genre").html("Genre : " + jsonBottle.bottle.genre);
            $("#bottle_"+card_id+"_nez").html("Nez : " + jsonBottle.bottle.nez);
            $("#bottle_"+card_id+"_bouche").html("Bouche : " + jsonBottle.bottle.bouche);
            $("#bottle_"+card_id+"_final").html("Final : " + jsonBottle.bottle.final);
            $("#bottle_"+card_id+"_pays").html("Pays : " + jsonBottle.bottle.pays);
            $("#bottle_"+card_id+"_zip").html("Code Postal : " + jsonBottle.bottle.zip);
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
    var alcool = $('#inputAlcool').val();
    var genre = $('#inputGenre').val();
    var note = $('#inputNote').val();
    var nez = $('#inputNez').val();
    var bouche = $('#inputBouche').val();
    var final = $('#inputFinal').val();
    var zip = $('#inputZip').val();
    var pays = $('#inputPays').val();
    var distillerie = $('#inputDistillerie').val();
    var address = $('#inputAddress').val();
    var message = $('#inputMessage').val();
    var canvas = document.getElementById('canvas');
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
            "genre": genre,
            "note": note,
            "nez": nez,
            "bouche": bouche,
            "final": final,
            "zip": zip,
            "pays": pays,
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
    var alcool = $('#inputModifyAlcool').val();
    var photo = $('#inputModifyPhoto').attr("src");
    var genre = $('#inputModifyGenre').val();
    var note = $('#inputModifyNote').val();
    var nez = $('#inputModifyNez').val();
    var bouche = $('#inputModifyBouche').val();
    var final = $('#inputModifyFinal').val();
    var zip = $('#inputModifyZip').val();
    var distillerie = $('#inputModifyDistillerie').val();
    var address = $('#inputModifyAddress').val();
    var pays = $('#inputModifyPays').val();
    var message = $('#inputModifyMessage').val();
    var qty = $('#inputModifyQty').val();
   
    var data = JSON.stringify(
        {
            "db": db,
            "qty": qty,
            "name": name,
            "age": age,
            "alcool": alcool,
            "photo": photo,
            "genre": genre,
            "note": note,
            "nez": nez,
            "bouche": bouche,
            "final": final,
            "zip": zip,
            "pays": pays,
            "distillerie": distillerie,
            "address": address,
            "message": message
        }
    );
    editBottle(data,card_id);
}