//Close modal on close button click
$('#close').on("click", event => {
    $('#myModal').modal('hide');
})

//Console log JSON object on export button click
$('#export').on("click", function( event ) {
    console.log($('#previewSite').attr('src').substr(41));
})

//Form submit
$( "form" ).on( "submit", function( event ) {
    event.preventDefault();

    //Validate all input fields have values
    var emptyInputs = $(this).parent().find('input[type="text"]').filter(function() { return $(this).val() == ""; });
   
    if (emptyInputs.length) {
        alert('Please complete all fields.');
    } else {

        //Launch modal
        $('#myModal').modal();

        let info = {
            businessName: $('#businessName').val(),
            street: $('#street').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            postalCode: $('#postalCode').val(),
            country: $('#country').val(),
            phoneNumber: $('#phoneNumber').val()
        }

        let infoJSON = JSON.stringify(info);

        //Modify iframe src attribute to include site parameter
        $('#previewSite').attr('src', 'http://localhost:3000/live-preview/?site=' + infoJSON);

        //Get data from query string
        $.get('/business.json', info, data => {
            let dataToPass = {businessName: data.data.businessName,
                                street: data.data.street,
                                city: data.data.city,
                                state: data.data.state,
                                postalCode: data.data.postalCode,
                                country: data.data.country,
                                phoneNumber: data.data.phoneNumber
                                };
            
            //Insert text on iframe load
            $('#previewSite').on("load", dataToPass, event => {
                const frame = document.getElementById("previewSite"),
                       site = frame.contentWindow.document,
                businessName = site.getElementById('lpBusiness'),
                street = site.getElementById('lpStreet'),
                city = site.getElementById('lpCity'),
                state = site.getElementById('lpState'),
                postalCode = site.getElementById('lpPostalCode'),
                country = site.getElementById('lpCountry'),
                phoneNumber = site.getElementById('lpPhoneNumber');

                businessName.innerHTML = event.data.businessName;
                street.innerHTML = event.data.street;
                city.innerHTML = event.data.city + ",";
                state.innerHTML = event.data.state;
                postalCode.innerHTML = event.data.postalCode;
                country.innerHTML = event.data.country;
                phoneNumber.innerHTML = event.data.phoneNumber;

                
            })
        })
    }
})
