function ShowQueries(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;
    $("#dataGrid").dxDataGrid({
        dataSource: _datasource,
        keyExpr: "Id",

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
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Contact Queries.xlsx");
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();               
                
                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('Contact Queries.pdf');
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
                dataField: "FirstName",
                caption: "First Name",
                alignment: "left"
            },
            {
                dataField: "LastName",
                caption: "Last Name"                
            }, 
            {
                dataField: "Email",
                caption: "Email"
            },           
            {
                dataField: "Phone",
                caption: "Phone No.",                
            },
            {
                dataField: "IPAddress",
                caption: "IP Address"
            },
            {
                dataField: "DateTimeStamp",
                caption: "Date & Time",
                dataType: "datetime"
            },
            {
                dataField: "Message",
                caption: "Message/Query",
                width: "350"
            }

        ]

    });
}




$(document).ready(function () {
    LoadRecords();
})

function LoadRecords() {
    $.ajax({
        url: "/ContactQueries/GetContactQueries",
        method: "GET",
        success: function (ResponseData) {
            ShowQueries(ResponseData);
        },
        error: function (err) {
            alert(err);
        }

    })
}





