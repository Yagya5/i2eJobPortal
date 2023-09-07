


$(document).ready(function () {
  
    $('#JobId').click(function () {
        CreateAppliedJob($(this).val());
    });

});

function CreateAppliedJob(JobId) {

    if (JobId != 0) {
        $.ajax({
            url: "/UserDashboard/CreateAppliedJob?job_Id=" + JobId,
            method: 'Get',
            success: function (response) {
                console.log(response);
                if (response.status) {
                    Swal.fire(
                        'Succesfully Applied job!',
                        '',
                        'success'
                    )
                   /* alert("Succesfully Applied job ");*/
                } else {
                    if (response.responseof == "Resume Required") {
                        Swal.fire(
                            'Error',
                            'Please upload your Resume in Profile Section!',
                            
                           
                        )
                       /* alert("Please upload your Resume on Profile Section.");*/
                        window.location.href = '/EditUserFullDetails/Index?id=' + response.userid;
                    }
                }
               
            },
            error: function () {

            }
        });
    }
}

