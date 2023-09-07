$(() => {
    var BachelorsList = [];
    var MastersList = [];
    var CountryList = [];
    var StateList = [];
    var CityList = [];

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
                            width: '100%',
                            min: new Date(new Date().getFullYear() - 60, new Date().getMonth(), new Date().getDate()), // 60 years ago from today
                            max: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()), // 18 years ago from today
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
                                _datasource.State = "";
                                _datasource.City = "";
                                $.ajax({
                                    url: "/EditUserFullDetails/GetState",
                                    method: 'GET',
                                    data: { country : e.value },
                                    success: function (ResponseData) {
                                        let tempStateList = [];
                                        let tempCityList = [];
                                        for (var i = 0; i < ResponseData.length; i++) {
                                            var value = ResponseData[i].Value;
                                            tempStateList.push(value);
                                        }
                                        _datasource.StateList = tempStateList;
                                        _datasource.CityList = tempCityList;
                                        console.log("Updated StateList", _datasource.StateList);
                                        $('#form').dxForm('instance').getEditor('State').option('items', _datasource.StateList);
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
                                    url: "/EditUserFullDetails/GetCity",
                                    method: 'GET',
                                    data: { state: e.value },
                                    success: function (ResponseData) {
                                        let tempCityList = [];
                                        for (var i = 0; i < ResponseData.length; i++) {
                                            var value = ResponseData[i].Value;
                                            tempCityList.push(value);
                                        }
                                        _datasource.CityList = tempCityList;
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
                        editorType: 'dxTextArea',
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
                            mask: '0000000000',
                        },
                        validationRules: [{
                            type: 'custom',
                            validationCallback: function (options) {
                                var phoneNumber = options.value;
                                if (/^[6-9][0-9]{9}$/.test(phoneNumber)) {
                                    return true;
                                }
                                return false;
                            },
                            message: 'Invalid phone number.'
                        }, {
                            type: 'required',
                            message: 'PhoneNumber is required',
                        }],
                        label: {
                            template: labelTemplate('tel'),
                        },
                    },


                    {
                        dataField: 'Bachelors',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: _datasource.BachelorsList,
                            searchEnabled: true,
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
                        },
                        
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'Skills',
                        editorOptions: {
                            disabled: false,
                        },
                        
                        label: {
                            template: labelTemplate('info'),
                        },
                    },

                    {
                        dataField: 'ExperienceInYears',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 , 12, 13, 14, 15],
                            searchEnabled: true,
                        },
                        

                        label: {
                            template: function (data) {
                                // Check if the dataField is "ExperienceInYears" and update the label text accordingly
                                if (data.dataField === 'ExperienceInYears') {
                                    return $('<div><i class="dx-icon dx-icon-info"></i>Experience(Years)</div>');
                                } else {
                                    return labelTemplate('info')(data);
                                }
                            }
                        },
                    },

                    {
                        dataField: 'ExperienceInMonths',
                        editorType: 'dxSelectBox',
                        editorOptions: {
                            items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                            searchEnabled: true,
                        },
                        
                        label: {
                            template: function (data) {
                                // Check if the dataField is "ExperienceInYears" and update the label text accordingly
                                if (data.dataField === 'ExperienceInMonths') {
                                    return $('<div><i class="dx-icon dx-icon-info"></i>Experience(Months)</div>');
                                } else {
                                    return labelTemplate('info')(data);
                                }
                            }
                        },
                    },

                    

                    {
                        dataField: 'CoverLetter',
                        editorType: 'dxTextArea',
                        
                        label: {
                            template: labelTemplate('info'),
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
                        label: {
                            template: labelTemplate('info'),
                        },
                        
                    },


                ],
            }],
        });

        $('#form').dxForm('instance').validate();

        $('#form').prepend(`
        <div class="row row-centered">
            <div class="col-12">
                <div class="image-container">
                    <img src="${_datasource.ProfilePictureUrl}" class="profileImage" id="profileImageInform" asp-append-version="true" style="width: 100px; height: 100px; border-radius: 85px; border: 2px solid black; cursor: pointer; ">
                    <div class="tooltip">Click to edit</div>
                </div>
            </div>
        </div>`);

        $('#profileImageInform, .tooltip').click(() => {
            modal.style.display = 'flex';
            modalImage.src = _datasource.ProfilePictureUrl;
        });

        if (_datasource.ResumeUrl != null) {
            $('#form').append(`<div>Uploaded Resume: 
            <div id="pdfContainer">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp;
                <embed id="pdfEmbed" src="${_datasource.ResumeUrl}"  type="application/pdf" style="width:300px; height:100px; border: 2px solid black;">
            </div></div>`);

        }

        $('#form').append('<div style="float:right;"><div id="updateButton"></div>&nbsp; &nbsp;<div id="cancelButton"></div></div> <br /><br /><br /> <br /><br /><br /> <br /><br />');

        $('#updateButton').dxButton({
            text: 'Save',
            onClick: function () {
                // Get the updated form data
                const updatedData = $('#form').dxForm('instance').option('formData');

                var parsedDate = new Date(String(updatedData.BirthDate));

                var parsedDate = new Date(String(updatedData.BirthDate));

                var year = parsedDate.getFullYear();
                var month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                var day = String(parsedDate.getDate()).padStart(2, '0');
                var hours = String(parsedDate.getHours()).padStart(2, '0');
                var minutes = String(parsedDate.getMinutes()).padStart(2, '0');
                var seconds = String(parsedDate.getSeconds()).padStart(2, '0');

                var formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                updatedData.BirthDate = formattedDate;

                var formInstance = $('#form').dxForm('instance');
                if (formInstance.validate().isValid && _datasource.Country != '' && _datasource.State != '' && _datasource.City != '') {
                    const updatedData = formInstance.option('formData');

                    $.ajax({
                        url: "/EditUserFullDetails/UpdateUserDetails",
                        method: 'POST',
                        data: {
                            "FirstName": updatedData.FirstName,
                            "LastName": updatedData.LastName,
                            "Gender": updatedData.Gender,
                            "BirthDate": updatedData.BirthDate,
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
                            "ExperienceInYears": updatedData.ExperienceInYears,
                            "ExperienceInMonths": updatedData.ExperienceInMonths,
                            "Skills": updatedData.Skills,
                            "Resume": (updatedData.Resume == '') ? updatedData.Resume : updatedData.Resume[0].name,
                            "UserId": updatedData.UserId,
                            "ResumeUrl": updatedData.ResumeUrl,
                            "ProfilePictureUrl": updatedData.ProfilePictureUrl

                        },
                        success: function (ResponseData) {
                            // Optionally, you can show a success message or perform other actions on success
                            if (ResponseData.Response == "Update Sucessfully") {
                                Swal.fire({
                                    title: 'Updated data saved successfully!',
                                    icon: 'success',
                                    showCancelButton: false, // Hide the cancel button
                                    confirmButtonText: 'OK',
                                }).then(function (result) {
                                    if (result.isConfirmed) {
                                        // Reload the entire page after the user clicks "OK"
                                        location.reload();
                                    }
                                });
                            }

                            else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Failed...',
                                    text: 'Something went wrong!',

                                })
                            }

                        },
                        error: function (err) {
                            // Handle the error if any
                            console.error(err);
                        }
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        text: 'Please correct the validation errors before saving.',
                    });
                }
                
            }
        });

        $('#cancelButton').dxButton({
            text: 'Reset',
            onClick: function () {
                location.reload();
            }
        });

    }

    function labelTemplate(iconName) {
        return (data) => $(`<div><i class='dx-icon dx-icon-${iconName}'></i>${data.text}</div>`);
    }

    function LoadBachelors() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetBachelors",
                method: "GET",
                success: function (ResponseData) {
                    let tempBachelorsList = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        tempBachelorsList.push(value);
                    }
                    BachelorsList = tempBachelorsList;
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    function LoadMasters() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetMasters",
                method: "GET",
                success: function (ResponseData) {
                    let tempMastersList = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        tempMastersList.push(value);
                    }
                    MastersList = tempMastersList;
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    function LoadCountry() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetCountry",
                method: "GET",
                success: function (ResponseData) {
                    let tempCountryList = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        tempCountryList.push(value);
                    }
                    CountryList = tempCountryList
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    function LoadState(Country) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetState",
                data: { country: Country },
                method: "GET",
                success: function (ResponseData) {
                    let tempStateList = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        tempStateList.push(value);
                    }
                    StateList = tempStateList;
                    console.log(StateList);
                    resolve(); // Resolve the promise when data is loaded
                },
                error: function (err) {
                    reject(err); // Reject the promise in case of an error
                }
            });
        });
    }

    function LoadCity(State) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/EditUserFullDetails/GetCity",
                method: "GET",
                data: { state: State },
                success: function (ResponseData) {
                    let tempCityList = [];
                    for (var i = 0; i < ResponseData.length; i++) {
                        var value = ResponseData[i].Value;
                        tempCityList.push(value);
                    }
                    CityList = tempCityList;
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
        try {
            const response = await $.ajax({
                url: "/EditUserFullDetails/GetUserDetails",
                method: "GET",
                data: { "id": userId }
            });

            const user = response[0];
           
            if (user.ProfilePicture != null && user.ProfilePicture.length != 0) {
                user.ProfilePictureUrl = user.ProfilePicture;
            }
            else {
                user.ProfilePictureUrl = "/UserProfile/DefaultProfileJobSeeker.png";
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

            if (user.ProfilePictureUrl === "/UserProfile/DefaultProfileJobSeeker.png") {
                $('#removeProfilePictureButton').dxButton('instance').option('disabled', true);
            } else {
                $('#removeProfilePictureButton').dxButton('instance').option('disabled', false);
            }


        } catch (err) {
            alert(err);
        }
    }

    LoadRecords();

    const modal = document.createElement('div');
    modal.id = 'profilePictureModal';
    modal.classList.add('modal');
    document.body.appendChild(modal);

    modal.innerHTML = `
            <div class="modal-content" style="max-width: 719px; max-height: 500px;
                margin: 0 auto;">
                <span class="close" style="position: absolute; top: 10px; right: 10px;">&times;</span>
                <h2>Change profile picture</h2>
                <br/>
                <div class="row justify-content-center">
                    <div class="col-12 text-center">
                        <img id="modalProfileImage" src="" style="width: 150px; height: 150px; border-radius: 85px; border: 2px solid black;">
                    </div>
                </div>
                <br/>
                <div>
                    <input type="file" id="fileInput" accept="image/*" style="display: none;">
                    <div style="float:right;">
                    <div id="addProfilePictureButton"></div>
                    &nbsp; 
                    <div id="removeProfilePictureButton"></div>
                    </div>
                </div>
                <br/>
                
            </div>`;

    $('#addProfilePictureButton').dxButton({
        text: 'Upload',
        onClick: function () {
            $('#fileInput').click();
        }
    });

    $('#removeProfilePictureButton').dxButton({
        text: 'Remove',
        onClick: function () {
            let file = "UserProfile/DefaultProfileJobSeeker.png";
            const formData = new FormData();
            formData.append('ProfilePicture', file);
            $.ajax({
                url: "/EditUserFullDetails/RemoveProfilePicture",
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    // Update the image source with the uploaded image URL
                    $('#profileImageInform').attr('src', response.url);
                    $('#modalProfileImage').attr('src', response.url);
                },
                error: function (err) {
                    // Handle the error if any
                    console.error(err);
                }
            });

        }
    });

    const modalImage = document.getElementById('modalProfileImage');
    const closeButton = modal.querySelector('.close');

    $('#fileInput').change((event) => {
        const file = event.target.files[0];
        if (file) {
            // Perform your upload logic here
            const formData = new FormData();
            formData.append('ProfilePicture', file);
            $.ajax({
                url: "/EditUserFullDetails/UploadProfilePicture",
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    $('#profileImageInform').attr('src', response.url);
                    $('#modalProfileImage').attr('src', response.url);
                },
                error: function (err) {
                    // Handle the error if any
                    console.error(err);
                }
            });
        }
    });

    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

});

