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
                        dataField: 'State',
                        editorOptions: {
                            disabled: false,
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'State is required',
                        }],
                        label: {
                            template: labelTemplate('home'),
                        },
                    },

                    {
                        dataField: 'City',
                        editorOptions: {
                            disabled: false,
                        },
                        validationRules: [{
                            type: 'required',
                            message: 'City is required',
                        }],
                        label: {
                            template: labelTemplate('home'),
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
                                        url: "/EditAdminFullDetails/UploadProfilePicture",
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

        
        $('#form').append('<br /><div id="updateButton"></div>');

        $('#updateButton').dxButton({
            text: 'Save',
            onClick: function () {
                // Get the updated form data
                const updatedData = $('#form').dxForm('instance').option('formData');



                // Send the updated data to the server
                $.ajax({
                    url: "/EditAdminFullDetails/UpdateAdminDetails",
                    method: 'POST',
                    data: {
                        "FirstName": updatedData.FirstName,
                        "LastName": updatedData.LastName,
                        "Gender": updatedData.Gender,
                        "BirthDate": updatedData.BirthDate,
                        "Address": updatedData.Address,
                        "City": updatedData.City,
                        "State": updatedData.State,
                        "PhoneNumber": updatedData.PhoneNumber,
                        "Email": updatedData.Email,
                        "ProfilePicture": (updatedData.ProfilePicture == '') ? updatedData.ProfilePicture : updatedData.ProfilePicture[0].name,
                        "UserId": updatedData.UserId,
                        "ProfilePictureUrl": updatedData.ProfilePictureUrl

                    },
                    success: function (ResponseData) {
                        // Optionally, you can show a success message or perform other actions on success
                        console.log('Data updated successfully');
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

    function LoadRecords() {
        console.log(userId)
        $.ajax({
            url: "/EditAdminFullDetails/GetAdminDetails",
            method: "GET",
            data: { "id": userId },
            success: function (ResponseData) {
                const user = ResponseData[0];
                if (user.ProfilePicture != null) {
                    user.ProfilePictureUrl = user.ProfilePicture;
                }

                user.ProfilePicture = '';
                
                ShowUserProfileDetails(user);


            },
            error: function (err) {
                alert(err);
            }

        })
    }

    LoadRecords();


});














