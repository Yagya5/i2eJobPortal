

$(document).ready(function () {
    console.log("Temp");
    // Load the data
    LoadRecords();
    fetchDataStatus();
    /*   fetchRoundData();*/
    fetchDataRound();



    // PDF Button
    //$('#pdfButton').on('click', function () {
    //    // Check if the data is loaded before exporting
    //    if ($("#dataGrid1").dxDataGrid("instance").getVisibleRows().length > 0) {
    //        exportToPdf();
    //    } else {
    //        alert("No data to export to PDF.");
    //    }
    //});

    //// Excel Button
    //$('#excelButton').on('click', function () {
    //    // Check if the data is loaded before exporting
    //    if ($("#dataGrid1").dxDataGrid("instance").getVisibleRows().length > 0) {
    //        exportToExcel();
    //    } else {
    //        alert("No data to export to Excel.");
    //    }
    //});
});

//function GetPivotGrid(_dataSource) {

//    $(() => {
//        const pivotGridChart = $('#pivotgrid-chart').dxChart({
//            commonSeriesSettings: {
//                type: 'bar',
//            },
//            tooltip: {
//                enabled: true,
//                format: 'currency',
//                customizeTooltip(args) {
//                    return {
//                        html: `${args.seriesName} | Total<div class='currency'>${args.valueText}</div>`,
//                    };
//                },
//            },
//            size: {
//                height: 200,
//            },
//            adaptiveLayout: {
//                width: 450,
//            },
//        }).dxChart('instance');

//        const pivotGrid = $('#pivotgrid').dxPivotGrid({
//            allowSortingBySummary: true,
//            allowFiltering: true,
//            showBorders: true,
//            showColumnGrandTotals: false,
//            showRowGrandTotals: false,
//            showRowTotals: false,
//            showColumnTotals: false,
//            fieldChooser: {
//                enabled: true,
//                height: 400,
//            },
//            dataSource: _datasource,
//            dataSource: {
//                fields: [{
//                    caption: 'Region',
//                    width: 120,
//                    dataField: 'region',
//                    area: 'row',
//                    sortBySummaryField: 'Total',
//                }, {
//                    caption: 'City',
//                    dataField: 'city',
//                    width: 150,
//                    area: 'row',
//                }, {
//                    dataField: 'date',
//                    dataType: 'date',
//                    area: 'column',
//                }, {
//                    groupName: 'date',
//                    groupInterval: 'month',
//                    visible: false,
//                }, {
//                    caption: 'Total',
//                    dataField: 'amount',
//                    dataType: 'number',
//                    summaryType: 'sum',
//                    format: 'currency',
//                    area: 'data',
//                }],
//                store: sales,
//            },
//        }).dxPivotGrid('instance');

//        pivotGrid.bindChart(pivotGridChart, {
//            dataFieldsDisplayMode: 'splitPanes',
//            alternateDataFields: false,
//        });

//        function expand() {
//            const dataSource = pivotGrid.getDataSource();
//            dataSource.expandHeaderItem('row', ['North America']);
//            dataSource.expandHeaderItem('column', [2013]);
//        }

//        setTimeout(expand, 0);
//    });


//}









