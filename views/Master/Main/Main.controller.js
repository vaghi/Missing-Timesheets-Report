sap.ui.controller("HCMMissingTimesheets.views.Master.Main.Main", {
	
	_jsonMode: true,
	
  	onInit: function(){
  		
    },

  	onAfterRendering: function() {
      if(DeviceHelper.isDesktop())
        StyleHelper.initFix();
    },
    
    checkForOrgUnitModel: function() {
    	if(OrgUnitService.loadModel())
		{
    		TreeHelper.loadTreeModel("treeOrganizationUnit",OrgUnitService.loadModel());
    		return true;
		}
    	
    	return false;
    },
    
    onChangePersonnelCheckBox: function(evt) {
    	var treeOrg = sap.ui.getCore().byId("treeOrganizationUnit");
    	var chkBoxPersonnel = evt.getSource();
    	var cboPersonnel = sap.ui.getCore().byId("cboPersonnel");
    	
    	if(chkBoxPersonnel.getSelected())
    	{
    		cboPersonnel.setEnabled(true);
    		if(treeOrg.getSelection())
			{
    			BusyDialogHelper.open("Loading","LoadingPersonnel");
        		PersonnelService.loadModel(treeOrg.getSelection().sId.replace('n',''));
			}
    	}
    	else
    		cboPersonnel.setEnabled(false);
    },
    
    onTreeSelectionChange: function()
    {
    	var treeOrg = sap.ui.getCore().byId("treeOrganizationUnit");
    	
    	var chkBoxPersonnel = sap.ui.getCore().byId("checkBoxPersonnel");
    	if(chkBoxPersonnel.getSelected())
		{
    		BusyDialogHelper.open("Loading","LoadingPersonnel");
    		PersonnelService.loadModel(treeOrg.getSelection().sId.replace('n',''));
		}
    },

    onSearch: function(oEvent) {
        //Valido que el usuario haya ingresado el rango de fechas
        var oDateRange = sap.ui.getCore().byId("rangeDates");

        if( (oDateRange.getDateValue() === null) || (oDateRange.getSecondDateValue() === null)){
          MessageBoxHelper.showAlert('AppTitle', 'PleaseEnterAValidDateRange');
          return;
        }
        
        var treeOrganizationUnit = sap.ui.getCore().byId("treeOrganizationUnit");
        
        if(!treeOrganizationUnit.getSelection()){
            MessageBoxHelper.showAlert('AppTitle', 'PleaseEnterAValidOrganizationUnit');
            return;
        }

        //Finalicé la validación, ahora puede comenzar la búsqueda
        BusyDialogHelper.open('PleaseWait', 'YourReportIsBeingGenerated');

        //Cargo los filtros de la consulta
        var oFilters = [];

        //Rango de fechas

        oFilters.push(new sap.ui.model.Filter('I_PviBegda', sap.ui.model.FilterOperator.EQ, oDateRange.getDateValue()));
        oFilters.push(new sap.ui.model.Filter('I_PviEndda', sap.ui.model.FilterOperator.EQ, oDateRange.getSecondDateValue() ));

        //Status
        //var oCboStatus = sap.ui.getCore().byId("cboStatus");
        oFilters.push(new sap.ui.model.Filter('I_PviStat2', sap.ui.model.FilterOperator.EQ, "3"));

        //se quita la 'n' al id que se puso al crear el nodo del arbol. Ref: TreeHelper - linea 69
        var id = treeOrganizationUnit.getSelection().sId.replace('n','')
        oFilters.push(new sap.ui.model.Filter('I_PviOrgeh', sap.ui.model.FilterOperator.EQ, id )); //'0000000'));


        if( treeOrganizationUnit.getSelection().sId !== ""){
          //Personnel
        	var chkBoxPersonnel = sap.ui.getCore().byId("checkBoxPersonnel");
        	var cboPersonnel = sap.ui.getCore().byId("cboPersonnel");
        	if(chkBoxPersonnel.getSelected() && cboPersonnel.getSelectedKey())
    		{
        		oFilters.push(new sap.ui.model.Filter('I_Pti_Pernr', sap.ui.model.FilterOperator.EQ, cboPersonnel.getSelectedKey() ));
    		}
        }

        //Hits per page
        var oCboMaxHits = sap.ui.getCore().byId("cboMaxHits");

        //oFilters.push(new sap.ui.model.Filter('I_PviSachz',sap.ui.model.FilterOperator.EQ, new Date()));
        
        //busqueda en cascada
        var checkBoxSubOrg = sap.ui.getCore().byId("checkBoxTreeOrgUnit");
        if(!checkBoxSubOrg.getSelected())
			oFilters.push(new sap.ui.model.Filter('I_Pvi_Org_Son', sap.ui.model.FilterOperator.EQ, '' ));
        else
			oFilters.push(new sap.ui.model.Filter('I_Pvi_Org_Son', sap.ui.model.FilterOperator.EQ, 'X' ));
        
        var oModel = this.getView().getModel('HCMTimeSheetModel');

        if(this._jsonMode)
    	{
        	var reportModel = new sap.ui.model.json.JSONModel();
        	reportModel.loadData("data/test.json", "", false);
        	
        	var data = {"results" : reportModel.getData().ReportSet};
        	
        	var personnel = sap.ui.getCore().byId("cboPersonnel").getSelectedItem();
        	if(personnel && personnel.getKey())
        	{
        		var filteredData = {"results" : []};
        		
        		for(var r in data.results)
    			{
        			if(data.results[r].Pernr.indexOf(personnel.getKey()) > -1)
    				{
        				filteredData.results.push(data.results[r]);
    				}
    			}
        		this.onSuccessSearch(filteredData);
        	}
        	else
        		this.onSuccessSearch(data);
    	}
        else
    	{
        	oModel.read('/ReportDetailSet', {
                filters: oFilters,
                //urlParameters: '$top=' + oCboMaxHits.getSelectedKey(), //sin limite a pedido de Pablo
                success: jQuery.proxy(this.onSuccessSearch, this),
                error: jQuery.proxy(this.onErrorSearch, this)
            });
    	}
    },
    
    onErrorSearch: function(error)
    {
    	var errorMessage = $(error.response.body).find("message").text();
    	var errorMessage2 = error.message;
        
        var errorShowed = errorMessage ? errorMessage : errorMessage2;
        
        MessageBoxHelper.onError("Error", errorShowed, error.response.body);
    },

    onSuccessSearch: function(data, response) {
			var oResultsModel = this.getView().getModel('Results');

      //Calculo de summary. Esta es la forma que debe tener
      /*"Summary": {
          "AmountRecords": 50,
          "TotalMissingHours": 342,
          "Digest": [{
              "Name": "Missing",
              "Value": 40
          }, {
              "Name": "Under Day",
              "Value": 72
          }, {
              "Name": "Under",
              "Value": 130
          }]
      }*/
      var oSummary = {};

      oSummary.AmountRecords = data.results.length;
      oSummary.TotalMissingHours = 0;
      oSummary.TotalHours = 0;
      oSummary.TotalCompleted = 0;
      oSummary.Digest = [{
          "Name": "Missing",
          "Value": 0
      }, {
          "Name": "Under Day",
          "Value": 0
      }, {
          "Name": "Under",
          "Value": 0
      },{
          "Name": "Other",
          "Value": 0
      }];
      $.each( data.results, function( index, value ) {
        oSummary.TotalMissingHours += (+value.Diff); //Se pone el + para que convierta a integer el string.
        oSummary.TotalHours += (+value.MinHs);
        oSummary.TotalCompleted += (+value.Catshours);
        switch (value.Status) {
          case "MISSING":
            oSummary.Digest[0].Value += 1;
            break;
          case "UNDERDAY":
            oSummary.Digest[1].Value += 1;
            break;
          case "UNDER":
            oSummary.Digest[2].Value += 1;
            break;
          default:
            oSummary.Digest[3].Value += 1;
          break;

        }
      });

		//Aca hay que hacer el create summary a mano
		//Estoy obteniendo los resultados del servicio
		oResultsModel.setProperty('/Results', data.results);
		oResultsModel.setProperty('/Summary', oSummary);

		//TODO: Consultar con John si esto esta OK.
		sap.ui.getCore().byId("App").setModel(oResultsModel, "Results");
		//PieChartHelper.updateData();

		oResultsModel.updateBindings(true);
		//sap.ui.getCore().byId("ChartView").getController().updateTextSize();
		
		if(DeviceHelper.isPhone())
		{
			sap.ui.getCore().byId("app").hideMaster();
		}

        if(sap.ui.getCore().byId("Results") && DeviceHelper.isPhone())
        {
            $("#Results").show("fade");
            $("#Search").hide("fade");
        }
        else
    	{
        	NavigationHelper.to({ pageId: "HCMMissingTimesheets.views.Detail.Results.Results" });
        	var table = sap.ui.getCore().byId("tblResults");
        	if(table)
        		table.removeSelections()
    	}
            

		BusyDialogHelper.close();
    },
    
    onOpenPersonnelDialog: function (oEvent) {
    	
    	//capturo si la accion viene del boton de buscar
    	if(!(oEvent.getParameter("refreshButtonPressed") == false))
    		return false;
    	
    	var orgTree = sap.ui.getCore().byId("treeOrganizationUnit");
    	if(!orgTree.getSelection())
		{
    		MessageBoxHelper.showAlert("Warning","PleaseSelectAnOrganizationUnit");
    		return false;
		}

        var dialog = new sap.m.Dialog({
            id: "dialogPersonnel",
            title: "{i18n>SelectPersonnel}",
            type: sap.m.DialogType.Message,
            afterClose: function () {
                this.destroy();
            },
            content: [
                new sap.m.VBox({
                    items: [
                        sap.ui.jsview("DialogPersonnel", "HCMMissingTimesheets.views.Master.Personnel.DialogPersonnel"),
                    ]
                })
            ],
            endButton: new sap.m.Button({
                icon: FormatHelper.getPath() + "/img/white/close.png",
                press: function () {
                    var dialog = sap.ui.getCore().byId("dialogPersonnel");
                    dialog.close();
                }
            }),
        }).addStyleClass("dialogCustom");	
        //setea modelos
        dialog.setModel(sap.ui.getCore().byId("App").getModel("i18n"), "i18n");
        dialog.open();
    },
    
    onOrgUnitSearch: function(evt)
	{
		id = evt.getParameter("value");
		if(id.length < 3)
			return false;
		
		var tree = sap.ui.getCore().byId("treeOrganizationUnit");
		var treeNodes = tree.getNodes();
		
		var node = TreeHelper.recursiveSearch(id.toUpperCase(), treeNodes);
		
		if(node)
		{
			tree.expandAll();
			setTimeout(function(){
				$("#" + node.sId + " span").click();
				$("#inputSearchOrgUnit input").focus();
			},20)
		}
			
	},
	
	onSelectDate: function()
	{
		var checkBoxPersonnel = sap.ui.getCore().byId("checkBoxPersonnel");
		if(!checkBoxPersonnel.getEnabled())
			checkBoxPersonnel.setEnabled(true);
	}
});
