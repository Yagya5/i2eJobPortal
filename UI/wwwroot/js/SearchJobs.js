// Filter Jobs
$(document).ready(function () {
    $('#txtSearch').keyup(function () {
        var searchText = $(this).val().toLowerCase();

        var found = false; 

        $('.cardmain').each(function () {
            var jobTitle = $(this).find('.job-name').text().toLowerCase();
            var jobMode = $(this).find('.job-location').text().toLowerCase();

            if (jobTitle.includes(searchText) || jobMode.includes(searchText)) {
                $(this).fadeIn();
                found = true; 
            } else {
                $(this).fadeOut();
            }
        });

        toggleNoDataMessage(found); 
    });

    $('.input-min, .input-max').on('input', function () {
        var minExperience = parseInt($('.input-min').val()) || 0;
        var maxExperience = parseInt($('.input-max').val()) || Number.MAX_SAFE_INTEGER;

        filterJobsByExperience(minExperience, maxExperience);
    });
    $('#JobType').change(function () {
        filterJobsByJobType($(this).val());
    });

    $('#JobMode').change(function () {
        filterJobsByJobMode($(this).val());
    });
});

function filterJobsByExperience(minExperience, maxExperience) {
    var found = false; 

    $('.job-card').each(function () {
        var experienceRange = $(this).find('.job-experience-range').text();
        var jobMinExperience = parseInt(experienceRange.split('-')[0].trim());
        var jobMaxExperience = parseInt(experienceRange.split('-')[1].trim());

        if (jobMinExperience >= minExperience && jobMaxExperience <= maxExperience) {
            $(this).fadeIn();
            found = true; 
        } else {
            $(this).fadeOut();
        }
    });

    toggleNoDataMessage(found); 
}

function toggleNoDataMessage(found) {
    var noDataMessage = $('.no-data-message');
    if (found) {
        noDataMessage.hide(); 
    } else {
        noDataMessage.show(); 
    }
}

function filterJobsByJobType(selectedJobType) {
    var found = false;

    $('.job-card').each(function () {
        var jobCard = $(this);
        var jobType = jobCard.find('.job-type-category span').text().toLowerCase();
        
        if (selectedJobType === 'All' || jobType === selectedJobType.toLowerCase()) {
            jobCard.fadeIn();
            found = true;
        } else {
            jobCard.fadeOut();
        }
    });

    toggleNoDataMessage(found);
}

function filterJobsByJobMode(selectedJobMode) {
    var found = false;

    $('.job-card').each(function () {
        var jobCard = $(this);
        var jobMode = jobCard.find('.job-mode-category span').text().toLowerCase();

        if (selectedJobMode === 'All' || jobMode === selectedJobMode.toLowerCase()) {
            jobCard.fadeIn();
            found = true;
        } else {
            jobCard.fadeOut();
        }
    });

    toggleNoDataMessage(found);
}  



