
var addBottleQty = function( card_id )
{
    var db = $("#db").html().replace("Mes ","");
    var bottleName = $("#bottle_"+card_id+"_name").html();
    var qty = parseInt( $("#bottle_"+card_id+"_qty").html()) + 1 ;
    changeBottleQty(db,bottleName,card_id,qty);
}

var removeBottleQty = function( card_id )
{
    var db = $("#db").html().replace("Mes ","");
    var bottleName = $("#bottle_"+card_id+"_name").html();
    var qty = parseInt( $("#bottle_"+card_id+"_qty").html()) - 1 ;
    changeBottleQty(db,bottleName,card_id,qty);
}

var fillModalEdit = function( card_id )
{
    $('#inputModifyName').val($("#bottle_"+card_id+"_name").html());
    $('#inputModifyAge').val(parseInt($("#bottle_2_age").html().replace("Age : ","").replace("an(s)","").replace(" ","")));
    $('#inputModifyAlcool').val($("#bottle_"+card_id+"_alcool").html().replace("Alcool : ","").replace(" %",""));
    $('#inputModifyQty').val($("#bottle_"+card_id+"_qty").html());
    $('#inputModifyPhoto').attr("src",($("#bottle_"+card_id+"_photo").attr("src")));
    $('#inputModifyDistillerie').val($("#bottle_"+card_id+"_head_distillerie").html());
    $('#inputModifyGenre').val($("#bottle_"+card_id+"_genre").html().replace("Genre : ",""));
    $('#inputModifyNote').val(parseInt($("#bottle_"+0+"_note").html().replace(" / 5","")));
    $('#inputModifyNez').val($("#bottle_"+card_id+"_nez").html().replace("Nez : ",""));
    $('#inputModifyBouche').val($("#bottle_"+card_id+"_bouche").html().replace("Bouche : ",""));
    $('#inputModifyFinal').val($("#bottle_"+card_id+"_final").html().replace("Final : ",""));
    $('#inputModifyZip').val($("#bottle_"+card_id+"_zip").html().replace("Code Postal : ",""));
    $('#inputModifyPays').val($("#bottle_"+card_id+"_pays").html().replace("Pays : ",""));
    $('#inputModifyAddress').val($("#bottle_"+card_id+"_address").html().replace("Adresse : ",""));
    $('#inputModifyMessage').val($("#bottle_"+card_id+"_message").html().replace("Message : ",""));
    
    $('#inputModifySubmit').attr("onclick", "modalModifyBottle("+card_id+")");
}

var modalShowDescription = function( card_id )
{
    //test if open 
    if($("#bottle_"+card_id+"_address").attr("style") == "display: none;")
    {
        $("#bottle_"+card_id+"_distillerie").attr("style","display: true;")
        $("#bottle_"+card_id+"_address").attr("style","display: true;")
        $("#bottle_"+card_id+"_pays").attr("style","display: true;")
        $("#bottle_"+card_id+"_zip").attr("style","display: true;")
        $("#bottle_"+card_id+"_message").attr("style","display: true;")
        $("#bottle_"+card_id+"_nez").attr("style","display: true;")
        $("#bottle_"+card_id+"_bouche").attr("style","display: true;")
        $("#bottle_"+card_id+"_final").attr("style","display: true;")
    }
    else
    {
        $("#bottle_"+card_id+"_distillerie").attr("style","display: none;")
        $("#bottle_"+card_id+"_address").attr("style","display: none;")
        $("#bottle_"+card_id+"_pays").attr("style","display: none;")
        $("#bottle_"+card_id+"_zip").attr("style","display: none;")
        $("#bottle_"+card_id+"_message").attr("style","display: none;")
        $("#bottle_"+card_id+"_nez").attr("style","display: none;")
        $("#bottle_"+card_id+"_bouche").attr("style","display: none;")
        $("#bottle_"+card_id+"_final").attr("style","display: none;")
    }
}

var bottleAlreadyExist = function( bottles )
{
    var find = false;
    bottles.forEach((bottle, index, arr)=>
    {
        if(bottle.name == $("#inputName").val())
        {
            find = true;
        }
    });

    if(find)
    {
        $('.statusModalMsg').html('<span style="color:red;">Cette bouteille existe déja !</span>');  
    }
    else
    {
        $('.statusModalMsg').html('');  
    }
}


