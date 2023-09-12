const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
};

let jobTypeValues1 = [];
let jobModeValues1 = [];
let currencyValues1 = [];

let CountryList = [];
let StateList = [];
let CityList = [];

let filteredState = [];
let globalCountry;
let globalState;
let filteredCity = [];

let stateSelectBoxInstance = null;
let citySelectBoxInstance = null;


let JobTypeHome = null;
let JobModeHome = null;
let JobCurrency = null;
let JobCountry = null;
let JobCity = null;
let JobState = null;

function showJob(dataSource) {
    window.jsPDF = window.jspdf.jsPDF;
    $("#JobDataGrid").dxDataGrid({
        dataSource: dataSource,
        keyExpr: "JobId",

        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },

        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: false,
        wordWrapEnabled: true,

        scrolling: {
            mode: "virtual",
            rowRenderingMode: "virtual"
        },
        paging: {
            pageSize: 10,
        },
        pager: {
            visible:true,
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20, 50, 'all'],
            showInfo: true,
            showNavigationButtons: true
        },

        summary: {
            groupItems: [{
                summaryType: "count"
            }]
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
        grouping: {
            autoExpandAll: true,
        },
        groupPanel: {
            visible: true,
        },
        loadPanel: {
            enabled: true,
            showPane: true,
            shading: true,
            shadingColor: 'rgba(0,0,0,0.4)'
        },

        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
           
        },
       
        onEditorPreparing(e) {
            if (e.parentType === 'dataRow' && e.dataField === 'State') {
                e.editorOptions.disabled = (typeof e.row.data.Country !== 'number');
            }
            if (e.parentType === 'dataRow' && e.dataField === 'City') {
                e.editorOptions.disabled = (typeof e.row.data.State !== 'number');
            }
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
        onContentReady: function () {
            $(".dx-link-edit")
            $(".dx-link-delete")

        },

        onRowRemoving: function (e) {

            $.ajax({
                url: "/Job/Delete",
                method: "POST",
                data: {
                    JobId: e.key
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
            var dataToSend = {
                "JobId": e.data.JobId,
                "JobTitle": e.data.JobTitle,
                "DepartmentName": e.data.DepartmentName,
                "Salary": e.data.Salary,
                "MinExperience": e.data.MinExperience,
                "MaxExperience": e.data.MaxExperience,
                "Description": e.data.Description,
                "IsActive": e.data.IsActive,
                "JobType": e.data.JobType,
                "JobMode": e.data.JobMode,
                "CurrencyType": e.data.CurrencyType,
                "urgentRequirement": e.data.urgentRequirement,
                "MinExperienceMonth": e.data.MinExperienceMonth,
                "MaxExperienceMonth": e.data.MaxExperienceMonth,
                "City": e.data.City,
                "Country": e.data.Country,
                "State": e.data.State,
            };
         
           
            
            $.ajax({
                url: "/Job/EditJob/",
                method: "POST",
                data: dataToSend,
                success: function (ResponseData) {
                    LoadRecords();
                },
                error: function (err) {
                    alert(err);
                }
            });
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
                "JobType": e.data.JobType,
                "JobMode": e.data.JobMode,
                "CurrencyType": e.data.CurrencyType,
                "urgentRequirement": e.data.urgentRequirement,
                "MinExperienceMonth": e.data.MinExperienceMonth,
                "MaxExperienceMonth": e.data.MaxExperienceMonth,
                "City": e.data.City,
                "Country": e.data.Country,
                "State": e.data.State,
            };
            globalCountry = 0;
            globalState = 0;

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
        columnFixing: {
            enabled: true,
        },

        columns: [

            {
                dataField: "JobTitle",
                allowFiltering: true,
                allowSorting: true,
                fixed: true,
                caption: "Job Title",
                validationRules: [{ type: "required" }],
            },

            {
                dataField: 'JobType',
                caption: 'Job Type',
                lookup: {
                    dataSource(options) {
                        return {
                            store: jobTypeValues1,
                        };
                    },
                    valueExpr: 'Id',
                    displayExpr: 'Value',
                },
            },
            
            {
                dataField: "DepartmentName",
                caption: "Department Name",
                allowFiltering: true,
                allowSorting: true,
                cellTemplate: function (container, options) {
                    const departmentName = options.value;

                    if (!departmentName) {
                        $("<div>")
                            .text("No data entry")
                            .appendTo(container);
                    } else {
                        $("<div>")
                            .text(departmentName)
                            .appendTo(container);
                    }
                }
            },
            {
                dataField: "Salary",
                caption: "Salary",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [
                    {
                        type: "required",
                        message: "Salary is required"
                    },
                    {
                        type: "custom",
                        validationCallback: function (options) {

                            return options.value >= 0;
                        },
                        message: "Salary cannot be negative"
                    }
                ],
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
                dataField: 'CurrencyType',
                caption: 'Currency',
                lookup: {
                    dataSource(options) {
                        return {
                            store: currencyValues1,
                        };
                    },
                    valueExpr: 'Id',
                    displayExpr: 'Value',
                },
                cellTemplate: function (container, options) {
                    const currencyId = options.value;
                    const currencyValue = currencyValues1.find(currency => currency.Id === currencyId);
                    JobCurrency = currencyValue.Value;
                    const currencySymbol = currencySymbols[currencyValue.Value] || "";
                    $("<div>")
                        .text(currencySymbol)
                        .appendTo(container);
                }
            },


            {
                dataField: "JobMode",
               caption: "Job Mode",
                lookup: {
                    dataSource(options) {
                        return {
                            store: jobModeValues1,
                        };
                    },
                    valueExpr: 'Id',
                    displayExpr: 'Value',
                },
                cellTemplate: function (container, options) {
                    const jobModeID = options.value;
                    const jobModeValues = jobModeValues1.find(JobMode => JobMode.Id === jobModeID);
                    const jobModeValuesText = jobModeValues.Value;
                    JobModeHome = jobModeValuesText;

                    $("<div>")
                        .text(jobModeValuesText)
                        .appendTo(container);
                }
            },
           
            {
                dataField: "MinExperience",
                caption: "Min Experience",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [
                    {
                        type: "required",
                        message: "Min Experience is required"
                    }

                ],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: Array.from({ length: 21 }, (_, i) => i),
                    placeholder: "Select Years of Experience",
                },
                cellTemplate: function (container, options) {
                    const minExperience = options.data.MinExperience;
                    const minMonths = options.data.MinExperienceMonth;
                    const text = `${minExperience} years ${minMonths} months`;
                    $("<div>")
                        .text(text)
                        .appendTo(container);
                }
            },
            {
                dataField: "MinExperienceMonth",
                caption: "Min Months",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [{ type: "required" }],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: Array.from({ length: 13 }, (_, i) => i),
                    placeholder: "Select Months",

                },
                visible: false
            },

            {
                dataField: "MaxExperience",
                caption: "Max Experience",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [
                    {
                        type: "required",
                        message: "Max Experience is required and more than Min Experience"
                    },
                    {
                        type: "custom",
                        validationCallback: function (options) {
                            const minExperience = options.data.MinExperience;
                            const minMonths = options.data.MinExperienceMonth;
                            const maxExperience = options.data.MaxExperience;
                            const maxMonths = options.data.MaxExperienceMonth;
                            if (minExperience !== undefined && minMonths !== undefined && maxExperience !== undefined && maxMonths !== undefined) {
                                return ((minExperience * 12) + minMonths) <= ((maxExperience * 12) + maxMonths);
                            }

                            return true;
                        },
                        message: "Max Experience must be more than or equal to Min Experience"
                    }
                ],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: Array.from({ length: 21 }, (_, i) => i),
                    placeholder: "Select Years of Experience",
                },
                cellTemplate: function (container, options) {
                    const maxExperience = options.data.MaxExperience;
                    const maxMonths = options.data.MaxExperienceMonth;
                    const text = `${maxExperience} years ${maxMonths} months`;
                    $("<div>")
                        .text(text)
                        .appendTo(container);
                }
            },
            {
                dataField: "MaxExperienceMonth",
                caption: "Max Months",
                allowFiltering: true,
                allowSorting: true,
                validationRules: [{ type: "required" }],
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: Array.from({ length: 13 }, (_, i) => i),
                    placeholder: "Select Months",

                },
                visible: false
            },

            {
                dataField: "Description",
                allowFiltering: true,
                allowSorting: true,
                caption: "Description",
                validationRules: [{ type: "required" }],
                editorType: "dxTextArea",
            },
            {
                dataField: "IsActive",
                caption: "Post Active Status",
                allowFiltering: true,
                allowSorting: true,
                cellTemplate: function (container, options) {
                    const isActive = options.value;
                    const statusText = isActive ? "Post Active" : "Post Inactive";

                    $("<div>")
                        .text(statusText)
                        .appendTo(container);
                }
            },
            {
                dataField: "urgentRequirement",
                caption: "Urgent Requirement",
                allowFiltering: true,
                allowSorting: true,
                cellTemplate: function (container, options) {
                    const isUrgentRequirement = options.value;
                    const statusText = isUrgentRequirement ? "Urgent Hiring Active" : "Urgent Hiring Inactive";

                    $("<div>")
                        .text(statusText)
                        .appendTo(container);
                }
            },
            {
                dataField: "Country",
                caption: 'Country',
                validationRules: [{ type: "required" }],
                setCellValue(rowData, value) {
                    rowData.Country = value;
                    rowData.State = null;
                },
                lookup: {
                    dataSource: CountryList,
                    valueExpr: 'Category_Id',
                    displayExpr: 'Value',
                },
            },
            {
                dataField: 'State',
                caption: 'State',
                validationRules: [{ type: "required" }],
                setCellValue(rowData, value) {
                    rowData.State = value;
                    rowData.City = null;
                },
                lookup: {
                    dataSource(options) {
                        return {
                            store: StateList,
                            filter: options.data ? ['Ref_ID', '=', options.data.Country] : null,
                        };
                    },
                    valueExpr: 'Category_Id',
                    displayExpr: 'Value',
                },
            },
            {
                dataField: 'City',
                caption: 'City',
                validationRules: [{ type: "required" }],
                lookup: {
                    dataSource(options) {
                        return {
                            store: CityList,
                            filter: options.data ? ['Ref_ID', '=', options.data.State] : null,
                        };
                    },
                    valueExpr: 'Category_Id',
                    displayExpr: 'Value',
                },
            },
         
        ],
        showBorders: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
       
    });
}


$(document).ready(function () {
    fetchMasterValues();

});


function fetchMasterValues() {
    $.ajax({
        url: "/Job/GetMasterValues",
        method: "GET",
        success: function (response) {
            jobTypeValues1 = response.filter(item => item.Category === 'Job Type');
            jobModeValues1 = response.filter(item => item.Category === 'Job Mode');
            currencyValues1 = response.filter(item => item.Category === 'Currency');
            fetchLocation();
        },
        error: function (err) {
            alert("Error fetching master values: " + err);
        }
    });
}

function fetchLocation() {
    $.ajax({
        url: "/Job/GetAllCountryStateCity",
        method: "GET",
        success: function (response) {
            CountryList = response.filter(item => item.Category_Name === 'Country');
            StateList = response.filter(item => item.Category_Name === 'State');
            CityList = response.filter(item => item.Category_Name === 'City');
            LoadRecords();
        },
        error: function (err) {
            alert("Error fetching Location: " + err);
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

