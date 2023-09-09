function ShowUserActivities(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;
    $("#dataGrid").dxDataGrid({
        dataSource: _datasource,
        keyExpr: "AuditId",

        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
         groupPanel: { visible: true },
        showBorders: true,
        showRowLines: true,
        // rowAlternationEnabled: true,
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

        loadPanel: {
            enabled: true,
            showPane: true,
            shading: true,
            shadingColor: 'rgba(0,0,0,0.4)'
        },

        columnAutoWidth: true,
        columnFixing: {
            enabled: true,
        },

        export: {
            enabled: true,
            formats: ['xlsx', 'pdf']
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
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Audit User Activities.xlsx");
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();

                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('Audit User Activities.pdf');
                });
            }
        },

        scrolling: {
            mode: 'virtual',
        },

        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20, 50, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
        },

        summary: {
            groupItems: [{
                summaryType: "count"
            }]
        },

        columns: [   
            {
                dataField: "FullName",
                caption: "User Name",
                width: "130"              
            },
            {
                dataField: "TaskId",
                alignment: "left",  
                width: "80"
            },
            {
                dataField: "OldValue",
                caption: "Old Value"
            },
            {
                dataField: "NewValue",
                caption: "New Value"
            },
            {               
                caption: "Data Field",
                width: "150",  
                allowFiltering: true,
                allowSorting: true,
                allowGrouping: true,
                calculateCellValue: function (rowData) {
                    return `${rowData.DataField} (${rowData.TableName})`;  
                }        
            },            
            {
                dataField: "Module"  
            },
            {
                dataField: "Url",  
                width: "350"
            },
            {
                dataField: "Action",                
            },
            {
                dataField: "DateTimeStamp",
                caption: "Date & Time",
                width: "150",
                dataType: "datetime",
                format: "dd/MM/yyyy, hh:mm a"
            }
        ]

    });
}




$(document).ready(function () {
    LoadRecords();
})

function LoadRecords() {
    $.ajax({
        url: "/AuditUserActivities/GetAuditTrail",
        method: "GET",
        success: function (ResponseData) {
            ShowUserActivities(ResponseData);
        },
        error: function (err) {
            alert(err);
        }
    })
}





