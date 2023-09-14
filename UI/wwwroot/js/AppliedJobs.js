

$(document).ready(function () {
    console.log("Temp");
    // Load the data
    LoadRecords();
    fetchDataStatus();
    /*   fetchRoundData();*/
    fetchDataRound();


});


//function ShowPivotGrid(_datasource) {
//    $(() => {
//        const jobTitles = _datasource.map(item => item.JobTitle);

//        const pivotGridChart = $('#pivotgrid-chart').dxChart({
//            commonSeriesSettings: {
//                type: 'bar',
//            },
//            size: {
//                height: 200,
//            },
//            adaptiveLayout: {
//                width: 450,
//            },
//            argumentAxis: {
//                categories: jobTitles, // Use job titles as categories
//                label: {
//                    overlappingBehavior: 'rotate', // Rotate labels if necessary
//                    rotationAngle: -45, // Adjust the rotation angle as needed
//                },
//                tick: {
//                    visible: false, // Hide ticks
//                },
//            },
//        }).dxChart('instance');

//        const pivotGrid = $('#pivotgrid').dxPivotGrid({
//            allowSortingBySummary: true,
//            allowFiltering: true,
//            showBorders: true,
//            showColumnGrandTotals: false,
//            showRowGrandTotals: false,
//            showRowTotals: false,
//            showColumnTotals: false,
//            fieldChooser: {
//                enabled: true,
//                height: 600,
//            },
//            dataSource: {
//                store: _datasource,
//                fields: [
//                    {
//                        dataField: "JobTitle",
//                        dataType: "string",
//                        area: "row",
//                        caption: "Job Applied For",
//                    },
//                    {
//                        dataField: "UserId",
//                        dataType: "int",
//                        summaryType: "count",
//                        area: "data",
//                        caption: "No. of Users Applied",
//                    },
//                ],
//            },
//        }).dxPivotGrid('instance');

//        $('#pivotgrid').hide();
//        pivotGrid.bindChart(pivotGridChart, {
//            dataFieldsDisplayMode: 'splitPanes',
//            alternateDataFields: false,
//        });

//        function expand() {
//            const dataSource = pivotGrid.getDataSource();
//            dataSource.expandHeaderItem('row', ['Jobs Applied']);
//            /*dataSource.expandHeaderItem('column', ['Job Type']);*/
//        }

//        setTimeout(expand, 0);
//    });
//}





