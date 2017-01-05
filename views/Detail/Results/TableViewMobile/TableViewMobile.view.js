sap.ui.jsview("HCMMissingTimesheets.views.Detail.Results.TableViewMobile.TableViewMobile", {

	getControllerName: function () {
	    return "HCMMissingTimesheets.views.Detail.Results.TableViewMobile.TableViewMobile";
	},

	createContent: function (oController) {

	    var controls = [];

	    var table = new sap.m.Table({
            id: "tblResults",
			noDataText: "{i18n>NoData}",
			mode: sap.m.ListMode.MultiSelect,
		    inset: false,
		    fixedLayout: false,
		    columns: [
              	new sap.m.Column({})
                /*new sap.m.Column({
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
                new sap.m.Column({ header: new sap.m.Text({ text: "{i18n>Plan}" }) })*/
		    ]
		});
	    
	    var template = new sap.m.CustomListItem({
		    content: [
		        new sap.m.HBox({
		        	alignItems: sap.m.FlexAlignItems.Center,
		        	items: [
						new sap.m.Image({
							 src: {
								 parts: [{path: "Results>Status"}],
								 formatter: function(status) {
									 switch (status) {
									 	case "MISSING": return FormatHelper.getPath() + "/img/calendar/missing.png";
									 	case "UNDER_DAY": return FormatHelper.getPath() + "/img/calendar/under_day.png";
									 	case "UNDER": return FormatHelper.getPath() + "/img/calendar/under.png";
									 }
								 }
							 },
							 tooltip: {
								 parts: [{path: "Results>Status"}, {path: "i18n>MissingDescription"}, {path: "i18n>UnderDayDescription"}, {path: "i18n>UnderDescription"}],
								 formatter: function(status, lblMissing, lblUnderDay, lblUnder) {
									 switch (status) {
									 	case "MISSING": return lblMissing;
									 	case "UNDER_DAY": return lblUnderDay;
									 	case "UNDER": return lblUnder;
									 }
								 }
							 },
							 width: "32px"
						}),
						new sap.m.VBox({
				        	alignItems: sap.m.FlexAlignItems.Start,
				        	width: "100%",
				        	items: [
				        	    new sap.m.HBox({
				        	    	justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
				        	    	width: "100%",
				        	    	items: [
										new sap.m.Text({ text: "{Results>OrgehT}" }).addStyleClass("grayColor"),
										new sap.m.Text({ 
											text: {
												parts: [{path: "Results>Diff"},{path: "i18n>Hs"} ],
												 formatter: function(Diff, Hs){
													 return parseInt(Diff)+ ' '+ Hs;
												 }
											} 
										}).addStyleClass("bold"),
		        	    	        ]
				        	    }),
								new sap.m.VBox({
									 items:[
								    	 new sap.m.Text({ text: "{Results>Sname}" }).addStyleClass("personnelInfoTitle"),
								    	 new sap.m.Link({
								        	 text: "{i18n>Details}",
								        	 press: [oController.onToggleDetailInfo, oController]
								    	}),
								      new sap.m.HBox({
								     	 alignItems: sap.m.FlexAlignItems.Center,
								     	 items:[
									             new sap.m.Text({ text: "{i18n>Personnel Number}:" }).addStyleClass("bold"),
									             new sap.m.Text({ text: "{Results>Pernr}" }).addStyleClass("personnelInfoData"),
									         ]
								      }).addStyleClass("detailInfo").addStyleClass("invisible"),
								      new sap.m.HBox({
								     	 alignItems: sap.m.FlexAlignItems.Center,
								     	 items:[
									             new sap.m.Text({ text: "{i18n>Email}:" }).addStyleClass("bold"),
									             new sap.m.Text({
									            	 text: {
									            		 parts: [{path: "Results>Email"}],
									            		 formatter: function(email) {
									            			 return (email && email.length > 0) ? email : "-";
									        			 }
									        		 }
								         	 }).addStyleClass("personnelInfoData"),
									         ]
								      }).addStyleClass("detailInfo").addStyleClass("invisible"),
								      new sap.m.HBox({
								     	 alignItems: sap.m.FlexAlignItems.Center,
								     	 items:[
									             new sap.m.Text({ text: "{i18n>Phone}:" }).addStyleClass("bold"),
									             new sap.m.Text({
									            	 text: {
									            		 parts: [{path: "Results>Phone"}],
									            		 formatter: function(phone) {
									            			 return (phone && phone.length > 0) ? phone : "-";
									        			 }
									        		 }
								         	 }).addStyleClass("personnelInfoData"),
									         ]
								      }).addStyleClass("detailInfo").addStyleClass("invisible"),
								      new sap.m.HBox({
									     	 alignItems: sap.m.FlexAlignItems.Center,
									     	 items:[
										             new sap.m.Text({ text: "{i18n>Loaded}:" }).addStyleClass("bold"),
										             new sap.m.Text({
										            	 text: {
										            		 parts: [{path: "Results>Catshours"},{path: "Results>MinHs"} ],
															 formatter: function(Catshours, MinHs){
																 return parseInt(Catshours)+ '/' + parseInt(MinHs);
															 }
										        		 }
									         	 }).addStyleClass("personnelInfoData"),
										         ]
								      }).addStyleClass("detailInfo").addStyleClass("invisible"),
								      new sap.m.Text({ text: "{Results>PlansT}" }).addStyleClass("detailInfo").addStyleClass("invisible"),
								      new sap.m.Text({ text: "{Results>Plans}" }).addStyleClass("detailInfo").addStyleClass("invisible"),
								 ]
								}),
					        ]
				        }).addStyleClass("marginLeft marginRight"),
        	        ]
		        }),
			]
		});
		table.bindItems("Results>/Results", template);
		controls.push(table);

		return controls;
	}
});
