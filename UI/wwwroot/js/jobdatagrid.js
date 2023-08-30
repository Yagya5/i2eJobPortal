
function showJob(dataSource) {
    window.jsPDF = window.jspdf.jsPDF;
    $("#dataGrid").dxDataGrid({
        dataSource: dataSource,
        keyExpr: "JobId",

        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },

        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,

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
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Jobs Posting.xlsx");
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();

                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('Jobs Posting.pdf');
                });
            }
        },
       

        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true

        },

        onContentReady: function () {
            $(".dx-link-edit")/*.addClass("btn btn-primary");*/
            $(".dx-link-delete")/*.addClass("btn btn-danger");*/
            
        },

        onRowRemoving: function (e) {

            $.ajax({
                url: "/Job/Delete",
                method: "POST",
                data: {
                    JobId: e.key // Passing the JobId as data
                },
                success: function (ResponseData) {
                    console.log(ResponseData);
                },
                error: function (err) {
                    alert(err);
                }
            });
        },
        onRowUpdated: function (e) {
            var jobId = e.key.JobId;

            $.ajax({
                url: "/Job/EditJob/",
                method: "POST",
                data: {
                    "JobId": e.data.JobId,
                    "JobTitle": e.data.JobTitle,
                    "DepartmentName": e.data.DepartmentName,
                    "Salary": e.data.Salary,
                    "MinExperience": e.data.MinExperience,
                    "MaxExperience": e.data.MaxExperience,
                    "Description": e.data.Description,
                    "IsActive": e.data.IsActive,
                    "Location": e.data.Location,
                    "JobType": e.data.JobType, 
                    "JobMode": e.data.JobMode, 
                    "CurrencyType": e.data.CurrencyType,
                    "urgentRequirement": e.data.urgentRequirement,
                },
                success: function (ResponseData) {
                    LoadRecords();
                },
                error: function (err) {
                    alert(err);
                }
            })

        },
        onRowInserted: function (e) {
          
           
            var dataToSend = {
                "JobId": e.data.JobId,
                "JobTitle": e.data.JobTitle,
                "DepartmentName": e.data.DepartmentName,
                "Salary": e.data.Salary,
                "MinExperience": e.data.MinExperience,
                "MaxExperience": e.data.MaxExperience,
                "Description": e.data.Description,
                "IsActive": e.data.IsActive,
                "Location": e.data.Location,
                "JobType": e.data.JobType, 
                "JobMode": e.data.JobMode, 
                "CurrencyType": e.data.CurrencyType,
                "urgentRequirement": e.data.urgentRequirement,
            };

            
            $.ajax({
                url: "/Job/CreateJob/",
                method: "POST",
                data: dataToSend,
                success: function (ResponseData) {
                    
                    LoadRecords(); 
                },
                error: function (err) {
                    console.log(err); 
                }
            });
        },
      
        columnAutoWidth: true,
       
       
        columns: [
           
            { dataField: "JobTitle", caption: "Job Title", validationRules: [{ type: "required" }], },
           
          
            {
                dataField: "JobType",
                caption: "Job Type",
                validationRules: [{ type: "required" }],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: jobTypeValues1,
                    valueExpr: "Id",  
                    displayExpr: "Value",
                    placeholder: "Select a Job Type",
                },
               cellTemplate: function (container, options) {
                    const jobTypeId = options.value; 
                    const jobTypeValue = jobTypeValues1.find(jobType => jobType.Id === jobTypeId);
                    const jobTypeText = jobTypeValue.Value;
                    $("<div>")
                        .text(jobTypeText)
                        .appendTo(container);
                }
            },
            
            { dataField: "DepartmentName", caption: "Department Name" },
           
            {
                dataField: "Salary",
                caption: "Salary",
                validationRules: [{ type: "required" }],
                editCellTemplate: function (container, options) {
                    var inputContainer = $("<div>").addClass("input-container");

                    var input = $("<div>").dxNumberBox({
                        value: options.value,
                        showSpinButtons: true,
                        format: "#,##0",
                        onValueChanged: function (e) {
                            options.setValue(e.value);
                        }
                    }).addClass("salary-input");

                    inputContainer.append(input);
                    container.append(inputContainer);
                },
                cellTemplate: function (container, options) {
                    $("<div>")
                        .text(options.value.toLocaleString('en-US', { style: 'decimal' })) 
                        .appendTo(container);
                }
            },
            {
                dataField: "CurrencyType",
                caption: "Currency",
                validationRules: [{ type: "required" }],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: currencyValues1, 
                    valueExpr: "Id", 
                    displayExpr: "Value", 
                    placeholder: "Select a Currency",
                },
                cellTemplate: function (container, options) {
                    const currencyId = options.value; 
                    const currencyValue = currencyValues1.find(currency => currency.Id === currencyId);
                    const currencySymbol = currencySymbols[currencyValue.Value] || "";
                    $("<div>")
                        .text(currencySymbol)
                        .appendTo(container);
                }
            },
            
            {
                dataField: "JobMode",
                caption: "Job Mode",
                validationRules: [{ type: "required" }],
               
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: jobModeValues1,
                    valueExpr: "Id",
                    displayExpr: "Value",
                    placeholder: "Select a Job Mode",
                },
                cellTemplate: function (container, options) {
                    const jobModeID = options.value; 
                    const jobModeValues = jobModeValues1.find(JobMode => JobMode.Id === jobModeID);
                    const jobModeValuesText = jobModeValues.Value;
                    $("<div>")
                        .text(jobModeValuesText)
                        .appendTo(container);
                }
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience in Years",
                
                validationRules: [
                    {
                        type: "required",
                        message: "Min Experience is required"
                    }
                ],
                cellTemplate: function (container, options) {
                    $("<div>")
                        .text(options.value + " years")
                        .appendTo(container);
                }
            },
            {
                dataField: "MaxExperience",
                caption: "Max Experience in Years",
                validationRules: [
                    {
                        type: "required",
                        message: "Max Experience is required and more then Min Experience"
                    }
                ],
                cellTemplate: function (container, options) {
                    $("<div>")
                        .text(options.value + " years")
                        .appendTo(container);
                }
            },
            
           
            { dataField: "Description", caption: "Description", validationRules: [{ type: "required" }], editorType: "dxTextArea", },
            { dataField: "IsActive", caption: "Post Active Status" },
            { dataField: "urgentRequirement", caption: "Urgent Requirement" },
            

            {
                dataField: "Location",
                caption: "Location",
                validationRules: [{ type: "required" }],
               
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: JobLocation,
                    valueExpr: "Value",
                    displayExpr: "Value",
                    placeholder: "Select a Job Location",
                },
            },
        ],
        showBorders: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
        paging: { pageSize: 10 },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 20],
            showInfo: true
        }
    });
}
$(document).ready(function () {
    fetchMasterValues();
    LoadRecords();
    
    
});
const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  
};


let jobTypeValues1 = [];
let jobModeValues1 = [];
let currencyValues1 = [];
let JobLocation = [];

function fetchMasterValues() {
    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Job Type" },
        success: function (response) {
            jobTypeValues1 = response/*.map(item => ({ value: item.Value }))*/;
        },
        error: function (err) {
            alert("Error fetching Job Types: " + err);
        }
    });

    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Job Mode" },
        success: function (response) {
            jobModeValues1 = response/*.map(item => ({ value: item.Value }))*/;
        },
        error: function (err) {
            alert("Error fetching Job Modes: " + err);
        }
    });

    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Job Location" },
        success: function (response) {
            JobLocation = response/*.map(item => ({ value: item.Value }))*/;
        },
        error: function (err) {
            alert("Error fetching Job Location: " + err);
        }
    }); 

    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Currency" },
        success: function (response) {
            currencyValues1 = response/*.map(item => ({ value: item.Value }))*/;

             LoadRecords();
        },
        error: function (err) {
            alert("Error fetching Currencies: " + err);
        }
    });
}

function LoadRecords() {
    $.ajax({
        url: "/Job/GetJobs",
        method: "GET",
        success: function (ResponseData) {
            showJob(ResponseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}


