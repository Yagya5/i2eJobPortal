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

        scrolling: {
            mode: "virtual", 
            rowRenderingMode: "virtual" 
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
                allowEditing: false, 
                editCellTemplate: function (container, options) {
                    var img = $("<img>").attr("src", options.data.ProfilePicture).width(60).height(60);
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
                filterType: "list", 
                lookup: {
                    dataSource: [
                        "India","Usa"
                    ],
                },
            },

            {
                dataField: "State",
                caption: "State",
                allowEditing: false,
                filterType: "list", 
                lookup: {
                    dataSource: [
                        "Maharashtra", "Rajasthan", "California", "New York"
                    ],
                },
            },
           
            {
                dataField: "City",
                caption: "City",
                allowEditing: false,
                filterType: "list",
                lookup: {
                    dataSource: [
                        "Mumbai", "Pune", "Udaipur", "Jaipur", "Los Angeles", "San Francisco", "New York City", "Buffalo"
                    ],
                },
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
                allowEditing: false,
                filterType: "list", 
                lookup: {
                    dataSource: [
                        "Male", "Female"
                    ],
                },

            },

            {
                dataField: "BirthDate",
                caption: "Birth Date",
                dataType: "date",
                editorOptions: {
                    min: new Date(new Date().getFullYear() - 60, 0, 1), // 60 years ago from today
                    max: new Date(new Date().getFullYear() - 18, 11, 31) // 18 years ago from today
                },
                cellTemplate: function (container, options) {
                    if (options.data.BirthDate === "0001-01-01") {
                        container.text("");
                    } else {
                        var birthDate = new Date(options.data.BirthDate);
                        var formattedDate = birthDate.toLocaleDateString();
                        $("<div>").text(formattedDate).appendTo(container);
                    }
                }
            },

            {
                dataField: "Is_Active",
                width: 75,
                caption: "Status",
                filterType: "lookup", 
                lookup: {
                    dataSource: [
                        { value: true, text: "Active" }, 
                        { value: false, text: "Block" } 
                    ],
                    valueExpr: "value",
                    displayExpr: "text"
                }
            },

        ],
        onOptionChanged: function (e) {
            if (e.name === "filterValue" && e.fullName === "columns[7].filterValue") {
                $("#dataGrid").dxDataGrid("instance").filter(["BirthDate", "=", e.value[0]]);
            }
        },

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


