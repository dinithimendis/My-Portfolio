function loadAllPurchaseDetails() {

    $("#itemDetailsTblBody").empty();

    for (let purchase of purchaseDetails) {
        let purchaseRow = `<tr>
                        <td>${purchase.oID}</td>
                        <td>${purchase.date}</td>
                        <td>${purchase.cID}</td>
                        <td>${purchase.iCode}</td>
                        <td>${purchase.oQty}</td>
                        <td>${purchase.discount+" %"}</td>
                        <td>${purchase.Tot}</td>
                   </tr>`;
        $('#itemDetailsTblBody').append(purchaseRow);
    }
}