sap.ui.jsview("HCMMissingTimesheets.views.Detail.Results.ChartView.ChartView", {

	getControllerName: function () {
	    return "HCMMissingTimesheets.views.Detail.Results.ChartView.ChartView";
	},

	createContent: function (oController) {

	    var controls = [];

	    var container = new sap.m.HBox({
	        alignItems: sap.m.FlexAlignItems.Center,
	        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
		    items: [
                new sap.m.VBox({
                    id: "vboxChartSummary",
                    width: "100%",
                    items: [
						new sap.m.HBox({
							justifyContent : sap.m.FlexJustifyContent.SpaceAround,
							items: [
								new sap.m.HBox({
									width: '50%',
									id: "missingHoursBox",
									justifyContent : sap.m.FlexJustifyContent.Center,
								    items: [
								        new sap.m.VBox({
								        	width: '160pt',
								            items: [
								                new sap.m.Text({ 
								                	text: {
												        parts: [{ path: "Results>/Summary/TotalMissingHours" }],
												        formatter: function (hours)
												        {
												        	var roundedHours = Math.round(hours * 10) / 10;
												            return roundedHours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
												        }
												    }
												}).addStyleClass("kpi cursorPointer updateTextSize"),
								                new sap.m.Text({ text: "{i18n>TotalMissingHours}" }).addStyleClass("title cursorPointer")
								            ]
								        }).addStyleClass('cursorPointer navToTable'),
								        new sap.m.Image({
								            src: FormatHelper.getPath() + "/img/missing_time.png",
								            height: "130px"
								        }).addStyleClass('cursorPointer navToTable'),
								    ]
								}),
								new sap.m.VBox({
									width: "50%",
									alignItems: sap.m.FlexAlignItems.Center,
									justifyContent: sap.m.FlexJustifyContent.Center,
									items: [
										new sap.m.HBox({
											id: "gaugeMissingHours"
										}),
										new sap.m.Text({text: "{i18n>TimeCompletion}"})
									]
								})
						    ]
						}).addStyleClass("paddingBottom"),
						new sap.m.HBox({
							justifyContent : sap.m.FlexJustifyContent.SpaceAround,
							items: [
								new sap.m.HBox({
									justifyContent : sap.m.FlexJustifyContent.Center,
									width: '50%',
									id: "totalHoursBox",
								    items: [
								        new sap.m.VBox({
											justifyContent : sap.m.FlexJustifyContent.Center,
								        	width: '160pt',
								            items: [
								                new sap.m.Text({ 
								                	text: {
												        parts: [{ path: "Results>/Summary/TotalHours" }],
												        formatter: function (hours)
												        {
												        	var roundedHours = Math.round(hours * 10) / 10; 
												            return roundedHours.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
												        }
												    }
								                }).addStyleClass("kpi cursorPointer updateTextSize"),
								                new sap.m.Text({ text: "{i18n>TotalHours}" }).addStyleClass("title cursorPointer")
								            ]
								        }).addStyleClass('cursorPointer navToTable'),
								        new sap.m.Image({
								            src: FormatHelper.getPath() + "/img/total_time.png",
								            height: "130px"
								        }).addStyleClass('cursorPointer navToTable'),
								    ]
								}),
								new sap.m.HBox({
									justifyContent : sap.m.FlexJustifyContent.Center,
									width: '50%',
									id: "recordsBox",
								    items: [
								        new sap.m.VBox({
								        	width: '160pt',
								            items: [
								                new sap.m.Text({ 
								                	text: {
												        parts: [{ path: "Results>/Summary/AmountRecords" }],
												        formatter: function (records)
												        {
												        	var roundedRecords = Math.round(records * 10) / 10; 
												            return roundedRecords.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
												        }
												    }
								                }).addStyleClass("kpi cursorPointer updateTextSize"),
								                new sap.m.Text({ text: "{i18n>AmountRecords}" }).addStyleClass("title cursorPointer")
								            ]
								        }).addStyleClass('cursorPointer navToTable'),
								        new sap.m.Image({
								            src: FormatHelper.getPath() + "/img/people.png",
								            height: "130px"
								        }).addStyleClass('cursorPointer navToTable'),
								    ]
								})  
							]
						}),
						new sap.m.HBox({
							items: [
								new sap.m.Text({
								    visible: false,
								    text: {
								        parts: [{ path: "Results>/Summary" }],
								        formatter: function (summary)
								        {
								            //renderiza grafico
								            sap.ui.getCore().byId("ChartView").getController().updateCharts();
								            StyleHelper.updateTextSize();
								        }
								    }
								}),
								new sap.m.HBox({
									width: "100%",
								    id: "pieChart",
								})
					        ]
						})
                    ]
                }).addStyleClass("marginTop marginLeft"),
				
		    ]
		});
		controls.push(container);

		return controls;
	}
});