function ShowEvent(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;

    $("#dataGrid1").dxDataGrid({


        dataSource: _datasource,
        keyExpr: "AppliedJobId",
        allowColumnReordering: true,
        allowColumnResizing: true,
        //filterRow: { visible: true },
        filterRow: { visible: true },
        searchPanel: { visible: true },
        showBorders: true,
        showRowLines: true,
        //rowAlternationEnabled: true,
        wordWrapEnabled: true,

        columnFixing: { enabled: true },
        columnChooser: {
            enabled: true,
            mode: "select",

            search: {
                enabled: true,
                editorOptions: { placeholder: 'Search column' },
            },
            selection: {
                recursive: true,
                selectByClick: true,
                allowSelectAll: true,
            },
        },

        selection: {
            mode: 'false',
        },

        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
            visible: true,
        },

        summary: {
            groupItems: [{
                summaryType: "count"
            }]
        },
        headerFilter: {
            visible: true,
        },

        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: false,
            allowAdding: false,
            

        },
        allowColumnReordering: true,
        allowColumnResizing: true,
        columnFixing: {
            enabled: true,
        },
      /*  columnHidingEnabled: true,*/


        remoteOperations: { groupPaging: true },
        scrolling: {
            mode: 'virtual',
        },
        grouping: {
            autoExpandAll: true,
        },
        groupPanel: {
            visible: true,
        },

        export: {
            enabled: true,
            formats: ['xlsx', 'pdf']
        },
        onContentReady :function(e) {
            fetchDataStatus();
            /*   fetchRoundData();*/
            fetchDataRound();
        },

        onExporting(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet("Main sheet");
                DevExpress.excelExporter.exportDataGrid({
                    worksheet: worksheet,
                    component: e.component,
                }).then(function () {
                    workbook.xlsx.writeBuffer().then(function (buffer) {
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Job Application.xlsx");
                 });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();

                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('Job Application.pdf');
                });
            }
        },




        onRowUpdated: function (e) {
            console.log(e);
           /*//** var AppliedJobId = e.key.AppliedJobId;*/
            $.ajax({
                url: "/JobApplications/UpdateAppliedJob/",
                method: "POST",
                data: {
                    "AppliedJobId": e.data.AppliedJobId,
                    "FirstName": e.data.FirstName,
                    "LastName": e.data.LastName,
                    "Gender": e.data.Gender,
                    "JobTitle": e.data.JobTitle,
                    "DepartmentName": e.data.DepartmentName,
                    "MinExperience": e.data.MinExperience,
                    "Location": e.data.Location,
                    "ProfilePicture": e.data.ProfilePicture,
                    "StatusValue": e.data.Status,
                    "RoundValue": e.data.Round,

              },
                success: function (ResponseData) {
                    LoadRecords();
                },
                error: function (err) {
                    alert(err);
                }
            })
        },
       



        columns: [

            {
                caption: "Full Name",
                calculateCellValue: function (data) {
                    return data.FirstName + " " + data.LastName;
                },
                allowFiltering: true,
                allowSorting: true,
                allowEditing: false,
                width: 150,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

           
            //{
            //    dataField: "FirstName",
            //    caption: "First Name",
            //    /* validationRules: [{ type: "required" }],*/
            //    allowFiltering: true,
            //    allowSorting: true,
            //    allowEditing: true,
            //    width: 80,
            //    headerFilter: {
            //        allowSelectAll: true,
            //        search: {
            //            enabled: false,
            //        }
            //    }
            //},
            //{
            //    dataField: "LastName",
            //    caption: "Last Name",
            //    allowFiltering: true,
            //    allowSorting: true,
            //    /*validationRules: [{ type: "required" }],*/
            //    allowEditing: true,
            //    width: 80,
            //    headerFilter: {
            //        allowSelectAll: true,
            //        search: {
            //            enabled: false,
            //        }
            //    }
            //},

            {
                dataField: "Gender",
                caption: "Gender",
                allowFiltering: true,
                allowSorting: true,
               /* validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100,
            
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

            {
                dataField: "JobTitle",
                caption: "Job Applied For",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150,
              
              
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "DepartmentName",
                caption: "Applied Department",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 130,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience(in years)",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                },
                cellTemplate: function (container, options) {
                    $("<div>")
                        .text(options.value + " years")
                        .appendTo(container);
                }
            },
            {
                dataField: "Location",
                caption: "Location",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 120,
                headerFilter: {
                    allowSelectAll: false,
                    search: {
                        enabled: true,
                    }
                }
            },
            {
                dataField: "ProfilePicture",
                caption: "Profile Picture",

                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 120,
                allowFiltering: true,
                allowSorting: true,
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<img>', { src: options.data.ProfilePicture }))
                        .appendTo(container);
                },
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
               
            },
            
            {
                dataField: "Status",
                caption: "Current Status",
                validationRules: [{ type: "required" }],
                allowFiltering: true,
                allowSorting: true,
                allowEditing: true,
                editorType: "dxSelectBox",
                editorOptions: {

                    dataSource: StatusValues1,
                    valueExpr: "value",
                    displayExpr: "value",
                    placeholder: "Select Current Status",
                },
                width: 110,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "Round",
                caption: "Round",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [{ type: "required" }],
                allowEditing: true,
                editorType: "dxSelectBox",
                editorOptions: {

                    dataSource: RoundValues1,
                    valueExpr: "value",
                    displayExpr: "value",
                    placeholder: "Select Round",
                },
                     
                width: 110,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },


        ],
    
    });
    
}




//$(function () {
//    $("#EditButton").dxButton({
//        icon: "edit",
//        text: "Edit"
//    }
//    }


let StatusValues1 = [];
let RoundValues1 = [];




function fetchStatusDataAsync() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/JobApplications/GetMasterValuesByCategoryForAppliedJobs",
            method: "GET",
            data: { category: "Status" },
            success: function (response) {
                StatusValues1 = response.map(item => ({ value: item.Value }));
            },
            error: function (err) {
                alert("Error fetching Status Types: " + err);
            }
        });
    });

    
}



async function fetchDataStatus() {
    try {
        const statusData = await fetchStatusDataAsync();
        StatusValues1 = statusData;
        console.log("Status values:", statusData);
        
    } catch (error) {
        console.error(error);
    }
}



function fetchRoundDataAsync() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/JobApplications/GetMasterValuesByCategoryForAppliedJobs",
            method: "GET",
            data: { category: "Round" },
            success: function (response) {
                const roundValues = response.map(item => ({ value: item.Value }));
                resolve(roundValues); // Resolve the promise with the fetched data
            },
            error: function (err) {
                reject("Error fetching Round Types: " + err); // Reject the promise with an error message
            }
        });
    });
}



async function fetchDataRound() {
    try {
        const roundData = await fetchRoundDataAsync();
        RoundValues1 = roundData;
        console.log("Round values:", roundData);
        // You can continue working with roundData here
    } catch (error) {
        console.error(error);
    }
}




//function fetchRoundData() {
//    $.ajax({
//        url: "/JobApplications/GetMasterValuesByCategoryForAppliedJobs",
//        method: "GET",
//        data: { category: "Round" },
//        success: function (response) {
//            console.log("hello");
//            RoundValues1 = response.map(item => ({ value: item.Value }));
//        },
//        error: function (err) {
//            alert("Error fetching Round Types: " + err);
//        }
//    });
//}






//$(function () {
//    const dataGrid = $('#dataGrid1').dxDataGrid({
        
//        //export: {
//        //    enabled: true,
//        //    formats: ['xlsx', 'pdf'],
//        //},
//        onExporting(e) {
//            if (e.format === 'xlsx') {
//                const workbook = new ExcelJS.Workbook();
//                const worksheet = workbook.addWorksheet('AppliedJobs');
//                DevExpress.excelExporter.exportDataGrid({
//                    component: e.component,
//                    worksheet,
//                    autoFilterEnabled: true,
//                }).then(() => {
//                    workbook.xlsx.writeBuffer().then((buffer) => {
//                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AppliedJobs.xlsx');
//                    });
//                });
//            }
//            else if (e.format === 'pdf') {
//                const doc = new jsPDF();
//                DevExpress.pdfExporter.exportDataGrid({
//                    jsPDFDocument: doc,
//                    component: e.component,
//                }).then(() => {
//                    doc.save('AppliedJobs.pdf');
//                });
//            }
//        },
//    }).dxDataGrid('instance');
//});








//function exportToPdf() {
//    const doc = new jsPDF();

//    DevExpress.pdfExporter.exportDataGrid({
//        jsPDFDocument: doc,
//        component: $("#dataGrid1").dxDataGrid("instance"),
//        indent: 5,
//    }).then(() => {
//        doc.save('Data.pdf');
//    }).catch(error => {
//        console.error('Error during PDF export:', error);
//    });
//}





   
    


//function exportToExcel(e) {
//    const workbook = new ExcelJS.Workbook();
//    const worksheet = workbook.addWorksheet('AppliedJobsData');

//    DevExpress.excelExporter.exportDataGrid({
//        worksheet: worksheet,
//        component: e.component,
        
//        autoFilterEnabled: true,

//        customizeCell: function (options) {
//            options.excelCell.font = { name: 'Arial', size: 12 };
//            options.excelCell.alignment = { horizontal: 'left' };
//        }
//    }).then(function () {
//        workbook.xlsx.writeBuffer().then(function (buffer) {
//            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//        });
//    });
//}
//$(() => {
//    $('#icon-edit').dxButton({
//        icon: 'check',
//        type: 'success',
//        text: 'Done',
//        onClick() {
//            DevExpress.ui.notify('The Done button was clicked');
//        },
//    });
//}


function LoadRecords() {
    $.ajax({
        url: "/JobApplications/GetAppliedJobs", 
        method: 'GET',
        success: function (responseData) {
            ShowEvent(responseData);


           /* alert(response);*/
          /*  window.location.reload();*/
            console.log(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}



