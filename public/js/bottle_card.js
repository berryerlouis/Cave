var createBottleCard = function( bottles )
{
    //get the div for update list
    var list = document.getElementById("container_bottles").children[0];

    //remove children if existing and update with new ones
    while (list.hasChildNodes()) 
    {
        list.removeChild(list.childNodes[0]);
    }
    refreshBottleCard(bottles);
}

var refreshBottleCard = function( bottles )
{
    //get the div for update list
    var list = document.getElementById("container_bottles").children[0];
    //populate bottle
    for(let i = 0 ; i < bottles.length ; i++)
    {
        var cardBottle = document.createElement("div");
        cardBottle.className = "card bg-dark text-white";
        cardBottle.setAttribute("style", "width: 320px;margin: 10px;");

        var cardBottleImg = document.createElement("img");
        cardBottleImg.setAttribute("style", "margin: 2px;");
        cardBottleImg.className = "card-img-top-shrink";
        if(bottles[i].photo!=null)
        {
            cardBottleImg.src = bottles[i].photo;
        }
        else
        {
            cardBottleImg.src = "images/pictures/generic.jpg"; 
        }
        
        var cardBottleTitle = document.createElement("h5");
        cardBottleTitle.className = "card-title";
        cardBottleTitle.innerHTML = bottles[i].name;
        var cardBottleDistillerie = document.createElement("p");
        cardBottleDistillerie.className = "card-text";
        cardBottleDistillerie.innerHTML = bottles[i].distillerie;
        var cardBottleBody = document.createElement("div");
        cardBottleBody.className = "card-body";
        cardBottleBody.appendChild(cardBottleTitle); 
        cardBottleBody.appendChild(cardBottleDistillerie); 

        var cardBottleAge = document.createElement("li");
        cardBottleAge.className = "list-group-item bg-dark text-white";
        cardBottleAge.innerHTML = "Age : "+ bottles[i].age;
        var cardBottleAlcool = document.createElement("li");
        cardBottleAlcool.className = "list-group-item bg-dark text-white";
        cardBottleAlcool.innerHTML = "Alcool : "+ bottles[i].alcool;
        var cardBottleDistillerie = document.createElement("li");
        cardBottleDistillerie.className = "list-group-item bg-dark text-white";
        cardBottleDistillerie.innerHTML = "Nom du domaine : "+ bottles[i].distillerie;
        cardBottleDistillerie.setAttribute("style", "display: none;");
        var cardBottleAddress = document.createElement("li");
        cardBottleAddress.className = "list-group-item bg-dark text-white";
        cardBottleAddress.setAttribute("style", "display: none;");
        cardBottleAddress.innerHTML = "Adresse : "+ bottles[i].address;
        var cardBottleMessage = document.createElement("li");
        cardBottleMessage.className = "list-group-item bg-dark text-white";
        cardBottleMessage.innerHTML = "Message : "+ bottles[i].message;
        cardBottleMessage.setAttribute("style", "display: none;");
        var cardBottleUl = document.createElement("ul");
        cardBottleUl.className = "list-group list-group-flush bg-dark text-white";
        cardBottleUl.appendChild(cardBottleAge); 
        cardBottleUl.appendChild(cardBottleAlcool); 
        cardBottleUl.appendChild(cardBottleDistillerie); 
        cardBottleUl.appendChild(cardBottleAddress); 
        cardBottleUl.appendChild(cardBottleMessage); 
        
        
        var cardBottleRowFooter = document.createElement("div");
        cardBottleRowFooter.className = "row";
        var cardBottleColFooter1 = document.createElement("div");
        cardBottleColFooter1.className = "col-md-3";
        var cardBottleButtonEdit = document.createElement("button");
        cardBottleButtonEdit.className = "btn btn-secondary float-left";
        cardBottleButtonEdit.setAttribute("data-toggle", "modal");
        cardBottleButtonEdit.setAttribute("data-target", "#modalModifyForm");
        cardBottleButtonEdit.onclick = edit;
        cardBottleButtonEdit.innerHTML = "Edit";
        cardBottleColFooter1.appendChild(cardBottleButtonEdit);
        var cardBottleColFooter2 = document.createElement("div");
        cardBottleColFooter2.className = "col-md-3";
        var cardBottleButtonShow = document.createElement("button");
        cardBottleButtonShow.className = "btn btn-secondary float-right";
        cardBottleButtonShow.innerHTML = "Show";
        cardBottleButtonShow.onclick = show;
        cardBottleColFooter2.appendChild(cardBottleButtonShow);
        var cardBottleRowFooter4 = document.createElement("div");
        cardBottleRowFooter4.className = "row";
        var cardBottleColFooter3 = document.createElement("div");
        cardBottleColFooter3.className = "col-md-6";
        
        var cardBottleColFooter5 = document.createElement("div");
        cardBottleColFooter5.className = "col-md-4";
        var cardBottleColFooter6 = document.createElement("div");
        cardBottleColFooter6.className = "col-md-4";
        var cardBottleColFooter7 = document.createElement("div");
        cardBottleColFooter7.className = "col-md-4";

        var cardBottleButtonPlus = document.createElement("button");
        cardBottleButtonPlus.className = "btn btn-success float-right";
        cardBottleButtonPlus.innerHTML = "+";
        cardBottleButtonPlus.onclick = plus;
        cardBottleColFooter5.appendChild(cardBottleButtonPlus);
        var cardBottleNbBottles = document.createElement("h5");
        cardBottleNbBottles.className = "text-center";
        cardBottleNbBottles.innerHTML = bottles[i].qty;
        cardBottleColFooter6.appendChild(cardBottleNbBottles);
        var cardBottleButtonMinus = document.createElement("button");
        cardBottleButtonMinus.className = "btn btn-danger float-left";
        cardBottleButtonMinus.innerHTML = "-";
        cardBottleButtonMinus.onclick = minus;
        cardBottleColFooter7.appendChild(cardBottleButtonMinus);

        cardBottleColFooter5.appendChild(cardBottleButtonMinus);
        cardBottleColFooter6.appendChild(cardBottleNbBottles);
        cardBottleColFooter7.appendChild(cardBottleButtonPlus);

        cardBottleRowFooter4.appendChild(cardBottleColFooter5);
        cardBottleRowFooter4.appendChild(cardBottleColFooter6);
        cardBottleRowFooter4.appendChild(cardBottleColFooter7);
        cardBottleColFooter3.appendChild(cardBottleRowFooter4);
        var cardBottleFooter = document.createElement("div");
        cardBottleFooter.className = "card-body";

        cardBottleRowFooter.appendChild(cardBottleColFooter1);
        cardBottleRowFooter.appendChild(cardBottleColFooter3);
        cardBottleRowFooter.appendChild(cardBottleColFooter2);

        cardBottleFooter.appendChild(cardBottleRowFooter);

        cardBottle.appendChild(cardBottleImg); 
        cardBottle.appendChild(cardBottleBody); 
        cardBottle.appendChild(cardBottleUl); 
        cardBottle.appendChild(cardBottleFooter); 
        list.appendChild(cardBottle);               
    }
};

