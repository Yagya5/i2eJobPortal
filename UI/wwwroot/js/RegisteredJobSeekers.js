function ShowEvent(_datasource) {
    $("#dataGrid").dxDataGrid({
        dataSource: _datasource,
        keyExpr: "UserId",

        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
        /*groupPanel: { visible: true },*/
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
            allowDeleting: false,
            allowAdding: false
        },

        onContentReady: function () {
            $(".dx-link-edit").addClass("btn btn-primary");
        },

        onRowUpdated: function (e) {
            $.ajax({
                url: "/RegisteredJobSeekers/UpdateRegisteredJobSeekers/",
                method: "POST",
                data: {
                    "UserId": e.data.UserId,
                    "Address": e.data.Address,
                    "BirthDate": e.data.BirthDate,
                    "City": e.data.City,
                    "Email": e.data.Email,
                    "FirstName": e.data.FirstName,
                    "Gender": e.data.Gender,
                    "Is_Active": e.data.Is_Active,
                    "LastName": e.data.LastName,
                    "PhoneNumber": e.data.PhoneNumber,
                    "ProfilePicture": e.data.ProfilePicture,
                    "State": e.data.State,
                    
                    
                    
                },
                success: function (ResponseData) {
                    LoadRecords();
                },
                error: function (err) {
                    alert(err);
                }
            })
        },

        

        columns: [
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
                dataField: "Email",
                caption: "Email",
                validationRules: [{ type: "required" }],
                allowEditing: false
            },

            {
                dataField: "PhoneNumber",
                caption: "Phone Number",
                validationRules: [{ type: "required" }],
                allowEditing: false

            },

            {
                dataField: "State",
                caption: "State",
                validationRules: [{ type: "required" }],
                allowEditing: false,
                groupIndex: 0
            },

            

            {
                dataField: "City",
                caption: "City",
                validationRules: [{ type: "required" }],
                allowEditing: false,
                groupIndex: 0
            },

            {
                dataField: "Address",
                caption: "Address",
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
                dataField: "BirthDate",
                caption: "BirthDate",
                validationRules: [{ type: "required" }],
                allowEditing: false,
                cellTemplate: function (container, options) {
                    var birthDate = new Date(options.value);
                    var formattedDate = birthDate.toLocaleDateString(); // Convert to a localized short date string
                    $("<div>").text(formattedDate).appendTo(container);
                }
            },

            {
                dataField: "ProfilePicture",
                caption: "Profile Picture",
                width: 200,
                allowFiltering: false,
                allowSorting: false,
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<img>', { src: options.data.ProfilePicture }))
                        .appendTo(container);
                },
                allowEditing: false
            },
            {
                dataField: "Is_Active",
                caption: "Active",
                
            },

        ]

    });
}




$(document).ready(function () {
    LoadRecords();
})

function LoadRecords() {
    $.ajax({
        url: "/RegisteredJobSeekers/GetRegisteredJobSeekers",
        method: "GET",
        success: function (ResponseData) {
            ShowEvent(ResponseData);
        },
        error: function (err) {
            alert(err);
        }

    })
}


