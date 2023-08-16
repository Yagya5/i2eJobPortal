



function ShowEvent(_datasource) {

    
    $("#dataGrid1").dxDataGrid({


        dataSource: _datasource,
        keyExpr: "UserId",
        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: false },

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
            $(".dx-link-edit").addClass("btn btn-primary");
        },


        columns: [
            {
                dataField: "UserId",
                caption:"User ID",
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
                caption:"Job ID",
                validationRules: [{ type: "required" }],
                 allowEditing: false
            },
            {
                dataField: "JobTitle",
                caption:"Job Title",
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
                caption:"Min Experience",
                validationRules: [{ type: "required" }],
                 allowEditing: false
            },
            {
                dataField: "Location",
                caption:"Location",
                validationRules: [{ type: "required" }],
                 allowEditing: false
            },
            {
                dataField: "ProfilePicture",
                caption:"Profile Picture",
                validationRules: [{ type: "required" }],
                 allowEditing: false
            },


        ]

    });
}



function LoadRecords() {
    $.ajax({
        url: "/JobApplications/GetAppliedJobs", 
        method: 'GET',
        success: function (ResponseData) {
            ShowEvent(ResponseData);
            alert(response);
            window.location.reload();
            console.log("Hello");
        },
        error: function (err) {
            alert(err);
        }
    });
}

$(document).ready(function () {
    LoadRecords();
});

