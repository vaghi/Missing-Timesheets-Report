jQuery.sap.declare("HCMMissingTimesheets.services.OrgUnitService");

OrgUnitService = {
		
	_jsonMode: true,

    _storeModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "OrgUnitModel");
        TreeHelper.loadTreeModel("treeOrganizationUnit", sap.ui.getCore().byId("App").getModel("OrgUnitModel").getData().OrganizationUnits);
    },
    _loadServiceODataModel: function ()
    {
    	//hardocdeo para arbol completo
        var oFilters = [];
        oFilters.push(new sap.ui.model.Filter('I_Full_Structure', sap.ui.model.FilterOperator.EQ, 'X' ));
    	
        //llama a servicio
        var url = ProxyHelper.getUrl("/sap/opu/odata/sap/Z_HCM_MISSING_TIMESHEET_SRV/");
        var odataModel = sap.ui.getCore().byId("App").getModel("HCMTimeSheetModel");
        odataModel.read("/OrganizationUnitSet", {
        	filters: oFilters,
        	success: jQuery.proxy(this._readODataOnSuccess, this),
        	error:jQuery.proxy(this._readODataOnError, this),
        	async: true
        });
    },

    _loadJsonDataModel: function()
    {
    	//modelo
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("data/orgUnits.json", '', false);
        
        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setSizeLimit(999999);
        jsonModel.setData({
            OrganizationUnits: oModel.getData().OrgUnits
        });
        
        this._storeModel(jsonModel);
    },
    
    _readODataOnSuccess: function (data, response)
    {
        function compare(a,b){
          if(a.Orgtx < b.Orgtx)
            return -1;
          else if (a.Orgtx > b.Orgtx)
            return 1;
          else
            return 0;
        }
        //Hago el sort primero
        data.results.sort(compare);

        //Le pongo el any
        data.results.splice(0,0,{"Orgeh":"", "Orgtx":"Any"});

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setSizeLimit(999999);
        jsonModel.setData({
            OrganizationUnits: data.results
        });

        this._storeModel(jsonModel);
    },

    _readODataOnError: function (error)
    {
    	var tree = sap.ui.getCore().byId("treeOrganizationUnit");
    	tree.setBusy(false);
    	
        var errorMessage = $(error.response.body).find("message").text();
        var errorMessage2 = error.message;
        
        var errorShowed = errorMessage ? errorMessage : errorMessage2;
        
        MessageBoxHelper.onError("Error", errorShowed, error.response.body);
    },

    loadModel: function () {
    	var tree = sap.ui.getCore().byId("treeOrganizationUnit");
    	tree.setBusy(true);
        
    	if(OrgUnitService._jsonMode)
    		this._loadJsonDataModel();
    	else
    		this._loadServiceODataModel();
    }
};
