const CountryList = [];
const StateList = [];
const CityList = [];

function ShowEvent(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;
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
        columnFixing: { enabled: true },
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

        columnAutoWidth: true,
        columnFixing: {
            enabled: true,
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
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "JobSeeker Management.xlsx");
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();

                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('JobSeeker Management.pdf');
                });
            }
        },

        scrolling: {
            mode: "virtual", 
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
                validationRules: [{ type: "required" }],
                allowEditing: false
            },

            {
                dataField: "PhoneNumber",
                caption: "Phone Number",
                allowEditing: false

            },

            {
                dataField: "Country",
                caption: "Country",
                allowEditing: false,
                filterType: "list", 
                lookup: {
                    dataSource: CountryList,
                },
            },

            {
                dataField: "State",
                caption: "State",
                allowEditing: false,
                filterType: "list", 
                lookup: {
                    dataSource: StateList,
                },
            },
           
            {
                dataField: "City",
                caption: "City",
                allowEditing: false,
                filterType: "list",
                lookup: {
                    dataSource: CityList,
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
                allowEditing: false,
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

                for (const data of ResponseData) {
                    if (data.Country !== null && !CountryList.includes(data.Country)) {
                        CountryList.push(data.Country); 
                    }
                    if (data.State !== null && !StateList.includes(data.State)) {
                        StateList.push(data.State);
                    }
                    if (data.City !== null && !CityList.includes(data.City)) {
                        CityList.push(data.City);
                    }
                }
            });
            ShowEvent(ResponseData);
        },
        error: function (err) {
            alert(err);
        }

    })
}


