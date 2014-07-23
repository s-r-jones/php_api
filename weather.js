$(document).ready(function()
{
    $("#weatherForm").validate(
    {
        rules:
        {
            city:
            {
                pattern: /^[^";@#\$&\*]+$/
            }
        
        },

        messages:
        {
            city:
            {
                pattern: "Illegal characters detected"
            }
            
        },

        submitHandler: function(form)
        {
            $(form).ajaxSubmit(
            {
                type: "GET",
                url: "php_api.php",
                success: function(ajaxOutput)
                {
                    $("#outputArea").html(ajaxOutput);
                }
            });
        }
    });
    
    $("#useGps").change(function()
    {
            // always verify if the browser supports geolocation
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(getPosition, errorCallBack);
        }
        //not supported
        else
        {
            $("#outputArea").html("Geolocation not supported");
        }
    });                               
});

/**
 * callback function for a successful attempt at geolocation
 *
 * @param object containing geolocation data
 **/
function getPosition(position)
{
    // set the form values to the location data
    $("#latitude").val(position.coords.latitude);
    $("#longitude").val(position.coords.longitude);
    
    console.log(position.coords.latitude + ", "+position.coords.longitude)
    
}

/**
 *callback function for an unsuccessful attempt at geolocation
 *
 *@param error code describing what went wrong
 **/

function errorCallBack(error)
{
    // set up repetitive variables
    var outputId = "#outputArea";
    var errorCode = error.code;
    
    // go through the different error conditions
    if (error.PERMISSION_DENIED)
    {
        $(outputId).html("User declind geolocation");
    }
    else if (errorCode === error.POSITION_UNAVAILABLE) 
    {
        $(outputId).html("Geolocation unavailable");
    }
    else if (errorCode === error.TIMEOUT) 
    {
        $(outputId).html("Geolocation request timed out");
    }
    else if (errorCode === error.UNKNOWN_ERROR) 
    {
        $(outputId).html("An unknown error occured");
    }
}














