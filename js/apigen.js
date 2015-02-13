var invalidJsonSyntax = true;
var validAPIJSON = true;

$(document).ready(function() 
{
	initAPIData();

	if(invalidJsonSyntax)
	{
		errorMessage("Syntax error on APISpec.json");
	}
	else
	{
		loadAPI(json);
	}
});


function initAPIData()
{
	$.getJSON("APISpec.json", function(json) 
	{
		invalidJsonSyntax	= false;
	});
}


function loadAPI(json)
{
	html = parseAPIJSON();

	if(validAPIJSON)
	{

	}
}


function parseAPIJSON(json)
{
	if(json.hasOwnProperty('type'))
	{
		else if(json.type === 'category')
		{
			if(json.hasOwnProperty('sublevels'))
			{
				for(var i=0;i<json.sublevels.length;i++)
				{
					
					

				}
			}
			else
			{
				validAPIJSON = false;
			}
		}
		else if(json.type === 'method')
		{
			
		}
		else
		{
			validAPIJSON = false;
		}
	}
	else
	{
		validAPIJSON = false;
	}

	return html;
}



function errorMessage(msg)
{
	setTimeout(function()
	{
		$('#error-label').html(msg);
		$('#error-alert').fadeIn("slow");
		setTimeout(function()
		{
			$('#error-alert').fadeOut("slow");
		}, 2000);
	}, 2000)
}