jQuery.sap.declare("HCMMissingTimesheets.services.PersonnelService");

PersonnelService = {

	_jsonMode: true,
		
	selectedPersonnelKey: null,

    _storeModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "PersonnelModel");
    },
    _loadServiceODataModel: function (orgUnit)
    {	
        //llama a servicio
        var url = ProxyHelper.getUrl("/sap/opu/odata/sap/Z_HCM_MISSING_TIMESHEET_SRV/");
        var odataModel = sap.ui.getCore().byId("App").getModel("HCMTimeSheetModel");
        
        var aFilters = [];
        if(orgUnit != "All")
    	{
        	orgUnit = orgUnit.replace('n','');
        	aFilters.push(new sap.ui.model.Filter('I_Orgeh', sap.ui.model.FilterOperator.EQ, orgUnit));
    	}
        
        var oDateRange = sap.ui.getCore().byId("rangeDates");
        
        if(oDateRange.getDateValue() && oDateRange.getSecondDateValue())
    	{
        	aFilters.push(new sap.ui.model.Filter('I_Begda', sap.ui.model.FilterOperator.EQ, oDateRange.getDateValue()));
            aFilters.push(new sap.ui.model.Filter('I_Endda', sap.ui.model.FilterOperator.EQ, oDateRange.getSecondDateValue() ));
    	}
        
        var subOrgCheckBox = sap.ui.getCore().byId("checkBoxTreeOrgUnit");
        if(subOrgCheckBox.getSelected())
        	aFilters.push(new sap.ui.model.Filter('I_Org_Son', sap.ui.model.FilterOperator.EQ, 'X'));
        else
        	aFilters.push(new sap.ui.model.Filter('I_Org_Son', sap.ui.model.FilterOperator.EQ, ''));
        
        /*odataModel.read("/EmployeeSet?$filter=I_Orgeh eq '" + orgUnit + "'", null, "", true,
        	
            jQuery.proxy(this._readODataOnSuccess, this),
            jQuery.proxy(this._readODataOnError, this));*/
        
        odataModel.read("/EmployeeSet", {
        	//urlParameters: '$top=100',
        	filters: aFilters,
        	success: jQuery.proxy(this._readODataOnSuccess, this),
        	error:jQuery.proxy(this._readODataOnError, this),
        	async: true
        });
    },
    
    _loadJsonDataModel: function()
    {
    	//modelo
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("data/personnel.json", '', false);
    	
    	var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setSizeLimit(999999);
        jsonModel.setData({
            PersonnelSet: oModel.getData().PersonnelSet
        });
        
        this._storeModel(jsonModel);
        /*var dialogPersonnel = sap.ui.getCore().byId("DialogPersonnel").getController();
        dialogPersonnel.onModelLoaded();*/
        jsonModel.updateBindings();
        
        BusyDialogHelper.close();
    },

    _readODataOnSuccess: function (data, response)
    {

        function compare(a,b){
          if(a.Ename < b.Ename)
            return -1;
          else if (a.Ename > b.Ename)
            return 1;
          else
            return 0;
        }
        //Hago el sort primero
        data.results.sort(compare);

        //Le pongo el all
        data.results.splice(0,0,{"Pernr":"", "Emnam":"All"});

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setSizeLimit(999999);
        jsonModel.setData({
            PersonnelSet: data.results
        });
        this._storeModel(jsonModel);
        /*var dialogPersonnel = sap.ui.getCore().byId("DialogPersonnel").getController();
        dialogPersonnel.onModelLoaded();*/
        jsonModel.updateBindings();
        
        BusyDialogHelper.close();
    },

    _readODataOnError: function (error)
    {
        var errorMessage = $(error.response.body).find("message").text();
        var errorMessage2 = error.message;
        
        var errorShowed = errorMessage ? errorMessage : errorMessage2;
        MessageBoxHelper.onError("Error", errorShowed, error.response.body);
    },

    loadModel: function (orgUnit) {

    	if(OrgUnitService._jsonMode)
    		this._loadJsonDataModel();
    	else
    		this._loadServiceODataModel(orgUnit);

    }

};