function ShowEvent(_datasource) {
    window.jsPDF = window.jspdf.jsPDF;

    $("#dataGrid1").dxDataGrid({


        dataSource: _datasource,
        keyExpr: "AppliedJobId",
        allowColumnReordering: true,
        allowColumnResizing: true,
        //filterRow: { visible: true },
        filterRow: { visible: true },
        searchPanel: { visible: true },
        showBorders: true,
        showRowLines: true,
        //rowAlternationEnabled: true,
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

        selection: {
            mode: 'false',
        },
        scrolling: {
            mode: "virtual",
        },


        paging: {
            pageSize: 10,
        },
        pager: {
            visible: true,
            allowedPageSizes: [10, 20,50, 'all'],
            showPageSizeSelector: true,
            showInfo: true,
            showNavigationButtons: true,
            visible: true,
        },

      
        summary: {
            groupItems: [{
                summaryType: "count"
            }]
        },
        headerFilter: {
            visible: true,
        },

        editing: {
            mode: "popup",
            allowUpdating: true,
            allowDeleting: false,
            allowAdding: false,
        },

        onEditorPreparing(e) {
            if (e.parentType === 'dataRow' && e.dataField === 'Status') {
                e.editorOptions.disabled = (typeof e.row.data.Round !== 'string');
            }
        },




        allowColumnReordering: true,
        allowColumnResizing: true,
        columnFixing: {
            enabled: true,
        },
        /*  columnHidingEnabled: true,*/


        remoteOperations: { groupPaging: true },
        scrolling: {
            mode: 'virtual',
        },
        grouping: {
            autoExpandAll: true,
        },
        groupPanel: {
            visible: true,
        },

        export: {
            enabled: true,
            formats: ['xlsx', 'pdf']
        },
        onContentReady: function (e) {
            fetchDataStatus();
            /*   fetchRoundData();*/
            fetchDataRound();
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
                        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "AppliedJob Management.xlsx");
                    });
                });
            }
            else if (e.format === 'pdf') {
                const doc = new jsPDF();

                DevExpress.pdfExporter.exportDataGrid({
                    jsPDFDocument: doc,
                    component: e.component,
                }).then(() => {
                    doc.save('AppliedJob Management.pdf');
                });
            }
        },




        onRowUpdated: function (e) {
            console.log(e);
            
            $.ajax({
                url: "/JobApplications/UpdateAppliedJob/",
                method: "POST",
                data: {
                    "AppliedJobId": e.data.AppliedJobId,
                    "FirstName": e.data.FirstName,
                    "LastName": e.data.LastName,
                    "Gender": e.data.Gender,
                    "JobTitle": e.data.JobTitle,
                    "DepartmentName": e.data.DepartmentName,
                    "MinExperience": e.data.MinExperience,
                    "ProfilePicture": e.data.ProfilePicture,
                    "StatusValue": e.data.Status,
                    "RoundValue": e.data.Round,
                    "Status": e.data.Status,
                    "Round": e.data.Round

                },

              
                
                    success: function (ResponseData) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Updated the Record Sucessfully',
                            showConfirmButton: false,
                            timer: 1500
                        })

                        LoadRecords();
                    },
                    error: function (err) {
                        alert(err);
                    }
                });
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
                caption: "Full Name",
                calculateCellValue: function (data) {
                    return data.FirstName + " " + data.LastName;
                },
                allowFiltering: true,
                allowSorting: true,
                allowEditing: false,
                width: 150,
                //headerFilter: {
                //    allowSelectAll: true,
                //    search: {
                //        enabled: false,
                //    }
                //}
            },



            {
                dataField: "Gender",
                caption: "Gender",
                allowFiltering: true,
                allowSorting: true,
                /* validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100,

                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

            {
                dataField: "JobTitle",
                caption: "Job Applied For",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150,


                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "DepartmentName",
                caption: "Applied Department",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 130,
                //headerFilter: {
                //    allowSelectAll: true,
                //    search: {
                //        enabled: false,
                //    }
                //}
            },
            {
                dataField: "MinExperience",
                caption: "Min Experience",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                },
                calculateCellValue: function (data) {
                    return data.MinExperience + "" + " Years" + "   " + data.MinExperienceMonth + "" + "Months";
                },
            },

            {
                dataField: "MinExperienceMonth",
                caption: "MinExperienceMonth",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 50,
                visible: false,


                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "MaxExperience",
                caption: "Max Experience",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 150,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                },
                calculateCellValue: function (data) {
                    return data.MaxExperience + "" + " Years" + "   " + data.MaxExperienceMonth + "" + "Months";
                },
            },
            {
                dataField: "MaxExperienceMonth",
                caption: "MaxExperienceMonth",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 50,
                visible: false,


                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

            {
                dataField: "Country_Home",
                caption: "Country",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "State_Home",
                caption: "State",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },
            {
                dataField: "City_Home",
                caption: "City",
                allowFiltering: true,
                allowSorting: true,
                /*validationRules: [{ type: "required" }],*/
                allowEditing: false,
                width: 100,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

            {
                dataField: 'Round',
                caption: 'Round',
                visible: true,
                validationRules: [{ type: "required" }],
                setCellValue(rowData, value) {
                    rowData.Round = value;
                    rowData.Status = null;
                },
                lookup: {
                    dataSource: RoundValues1,
                    valueExpr: 'value',
                    displayExpr: 'value',
                },
                width: 110,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },

            {
                dataField: 'Status',
                caption: 'Status',
                lookup: {
                    dataSource(options) {
                        
                        const isRound = options.data && options.data.Round === 'Not Started';

                        const StatusFilter = isRound ? ['value', '=', 'Pending'] : null;
                        return {
                            store: StatusValues1,
                            filter: StatusFilter,
                        };
                    },
                    valueExpr: 'value',
                    displayExpr: 'value',
                },
                width: 110,
                headerFilter: {
                    allowSelectAll: true,
                    search: {
                        enabled: false,
                    }
                }
            },



           
        ],
    
    });
    
}




let StatusValues1 = [];
let RoundValues1 = [];




function fetchStatusDataAsync() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/JobApplications/GetMasterValuesByCategoryForAppliedJobs",
            method: "GET",
            data: { category: "Status" },
            success: function (response) {
                StatusValues1 = response.map(item => ({ value: item.Value }));
            },
            error: function (err) {
                alert("Error fetching Status Types: " + err);
            }
        });
    });

    
}



async function fetchDataStatus() {
    try {
        const statusData = await fetchStatusDataAsync();
        StatusValues1 = statusData;
        console.log("Status values:", statusData);
        
    } catch (error) {
        console.error(error);
    }
}



