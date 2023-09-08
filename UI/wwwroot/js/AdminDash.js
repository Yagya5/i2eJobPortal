
$(document).ready(function () {
    console.log("Temp");
  
    CountRecords();
    Calendar();
    JobTypeDonut();
    JobTypeArea();
    TopAuditLogins();
    WorldMap();

    $('.nav-tabs a').click(function () {
        console.log('Tab clicked:', this.href); // Add this line for debugging
        $(this).tab('show');
    });


});


// Call TopAuditLogins when the page is ready
$(document).ready(function () {
    TopAuditLogins();
    WorldMap();
});





function CountRecords() {
    $.ajax({
        url: "/AdminDashboard/GetCounts",
        method: 'GET',
        success: function (responseData) {
            // Transform the responseData to match the expected format
            var transformedData = [
                { argument: 'Users', value: responseData[0].user_count },
                { argument: 'Total Applied Jobs', value: responseData[0].total_applied_jobs },
                { argument: 'Selected', value: responseData[0].selected_count },
                { argument: 'Rejected', value: responseData[0].rejected_count }
             
               
            ];

            ShowFunnel(transformedData); // Pass the transformed data to the chart function
        },
        error: function (err) {
            alert(err);
        }
    });
}




function ShowTiles(_datasource)
{

}


function ShowFunnel(_datasource) {
    $(() => {
        //// Create a data source with the provided values
        //const dataSource = [
        //    { argument: 'Selected', value: selectedCount },
        //    { argument: 'Rejected', value: rejectedCount },
        //    { argument: 'Users', value: userCount },
        //    { argument: 'Total Applied Jobs', value: totalAppliedJobs }
        //];

        $('#funnel').dxFunnel({
            dataSource: _datasource,
            title: {
                text: 'Job Selection Details',
                margin: { bottom: 30 },
            },
            argumentField: 'argument',
            valueField: 'value',
            palette: 'Soft Pastel',
            export: {
                enabled: true,
            },
            tooltip: {
                enabled: true,
                format: 'fixedPoint',
            },
            item: {
                border: {
                    visible: true,
                },
            },
            label: {
                visible: true,
                position: 'inside',
                backgroundColor: 'none',
                customizeText(e) {
                    return `<span style='font-size: 28px'>${e.percentText
                        }</span><br/>${e.item.argument}`;
                },
            },
        });
    });
}



function Calendar() {
    $(() => {
        const msInDay = 1000 * 60 * 60 * 24;
        const zoomLevels = ['month', 'year', 'decade', 'century'];
        const weekDays = [
            { id: 0, text: 'Sunday' },
            { id: 1, text: 'Monday' },
            { id: 2, text: 'Tuesday' },
            { id: 3, text: 'Wednesday' },
            { id: 4, text: 'Thursday' },
            { id: 5, text: 'Friday' },
            { id: 6, text: 'Saturday' },
        ];
        const weekNumberRules = ['auto', 'firstDay', 'firstFourDays', 'fullWeek'];
        const date = new Date().getTime();

        const calendar = $('#calendar').dxCalendar({
            value: new Date(),
            disabled: false,
            firstDayOfWeek: 0,
            showWeekNumbers: false,
            weekNumberRule: 'auto',
            zoomLevel: zoomLevels[0],
            onValueChanged(data) {
                selectedDate.option('value', data.value);
            },
            onOptionChanged(data) {
                if (data.name === 'zoomLevel') {
                    zoomLevel.option('value', data.value);
                }
            },
        }).dxCalendar('instance');

       
    });

}



