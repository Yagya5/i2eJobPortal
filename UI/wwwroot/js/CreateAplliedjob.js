


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
                    alert("Succesfully Applied job ");
                } else {
                    if (response.responseof == "Resume Required") {

                       // alert("Please upload your Resume on Profile Section.");
                        Swal.fire({
                            icon: 'error',
                            title: 'Resume Required',
                            text: 'Please Upload Your Resume In Order to Apply for Job'
                        }).then(function () {
                            window.location.href = '/EditUserFullDetails/Index?id=' + response.userid;
                        })                        
                    }
                }
               
            },
            error: function () {

            }
        });
    }
}

