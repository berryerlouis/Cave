

$(function() {
    
    if($('#container_bottles').html())
    {
        getBottles();
        $(window).on("scroll",function () 
        {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100)
            {
                showBottles(filteredDatabase);
            }
        });
    }
});


