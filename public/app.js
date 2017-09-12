//Hide iframe on startup or refresh
$('#previewSite').hide();

//Hide iframe on close button click
$('#close').on("click", event => {
    $('#previewSite', window.parent.document).hide();
})

//Console log JSON object on export button click
$('#export').on("click", event => {
    let queryString = window.location.search;
    let noQuestion = queryString.substr(6);
    console.log(decodeURI(noQuestion));
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
        $('#previewSite').modal();

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
            let dataToPass = {theBusiness: data.data.businessName,
                                theStreet: data.data.street,
                                theCity: data.data.city,
                                theState: data.data.state,
                                thePostalCode: data.data.postalCode,
                                theCountry: data.data.country,
                                thePhoneNumber: data.data.phoneNumber
                                };
            
            //Insert text on iframe load
            $('#previewSite').on("load", dataToPass, event => {
                const frame = document.getElementById("previewSite");
                const theDocument = frame.contentWindow.document;
                theBusinessElement = theDocument.getElementById('lpBusiness');
                theStreetElement = theDocument.getElementById('lpStreet');
                theCityElement = theDocument.getElementById('lpCity');
                theStateElement = theDocument.getElementById('lpState');
                thePostalCodeElement = theDocument.getElementById('lpPostalCode');
                theCountryElement = theDocument.getElementById('lpCountry');
                thePhoneNumberElement = theDocument.getElementById('lpPhoneNumber');

                theBusinessElement.innerHTML = event.data.theBusiness;
                theStreetElement.innerHTML = event.data.theStreet;
                theCityElement.innerHTML = event.data.theCity + ",";
                theStateElement.innerHTML = event.data.theState;
                thePostalCodeElement.innerHTML = event.data.thePostalCode;
                theCountryElement.innerHTML = event.data.theCountry;
                thePhoneNumberElement.innerHTML = event.data.thePhoneNumber;
            })
        })
    }
})
