
function showJob(dataSource) {
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
        summary: {
            groupItems: [{
                summaryType: "count"
            }]
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

            //// Redirect to the edit page with the corresponding JobId
            //window.location.href = `/Admin/Job/EditJob/${jobId}`;
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
                    "JobTypeValue": e.data.JobTypeValue, // Set to the appropriate dropdown value
                    "JobModeValue": e.data.JobModeValue, // Set to the appropriate dropdown value
                    "JobCurrencyValue": e.data.JobCurrencyValue, // Set to the appropriate dropdown value
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
            // Prepared the data to send to the server
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
                "JobTypeValue": e.data.JobTypeValue, // Set to the appropriate dropdown value
                "JobModeValue": e.data.JobModeValue, // Set to the appropriate dropdown value
                "JobCurrencyValue": e.data.JobCurrencyValue, // Set to the appropriate dropdown value
                "urgentRequirement": e.data.urgentRequirement,
            };

            // Send the data to the server
            $.ajax({
                url: "/Job/CreateJob/",
                method: "POST",
                data: dataToSend,
                success: function (ResponseData) {
                    LoadRecords(); // Reload the grid after successful creation
                },
                error: function (err) {
                    alert(err); // Show an error message if the request fails
                }
            });
        },

        columnAutoWidth: true,
        columns: [
            /*{ dataField: "JobId", caption: "Job ID" },*/
            { dataField: "JobTitle", caption: "Job Title", validationRules: [{ type: "required" }], },
           
            /*{ dataField: "JobTypeValue", caption: "Job Type" },*/
            {
                dataField: "JobTypeValue",
                caption: "Job Type",
                validationRules: [{ type: "required" }],
                groupIndex: 0,
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: jobTypeValues1,
                    valueExpr: "value",
                    displayExpr: "value",
                    placeholder: "Select a Job Type",
                }
            },
            { dataField: "DepartmentName", caption: "Department Name" },
            { dataField: "Salary", caption: "Salary" },
            /*{ dataField: "JobCurrencyValue", caption: "Currency Type" },*/
            {
                dataField: "JobCurrencyValue",
                caption: "Currency",
                validationRules: [{ type: "required" }],
                groupIndex: 0,
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: currencyValues1,
                    valueExpr: "value",
                    displayExpr: "value",
                    placeholder: "Select a Currency",
                }
            },
            /*{ dataField: "JobModeValue", caption: "Job Mode" },*/
            {
                dataField: "JobModeValue",
                caption: "Job Mode",
                validationRules: [{ type: "required" }],
                groupIndex: 0,
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: jobModeValues1,
                    valueExpr: "value",
                    displayExpr: "value",
                    placeholder: "Select a Job Mode",
                }
            },
            { dataField: "MinExperience", caption: "Min Experience", validationRules: [{ type: "required" }], },
            { dataField: "MaxExperience", caption: "Max Experience", validationRules: [{ type: "required" }], },
            { dataField: "Description", caption: "Description", validationRules: [{ type: "required" }], },
            { dataField: "IsActive", caption: "Post Active Status" },
            { dataField: "urgentRequirement", caption: "Urgent Requirement" },
            { dataField: "Location", caption: "Location" },


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
    LoadRecords();
    fetchMasterValues();
});

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

let jobTypeValues1 = [];
let jobModeValues1 = [];
let currencyValues1 = [];


function fetchMasterValues() {
    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Job Type" },
        success: function (response) {
            jobTypeValues1 = response.map(item => ({ value: item.Value }));
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
            jobModeValues1 = response.map(item => ({ value: item.Value }));
        },
        error: function (err) {
            alert("Error fetching Job Modes: " + err);
        }
    });

    $.ajax({
        url: "/Job/GetMasterValuesByCategory",
        method: "GET",
        data: { category: "Currency" },
        success: function (response) {
            currencyValues1 = response.map(item => ({ value: item.Value }));

            /* LoadRecords();*/
        },
        error: function (err) {
            alert("Error fetching Currencies: " + err);
        }
    });
}

    });
});
