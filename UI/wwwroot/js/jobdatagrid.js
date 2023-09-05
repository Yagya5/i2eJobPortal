const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
};

// Define your data variables
let jobTypeValues1 = [];
let jobModeValues1 = [];
let currencyValues1 = [];
let CountryList = [];
let StateList = [];
let CityList = [];
let stateSelectBoxInstance = null;
let citySelectBoxInstance = null;
let globalCountry = 0;
let globalState = 0;

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
                "JobType_Home": JobTypeHome,
                "JobMode_Home": JobModeHome,
                "CurrencyType_Home": JobCurrency,
                "Country_Home": JobCountry,
                "State_Home": JobState,
                "City_Home": JobCity,
            };

            
            if (globalCountry !== 0) {
                dataToSend.Country = globalCountry;
            }
            if (globalState !== 0) {
                dataToSend.State = globalState;
            }

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
                "Country": globalCountry,
                "State": globalState,
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
        columnFixing: {
            enabled: true,
        },
       
    
               
        columns: [
           
            { dataField: "JobTitle", fixed: true, caption: "Job Title", validationRules: [{ type: "required" }], },
           
          
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
                    JobTypeHome = jobTypeText;
                    $("<div>")
                        .text(jobTypeText)
                        .appendTo(container);
               }
            },
            
            { dataField: "DepartmentName", caption: "Department Name" },
            {
                dataField: "Salary",
                caption: "Salary",
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
                    JobModeHome = jobModeValuesText;

                    $("<div>")
                        .text(jobModeValuesText)
                        .appendTo(container);
                }
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience",
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
                validationRules: [{ type: "required" }],
                editorType: "dxSelectBox", 
                editorOptions: {
                    dataSource: Array.from({ length: 13 }, (_, i) => i), 
                    placeholder: "Select Months",
                    
                },
                visible: false
            },
           
            { dataField: "Description", caption: "Description", validationRules: [{ type: "required" }], editorType: "dxTextArea", },
            { dataField: "IsActive", caption: "Post Active Status" },
            { dataField: "urgentRequirement", caption: "Urgent Requirement" },
            {
                dataField: "Country",
                caption: "Country",
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: CountryList,
                    valueExpr: "Category_Id", 
                    displayExpr: "Value", 
                    placeholder: "Select Country",
                    onValueChanged: function (e) {
                        console.log("Country selection changed:", e.value);
                        const selectedCountryId = e.value;
                        filteredState = StateList.filter(State => State.Ref_ID === selectedCountryId);
                        globalCountry = selectedCountryId;
                        dataSource.Country = globalCountry;
                        if (stateSelectBoxInstance !== null) {
                            stateSelectBoxInstance.option("dataSource", filteredState);
                            stateSelectBoxInstance.option("value", null);
                        }
                    },
                },
                cellTemplate: function (container, options) {
                    const CountryID = options.value;
                    const CountryValues = CountryList.find(Country => Country.Category_Id === CountryID);
                    const CountryValuesText = CountryValues.Value;
                    JobCountry = CountryValuesText;
                    $("<div>")
                        .text(CountryValuesText)
                        .appendTo(container);
                }
            },
            {
                dataField: "State",
                caption: "State",
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: StateList,
                    valueExpr: "Category_Id",
                    displayExpr: "Value",
                    placeholder: "Select State",
                    onInitialized: function (e) {
                        stateSelectBoxInstance = e.component;
                        console.log("State initialized");
                    },
                    onValueChanged: function (e) {

                        console.log("State selection changed:", e.value);
                        const selectedStateId = e.value;
                        dataSource.State = selectedStateId;
                        globalState = selectedStateId;
                        filteredCity = CityList.filter(City => City.Ref_ID === selectedStateId);
                        console.log("Filtered Cities:", filteredCity);
                        if (citySelectBoxInstance !== null) {
                            citySelectBoxInstance.option("dataSource", filteredCity);
                            citySelectBoxInstance.option("value", null);
                        }
                    },

                }, cellTemplate: function (container, options) {
                    const StateID = options.value;
                    const StateValues = StateList.find(State => State.Category_Id === StateID);
                    const StateValuesText = StateValues.Value;
                    JobState = StateValuesText;
                    $("<div>")
                        .text(StateValuesText)
                        .appendTo(container);
                }
            },
            {
                dataField: "City",
                caption: "City",
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: CityList,
                    valueExpr: "Category_Id",
                    displayExpr: "Value",
                    placeholder: "Select City",
                    onInitialized: function (e) {
                        citySelectBoxInstance = e.component;
                        
                    },
                },
                cellTemplate: function (container, options) {
                    const CityID = options.value;
                    const CityValues = CityList.find(City => City.Category_Id === CityID);
                    const CityValuesText = CityValues.Value;
                    JobCity = CityValuesText;
                    $("<div>")
                        .text(CityValuesText)
                        .appendTo(container);
                }
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

