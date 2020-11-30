
var video = null;

var closeCamera = function( data )
{
    video.srcObject.getTracks().forEach(function(track) 
    {
        track.stop();
    });
}


var openCamera = function( data )
{
    $('#modalAddForm').on('hide.bs.modal', function (e) 
    {
        try{

            closeCamera();
        }
        catch (err)
        {

        }
    });

    // Grab elements, create settings, etc.
    video = document.getElementById('video');
    var mediaConfig =  
    {
        video: {
            video: true,
            width: {
                min: 320,
                max: 640,
            },
            height: {
                min: 240,
                max: 480
            },
            facingMode: "environment"
              //facingMode: 'user'
        }
    };

    // Put video listeners into place
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) 
    {
        navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) 
        {
            video.srcObject = stream;
            video.play();
        });
    
        
        const loop = classifier => 
        {
            classifier.classify().then(results => 
            {
                if($('.modal.show').length > 0)
                {
                    var canvas = document.getElementById('canvas');
                    var context = canvas.getContext('2d');
                    
                    //only if bottle
                    if((results[0].label.search("bottle") != -1) && ( results[0].confidence > 0.4 ))
                    {
                        context.drawImage(video, 0, 0, 320, 240);
                    }
                    loop(classifier);
                }
            });
        };
        ml5.imageClassifier("MobileNet", video).then(classifier => loop(classifier));   
    } 
    else
    {
        $('.statusModalMsg').html('<span style="color:red;">Camera erreur !</span>');   
    }
}

