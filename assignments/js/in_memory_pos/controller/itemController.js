//customer id autogenerate
let idItemAutoGenerator = 1;
$("#itemIdTxt").val("I-00"+idItemAutoGenerator);

// load all Customer
function loadAllItem() {

    $("#itemTblBody").empty();

    for (let i of itemDetails) {
        let row = `<tr>
                        <td>${i.itemCode}</td>
                        <td>${i.itemName}</td>
                        <td>${i.qty}</td>
                        <td>${i.unitPrice}</td>
                   </tr>`;
        $('#itemTblBody').append(row);
    }
}

//text fields clear
function clear(textFld) {
    $(textFld).val('');
}

//save customer
function addItem() {

    let item = new Item(
        $("#itemIdTxt").val(),
        $("#ItemNameTxt").val(),
        $("#itemQtyTxt").val(),
        $('#unitPriceTxt').val()
    );

    itemDetails.push(item);

    clear("#ItemNameTxt,#itemQtyTxt,#unitPriceTxt,#itemIdTxt");

    idItemAutoGenerator++;
    $("#itemIdTxt").val("I-00"+idItemAutoGenerator);
    loadAllItem();
}

$("#addItemBtn").on('click', function () {
    addItem();
    bindTrEventItem();
});

//search customer
function searchI(id, arrayReferenceName) {

    for (let i = 0; i < arrayReferenceName.length; i++) {
        if (arrayReferenceName[i].id === id || arrayReferenceName[i].itemCode === id) {
            return arrayReferenceName[i];
        }
    }
}

$("#srcItemID").on('keydown', function (e) {
    let response = searchI($("#srcItemID").val(), itemDetails);
    let key = e.which;
    if (key === 13) {
        if (response) {
            $("#itemIdTxt").val(response.itemCode);
            $("#ItemNameTxt").val(response.itemName);
            $("#itemQtyTxt").val(response.qty);
            $('#unitPriceTxt').val(response.unitPrice);
        } else {
            clear('#ItemNameTxt,#itemQtyTxt,#unitPriceTxt,#itemIdTxt');
        }
    }
});

//click table row and load data to text fields
function bindTrEventItem() {
    $('#itemTblBody').on('click', 'tr', function () {
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();

        $("#itemIdTxt").val(itemCode);
        $("#ItemNameTxt").val(itemName);
        $("#itemQtyTxt").val(qty);
        $("#unitPriceTxt").val(unitPrice);

    });
}

//delete customer
function deleteItem(id){
    for (let i = 0; i < itemDetails.length; i++){
        if (itemDetails[i].id == id){
            itemDetails.splice(i, 1);
            return true;
        }
    }
    return false;
}

$('#deleteItemBtn').on('click', function () {
    let id = $('#itemIdTxt').val();

    let consent= confirm("Do you want to delete?");

    if (consent) {
        let response = deleteItem(id);
        if (response){
            alert("Success!");
            loadAllItem();
        }else {
            alert("Error!");
        }
    }
    clear('#ItemNameTxt,#itemQtyTxt,#unitPriceTxt,#itemIdTxt,#srcItemID');
    /*idAutoGenerator++;*/
    $("#itemIdTxt").val("I-00"+idItemAutoGenerator);
});

//search to click
function searchItem(id){
    return itemDetails.find(function (item) {
        return item.id == id;
    });
}

//update customer
function updateItem(id){
    if (searchItem(id) == undefined){
        alert("Please check itemCode");
    }else{
        let consent= confirm("Are you sure update this Item.?");
        if (consent) {
            let item= searchItem(id);

            let itemName = $("#ItemNameTxt").val();
            let qty = $("#itemQtyTxt").val();
            let unitPrice = $("#unitPriceTxt").val();

            item.itemName=itemName;
            item.qty=qty;
            item.unitPrice=unitPrice;

            loadAllItem();
        }
    }

}

$('#updateItemBtn').on('click', function () {
    let id = $('#itemIdTxt').val();
    updateItem(id);

    clear('#ItemNameTxt,#itemQtyTxt,#unitPriceTxt,#srcItemID');
    /*idAutoGenerator++;*/
    $("#itemIdTxt").val("I-00"+idItemAutoGenerator);
});

// disable tab
$('#ItemNameTxt,#itemQtyTxt,#unitPriceTxt,#itemIdTxt').on('keydown', function (e) {
    if (e.key == "Tab") {
        e.preventDefault();
    }
});

//enter key
$('#ItemNameTxt').on('keydown', function (e) {
    if (e.key =="Enter") {
        $('#itemQtyTxt').focus();
    }
});

$('#itemQtyTxt').on('keydown', function (e) {
    if (e.key =="Enter") {
        $('#unitPriceTxt').focus();
    }
});

$('#unitPriceTxt').on('keydown', function (e) {
    if (e.key =="Enter") {
        $('#addItemBtn').focus();
    }
});
