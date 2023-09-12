$(document).ready(function () {
    
    function performSearch() {
        var searchText = $('#txtSearch').val().toLowerCase();
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
    }

    $('#filterButton').click(function () {
        $('.dropdown').toggleClass('show'); 
    });
    $('#saveButton').click(function () {
        applyFilters(); 
        $('#filterDropdownButton').dropdown('hide'); 
    });
   
    var minExperienceInput = $('.input-min');
    var maxExperienceInput = $('.input-max');
    maxExperienceInput.val(minExperienceInput.val());

   
    minExperienceInput.on('input', function () {
        var minExperience = parseInt(minExperienceInput.val()) || 0;
        if (minExperience < 0) {
            minExperience = 0;
            minExperienceInput.val(minExperience);
        }
        maxExperienceInput.attr('min', minExperience);
    });
 
    function applyFilters() {
        var minExperienceInput = $('.input-min');
        var maxExperienceInput = $('.input-max');

   
        var minExperience = parseInt(minExperienceInput.val()) || 0;
        var maxExperience = parseInt(maxExperienceInput.val()) || Number.MAX_SAFE_INTEGER;


        if (minExperience < 0) {
            minExperience = 0;
            minExperienceInput.val(minExperience);
        }

        if (maxExperience < minExperience) {
            maxExperience = minExperience;
            maxExperienceInput.val(maxExperience);
        }

        maxExperienceInput.attr('min', minExperience);

        var selectedJobType = $('#JobType').val();
        var selectedJobMode = $('#JobMode').val();
        var found = false;

        $('.job-card').each(function () {
            var experienceRange = $(this).find('.job-experience-range').text();
            var jobMinExperience = parseInt(experienceRange.split('-')[0].trim());
            var jobMaxExperience = parseInt(experienceRange.split('-')[1].trim());
            var jobType = $(this).find('.job-type-category span').text().toLowerCase();
            var jobMode = $(this).find('.job-mode-category span').text().toLowerCase();

            var experienceFilterPassed = jobMinExperience >= minExperience && jobMaxExperience <= maxExperience;
            var jobTypeFilterPassed = selectedJobType === 'All' || jobType === selectedJobType.toLowerCase();
            var jobModeFilterPassed = selectedJobMode === 'All' || jobMode === selectedJobMode.toLowerCase();
            if (experienceFilterPassed || jobTypeFilterPassed || jobModeFilterPassed) {
                $(this).fadeIn();
                found = true;
            } else {
                $(this).fadeOut();
            }
        });
        var selectedJobTypeText = $('#JobType option:selected').text();
        var selectedJobModeText = $('#JobMode option:selected').text();
      
        $('#selected-filters').empty();
        var filters = [];
        if (minExperience > 0) {
            filters.push('Min Exp: ' + minExperience);
        }
        if (maxExperience < Number.MAX_SAFE_INTEGER) {
            filters.push('Max Exp: ' + maxExperience);
        }
        if (selectedJobType !== 'All' && selectedJobType !== '') {
            filters.push('Job Type: ' + selectedJobTypeText);
        }
        if (selectedJobMode !== 'All' && selectedJobMode !== '') {
            filters.push('Job Mode: ' + selectedJobModeText);
        }

        var breadcrumbText = filters.join('  ');
        $('#selected-filters').append('<span class="breadcrumb-item">' + breadcrumbText + '</span>');

        toggleNoDataMessage(found);
    }

   
    $('#searchButton').click(function () {
        performSearch();
    });

  


});

function toggleNoDataMessage(found) {
    var noDataMessage = $('.no-data-message');
    if (found) {
        noDataMessage.hide();
    } else {
        noDataMessage.show();
    }
}


