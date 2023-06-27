$('#ItemNameTxt').on('keyup', function (e) {
    if (/^[A-z]{2,10}$/.test($('#ItemNameTxt').val())) {
        $('#ItemNameTxt').css('border', '3px solid green')
        $('#itemNameTxtLbl').text('')
        if (e.key === "Enter") {
            $('#itemQtyTxt').focus()
        }
    } else {
        $('#ItemNameTxt').css('border', '3px solid red');
        $('#itemNameTxtLbl').text("Your input can't be validated, Ex - Burger")
    }
});

$('#itemQtyTxt').on('keyup', function (e) {
    if ( /^[0-9]{1,4}$/.test($('#itemQtyTxt').val())) {
        $('#itemQtyTxt').css('border', '3px solid green')
        $('#itemQtyTxtLbl').text('')
        if (e.key === "Enter") {
            $('#unitPriceTxt').focus()
        }
    } else {
        $('#itemQtyTxt').css('border', '3px solid red');
        $('#itemQtyTxtLbl').text("Your input can't be validated, 10 ")
    }
});

$('#unitPriceTxt').on('keyup', function (e) {
    if (/^([0-9]{2,6}.[0-9]{1,2})$/.test($('#unitPriceTxt').val())) {
        $('#unitPriceTxt').css('border', '3px solid green')
        $('#itemUnitPriceTxtLbl').text('')
        if (e.key === "Enter") {
           /* /!** if you press enter last text-field you can save details withut pressing
             * any kind of buttons *!/*/
            addItem();
            $('#itemIdTxt').focus()
        }
    } else {
        $('#unitPriceTxt').css('border', '3px solid red');
        $('#itemUnitPriceTxtLbl').text("Your input can't be validated, Ex - 120.99")
    }
});
