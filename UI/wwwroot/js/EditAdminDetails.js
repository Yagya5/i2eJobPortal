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
                                console.log(_datasource.StateList);
                                console.log(e.value)
                                $.ajax({
                                    url: "/EditAdminFullDetails/GetState",
                                    method: 'GET',
                                    data: { country: e.value },
                                    success: function (ResponseData) {
                                        let temparray = [];
                                        for (var i = 0; i < ResponseData.length; i++) {
                                            var value = ResponseData[i].Value;
                                            temparray.push(value);
                                        }
                                        _datasource.StateList = temparray;
                                        console.log("Updated StateList", _datasource.StateList);
                                        $('#form').dxForm('instance').getEditor('State').option('items', _datasource.StateList);
                                    },
                                    error: function (err) {
                                        // Handle the error if any
                                        console.error(err);
                                    }
                                });
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
                            onValueChanged: function (e) {
                                console.log(_datasource.CityList);
                                console.log(e.value)
                                $.ajax({
                                    url: "/EditAdminFullDetails/GetCity",
                                    method: 'GET',
                                    data: { state: e.value },
                                    success: function (ResponseData) {
                                        let temparray = [];
                                        for (var i = 0; i < ResponseData.length; i++) {
                                            var value = ResponseData[i].Value;
                                            temparray.push(value);
                                        }
                                        _datasource.CityList = temparray;
                                        console.log("Updated StateList", _datasource.CityList);
                                        $('#form').dxForm('instance').getEditor('City').option('items', _datasource.CityList);
                                    },
                                    error: function (err) {
                                        // Handle the error if any
                                        console.error(err);
                                    }
                                });
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

                var parsedDate = new Date(String(updatedData.BirthDate));

                var year = parsedDate.getFullYear();
                var month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                var day = String(parsedDate.getDate()).padStart(2, '0');
                var hours = String(parsedDate.getHours()).padStart(2, '0');
                var minutes = String(parsedDate.getMinutes()).padStart(2, '0');
                var seconds = String(parsedDate.getSeconds()).padStart(2, '0');

                var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                updatedData.BirthDate = formattedDate;

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
                        "Country": updatedData.Country,
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

    var CountryList = [];

    function LoadCountry() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditAdminFullDetails/GetCountry",
                method: "GET",
                success: function (ResponseData) {
                    let temparray = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        temparray.push(value);
                    }
                    CountryList = temparray;
                    console.log(StateList);
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
                url: "/EditAdminFullDetails/GetState",
                method: "GET",
                data: { country: Country },
                success: function (ResponseData) {
                    /*StateList = [];*/
                    let temparray = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        temparray.push(value);
                    }
                    StateList = temparray;
                    console.log(StateList);
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
                url: "/EditAdminFullDetails/GetCity",
                method: "GET",
                data: { state: State },
                success: function (ResponseData) {
                    let temparray = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        temparray.push(value);
                    }
                    CityList = temparray;
                    console.log(CityList);
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
            const ResponseData = await $.ajax({
                url: "/EditAdminFullDetails/GetAdminDetails",
                method: "GET",
                data: { "id": userId }
            });

            const user = ResponseData[0];
            if (user.ProfilePicture != null) {
                user.ProfilePictureUrl = user.ProfilePicture;
            }

            user.ProfilePicture = '';

            await LoadCountry(); // Wait for LoadCountry to complete
            user.CountryList = CountryList;

            await LoadState(user.Country); // Wait for LoadState to complete
            user.StateList = StateList;

            await LoadCity(user.State); // Wait for LoadCity to complete
            user.CityList = CityList;

            ShowUserProfileDetails(user);
        } catch (err) {
            alert(err);
        }
    }

    LoadRecords();


});














