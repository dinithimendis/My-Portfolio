$("#header,#HomePage").show();
$("#customerForm,#itemForm,#orderForm,#orderDetailsForm").hide();

$("#Home").on("click",function (){
    $("#customerForm,#itemForm,#orderForm,#orderDetailsForm").hide();
    $("#HomePage").show();
});

$("#Customer").on("click",function (){
    $("#HomePage,#itemForm,#orderForm,#orderDetailsForm").hide();
    $("#customerForm").show();
});

$("#Item").on("click",function (){
    $("#HomePage,#customerForm,#orderForm,#orderDetailsForm").hide();
    $("#itemForm").show();
});

$("#Order").on("click",function (){
    $("#HomePage,#customerForm,#itemForm,#orderDetailsForm").hide();
    $("#orderForm").show();
});
