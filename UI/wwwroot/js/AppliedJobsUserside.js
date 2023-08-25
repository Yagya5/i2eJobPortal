
function ShowEvent(_datasource) {

    $("#dataGrid").dxDataGrid({

        dataSource: _datasource,
        keyExpr: "UserId",
        allowColumnReordering: true,
        allowColumnResizing: true,
        headerFilter: {
            allowSearch: true,
            visible: true
        },
        filterRow: {
            visible: false,
            applyFilter: 'auto',
        },
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,

        //selection: {
        //    mode: 'multiple',
        //},

        //paging: {
        //    pageSize: 10,
        //},
        //pager: {
        //    visible: true,
        //    allowedPageSizes: [10, 20, 'all'],
        //    showPageSizeSelector: true,
        //    showInfo: true,
        //    showNavigationButtons: true,
        //},

        summary: {
            groupItems: [{
                summaryType: "count"
            }]
        },

        columns: [

            {
                dataField: "JobTitle",
                caption: "Job Title"
            },
            {
                dataField: "Location",
                caption: "Location"
            },

            {
                dataField: "JobModeName",
                caption: "JobMode"
            },
            {
                dataField: "JobTypeName",
                caption: "JobType"
            },
            {
                dataField: "JobAppliedDateTime",
                caption: "AppliedDateTime",
                dataType: 'date',
                format: 'dd-MMM-yyyy'
            },
            {
                dataField: "Status",
                caption: "Status"
            },
            {
                dataField: "Round",
                caption: "Round"
            },
        ],

    });
}
$(document).ready(function () {
    let currentUserId = $("#currentUserId").val();
    LoadRecords(currentUserId);
});
console.log()
function LoadRecords(userid) {
    $.ajax({
        url: "/UserDashboard/GetMyAppliedJobs?id=" + userid,
        method: 'GET',
        success: function (responseData) {
            ShowEvent(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}





