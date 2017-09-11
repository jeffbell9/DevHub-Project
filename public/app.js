$('#previewSite').hide();

$('#close').on("click", event => {
    $('#previewSite', window.parent.document).hide();
})

$('#export').on("click", event => {
    let queryString = window.location.search;
    let noQuestion = queryString.substr(6);
    console.log(decodeURI(noQuestion));
})

$( "form" ).on( "submit", function( event ) {
    event.preventDefault();

    var emptyInputs = $(this).parent().find('input[type="text"]').filter(function() { return $(this).val() == ""; });
   
    if (emptyInputs.length) {
        alert('Please complete all fields.');
    } else {

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

        $('#previewSite').attr('src', 'http://localhost:3000/live-preview/?site=' + infoJSON);

        $.get('/business.json', info, data => {
            let dataToPass = {theBusiness: data.data.businessName,
                                theStreet: data.data.street,
                                theCity: data.data.city,
                                theState: data.data.state,
                                thePostalCode: data.data.postalCode,
                                theCountry: data.data.country,
                                thePhoneNumber: data.data.phoneNumber
                                };

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
