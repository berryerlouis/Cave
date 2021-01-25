var filteredDatabase;

function showFilteredBottles(type,filter)
{
    let bottles = [];
    if(filter == "All")
    {
        showBottles(savedDatabase);
        filteredDatabase = savedDatabase;
        
        document.getElementById('dropdownFilterGenreButton').innerHTML = "Genre";
        document.getElementById('dropdownFilterPaysButton').innerHTML = "Pays";
        document.getElementById('dropdownFilterNoteButton').innerHTML = "Note";
    }
    else if(type == 'genre')
    {
        if( document.getElementById('dropdownFilterGenreButton').innerHTML != "Genre" )
        {
            filteredDatabase = savedDatabase;
        }
        filteredDatabase.forEach(element =>
        {
            if(filter == element.genre)
            {
                bottles.push(element);
            }
        });
        showBottles(bottles);
        filteredDatabase = bottles;
        document.getElementById('dropdownFilterGenreButton').innerHTML = filter;
    }
    else if(type == 'pays')
    {
        if( document.getElementById('dropdownFilterPaysButton').innerHTML != "Pays" )
        {
            filteredDatabase = savedDatabase;
        }
        filteredDatabase.forEach(element =>
        {
            if(filter == element.pays)
            {
                bottles.push(element);
            }
        });
        showBottles(bottles);
        filteredDatabase = bottles;
        document.getElementById('dropdownFilterPaysButton').innerHTML = filter;
    }
    else if(type == 'note')
    {
        if( document.getElementById('dropdownFilterNoteButton').innerHTML != "Note" )
        {
            filteredDatabase = savedDatabase;
        }
        const note = parseInt(filter);
        if (isNaN(note)) { return ; }
        else
        {
            filteredDatabase.forEach(element =>
                {
                    if(filter == element.note)
                    {
                        bottles.push(element);
                    }
                });
            showBottles(bottles);
            filteredDatabase = bottles;
            document.getElementById('dropdownFilterNoteButton').innerHTML = filter;
        }
    }
}

function addFilters(){
    filteredDatabase = savedDatabase;

    if(document.getElementById('db')!= null)
    {
        let div = document.getElementById('dropdownFilterGenreButtonItems');
        div.innerHTML = `<a class="dropdown-item" onclick="showFilteredBottles('genre','All')">Tout</a>`;
        div.innerHTML += `<div class="dropdown-divider"></div>`;
        let find = false;
        let genres = [];
        filteredDatabase.forEach(element => {
            find = false;
            genres.forEach(e => {
                if(e == element.genre)
                {
                    find=true;
                }
            });
            if(find == false)
            {
                genres.push(element.genre);
                div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('genre',\'${element.genre}\')">${element.genre}</a>`;
            }
        });

        div = document.getElementById('dropdownFilterPaysButtonItems');
        div.innerHTML = `<a class="dropdown-item" onclick="showFilteredBottles('pays','All')">Tout</a>`;
        div.innerHTML += `<div class="dropdown-divider"></div>`;
        find = false;
        genres = [];
        filteredDatabase.forEach(element => {
            find = false;
            genres.forEach(e => {
                if(e == element.pays)
                {
                    find=true;
                }
            });
            if(find == false)
            {
                genres.push(element.pays);
                div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('pays',\'${element.pays}\')">${element.pays}</a>`;
            }
        });

        div = document.getElementById('dropdownFilterNoteButtonItems');
        div.innerHTML = `<a class="dropdown-item" onclick="showFilteredBottles('note','All')">Tout</a>`;
        div.innerHTML += `<div class="dropdown-divider"></div>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','5')">5</a>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','4')">4</a>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','3')">3</a>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','2')">2</a>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','1')">1</a>`;
        div.innerHTML += `<a class="dropdown-item" onclick="showFilteredBottles('note','0')">0</a>`;
    }
}