jQuery.sap.declare("HCMMissingTimesheets.utils.FormatHelper");

FormatHelper = {
	addThousandSeparator: function(value)
	{
		if(value.length > 3)
			
		
		return value;
	},
	
	getPath: function()
	{
		return jQuery.sap.getModulePath("HCMMissingTimesheets");
	},
	
	getWashingtonDate: function(date)
	{
		return new Date(date.getTime()+ (3 * 3600000));
	}
};
