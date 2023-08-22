




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
            mode: 'multiple',
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
            allowDeleting: true,
            allowAdding: false,
            

        },

        onContentReady: function () {
            $(".dx-link-edit").addClass("btn btn-primary");
        },


        columns: [
            {
                dataField: "UserId",
                caption: "User ID",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },

            {
                dataField: "FirstName",
                caption: "First Name",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "LastName",
                caption: "Last Name",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },

            {
                dataField: "Gender",
                caption: "Gender",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },




            {
                dataField: "JobId",
                caption: "Job ID",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "JobTitle",
                caption: "Job Title",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "DepartmentName",
                caption: "Department Name",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "Location",
                caption: "Location",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "ProfilePicture",
                caption: "Profile Picture",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            //{

            //            caption: "Resume",
            //            cellTemplate: function (container, options) {
            //                $("<div>")
            //                    .addClass("dx-toolbar")
            //                    .dxToolbar({
            //                        items: [{
            //                            location: "after",
            //                            widget: "dxButton",
            //                            options: {
            //                                text: "Show Resume",
            //                                onClick: function () {
            //                                    // Handle the button click here
            //                                    // You can use options.data to access the row data
            //                                    alert("Show resume for User ID: " + options.data.UserId);
            //                                    // Add your custom logic to show the resume
            //                                }
            //                            }
            //                        }]
            //                    })
            //                    .appendTo(container);
            //            }
                    
                //}


        ],
    
    });
    
}


$(function () {
    const dataGrid = $('#dataGrid1').dxDataGrid({
        
        export: {
            enabled: true,
            formats: ['xlsx', 'pdf'],
        },
        onExporting(e) {
            if (e.format === 'xlsx') {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('AppliedJobs');
                DevExpress.excelExporter.exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true,
                }).then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AppliedJobs.xlsx');
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('AppliedJobs.pdf');
                });
            }
        },
    }).dxDataGrid('instance');
});








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

    //// PDF Button
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




