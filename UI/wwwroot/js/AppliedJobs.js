




function ShowEvent(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;

    $("#dataGrid1").dxDataGrid({


        dataSource: _datasource,
        keyExpr: "UserId",
        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },


        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,

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
        },

        summary: {
            groupItems: [{
                summaryType: "count"
            }]
        },

        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: false,
            allowAdding: false,
            

        },
        // export: {
        //    enabled: true,
        //    formats: ['xlsx', 'pdf'],
        //},
        onContentReady: function () {
            $(".dx-link-edit").addClass("btn btn-primary text-white");
           /* $(".dx-link-delete").addClass("btn btn-danger text-white")*/
        },


        columns: [
           
            {
                dataField: "FirstName",
                caption: "First Name",
               /* validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 80

            },
            {
                dataField: "LastName",
                caption: "Last Name",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 80
            },

            {
                dataField: "Gender",
                caption: "Gender",
               /* validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 70
            },

            {
                dataField: "JobTitle",
                caption: "Job Applied For",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150
            },
            {
                dataField: "DepartmentName",
                caption: " Applied Department ",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width:120
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience (in years)",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100
            },
            {
                dataField: "Location",
                caption: "Location",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 120
            },
            {
                dataField: "ProfilePicture",
                caption: "Profile Picture",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 120,
                allowFiltering: false,
                allowSorting: false,
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<img>', { src: options.data.ProfilePicture }))
                        .appendTo(container);
                }
               
            },
            
            {
                dataField: "Status",
                caption: "Current Status",
                validationRules: [{ type: "required" }],
                allowEditing: false,
                width: 100
            },
            {
                dataField: "Round",
                caption: "Round",
                validationRules: [{ type: "required" }],
                allowEditing: false,
                width: 100
            },


        ],
    
    });
    
}


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








function exportToPdf() {
    const doc = new jsPDF();

    DevExpress.pdfExporter.exportDataGrid({
        jsPDFDocument: doc,
        component: $("#dataGrid1").dxDataGrid("instance"),
        indent: 5,
    }).then(() => {
        doc.save('Data.pdf');
    }).catch(error => {
        console.error('Error during PDF export:', error);
    });
}





   
    


function exportToExcel(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('AppliedJobsData');

    DevExpress.excelExporter.exportDataGrid({
        worksheet: worksheet,
        component: e.component,
        
        autoFilterEnabled: true,

        customizeCell: function (options) {
            options.excelCell.font = { name: 'Arial', size: 12 };
            options.excelCell.alignment = { horizontal: 'left' };
        }
    }).then(function () {
        workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
        });
    });
}



function LoadRecords() {
    $.ajax({
        url: "/JobApplications/GetAppliedJobs", 
        method: 'GET',
        success: function (responseData) {
            ShowEvent(responseData);
           /* alert(response);*/
          /*  window.location.reload();*/
            console.log("Hello");
        },
        error: function (err) {
            alert(err);
        }
    });
}
$(document).ready(function () {
    // Load the data
    LoadRecords();

    // PDF Button
    $('#pdfButton').on('click', function () {
        // Check if the data is loaded before exporting
        if ($("#dataGrid1").dxDataGrid("instance").getVisibleRows().length > 0) {
            exportToPdf();
        } else {
            alert("No data to export to PDF.");
        }
    });

    // Excel Button
    $('#excelButton').on('click', function () {
        // Check if the data is loaded before exporting
        if ($("#dataGrid1").dxDataGrid("instance").getVisibleRows().length > 0) {
            exportToExcel();
        } else {
            alert("No data to export to Excel.");
        }
    });
});




