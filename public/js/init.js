var ma_page;

$(function() {
    ma_page = 0;
    //getBottles(document.getElementById('db').innerHTML.replace("Mes ",""));
});

function pageMinus()
{
    if(ma_page > 0)
    {
        showBottles(filteredDatabase, ma_page-1);
    }
}

function pagePlus()
{
    if(ma_page < filteredDatabase.length/4 - 1  )
    {
        showBottles(filteredDatabase, ma_page +1);
    }
}