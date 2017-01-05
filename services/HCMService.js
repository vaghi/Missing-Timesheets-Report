jQuery.sap.declare("HCMMissingTimesheets.services.HCMService");

HCMService = {

    _loadServiceODataModel: function ()
    {
        //llama a servicio
        var url = ProxyHelper.getUrl("/sap/opu/odata/sap/Z_HCM_MISSING_TIMESHEET_SRV/");
        var odataModel = new sap.ui.model.odata.ODataModel(url, {defaultCountMode: sap.ui.model.odata.CountMode.None});
        
        sap.ui.getCore().byId("App").setModel(odataModel, "HCMTimeSheetModel");
    },

    loadModel: function () {
        //return this._loadServiceODataModel();
    }

};
