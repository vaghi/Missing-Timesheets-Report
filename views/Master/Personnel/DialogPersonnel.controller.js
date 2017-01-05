jQuery.sap.require("HCMMissingTimesheets.utils.JavascriptPrototypes");


sap.ui.controller("HCMMissingTimesheets.views.Master.Personnel.DialogPersonnel", {
	
	handleSearchPersonnel: function ()
    {
        //se fija si esta OK la validacion
        if (!this.nameIsValid())
            return;

        var orgUnit = sap.ui.getCore().byId("treeOrganizationUnit").getSelection().sId.replace('#','');
        BusyDialogHelper.open('PleaseWait', 'LoadingPersonnel');
        PersonnelService.loadModel(orgUnit);
    },
	
    setControlState: function (control, hasError)
    {
        if (hasError)
            control.setValueState(sap.ui.core.ValueState.Error);
        else
            control.setValueState(sap.ui.core.ValueState.None);
    },

    nameIsValid: function ()
    {
        var isValid = true;
        var control = sap.ui.getCore().byId("txtPersonnelName");
        
        var hasError = control.getValue().length == 0;
        this.setControlState(control, hasError);
        if (hasError)
            isValid = false;
        return isValid;
    },

    onModelLoaded: function()
    {
    	var model = sap.ui.getCore().byId("App").getModel("PersonnelModel");
    	var table = sap.ui.getCore().byId("tblPersonnels");
    	
    	var control = sap.ui.getCore().byId("txtPersonnelName");
    	
    	var filter = [new sap.ui.model.Filter("Emnam", sap.ui.model.FilterOperator.Contains, control.getValue())];
    	
    	var personnelTemplate = new sap.m.ColumnListItem({
            vAlign: sap.ui.core.VerticalAlign.Middle,
            type: sap.m.ListType.Navigation,
            press: [this.handleListItemPress, this],
            cells: [
                 new sap.m.Text({ text: "{Emnam}" })
            ]
        });
    	
    	table.setModel(model);
    	table.bindItems({
    		path: "/PersonnelSet",
    		filters: filter,
    		template: personnelTemplate
    	});
    	
        BusyDialogHelper.close();
    },

    handleListItemPress: function (oEvent)
    {
        //obtiene item seleccionado
        var item = oEvent.getSource();
        //context
        var selectedCustomer = item.getBindingContext().getObject();
        //setea customer en vista principal
        sap.ui.getCore().byId("searchFieldPersonnel").setValue(selectedCustomer.Emnam);
        PersonnelService.selectedPersonnelKey = selectedCustomer.Pernr;
		
        //cierre de dialogo
        var dialog = sap.ui.getCore().byId("dialogPersonnel");
        dialog.close();
    }

});