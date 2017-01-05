sap.ui.jsview("HCMMissingTimesheets.views.Detail.Results.Results", {

	getControllerName: function () {
	    return "HCMMissingTimesheets.views.Detail.Results.Results";
	},

	createContent: function (oController) {
		var page = new sap.m.Page({
			title: {
				parts: [
				        { path: "Device>/isPhone" },
				        {path: "i18n>AppTitle"}, 
				        {path: "i18n>Results" }
				],
		        formatter: function (isPhone, lblDesktop, lblMobile)
		        {
		        	return (isPhone) ? lblMobile : lblDesktop;
		        }
			},
			showNavButton: {
				parts: [{ path: "Device>/isPhone" }],
		        formatter: function (isPhone)
		        {
		            if(isPhone)
		            	return true;
		            else
		            	return false;
		        }
			},
			navButtonTap: [oController.backToSearch, oController],
	        footer: new sap.m.Toolbar({
	            content: [
                    new sap.m.HBox({
                    	id: "footerBtnBox",
                        width: "100%",
                        justifyContent: sap.m.FlexJustifyContent.End,
                        items: [
							new sap.m.Button({
								id: "btnSendEmail",
								icon: "sap-icon://email",
								tooltip: "{i18n>SendEmail}",
								press: [oController.onSendEmail, oController],
								visible: false
							}),
			                new sap.m.Button({
			                    icon: FormatHelper.getPath() + "/img/chart.png",
			                    tooltip: "{i18n>ChartView}",
			                    press: [oController.onShowChartView, oController]
			                }).addStyleClass('smallerImage60'),
			                new sap.m.Button({
			                    icon: FormatHelper.getPath() + "/img/table.png",
			                    tooltip: "{i18n>TableView}",
			                    press: [oController.onShowTableView, oController]
			                }).addStyleClass('smallerImage60'),
							new sap.m.Button({
			                    icon: "sap-icon://download",
			                    tooltip: "{i18n>DownloadToExcelFile}",
			                    press: [oController.onExportToExcel, oController],
								visible: {
									parts: [
										{ path: "Device>/isPhone" }
									],
									formatter: function (isPhone)
									{
										return (isPhone) ? false : true;
									}
								}
			                })
                        ]
                    })
	            ]
	        })
		});

		if(DeviceHelper.isPhone())
		{
			var chartView = sap.ui.jsview("ChartView", "HCMMissingTimesheets.views.Detail.Results.ChartViewMobile.ChartViewMobile");
			var tableView = sap.ui.jsview("TableView", "HCMMissingTimesheets.views.Detail.Results.TableViewMobile.TableViewMobile");
		}
		else
		{
			var chartView = sap.ui.jsview("ChartView", "HCMMissingTimesheets.views.Detail.Results.ChartView.ChartView");
			var tableView = sap.ui.jsview("TableView", "HCMMissingTimesheets.views.Detail.Results.TableView.TableView");
		}
		
		tableView.addStyleClass("invisible");

		page.addContent(tableView);
		page.addContent(chartView);

		return page;
	}
});
