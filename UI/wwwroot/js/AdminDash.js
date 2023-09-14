
$(document).ready(function () {
    console.log("Temp");
  
    CountRecords();
    Calendar();
    JobTypeDonut();
    JobTypeArea();
    TopAuditLogins();
    WorldMap();
    JobModeCountTiles();

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




function ShowFunnel(_datasource) {
    $(() => {
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
                    return `<span style='font-size: 28px'>${e.value}</span><br/>${e.item.argument}`;
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
            //tooltip: {
            //    enabled: true,
            //    format: '',
            //    customizeTooltip(arg) {
            //        return {
            //            text: `${arg.argumentText}: ${arg.valueText}`,
            //        };
            //    },
            //},
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


function JobModeCountTiles() {
    $.ajax({
        url: "/AdminDashboard/GetJobModeDetails",
        method: 'GET',
        success: function (responseData) {
            // Update the HTML elements with the count values
            $("#remote").text(responseData.filter(item => item.JobMode === 'Remote')[0].JobModeCount);
            $("#hybrid").text(responseData.filter(item => item.JobMode === 'Hybrid')[0].JobModeCount);
            $("#in_office").text(responseData.filter(item => item.JobMode === 'In Office')[0].JobModeCount);
        },
        error: function (err) {
            alert(err);
        }
    });
}


function WorldMap() {
    $.ajax({
        url: "/AdminDashboard/GetStatewise_JobCount",
        method: 'GET',
        success: function (responseData) {
            // Call the ShowMap function with the retrieved data
            ShowMap(responseData);
        },
        error: function (err) {
            alert(err);
        }
    });
}
function ShowMap(data) {
    console.log('Data received:', data);


    $('#vector-map').dxVectorMap({

        onRendered: function () {
            console.log('Map Rendered');
        },


        bounds: [-180, 85, 180, -60],
        tooltip: {
            enabled: true,
            border: {
                visible: false,
            },
            font: { color: '#fff' },
            customizeTooltip(arg) {
                console.log('Customize Tooltip:', arg);
                const name = arg.attribute('name');
                const countryData = data.find((country) => country.Country_Home === name);
                if (countryData) {
                    return { text: `${name}: ${countryData.CountrywiseJob_count} Jobs`, color: '#000' };
                    console.log('hellooo')
                }
                return null;
            },
        },
        layers: {
            dataSource: DevExpress.viz.map.sources.world,

            

            customize(elements) {

                console.log('Customize Elements:', elements);
                $.each(elements, (_, element) => {
                    const name = element.attribute('name');
                    const countryData = data.find((country) => country.Country_Home === name);
                    if (countryData) {
                        console.log('hellooo')

                        element.applySettings({
                            color: getColorBasedOnJobCount(countryData.CountrywiseJob_count),
                            hoveredColor: '#e0e000',
                            selectedColor: '#008f00',

                            
                        });
                    }
                });
            },

          
        },
        onClick(e) {
            const { target } = e;
            if (target && data.some((country) => country.Country_Home === target.attribute('name'))) {
                target.selected(!target.selected());
            }
        },
    });

    // You can define a function to set colors based on job counts
    function getColorBasedOnJobCount(count) {
        console.log('Count:', count);

        // Customize the color logic based on your requirements
        // For example, you can use different colors for different job count ranges
        if (count > 100) {
            console.log('Color: Red');
            return '#FF0000';
        } else if (count > 50) {
            console.log('Color: Yellow');
            return '#FFFF00';
        }
        else if (count > 20) {
            console.log('Color: Blue');
            return '#0000FF';
        }
        else if (count > 8) {
            console.log('Color: Orange');
            return '#F28500';
        }
        else if (count > 4) {
            console.log('Color: Pink');
            return '#FF007F'; 
        } else if (count > 2) {
            console.log('Color: Rust');
            return '#B7410E';
        }

        else {
            console.log('Color: Pine');
            return '#01796F'; 
        }
    }

}