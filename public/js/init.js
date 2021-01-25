

$(function() {
    if(document.getElementById('container_bottles'))
    {
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
        getBottles(db );
        $(window).on("scroll",function () 
        {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100)
            {
                showBottles(filteredDatabase);
            }
            else if($(window).scrollTop() > 70)
            {
                var x = document.querySelectorAll("#addBottleButton");
                x[0].style.setProperty("top", "100px", "important");
            }
            else if($(window).scrollTop() <= 70)
            {
                var x = document.querySelectorAll("#addBottleButton");
                x[0].style.setProperty("top", "36px");
            }
        });
    }
    if (document.getElementById('map')){
        getBottles("whiskies", initMapCb);
    }
    if (document.getElementById('index')){

    }
});

