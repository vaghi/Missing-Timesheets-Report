sap.ui.jsview("HCMMissingTimesheets.views.Detail.EmptyResults.EmptyResults", {

	createContent: function (oController) {
		var page = new sap.m.Page({
		    headerContent: [
                new sap.m.Bar({
		            contentRight: [
                  new sap.m.Text({ text: "{i18n>HCM}" }).addStyleClass("appTitle").addStyleClass("bold"),
                  new sap.m.Text({ text: "{i18n>MissingTimesheetsReport}" }).addStyleClass("appTitle")
		            ]
		        })
		    ]
		});

		var filtersBox = new sap.m.VBox({
            id: "boxEmptyResults",
		    justifyContent: sap.m.FlexJustifyContent.Center,
		    items: [
                new sap.m.HBox({
                    justifyContent: sap.m.FlexJustifyContent.Center,
                    items: [
                        new sap.m.Image({
                            src: FormatHelper.getPath() + "/img/empty_search.png",
                            width: "100px"
                        })
                    ]
                }),
                new sap.m.VBox({
                    alignItems: sap.m.FlexAlignItems.Center,
                    items:[
				        new sap.m.Text({ text: "{i18n>SelectFiltersAndSearch}" }).addStyleClass("emptyTitle"),
				        //new sap.m.Text({ text: "{i18n>RefineSearchFilters}" }).addStyleClass("emptyInfo")
                    ]
                })
	        ]
		});
		page.addContent(filtersBox);

		return page;
	}
});
