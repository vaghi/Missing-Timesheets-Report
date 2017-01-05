jQuery.sap.declare("HCMMissingTimesheets.utils.StyleHelper");

StyleHelper = {
	initFix : function() {
		
		//deshabilito el input del searchfield para q solo se utilize al clickear la lupa
		/*var searchFieldPersonnel = document.getElementById("searchFieldPersonnel-I");
		if(searchFieldPersonnel)
			searchFieldPersonnel.disabled = true;*/
		
		// Internet Explorer 6-11
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		
		if(isIE)
			StyleHelper.fixIEStyle();
	},
	
	fixIEStyle: function() {
		//fix margin-left de boxFilters
		var boxFilters = document.getElementById("boxFilters");
		
		if(boxFilters)
		{
			boxFilters.style["margin-left"] = "0px";
			setTimeout(function() {
				boxFilters.style["margin-left"] = "20px";
			}, 100);
		}
		
		//fix placeHolder que no se borra en datePicker
		var labelPlaceholder = document.getElementById("rangeDates-placeholder");
		if(labelPlaceholder)
			labelPlaceholder.style["visibility"] = "hidden";
		
		var input = document.getElementById("rangeDates-inner");
		if(input)
			input.placeholder = "d/M/yy - d/M/yy";
	},
	
	updateTextSize: function()
    {
    	var spans = document.getElementsByClassName("updateTextSize");
    	var lowestSize = 7;
    	
    	for(var i = 0; i < spans.length; i++)
    	{	
    		var fontSize = lowestSize;
    		spans[i].style.fontSize = lowestSize + "em";
    		if(spans[i].offsetWidth > spans[i].parentNode.offsetWidth)
			{
    			while( spans[i].offsetWidth > spans[i].parentNode.offsetWidth ) {
        	        fontSize -= 1;
        	        spans[i].style.fontSize = fontSize + "em";
        	    }
    			
    			//si el actual span necesita una fuente mas chica entonces la seteo como la mas
    			//chica y se la asigno a los anteriores spans
    			if (fontSize < lowestSize)
				{
    				lowestSize = fontSize;
    				for(var j = i - 1; j > -1; j--)
    					spans[j].style.fontSize = lowestSize + "em";
				}		
			}
    	}
    },
};
