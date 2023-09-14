
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
      // rowAlternationEnabled: true,
        wordWrapEnabled: true,

       
        paging: {
           pageSize: 10,
       },
        pager: {
           visible: true,
            allowedPageSizes: [10, 20,50, 'all'],
           showPageSizeSelector: true,
           showInfo: true,
           showNavigationButtons: true,
        },

        loadPanel: {
            enabled: true,
            showPane: true,
            shading: true,
            shadingColor: 'rgba(0,0,0,0.4)'
        },
        searchPanel: { visible: true },

        columns: [
            {
                dataField: "JobTitle",
                caption: "Job Title"
            },
            {
                dataField: "JobTypeName",
              caption: "JobType"
            },
           
            {
                dataField: "JobAppliedDateTime",
                caption: "AppliedDate",
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
