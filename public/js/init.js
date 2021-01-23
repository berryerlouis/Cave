

$(function() {
    
    if($('#container_bottles').html())
    {
        getBottles();
        $(window).on("scroll",function () 
        {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 100)
            {
                appendData();
            }
            /*else if($(window).scrollTop() == 0)
            {
                document.getElementById('container_bottles').innerHTML = "";
                appendData();
            }*/
        });
        function appendData() {
            var html = '';
            showBottles(filteredDatabase);
            
        }
    }
});


