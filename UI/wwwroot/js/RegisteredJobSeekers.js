function ShowEvent(_datasource) {
    $("#dataGrid").dxDataGrid({
        dataSource: _datasource,
        keyExpr: "UserId",

        allowColumnReordering: true,
        allowColumnResizing: true,
        filterRow: { visible: true },
        searchPanel: { visible: true },
        groupPanel: { visible: true },
        showBorders: true,
        showRowLines: true,
        wordWrapEnabled: true,

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
                    if (ResponseData.Response == "Update Sucessfully") {
                        if (ResponseData.Is_Active == false) {
                            Swal.fire(
                                `${ResponseData.FirstName} blocked successfully!`,
                                '',
                                'success'
                            )
                            console.log(`${ResponseData.FirstName} blocked successfully!`);
                        }
                        else {
                            Swal.fire(
                                `${ResponseData.FirstName} Actived successfully!`,
                                '',
                                'success'
                            )
                            console.log(`${ResponseData.FirstName} blocked successfully!`);

                        }
                        
                    }

                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed...',
                            text: 'Something went wrong!',
                            /*footer: '<a href="">Why do I have this issue?</a>'*/
                        })
                    }
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
                    if (ResponseData.Response == "Update Sucessfully") {
                        Swal.fire(
                            `${ResponseData.FirstName} data deleted successfully!`,
                            '',
                            'success'
                        )
                        console.log(`${ResponseData.FirstName} data deleted successfully!`);
                        
                    }

                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed...',
                            text: 'Something went wrong!',
                            
                        })
                    }
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
                allowEditing: false

            },

            {
                dataField: "Country",
                caption: "Country",
                allowEditing: false,
            },

            {
                dataField: "State",
                caption: "State",
                allowEditing: false,
            },
           
            {
                dataField: "City",
                caption: "City",
                allowEditing: false,
            },

            {
                dataField: "Address",
                caption: "Address",
                width: 150,
                allowEditing: false
            },
            {
                dataField: "Gender",
                caption: "Gender",
                width: 75,
                allowEditing: false
            },

            {
                dataField: "BirthDate",
                caption: "Birth Date",
                allowEditing: false,
                cellTemplate: function (container, options) {
                    if (options.data.BirthDate === "0001-01-01") {
                        container.text(""); // Display nothing for "0001-01-01"
                    } else {
                        var birthDate = new Date(options.data.BirthDate);
                        var formattedDate = birthDate.toLocaleDateString(); // Convert to a localized short date string
                        $("<div>").text(formattedDate).appendTo(container);
                    }
                }
            },

            {
                dataField: "Is_Active",
                width: 75,
                caption: "Status",
                filterType: "lookup", // Specify the filter type as lookup
                lookup: {
                    dataSource: [
                        { value: true, text: "Active" }, // Define custom text for true value
                        { value: false, text: "Block" } // Define custom text for false value
                    ],
                    valueExpr: "value",
                    displayExpr: "text"
                }
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


