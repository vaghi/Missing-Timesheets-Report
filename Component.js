jQuery.sap.declare("HCMMissingTimesheets.Component");
//jQuery.sap.includeStyleSheet("css/styles.css");
jQuery.sap.require("HCMMissingTimesheets.utils.MessageBoxHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.ProxyHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.NavigationHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.BusyDialogHelper");
jQuery.sap.require("HCMMissingTimesheets.services.HCMService");
jQuery.sap.require("HCMMissingTimesheets.services.OrgUnitService");
jQuery.sap.require("HCMMissingTimesheets.services.PersonnelService");
jQuery.sap.require("HCMMissingTimesheets.utils.i18nTranslationHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.ExcelExportHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.TreeHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.StyleHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.DeviceHelper");
jQuery.sap.require("HCMMissingTimesheets.utils.FormatHelper");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");
jQuery.sap.require("sap.ui.model.odata.CountMode");


//C3
//jQuery.sap.includeStyleSheet("lib/c3/c3.css");
jQuery.sap.require("HCMMissingTimesheets.lib.d3.d3_v3_min");
jQuery.sap.require("HCMMissingTimesheets.lib.c3.c3_min");

sap.ui.core.UIComponent.extend("HCMMissingTimesheets.Component", {

	metadata: {
		library: "HCMMissingTimesheets",
		includes: [
		   "css/styles.css",
           "lib/c3/c3.css"
		],
		dependencies : {
			libs: [
			   "sap.m",
			   "sap.ui.commons"
			]
		}
	},
	
    createContent: function() {

        // create root view
        var view = sap.ui.view({
            id: "App",
            viewName: "HCMMissingTimesheets.views.App",
            type: "JS",
            viewData: {
                component: this
            }
        });

        //traducciones
        var i18nModel = new sap.ui.model.resource.ResourceModel({
            bundleName: "HCMMissingTimesheets.i18n.i18n"
        });
        this.setModel(i18nModel, "i18n");
        
        DeviceHelper.loadModel();

        //Cargo el modelo del Resultado de la grilla
        var oResultsModel = new sap.ui.model.json.JSONModel();
        oResultsModel.setData({
            "Results": [],
            "Summary": {
                "AmountRecords": 0,
                "TotalMissingHours": 0,
                "TotalHours" : 0,
                "Digest": [{
                    "Name": "Missing",
                    "Value": 0
                }, {
                    "Name": "Under Day",
                    "Value": 0
                }, {
                    "Name": "Under",
                    "Value": 0
                }]
            }
        });
        this.setModel(oResultsModel, "Results");


        //title
        document.title = i18nModel.getResourceBundle().getText("AppTitle");

        //results
        HCMService.loadModel();
        OrgUnitService.loadModel();
        return view;
    }
});
