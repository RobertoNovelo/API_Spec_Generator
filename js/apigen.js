var invalidJsonSyntax = true;
var validAPIJSON = true;

$(document).ready(function() 
{
	initAPIData();

	// if(invalidJsonSyntax)
	// {
	// 	errorMessage("Syntax error on APISpec.json");
	// }
	// else
	// {
	// 	loadAPI(json);
	// }
});


function initAPIData()
{
	$.getJSON("APISpec.json", function(json) 
	{
		loadAPI(json);
	});
}


function loadAPI(json)
{
	var html = "";

	if(json.hasOwnProperty('APIName') && json.hasOwnProperty('APIDescription') && json.hasOwnProperty('API'))
	{
		var APIName = json.APIName;
		var APIDesc = json.APIDescription;
		for(var i=0;i<json.API.length;i++)
		{
			html += parseAPIJSON(json.API[i]);
		}
		validAPIJSON = true;
	}

	if(validAPIJSON)
	{
		$("#api-title").html(APIName);
		$("#api-description").html(APIDesc);
		$("#api-container").html(html);
	}
}


function parseAPIJSON(json)
{
	var html = "";
	if(json.hasOwnProperty('type') && json.hasOwnProperty('name'))
	{
		if(json.type === 'category')
		{
			if(json.hasOwnProperty('sublevels'))
			{
				html += '<div class="row">'+
		            			'	<div class="col-xs-11 col-xs-offset-1">'+
		                		'		<div class="api-category">'+
		                		'			<h2>/'+json.name+'</h2>';
				for(var i=0;i<json.sublevels.length;i++)
				{
					if(json.sublevels[i].type === 'method')
					{
						html+= '<div class="row"> <div class="col-xs-11 col-xs-offset-1"> <div class="api-category"> <h2>/'+json.sublevels[i].name+'</h2> <div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Params:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].params+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Response:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].response+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Error:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].type+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Description:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].description+'</h4> </div></div></div></div></div></div>';
					}
					else
					{
		                html += parseAPIJSON(json.sublevels[i]);
		            }
				}

				html += '		</div>'+
                		'	</div>'+
                		'</div>';
			}
			else
			{
				validAPIJSON = false;
			}
		}
		else if(json.type === 'method')
		{
			html+= '<div class="row"> <div class="col-xs-11 col-xs-offset-1"> <div class="api-category"> <h2>/'+json.sublevels[i].name+'</h2> <div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Params:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].params+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Response:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].response+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Error:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].type+'</h4> </div></div></div><div class="row"> <div class="col-xs-2 col-xs-offset-1"> <div class="api-category"> <h4>Description:</h4> </div></div><div class="col-xs-9"> <div class="api-category"> <h4>'+json.sublevels[i].description+'</h4> </div></div></div></div></div></div>';
					
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