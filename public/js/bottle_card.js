
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
    $('#inputModifyAge').val($("#bottle_"+card_id+"_age").html().replace("Age : ",""));
    $('#inputModifyAlcool').val($("#bottle_"+card_id+"_alcool").html().replace("Alcool : ",""));
    $('#inputModifyQty').val($("#bottle_"+card_id+"_qty").html());
    $('#inputModifyPhoto').attr("src",($("#bottle_"+card_id+"_photo").attr("src")));
    $('#inputModifyDistillerie').val($("#bottle_"+card_id+"_head_distillerie").html());
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
        $("#bottle_"+card_id+"_message").attr("style","display: true;")
        $("#bottle_"+card_id+"_show").html("Hide");
    }
    else
    {
        $("#bottle_"+card_id+"_distillerie").attr("style","display: none;")
        $("#bottle_"+card_id+"_address").attr("style","display: none;")
        $("#bottle_"+card_id+"_message").attr("style","display: none;")
        $("#bottle_"+card_id+"_show").html("Show");
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


var test = function( )
{
    $("#listSearch").on("keyup", () =>
    {
        var myNode = document.getElementById("myList");
        while (myNode.firstChild) 
        {
            myNode.removeChild(myNode.firstChild);
        }

        var value = $('#listSearch').val().toLowerCase();
        JSON.parse(savedDatabase).forEach((bottle, index, arr)=>
        {
            if((value != "")&&(bottle.name.toLowerCase().indexOf(value) >= 0))
            {
                var node = document.createElement("LI"); 
                node.className = "list-group-item";
                var textnode = document.createTextNode(bottle.name);
                node.appendChild(textnode); 
                document.getElementById("myList").appendChild(node);
            }
        });
    });
};