function fetchRoundDataAsync() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/JobApplications/GetMasterValuesByCategoryForAppliedJobs",
            method: "GET",
            data: { category: "Round" },
            success: function (response) {
                const roundValues = response.map(item => ({ value: item.Value }));
                resolve(roundValues); // Resolve the promise with the fetched data
            },
            error: function (err) {
                reject("Error fetching Round Types: " + err); // Reject the promise with an error message
            }
        });
    });
}



async function fetchDataRound() {
    try {
        const roundData = await fetchRoundDataAsync();
        RoundValues1 = roundData;
        console.log("Round values:", roundData);
        // You can continue working with roundData here
    } catch (error) {
        console.error(error);
    }
}







//$(function () {
//    const dataGrid = $('#dataGrid1').dxDataGrid({
        
//        //export: {
//        //    enabled: true,
//        //    formats: ['xlsx', 'pdf'],
//        //},
//        onExporting(e) {
//            if (e.format === 'xlsx') {
//                const workbook = new ExcelJS.Workbook();
//                const worksheet = workbook.addWorksheet('AppliedJobs');
//                DevExpress.excelExporter.exportDataGrid({
//                    component: e.component,
//                    worksheet,
//                    autoFilterEnabled: true,
//                }).then(() => {
//                    workbook.xlsx.writeBuffer().then((buffer) => {
//                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'AppliedJobs.xlsx');
//                    });
//                });
//            }
//            else if (e.format === 'pdf') {
//                const doc = new jsPDF();
//                DevExpress.pdfExporter.exportDataGrid({
//                    jsPDFDocument: doc,
//                    component: e.component,
//                }).then(() => {
//                    doc.save('AppliedJobs.pdf');
//                });
//            }
//        },
//    }).dxDataGrid('instance');
//});








//function exportToPdf() {
//    const doc = new jsPDF();

//    DevExpress.pdfExporter.exportDataGrid({
//        jsPDFDocument: doc,
//        component: $("#dataGrid1").dxDataGrid("instance"),
//        indent: 5,
//    }).then(() => {
//        doc.save('Data.pdf');
//    }).catch(error => {
//        console.error('Error during PDF export:', error);
//    });
//}





   
    


//function exportToExcel(e) {
//    const workbook = new ExcelJS.Workbook();
//    const worksheet = workbook.addWorksheet('AppliedJobsData');

//    DevExpress.excelExporter.exportDataGrid({
//        worksheet: worksheet,
//        component: e.component,
        
//        autoFilterEnabled: true,

//        customizeCell: function (options) {
//            options.excelCell.font = { name: 'Arial', size: 12 };
//            options.excelCell.alignment = { horizontal: 'left' };
//        }
//    }).then(function () {
//        workbook.xlsx.writeBuffer().then(function (buffer) {
//            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
//        });
//    });
//}
//$(() => {
//    $('#icon-edit').dxButton({
//        icon: 'check',
//        type: 'success',
//        text: 'Done',
//        onClick() {
//            DevExpress.ui.notify('The Done button was clicked');
//        },
//    });
//}


function LoadRecords() {
    $.ajax({
        url: "/JobApplications/GetAppliedJobs", 
        method: 'GET',



        success: function (responseData) {

            // Update the ResponseData values for each record
            responseData.forEach(function (record) {
                if (record.ProfilePicture == null || record.ProfilePicture == "") {
                    record.ProfilePicture = "/UserProfile/DefaultProfileJobSeeker.png";
                }
                
            });
         
            ShowEvent(responseData);
            ShowChart(responseData);


           /* alert(response);*/
          /*  window.location.reload();*/
            console.log(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}


function ShowChart(_datasource) {
    // Group and count the data by 'JobTitle'
    const dataByJobTitle = _datasource.reduce((acc, item) => {
        const jobTitle = item.JobTitle;

        if (!acc[jobTitle]) {
            acc[jobTitle] = {
                JobTitle: jobTitle,
                Count: 0,
            };
        }

        acc[jobTitle].Count++;
        return acc;
    }, {});

    // Convert the grouped data into an array
    const chartData = Object.values(dataByJobTitle);

    $(() => {
        $('#chart').dxChart({
            dataSource: chartData,
            series: {
                argumentField: 'JobTitle', // X-axis: Job titles
                valueField: 'Count',      // Y-axis: Count of user IDs
                name: 'Job Titles',
                type: 'bar',
                color: '#E75480',
            },
            valueAxis: {
                title:'Users Count',
            },
            //argumentAxis: {
            //    title:'Job titles',
            //}
        });
    });

}
