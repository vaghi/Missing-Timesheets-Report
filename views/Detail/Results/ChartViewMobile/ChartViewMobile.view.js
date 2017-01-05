sap.ui.jsview("HCMMissingTimesheets.views.Detail.Results.ChartViewMobile.ChartViewMobile", {

	getControllerName: function () {
	    return "HCMMissingTimesheets.views.Detail.Results.ChartViewMobile.ChartViewMobile";
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
						new sap.m.ObjectHeader({
							title: "{i18n>TotalMissingHours}",
							number: "{Results>/Summary/TotalMissingHours}",
							icon: FormatHelper.getPath() + "/img/missing_time.png",
						}),
						new sap.m.ObjectHeader({
							title: "{i18n>TotalHours}",
							number: "{Results>/Summary/TotalHours}",
							icon: FormatHelper.getPath() + "/img/total_time.png",
						}),
						new sap.m.ObjectHeader({
							title: "{i18n>AmountRecords}",
							number: "{Results>/Summary/AmountRecords}",
							icon: FormatHelper.getPath() + "/img/people.png",
						}),
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
						new sap.m.VBox({
							items: [
								new sap.m.HBox({
									width: "100%",
									id: "gaugeMissingHours",
								}),
								new sap.m.Text({
									text: "{i18n>TimeCompletion}",
									textAlign: sap.ui.core.TextAlign.Center
								})
					        ]
						}).addStyleClass("paddingBottom centerText"),
						new sap.m.HBox({
							width: "100%",
							id: "pieChart",
						})
					]
                }),
				
		    ]
		});
		controls.push(container);

		return controls;
	}
});
