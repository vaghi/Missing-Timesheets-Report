sap.ui.jsview("HCMMissingTimesheets.views.Detail.Results.TableView.TableView", {

	getControllerName: function () {
	    return "HCMMissingTimesheets.views.Detail.Results.TableView.TableView";
	},

	createContent: function (oController) {

	    var controls = [];

	    var table = new sap.m.Table({
            id: "tblResults",
			noDataText: "{i18n>NoData}",
			mode: sap.m.ListMode.MultiSelect,
		    inset: false,
		    fixedLayout: false,
		    growing: true,
		    growingThreshold: 100,
		    growingTriggerText: "{i18n>ShowMore}",
		    columns: [
                new sap.m.Column({
                	header: new sap.m.Text({
                		text: "{i18n>Status}",
                		textAlign: sap.ui.core.TextAlign.Center
            		}),
                	hAlign: sap.ui.core.TextAlign.Center
                }),
                new sap.m.Column({ header: new sap.m.Text({ text: "{i18n>OrganizationUnit}" }) }),
                new sap.m.Column({ header: new sap.m.Text({ text: "{i18n>Personnel}" }) }),
                new sap.m.Column({
                	header: new sap.m.Text({ text: "{i18n>Difference}" }),
                	hAlign: sap.ui.core.TextAlign.End
                }),
                new sap.m.Column({ header: new sap.m.Text({ text: "{i18n>Plan}" }) })
		    ]
		});
		var template = new sap.m.ColumnListItem({
		    cells: [
	             new sap.m.Image({
	            	 src: {
	            		 parts: [{path: "Results>Status"}],
	            		 formatter: function(status) {
	            			 switch (status) {
	            			 	case "MISSING": return FormatHelper.getPath() + "/img/calendar/missing.png";
	            			 	case "UNDERDAY": return FormatHelper.getPath() + "/img/calendar/under_day.png";
	            			 	case "UNDER": return FormatHelper.getPath() + "/img/calendar/under.png";
	            			 }
	        			 }
	        		 },
	        		 tooltip: {
	            		 parts: [{path: "Results>Status"}, {path: "i18n>MissingDescription"}, {path: "i18n>UnderDayDescription"}, {path: "i18n>UnderDescription"}],
	            		 formatter: function(status, lblMissing, lblUnderDay, lblUnder) {
	            			 switch (status) {
	            			 	case "MISSING": return lblMissing;
	            			 	case "UNDERDAY": return lblUnderDay;
	            			 	case "UNDER": return lblUnder;
	            			 }
	        			 }
	        		 },
	        		 width: "32px"
	    		 }),
	             new sap.m.ObjectIdentifier({
	            	 title: "{Results>Orgeh}",
	            	 text: "{Results>OrgehT}"
	             }),
	             new sap.m.VBox({
	            	 items:[
	       	             new sap.m.Link({
	       	            	 text: "{Results>Sname}",
	       	            	 press: [oController.onTogglePersonnelInfo, oController]
       	            	 }),
	    	             new sap.m.HBox({
	    	            	 alignItems: sap.m.FlexAlignItems.Center,
	    	            	 items:[
    		    	             new sap.m.Text({ text: "{i18n>Personnel Number}:" }).addStyleClass("personnelInfoTitle"),
    		    	             new sap.m.Text({ text: "{Results>Pernr}" }).addStyleClass("personnelInfoData"),
	            	         ]
	    	             }).addStyleClass("personnelInfo").addStyleClass("invisible"),
	    	             new sap.m.HBox({
	    	            	 alignItems: sap.m.FlexAlignItems.Center,
	    	            	 items:[
    		    	             new sap.m.Text({ text: "{i18n>Email}:" }).addStyleClass("personnelInfoTitle"),
    		    	             new sap.m.Text({
    		    	            	 text: {
    		    	            		 parts: [{path: "Results>Email"}],
    		    	            		 formatter: function(email) {
    		    	            			 return (email && email.length > 0) ? email : "-";
    		    	        			 }
    		    	        		 }
    	    	            	 }).addStyleClass("personnelInfoData"),
	            	         ]
	    	             }).addStyleClass("personnelInfo").addStyleClass("invisible"),
	    	             new sap.m.HBox({
	    	            	 alignItems: sap.m.FlexAlignItems.Center,
	    	            	 items:[
    		    	             new sap.m.Text({ text: "{i18n>Phone}:" }).addStyleClass("personnelInfoTitle"),
    		    	             new sap.m.Text({
    		    	            	 text: {
    		    	            		 parts: [{path: "Results>Phone"}],
    		    	            		 formatter: function(phone) {
    		    	            			 return (phone && phone.length > 0) ? phone : "-";
    		    	        			 }
    		    	        		 }
    	    	            	 }).addStyleClass("personnelInfoData"),
	            	         ]
	    	             }).addStyleClass("personnelInfo").addStyleClass("invisible"),
        	        ]
	             }),
	             new sap.m.ObjectIdentifier({
	                 title: {
										 parts: [{path: "Results>Diff"},{path: "i18n>Hs"} ],
										 formatter: function(Diff, Hs){
											 var roundedDiff = Math.round(Diff * 10) / 10;
											 return roundedDiff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' '+ Hs;
										 }
									 },
	                 text:{
										 parts: [{path: "Results>Catshours"},{path: "Results>MinHs"} ],
										 formatter: function(Catshours, MinHs){
											 var roundedCatsHs = Math.round(Catshours * 10) / 10;
											 var roundedMinHs = Math.round(MinHs * 10) / 10;
											 return roundedCatsHs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '/' + roundedMinHs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
										 }
									 }
	             }),
	             new sap.m.ObjectIdentifier({
	                 title: "{Results>PlansT}",
	                 text: "{Results>Plans}"
	             }),
		    ]
		});
		table.bindItems("Results>/Results", template);
		controls.push(table);

		return controls;
	}
});
