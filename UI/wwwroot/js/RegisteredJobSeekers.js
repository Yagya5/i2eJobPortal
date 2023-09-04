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
            allowDeleting: true,
            allowAdding: false
        },

        onRowUpdated: function (e) {
            $.ajax({
                url: "/RegisteredJobSeekers/UpdateRegisteredJobSeekers/",
                method: "POST",
                data: {
                    "UserId": e.data.UserId,
                    "Address": e.data.Address,
                    "BirthDate": e.data.BirthDate,
                    "Country": e.data.Country,
                    "City": e.data.City,
                    "Email": e.data.Email,
                    "FirstName": e.data.FirstName,
                    "Gender": e.data.Gender,
                    "Is_Active": e.data.Is_Active,
                    "LastName": e.data.LastName,
                    "PhoneNumber": e.data.PhoneNumber,
                    "ProfilePicture": e.data.ProfilePicture,
                    "State": e.data.State,
                    "Is_Deleted": e.data.Is_Deleted
                    
                },
                success: function (ResponseData) {
                    LoadRecords();
                },
                error: function (err) {
                    alert(err);
                }
            })
        },

        onRowRemoved: function (e) {
            $.ajax({
                url: "/RegisteredJobSeekers/UpdateRegisteredJobSeekers/",
                method: "POST",
                data: {
                    "UserId": e.data.UserId,
                    "Address": e.data.Address,
                    "BirthDate": e.data.BirthDate,
                    "Country": e.data.Country,
                    "City": e.data.City,
                    "Email": e.data.Email,
                    "FirstName": e.data.FirstName,
                    "Gender": e.data.Gender,
                    "Is_Active": e.data.Is_Active,
                    "LastName": e.data.LastName,
                    "PhoneNumber": e.data.PhoneNumber,
                    "ProfilePicture": e.data.ProfilePicture,
                    "State": e.data.State,
                    "Is_Deleted": true,

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
                dataField: "ProfilePicture",
                caption: "Profile Picture",
                width: 80,
                allowFiltering: false,
                allowSorting: false,
                cellTemplate(container, options) {
                    $('<div>')
                        .append($('<img>', { src: options.data.ProfilePicture }))
                        .appendTo(container);
                },
                allowEditing: false, // Enable editing for this column
                editCellTemplate: function (container, options) {
                    // Create an img element for the profile picture
                    var img = $("<img>").attr("src", options.data.ProfilePicture).width(60).height(60);

                    // Append the img to the editing popup container
                    container.append(img);
                }
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
                dataField: "Email",
                caption: "Email",
                width: 150,
                validationRules: [{ type: "required" }],
                allowEditing: false
            },

            {
                dataField: "PhoneNumber",
                caption: "Phone Number",
                width: 110,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false

            },

            {
                dataField: "Country",
                caption: "Country",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                /*groupIndex: 0*/
            },

            {
                dataField: "State",
                caption: "State",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                /*groupIndex: 0*/
            },

            

            {
                dataField: "City",
                caption: "City",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                /*groupIndex: 0*/
            },

            {
                dataField: "Address",
                caption: "Address",
                width: 150,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false
            },
            {
                dataField: "Gender",
                caption: "Gender",
                width: 75,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false
            },

            {
                dataField: "BirthDate",
                caption: "Birth Date",
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                cellTemplate: function (container, options) {
                    var birthDate = new Date(options.value);
                    var formattedDate = birthDate.toLocaleDateString(); // Convert to a localized short date string
                    $("<div>").text(formattedDate).appendTo(container);
                }
            },

            
            {
                dataField: "Is_Active",
                width: 75,
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

            // Update the ResponseData values for each record
            ResponseData.forEach(function (record) {
                if (record.ProfilePicture == null || record.ProfilePicture == "") {
                    record.ProfilePicture = "/UserProfile/DefaultProfileJobSeeker.png";
                }
                record.BirthDate = record.BirthDate.split('T')[0];
            });
            ShowEvent(ResponseData);
        },
        error: function (err) {
            alert(err);
        }

    })
}


