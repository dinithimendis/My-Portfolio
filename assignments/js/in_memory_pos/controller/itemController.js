//customer id autogenerate
let iIdAutoGenerator = 1;
$("#itemIdTxt").val("I-00" + iIdAutoGenerator);

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
    //this function calling reason ->
    //because i want to bind clickRowEvents all the data
    bindRowClickEventsItem();
}

//text fields clear
function clear(textFld) {
    $(textFld).val('');
}

function addItem() {
    let itemCode = $("#itemIdTxt").val();
    let itemName = $("#ItemNameTxt").val();
    let qty = $("#itemQtyTxt").val();
    let unitPrice = $("#unitPriceTxt").val();

    // Check if customer ID already exists ?
    // if some keyword is equals to for
    let itemExists = itemDetails.some(i => i.id === itemCode);
    if (itemExists) {
        alert("Item already exists!");
        return;
    }

    let item = new Item(itemCode,itemName,qty,unitPrice);
    itemDetails.push(item);

    clear("#ItemNameTxt, #itemQtyTxt, #unitPriceTxt");

    iIdAutoGenerator++;
    $("#itemIdTxt").val("I-00" + iIdAutoGenerator);
    loadAllItem();
    loadAllItemToCombo();
}

function bindRowClickEventsItem() {
    $("#itemTblBody>tr").on('click', function () {
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let qty = $(this).children(":eq(2)").text();
        let unitPrice = $(this).children(":eq(3)").text();


        $('#itemIdTxt,#srcItemID').val(itemCode);
        $('#ItemNameTxt').val(itemName);
        $('#itemQtyTxt').val(qty);
        $('#unitPriceTxt').val(unitPrice);
    });
}



//save customer
// function addCustomer() {
//
//     let customer = new Customer(
//         $("#cusIdTxt").val(),
//         $("#cusNameTxt").val(),
//         $("#cusAddressTxt").val(),
//         $("#cusContactTxt").val()
//     );
//
//     for(customer c:customerDetails){
//         if(c.id==$('#cusIdTxt').val()){
//             alert("already exists !");
//         }else {
//             customerDetails.push(c);
//         }
//
//     }
//
//     // customerDetails.push(customer);
//
//     clear("#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt");
//
//     idAutoGenerator++;
//     $("#cusIdTxt").val("C-00" + idAutoGenerator);
//     loadAllCustomer();
// }

$("#addItemBtn").on('click', function () {
    addItem();
    /*loadAllCustomer();*/
    bindTrEventItem();
});

//search customer
function search(id, arrayReferenceName) {

    for (let i = 0; i < arrayReferenceName.length; i++) {
        if (arrayReferenceName[i].itemCode === id || arrayReferenceName[i].itemCode === id) {
            return arrayReferenceName[i];
        }
    }
}

$("#srcItemID").on('keydown', function (e) {
    let response = search($("#srcItemID").val(), itemDetails);
    let key = e.which;
    if (key === 13) {
        if (response) {
            $("#itemIdTxt").val(response.itemCode);
            $("#ItemNameTxt").val(response.itemName);
            $("#itemQtyTxt").val(response.qty);
            $("#unitPriceTxt").val(response.unitPrice);
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
function deleteItem(id) {
    for (let i = 0; i < itemDetails.length; i++) {
        if (itemDetails[i].id == id) {
            itemDetails.splice(i, 1);
            return true;
        }
    }
    return false;
}

$('#deleteItemBtn').on('click', function () {
    let id = $('#itemIdTxt').val();

    let consent = confirm("Do you want to delete?");

    if (consent) {
        let response = deleteItem(id);
        if (response) {
            alert("Success!");
            loadAllItem();
        } else {
            alert("Error!");
        }
    }
    clear('ItemNameTxt,itemQtyTxt,unitPriceTxt,itemIdTxt,#srcItemId');

    /*idAutoGenerator++;*/
    $("#itemIdTxt").val("I-00" + iIdAutoGenerator);
});

//search to click
function searchItem(id) {
    return itemDetails.find(function (item) {
        return item.itemCode === id;
    });
}

//update customer
function updateItem(id) {
    if (searchItem(id) === undefined) {
        alert("Please check itemId");
    } else {
        let consent = confirm("Are you sure update this item?");
        if (consent) {
            let item = searchItem(id);

            let itemName = $("#ItemNameTxt").val();
            let qty = $("#itemQtyTxt").val();
            let unitPrice = $("#unitPriceTxt").val();

            item.itemName = itemName;
            item.qty = qty;
            item.unitPrice = unitPrice;

            loadAllItem();
        }
    }

}

$('#updateItemBtn').on('click', function () {
    let id = $('#itemIdTxt').val();
    updateItem(id);

    clear('#ItemNameTxt,itemQtyTxt,unitPriceTxt,#srcItemId');
    /*idAutoGenerator++;*/
    $("#itemIdTxt").val("I-00" + iIdAutoGenerator);
});

// disable tab
$('#itemIdTxt,#ItemNameTxt,#itemQtyTxt,#unitPriceTxt').on('keydown', function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

