/*
const CUS_ID_REGEX = /^(C-00)[0-9]{1,5}$/;
const CUS_NAME_REGEX = /^[A-z]{3,30}$/;
const CUS_ADDRESS_REGEX = /^[A-z]{3,30}$/;
const CUS_CONTACT_REGEX = /^(07([1245678])|091)(-)[0-9]{7}$/;

let customer_vArray = new Array();
customer_vArray.push({field: $("#cusIdTxt"), regEx: CUS_ID_REGEX});
customer_vArray.push({field: $("#cusNameTxt"), regEx: CUS_NAME_REGEX});
customer_vArray.push({field: $("#cusAddressTxt"), regEx: CUS_ADDRESS_REGEX});
customer_vArray.push({field: $("#cusContactTxt"), regEx: CUS_CONTACT_REGEX});

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}


function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < customer_vArray.length; i++) {
        if (!checkValidations(customer_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#deleteCustomerBtn").prop("disabled", true);
    $("#updateCustomerBtn").prop("disabled", true);

    if (checkAll()) {
        $("#addCustomerBtn").prop("disabled", false);
    } else {
        $("#addCustomerBtn").prop("disabled", true);
    }

    let id = $("#cusIdTxt").val();
    if (searchCustomer(id) == undefined) {
        $("#deleteCustomerBtn").prop("disabled", true);
        $("#updateCustomerBtn").prop("disabled", true);
    } else {
        $("#deleteCustomerBtn").prop("disabled", false);
        $("#updateCustomerBtn").prop("disabled", false);
    }

}

("#cusIdTxt,#cusNameTxt,#cusAddressTxt,#cusContactTxt").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = customer_vArray.indexOf(customer_vArray.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidations(customer_vArray[indexNo]);

    setBtn();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != customer_vArray[customer_vArray.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(customer_vArray[indexNo])) {
                customer_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(customer_vArray[indexNo])) {
                addCustomer();
            }
        }
    }
});


*/

$('#cusNameTxt').on('keyup', function (e) {
    if (/^[A-z ]{3,20}$/.test($('#cusNameTxt').val())) {
        $('#cusNameTxt').css('border', '3px solid green')
        $('#customerNameLbl').text('')
        if (e.key === "Enter") {
            $('#cusAddressTxt').focus()
        }
    } else {
        $('#cusNameTxt').css('border', '3px solid red');
        $('#customerNameLbl').text("Your input can't be validated, Ex - Dini ")
    }
});

$('#cusAddressTxt').on('keyup', function (e) {
    if (/^[A-z ]{4,20}$/.test($('#cusAddressTxt').val())) {
        $('#cusAddressTxt').css('border', '3px solid green')
        $('#customerAddressLbl').text('')
        if (e.key === "Enter") {
            $('#cusContactTxt').focus()
        }
    } else {
        $('#cusAddressTxt').css('border', '3px solid red');
        $('#customerAddressLbl').text("Your input can't be validated, Ex - Galle ")
    }
});

$('#cusContactTxt').on('keyup', function (e) {
    if (/^(07([1245678])|091)(-)[0-9]{7}$/.test($('#cusContactTxt').val())) {
        $('#cusContactTxt').css('border', '3px solid green')
        $('#CustomerContactLbl').text('')
        if (e.key === "Enter") {
            /** if you press enter last text-field you can save details withut pressing
             * any kind of buttons */
            addCustomer();
            $('#cusIdTxt').focus()
        }
    } else {
        $('#cusContactTxt').css('border', '3px solid red');
        $('#CustomerContactLbl').text("Your input can't be validated, Ex - 0719028827 ")
    }
});