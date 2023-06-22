//customer id autogenerate
let idAutoGenerator = 1;
$("#cusIdTxt").val("C-00" + idAutoGenerator);

// load all Customer
function loadAllCustomer() {

    $("#customerTableBody").empty();

    for (let i of customerDetails) {
        let row = `<tr>
                        <td>${i.id}</td>
                        <td>${i.name}</td>
                        <td>${i.address}</td>
                        <td>${i.contact}</td>
                   </tr>`;
        $('#customerTableBody').append(row);
    }
    //this function calling reason ->
    //because i want to bind clickRowEvents all the data
    bindRowClickEvents();
}

//text fields clear
function clear(textFld) {
    $(textFld).val('');
}

function addCustomer() {
    let customerId = $("#cusIdTxt").val();
    let customerName = $("#cusNameTxt").val();
    let customerAddress = $("#cusAddressTxt").val();
    let customerContact = $("#cusContactTxt").val();

    // Check if customer ID already exists ?
    // if some keyword is equals to for
    let customerExists = customerDetails.some(c => c.id === customerId);
    if (customerExists) {
        alert("Customer already exists!");
        return;
    }

    let customer = new Customer(customerId, customerName, customerAddress, customerContact);
    customerDetails.push(customer);

    clear("#cusNameTxt, #cusAddressTxt, #cusContactTxt");

    idAutoGenerator++;
    $("#cusIdTxt").val("C-00" + idAutoGenerator);
    loadAllCustomer();
}

function bindRowClickEvents() {
    $("#customerTableBody>tr").on('click', function () {
        let id = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let contact = $(this).children(":eq(3)").text();


        $('#cusIdTxt,#srcItemID').val(id);
        $('#cusNameTxt').val(name);
        $('#cusAddressTxt').val(address);
        $('#cusContactTxt').val(contact);
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

$("#addCustomerBtn").on('click', function () {
    addCustomer();
    /*loadAllCustomer();*/
    bindTrEvent();
});

//search customer
function search(id, arrayReferenceName) {

    for (let i = 0; i < arrayReferenceName.length; i++) {
        if (arrayReferenceName[i].id === id || arrayReferenceName[i].itemCode === id) {
            return arrayReferenceName[i];
        }
    }
}

$("#srcCustomerId").on('keydown', function (e) {
    let response = search($("#srcCustomerId").val(), customerDetails);
    let key = e.which;
    if (key === 13) {
        if (response) {
            $("#cusIdTxt").val(response.id);
            $("#cusNameTxt").val(response.name);
            $("#cusAddressTxt").val(response.address);
            $("#cusContactTxt").val(response.contact);
        } else {
            clear('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt');
        }
    }
});

//click table row and load data to text fields
function bindTrEvent() {
    $('#customerTableBody').on('click', 'tr', function () {
        let cusId = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let address = $(this).children(":eq(2)").text();
        let tel = $(this).children(":eq(3)").text();

        $("#cusIdTxt").val(cusId);
        $("#cusNameTxt").val(name);
        $("#cusAddressTxt").val(address);
        $("#cusContactTxt").val(tel);

    });
}

//delete customer
function deleteCustomer(id) {
    for (let i = 0; i < customerDetails.length; i++) {
        if (customerDetails[i].id == id) {
            customerDetails.splice(i, 1);
            return true;
        }
    }
    return false;
}

$('#deleteCustomerBtn').on('click', function () {
    let id = $('#cusIdTxt').val();

    let consent = confirm("Do you want to delete?");

    if (consent) {
        let response = deleteCustomer(id);
        if (response) {
            alert("Success!");
            loadAllCustomer();
        } else {
            alert("Error!");
        }
    }
    clear('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt,#srcCustomerId');
    /*idAutoGenerator++;*/
    $("#cusIdTxt").val("C-00" + idAutoGenerator);
});

//search to click
function searchCustomer(id) {
    return customerDetails.find(function (customer) {
        return customer.id == id;
    });
}

//update customer
function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("Please check customerId");
    } else {
        let consent = confirm("Are you sure update this customer.?");
        if (consent) {
            let customer = searchCustomer(id);

            let name = $("#cusNameTxt").val();
            let address = $("#cusAddressTxt").val();
            let tel = $("#cusContactTxt").val();

            customer.name = name;
            customer.address = address;
            customer.contact = tel;

            loadAllCustomer();
        }
    }

}

$('#updateCustomerBtn').on('click', function () {
    let id = $('#cusIdTxt').val();
    updateCustomer(id);

    clear('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#srcCustomerId');
    /*idAutoGenerator++;*/
    $("#cusIdTxt").val("C-00" + idAutoGenerator);
});

// disable tab
$('#cusNameTxt,#cusAddressTxt,#cusContactTxt,#cusIdTxt').on('keydown', function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});

