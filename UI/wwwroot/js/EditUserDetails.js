$(() => {
    function ShowUserProfileDetails(_datasource) {
        $('#form').dxForm({
            formData: _datasource,

            items: [{
                itemType: 'group',
                caption: 'Manage Profile Details',
                colCount: 2,
                items: [
                    {
                        dataField: 'FirstName',
                        editorOptions: {
                            disabled: false,
                            /*value: null,*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'FirstName is required',
                        }],
                        label: {
                            template: labelTemplate('user'),
                        },
                    },

                    {
                        dataField: 'LastName',
                        editorOptions: {
                            disabled: false,
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'LastName is required',
                        }],
                        label: {
                            template: labelTemplate('user'),
                        },
                    },

                    {
                        dataField: 'Gender',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: ['Male', 'Female'],
                            searchEnabled: true,
                            /*value: '',*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Gender is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'BirthDate',
                        editorType: 'dxDateBox',
                        editorOptions: {
                            disabled: false,
                            width: '100%'
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'BirthDate is required',
                        }],
                        label: {
                            template: labelTemplate('event'),
                        },
                    },

                    {
                        dataField: 'Country',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.CountryList,
                            searchEnabled: true,
                            onValueChanged: function (e) {
                                LoadState(e.value);
                            }
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Country is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'State',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.StateList,
                            searchEnabled: true,
                            onValueChanged: function (e)
                            {
                                LoadCity(e.value);
                            }
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'State is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'City',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.CityList,
                            searchEnabled: true,
                            
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'City is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'Address',
                        validationRules: [{
                            type: 'required',
                            message: 'Address is required',
                        }],
                        label: {
                            template: labelTemplate('home'),
                        },
                    },

                    {
                        dataField: 'PhoneNumber',
                        editorOptions: {
                            mask: '+1 (X00) 000-0000',
                            maskRules: { X: /[02-9]/ },
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'PhoneNumber is required',
                        }],
                        label: {
                            template: labelTemplate('tel'),
                        },
                    },

                    //{
                    //    dataField: 'Email',
                    //    label: {
                    //        template: labelTemplate('Email'),
                    //    },
                    //    editorOptions: {
                    //        disabled: true,
                    //    },

                    //},

                    {
                        dataField: 'Bachelors',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.BachelorsList,
                            searchEnabled: true,
                            /*value: '',*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Bachelors is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'Masters',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.MastersList,
                            searchEnabled: true,
                            /*value: '',*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Masters is required',
                        }],

                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'Experience',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            searchEnabled: true,
                            /*value: '',*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Experience is required',
                        }],

                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'Skills',
                        editorOptions: {
                            disabled: false,
                            /*value: null,*/
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'Skills is required',
                        }],
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'ProfilePicture', // Property name for the profile picture URL
                        editorType: 'dxFileUploader',
                        editorOptions: {
                            accept: 'image/*',
                            uploadMode: "useForm",
                            selectButtonText: 'Select Image',
                            labelText: '',
                            showClearButton: true,

                            onValueChanged: function (e) {
                                // When the profile picture changes, update the form data
                                /*updateFormData($.extend({}, $('#form').dxForm('option', 'formData'), { profilePicture: e.value }));*/

                                if (e.value && e.value.length > 0) {
                                    const formData = new FormData();
                                    formData.append('ProfilePicture', e.value[0]);

                                    $.ajax({
                                        url: "/EditUserFullDetails/UploadProfilePicture",
                                        method: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        success: function (response) {
                                            // On success, update the form data with the new image URL
                                            const newFormData = $.extend({}, $('#form').dxForm('option', 'formData'), { ProfilePicture: response.url });
                                            updateFormData(newFormData);
                                        },
                                        error: function (err) {
                                            // Handle the error if any
                                            console.error(err);
                                        }
                                    });
                                }
                            }
                        },
                    },

                    {
                        colSpan: 2,
                        dataField: 'CoverLetter',
                        editorType: 'dxTextArea',
                        editorOptions: {
                            height: 90,
                            maxLength: 200,
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'CoverLetter is required',
                        }],
                        label: {
                            template: (data, element) => {
                                const lineBreak = '<br>';
                                const infoIcon = '<i id="helpedInfo" class="dx-icon dx-icon-info"></i>';
                                const labelText = `Additional${lineBreak}${data.text}`;

                                element.append(`<div id='template-content'>${infoIcon}${labelText}</div>`);

                                $('<div>').dxTooltip({
                                    target: '#helpedInfo',
                                    showEvent: 'mouseenter',
                                    hideEvent: 'mouseleave',
                                    contentTemplate(args) {
                                        args.html('<div id="tooltip-content">This field must not exceed 200 characters</div>');
                                    },
                                }).appendTo(element);
                            },
                        },
                    },

                    {
                        dataField: 'Resume',
                        editorType: 'dxFileUploader',
                        label: {
                            text: 'Update Resume (PDF)',
                        },
                        editorOptions: {
                            selectButtonText: 'Select File',
                            labelText: '',
                            accept: '.pdf', // Limit file selection to PDF files
                            onValueChanged: function (e) {
                                // Update the formData when a file is selected
                                /*formData.resume = e.value;*/

                                if (e.value && e.value.length > 0) {
                                    const formData = new FormData();
                                    formData.append('Resume', e.value[0]);

                                    $.ajax({
                                        url: "/EditUserFullDetails/UploadResume",
                                        method: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        success: function (response) {
                                            // On success, update the form data with the new image URL
                                            const newFormData = $.extend({}, $('#form').dxForm('option', 'formData'), { Resume: response.url });
                                            updateFormData(newFormData);
                                        },
                                        error: function (err) {
                                            // Handle the error if any
                                            console.error(err);
                                        }
                                    });
                                }
                            }
                        },
                        //validationRules: [{
                        //    type: 'required',
                        //    message: 'Resume is required',
                        //}],
                    },


                ],
            }],
        });

        $('#form').dxForm('instance').validate();

        if (_datasource.ProfilePictureUrl != null) {
            $('#form').prepend(`<div class="row justify-content-center">
            <div class="col-12 text-center">
                <img src="${_datasource.ProfilePictureUrl}" asp-append-version="true" style="width: 150px; height: 150px; border-radius: 85px; border: 2px solid black;">
            </div>
        </div>`);
        }

        if (_datasource.ResumeUrl != null) {
            $('#form').append(`<div>Uploaded Resume: 
            <div id="pdfContainer">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp;
                <embed id="pdfEmbed" src="${_datasource.ResumeUrl}"  type="application/pdf" style="width:300px; height:100px; border: 2px solid black;">
            </div></div>`);

        }




        $('#form').append('<br /><div id="updateButton"></div>');

        $('#updateButton').dxButton({
            text: 'Save',
            onClick: function () {
                // Get the updated form data
                const updatedData = $('#form').dxForm('instance').option('formData');

                // Send the updated data to the server
                $.ajax({
                    url: "/EditUserFullDetails/UpdateUserDetails",
                    method: 'POST',
                    data: {
                        "FirstName": updatedData.FirstName,
                        "LastName": updatedData.LastName,
                        "Gender": updatedData.Gender,
                        "BirthDate": updatedData.BirthDate,
                        /*"hireDate": updatedData.hireDate,*/
                        "CoverLetter": updatedData.CoverLetter,
                        "Address": updatedData.Address,
                        "City": updatedData.City,
                        "State": updatedData.State,
                        "Country": updatedData.Country,
                        "PhoneNumber": updatedData.PhoneNumber,
                        "Email": updatedData.Email,
                        "ProfilePicture": (updatedData.ProfilePicture == '') ? updatedData.ProfilePicture : updatedData.ProfilePicture[0].name,
                        "Bachelors": updatedData.Bachelors,
                        "Masters": updatedData.Masters,
                        "Experience": updatedData.Experience,
                        "Skills": updatedData.Skills,
                        "Resume": (updatedData.Resume == '') ? updatedData.Resume : updatedData.Resume[0].name,
                        "UserId": updatedData.UserId,
                        "ResumeUrl": updatedData.ResumeUrl,
                        "ProfilePictureUrl": updatedData.ProfilePictureUrl

                    },
                    success: function (ResponseData) {
                        // Optionally, you can show a success message or perform other actions on success
                        console.log('Data updated successfully');
                        LoadRecords();
                    },
                    error: function (err) {
                        // Handle the error if any
                        console.error(err);
                    }
                });
            }
        });



    }



    function labelTemplate(iconName) {
        return (data) => $(`<div><i class='dx-icon dx-icon-${iconName}'></i>${data.text}</div>`);
    }

    var BachelorsList = [];

    function LoadBachelors() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetBachelors",
                method: "GET",
                success: function (ResponseData) {
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        BachelorsList.push(value);
                    }
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }


    var MastersList = [];

    function LoadMasters() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetMasters",
                method: "GET",
                success: function (ResponseData) {
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        MastersList.push(value);
                    }
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    var CountryList = [];

    function LoadCountry() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetCountry",
                method: "GET",
                success: function (ResponseData) {
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        CountryList.push(value);
                    }
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    var StateList = [];

    function LoadState(Country) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetState",
                data: { country: Country },
                method: "GET",
                success: function (ResponseData) {
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        StateList.push(value);
                    }
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }


    var CityList = [];

    function LoadCity(State) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetCity",
                method: "GET",
                data: { state: State },
                success: function (ResponseData) {
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        CityList.push(value);
                    }
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    async function LoadRecords() {
        console.log(userId);
        try {
            const response = await $.ajax({
                url: "/EditUserFullDetails/GetUserDetails",
                method: "GET",
                data: { "id": userId }
            });

            const user = response[0];
            if (user.ProfilePicture != null) {
                user.ProfilePictureUrl = user.ProfilePicture;
            }

            if (user.Resume != null) {
                user.ResumeUrl = user.Resume;
            }

            user.ProfilePicture = '';
            user.Resume = '';

            await LoadCountry(); // Wait for LoadCountry to complete
            user.CountryList = CountryList;

            await LoadState(user.Country); // Wait for LoadState to complete
            user.StateList = StateList;

            await LoadCity(user.State); // Wait for LoadCity to complete
            user.CityList = CityList;

            await LoadBachelors(); // Wait for LoadCountry to complete
            user.BachelorsList = BachelorsList;

            await LoadMasters(); // Wait for LoadCountry to complete
            user.MastersList = MastersList;

            ShowUserProfileDetails(user);
        } catch (err) {
            alert(err);
        }
    }

    LoadRecords();




});














