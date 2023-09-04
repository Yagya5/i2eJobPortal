﻿
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

        //selection: {
        //    mode: 'multiple',
        //},

     //   paging: {
       //     pageSize: 10,
     //   },
       // pager: {
       //    visible: true,
      //      allowedPageSizes: [10, 20, 'all'],
        //    showPageSizeSelector: true,
        //    showInfo: true,
        //    showNavigationButtons: true,
        //},

        loadPanel: {
            enabled: true,
            showPane: true,
            shading: true,
            shadingColor: 'rgba(0,0,0,0.4)'
        },
        searchPanel: { visible: true },
       

        
      

       // summary: {
        //    groupItems: [{
      //          summaryType: "count"
        //    }]
      //  },

        columns: [
            {
                dataField: "JobTitle",
                caption: "Job Title"
            },
            //{
            //    dataField: "Location",
            //    caption: "Location"
            //},

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

    $('#JobId').click(function () {
       CreateAppliedJob($(this).val());
    });
    //$('#applyjobs').click(function () {
    //    CreateAppliedJob(JobId);
    //});
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
function CreateAppliedJob(JobId) {
    console.log(JobId);    
   /* var jobId = job-cards.find('.job-Id-category span')*/
    if (JobId != 0)
    {
        $.ajax({
            url: "/UserDashboard/CreateAppliedJob?job_Id=" + JobId,
            method: 'Get',
            success: function (response) {
                console.log(response); 
           },
           error: function () {

           }
       });
    }  
}