function JobTypeDonut() {
    $.ajax({
        url: "/AdminDashboard/GetJobDetails",
        method: 'GET',
        success: function (responseData) {
            // Transform the responseData to match the expected format
            var transformedData = [
                { argument: 'Full Time', value: responseData.filter(item => item.JobType === 'Full Time')[0].JobTypeCount },
                { argument: 'Internship', value: responseData.filter(item => item.JobType === 'Internship')[0].JobTypeCount },
                { argument: 'Part Time', value: responseData.filter(item => item.JobType === 'Part Time')[0].JobTypeCount },
            ];

            ShowDonut(transformedData);
        },
        error: function (err) {
            alert(err);
        }
    });
}
function ShowDonut(_dataSource) {
    $(() => {
        $('#donut').dxPieChart({
            type: 'doughnut',
            palette: 'Soft Pastel',
            dataSource: _dataSource,
            title: 'Types of Jobs',
            tooltip: {
                enabled: true,
                format: 'millions',
                customizeTooltip(arg) {
                    return {
                        text: `${arg.argumentText}: ${arg.valueText}`,
                    };
                },
            },
            legend: {
                horizontalAlignment: 'right',
                verticalAlignment: 'top',
                margin: 0,
            },
            export: {
                enabled: true,
            },
            series: [{
                argumentField: 'argument',
                valueField: 'value',
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                    },
                },
            }],
        });
    });
}


function JobTypeArea() {
    $.ajax({
        url: "/AdminDashboard/GetJobDetails",
        method: 'GET',
        success: function (responseData) {
            // Transform the responseData to match the expected format
            var transformedData = responseData.map(function (item) {
                return {
                    jobTitle: item.JobTitle,
                   /* departmentName: item.DepartmentName,*/
                    fullTime: item.JobType === 'Full Time' ? item.JobTypeCount : 0,
                    partTime: item.JobType === 'Part Time' ? item.JobTypeCount : 0,
                    internship: item.JobType === 'Internship' ? item.JobTypeCount : 0
                };
            });

            ShowAreaChart(transformedData);
        },
        error: function (err) {
            alert(err);
        }
    });
}
function ShowAreaChart(dataSource) {
    $(() => {
        const chart = $('#areaChart').dxChart({
            palette: 'Harmony Light',
            dataSource: dataSource,
            commonSeriesSettings: {
                argumentField: 'jobTitle',
                type: 'area', // Use stacked bar chart to represent job counts
            },
            series: [
                { valueField: 'fullTime', name: 'Full Time' },
                { valueField: 'partTime', name: 'Part Time' },
                { valueField: 'internship', name: 'Internship' }
            ],
            margin: {
                bottom: 20,
            },
            title: 'Job Distribution by Title',
            argumentAxis: {
                label: {
                    /*overlappingBehavior: 'rotate',*/
                    rotationAngle: 360,
                },
                valueMarginsEnabled: false,
               
            },
            export: {
                enabled: true,
            },
            legend: {
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center',
            },
        }).dxChart('instance');
    });
}


function TopAuditLogins() {
    $.ajax({
        url: "/AdminDashboard/GetAuditDetails",
        method: 'GET',
        success: function (responseData) {
            ShowAudit(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}

function ShowAudit(_datasource) {
    const card = $("#lastLoginsCard"); // Select the <ul> element inside the card body

    // Clear any existing list items
    card.empty();

    // Limit the displayed records to the last 8
    const last8Records = _datasource.slice(-8);

    last8Records.forEach(function (record) {
        // Format the date to display only the date portion (assuming LoginTimeStamp is a valid date)
        const loginDate = new Date(record.LoginTimeStamp);
        const formattedDate = loginDate.toLocaleDateString();

        const userItem = $("<li>").html(
            '<img src="' + record.ProfilePicture + '" alt="User Image"><br>' +
            '<a class="users-list-name" href="#">' + record.FirstName + '</a><br>' +
            '<span class="users-list-date">' + formattedDate + '</span>'
        );

        card.append(userItem);
    });
}


function WorldMap()
{

    $.ajax({
        url: "/AdminDashboard/GetAuditDetails",
        method: 'GET',
        success: function (responseData) {
            ShowMap(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });



}



function ShowMap() {

}