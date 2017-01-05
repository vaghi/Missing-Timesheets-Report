jQuery.sap.declare("HCMMissingTimesheets.utils.DeviceHelper");

DeviceHelper = {
	loadModel: function()
	{
        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setData({
			isPhone: sap.ui.Device.system.phone,
			isTablet: sap.ui.Device.system.tablet,
			isDesktop: sap.ui.Device.system.desktop
        });
		sap.ui.getCore().byId("App").setModel(jsonModel, "Device");
	},

	isPhone: function()
	{
		return sap.ui.getCore().byId("App").getModel("Device").getData().isPhone;
	},
	
	isTablet: function()
	{
		return sap.ui.getCore().byId("App").getModel("Device").getData().isTablet;
	},
	
	isDesktop: function()
	{
		return sap.ui.getCore().byId("App").getModel("Device").getData().isDesktop;
	}
};
