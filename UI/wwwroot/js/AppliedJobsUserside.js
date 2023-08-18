
function ShowEvent(_datasource) {
   
    $("#dataGrid").dxDataGrid({

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
                dataField: "JobModeName",
                caption: "JobModeName",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "JobTypeName",
                caption: "JobTypeName",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
            {
                dataField: "DateTime",
                caption: "DateTime",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },
        ],

    });

}
function LoadRecords() {
    $.ajax({
        url: "/UserDashboardController/AppliedJobs",
        method: 'GET',
        success: function (responseData) {
            ShowEvent(employees);      
        },
        error: function (err) {
            alert(err);
        }
    });
}
$(document).ready(function () {  
   // LoadRecords();
    ShowEvent(employees); 
});

const employees = [{
    "UserId": 1,
    "FirstName": "Bharat",
    "LastName": "Menaria",
    "Gender": "Male",
    "JobId": "2",
    "JobTitle": "Backend",
    "JobModeName": "Remote",
    "JobTypeName": "Full Time",
    "DateTime": "1968-12-08T00:00:00.000",
   
}
]



