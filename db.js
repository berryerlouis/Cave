
const e = require('express');
let fs = require('fs');


exports.readAll = function (database, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) => {

        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);
    
            // print all databases
            cb(bottlesDatabase.bottles);
        }
    });
}

exports.read = function (database,name, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) => {

        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);
    
            //get the right bottle
            for( let i = 0 ; i < bottlesDatabase.bottles.length ; i++)
            {  
                if(bottlesDatabase.bottles[i].name == name)
                {
                    cb(bottlesDatabase.bottles[i])
                    break;
                }
            }
        }
    });
}


exports.write = function (database,bottle, edit, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) =>
    {    
        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);

            let findBottle = false;
            for( let i = 0 ; i < bottlesDatabase.bottles.length ; i++)
            {  
                if(bottlesDatabase.bottles[i].name == bottle.name)
                {
                    findBottle = true;
                    if(edit)
                    {
                        bottlesDatabase.bottles[i].qty = parseInt(bottle.qty) + 1;
                        bottlesDatabase.bottles[i].name = bottle.name;
                        bottlesDatabase.bottles[i].age = bottle.age;
                        bottlesDatabase.bottles[i].alcool = bottle.alcool;
                        bottlesDatabase.bottles[i].photo = bottle.photo;
                        bottlesDatabase.bottles[i].distillerie = bottle.distillerie;
                        bottlesDatabase.bottles[i].address = bottle.address;
                        bottlesDatabase.bottles[i].message = bottle.message;
                    }
                    else
                    {
                        cb("<span style=\"color:red;\">Cette bouteille existe déja!</p>");
                        return;
                    }
                    break;
                 }
            }

            if(!findBottle)
            {
                if(edit)
                {
                    cb("<span style=\"color:red;\">Cette bouteille n'existe pas!</p>");
                    return;
                }
                bottlesDatabase.bottles.push({
                    qty : 0,
                    name : bottle.name,
                    age : bottle.age,
                    alcool : bottle.alcool,
                    photo : bottle.photo,
                    distillerie : bottle.distillerie,
                    address : bottle.address,
                    message : bottle.message
                });
            }

            //save image
            const base64Data = bottle.photo.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            const path = 'images/pictures/'+bottle.name+'.png';
            fs.writeFileSync('./public/'+path, bottle.photo,  {encoding: 'base64'});

            // write new data back to the file
            fs.writeFile("./db/"+database+".json", JSON.stringify(bottlesDatabase, null, 4), (err) => 
            {
                if (err)
                {
                    console.log(`Error writing file from disk: ${err}`);
                }
                else
                {
                    cb("<span style=\"color:green;\">Nouvelle bouteille enregistrée !</p>");
                }
            });
        }
    });
}




exports.addBottleQty = function (database,bottle, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) =>
    {    
        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);

            let findBottle = false;
            for( let i = 0 ; i < bottlesDatabase.bottles.length ; i++)
            {  
                if(bottlesDatabase.bottles[i].name == bottle.name)
                {
                    findBottle = true;
                    bottlesDatabase.bottles[i].qty = parseInt(bottle.qty);
                    break;
                 }
            }
            // write new data back to the file
            fs.writeFile("./db/"+database+".json", JSON.stringify(bottlesDatabase, null, 4), (err) => 
            {
                if (err)
                {
                    console.log(`Error writing file from disk: ${err}`);
                }
                else
                {
                    cb(true);
                }
            });
        }
    });
}

exports.getNbBottles = function (database, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) =>
    {    
        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);
            let nbBottles = 0;
            for( let i = 0 ; i < bottlesDatabase.bottles.length ; i++)
            {  
                nbBottles += parseInt(bottlesDatabase.bottles[i].qty)
            }
            
            cb(nbBottles);
        }
    });
}

exports.remove = function (database,bottle, cb)
{
    fs.readFile("./db/"+database+".json", 'utf8', (err, data) =>
    {    
        if (err) 
        {
            console.log(`Error reading file from disk: ${err}`);
        } 
        else 
        {
    
            // parse JSON string to JSON object
            const bottlesDatabase = JSON.parse(data);

            for( let i = 0 ; i < bottlesDatabase.bottles.length ; i++)
            {  
                if(bottlesDatabase.bottles[i].name == bottle.name)
                {
                    bottlesDatabase.bottles[i].qty = parseInt(bottle.qty) - 1;
                    break;
                 }
             }

            // write new data back to the file
            fs.writeFile("./db/"+database+".json", JSON.stringify(bottlesDatabase, null, 4), (err) => 
            {
                if (err)
                {
                    console.log(`Error writing file from disk: ${err}`);
                }
                else
                {
                    cb(true);
                }
            });
        }
    });
}
