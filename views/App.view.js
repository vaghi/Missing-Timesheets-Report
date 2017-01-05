sap.ui.jsview("HCMMissingTimesheets.views.App", {

	createContent: function (oController) {

	    this.setDisplayBlock(true);

	    var app = new sap.m.SplitApp({
	        id: "app",
	        //mode: sap.m.SplitAppMode.HideMode,
	        homeIcon: {
	        	'phone': FormatHelper.getPath() + '/img/favicon.png',
	        	'phone@2': FormatHelper.getPath() + '/img/favicon.png',
	        	'tablet': FormatHelper.getPath() + '/img/favicon.png',
	        	'tablet@2': FormatHelper.getPath() + '/img/favicon.png',
	        	'icon': FormatHelper.getPath() + '/img/favicon.png'
        	},
	        masterPages: [
	            sap.ui.jsview("Search", "HCMMissingTimesheets.views.Master.Main.Main")
	        ],
	        detailPages: [
	            sap.ui.jsview("EmptyResults", "HCMMissingTimesheets.views.Detail.EmptyResults.EmptyResults")
	        ]
	    });

	    

	    return app;
	}
});