var plus = function( data )
{
    var db = data.path[10].children[0].children[0].children[0].children[0].children[0].innerText.replace("Mes ","");
    var bottleName = data.path[6].children[1].children[0].innerText;
    var qty = parseInt(data.path[2].children[1].children[0].innerText) +1;
    offsetBottle(db,bottleName,qty);
}

var minus = function( data )
{
    var db = data.path[10].children[0].children[0].children[0].children[0].children[0].innerText.replace("Mes ","");
    var bottleName = data.path[6].children[1].children[0].innerText;
    var qty = parseInt(data.path[2].children[1].children[0].innerText) -1;
    offsetBottle(db,bottleName,qty);
}

var edit = function( data )
{
    //img data.path[2].children[0]
    $('#inputModifyName').val(data.path[4].children[1].children[0].innerHTML);
    $('#inputModifyAge').val(data.path[4].children[2].children[0].innerHTML.replace("Age : ",""));
    $('#inputModifyAlcool').val(data.path[4].children[2].children[1].innerHTML.replace("Alcool : ",""));
    $('#inputModifyPhoto').val(data.path[4].children[0].src);
    $('#inputModifyDistillerie').val(data.path[4].children[1].children[1].innerHTML);
    $('#inputModifyAddress').val(data.path[4].children[2].children[3].innerHTML.replace("Adresse : ",""));
    $('#inputModifyMessage').val(data.path[4].children[2].children[4].innerHTML.replace("Message : ",""));
}

var show = function( data )
{
    //test if open 
    if(data.path[4].children[2].children[2].getAttribute("style").replace("display: ","").replace(";","") == "none")
    {
        data.path[4].children[2].children[2].setAttribute("style", "display: true;")
        data.path[4].children[2].children[3].setAttribute("style", "display: true;")
        data.path[4].children[2].children[4].setAttribute("style", "display: true;")
        data.path[1].children[0].innerHTML = "Hide"
    }
    else
    {
        data.path[4].children[2].children[2].setAttribute("style", "display: none;")
        data.path[4].children[2].children[3].setAttribute("style", "display: none;")
        data.path[4].children[2].children[4].setAttribute("style", "display: none;")
        data.path[1].children[0].innerHTML = "Show"
    }
}
