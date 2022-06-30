let data = localStorage.getItem("listCustomer") ? JSON.parse(localStorage.getItem("listCustomer")) : [];
table(data.length);
let validateName = /\d+/;
let aray = function (ID, Namee, Address, startUp, EndOf, VAT, numberOfLetter, totalAmount) {
    this.ID = ID;
    this.Namee = Namee;
    this.Address = Address;
    this.startUp = startUp;
    this.EndOf = EndOf;
    this.numberOfLetter = numberOfLetter;
    this.VAT = VAT;
    this.totalAmount = totalAmount;

}
function calculate() {
    let VAT = (100 + parseInt($('#VAT').val())) / 100;
    if ($('#startUp').val() == "" || $('#EndOf').val() == "" || isNaN($('#startUp').val()) || isNaN($('#EndOf').val()) || $('#Namee').val() == "" || $('#Address').val() == "" || !isNaN($('#Address').val()) || validateName.test($('#Namee').val())) {
        check('#startUp');
        check('#EndOf');
        checkAddress('#Address');
        checkName('#Namee');
        return
    }
    if ($('#startUp').val() < 0 || $('#EndOf').val() < 0) {
        checkLow('#startUp');
        checkLow('#EndOf');
        return;
    }
    if ($('#EndOf').val() - $('#startUp').val() < 0) {
        alert("End-of-items digits must be higher than Start-up period");
        return
    }
    $('p').text("");
    let numberOfLetter = $('#EndOf').val() - $('#startUp').val();
    let sum = 0;
    for (let i = 1; i <= numberOfLetter; i++) {
        if (i <= 50) {
            sum += 1480;
        }
        else
            if (i <= 100) {
                sum += 1500;
            }
            else {
                sum += 1800;
            }
    }

    let totalAmount = (sum * VAT).toFixed(0);
    let bill = new aray(data.length + 1, $('#Namee').val(), $('#Address').val(), $('#startUp').val(), $('#EndOf').val(), $('#VAT').val(), numberOfLetter, totalAmount);
    data.push(bill);
    localStorage.setItem("listCustomer", JSON.stringify(data));
    table(data.length);
    functionNotice('Thêm');
}
$('#Clear').click(function(){
    $('input').val("");
    $('p').text("");
    $('#VAT').val(10)
    functionNotice('Clear');
})
function check(x) {
    if ($(x).val() == "") {
        $(x).next().text("Không được để trống");
        return;
    }
    else {
        $(x).next().text("");
    }
    if (isNaN($(x).val())) {
        $(x).next().text(" Vui lòng nhập số");
        return

    }
    else {
        $(x).next().text("");
    }

}
function checkName(x) {
    if ($(x).val() == "") {
        $(x).next().text("Không được để trống");
        return;
    }
    else {
        $(x).next().text("");
    }

    if (validateName.test($(x).val())) {
        $(x).next().text("Tên không chứa số");
        return;
    }
    else {
        $(x).next().text("");
    }
}
function checkAddress(x) {
    if ($(x).val() == "") {
        $(x).next().text("Không được để trống");
        return;
    }
    else {
        $(x).next().text("");
    }
    if (!isNaN($(x).val())) {
        $(x).next().text("Địa chỉ không đúng");
        return;
    }
    else {
        $(x).next().text("");

    }
}
function checkLow(x) {
    if ($(x).val() < 0) {
        $(x).next().text("số phải lớn hơn 0");
        return
    }
    else {
        $(x).next().text("");
    }
}
var n = 0 ;
var m ;
var count;
function table(x) {


    if (data.length % x == 0) {
        count = data.length / x;
    }
    else {
        count = Math.floor(data.length / x) + 1;
    }
    let first = `<button class="btn btn-light mx-2" id="firstPage">first</button>`;
    let last = `<button class="btn btn-light mx-2" id="lastPage">last</button>`;
    let record = "";
    let lists = "";
    let table = `<table>
 <thead>
        <tr>`;
    for (const i in data[0]) {
        table += `<th>${i}</th>`;
    }
    table += `<th> Manage</th>`;
    table += `</tr>
        </thead>
        <tbody id = "bdy">`
    for (let i = 0; i < x; i++) {
        table += `<tr>`
        for (const index of Object.values(data[i])) {
            table += `<td>${index}</td>`;

        }
        table += `<td> <button class="btn btn-primary" onclick="Edit(${data[i].ID})"><i class='bx bx-edit-alt'></i></button> 
                    <button class="btn btn-primary" onclick="Delete(${data[i].ID})"><i class='bx bxs-trash'></i></button></td>`;
        table += `</tr>`;

    }
    for (let i = 0; i < data.length; i++) {
        record += `<option value="${i + 1}">${i + 1}</option>`;
    }
  
        for (let i = 0; i < count; i++) {
            lists += `<button class="btn btn-primary mx-2 listbutton">${i + 1}</button>`
        }
    


    table += `</tbody>
        </table>`;
    if (data.length <= 0) {
        table = "";
    }
    if(count === 1){
        lists = "";
    }
    if(count <= 2){
        first = "";
        last = "";
    }
    document.getElementById("database").innerHTML = table;
    document.getElementById("selectRecord").innerHTML = record;
    document.getElementById("list").innerHTML = first + lists + last;
    
}
function Delete(x) {
    if (confirm("Bạn có chắc muốn xóa " + data[x - 1].Namee + "  không ?")) {
        data.splice(x - 1, 1);
        localStorage.setItem("listCustomer", JSON.stringify(data));
        for (let index2 = x - 1; index2 < data.length; index2++) {
            data[index2].ID--;;
        }
        functionNotice('Delete');
    }
    else return false
    table(data.length);
}


function functionNotice(x) {
    $('#notice').text(`${x} Thành Công`);
    $('#notice').css("opacity" , "1");
    setTimeout(() => {
        $('#notice').css("opacity" , "0");
    }, 1000);
}
function changeRecord() {
    
    (n) ? n : n=0;
    m = n + 3;
    let x = $('#selectRecord').val();
    table(x);
    $('#selectRecord').val(x);
    $('.listbutton').each(function(index){
        $('.listbutton').first().addClass('btn-secondary');
        
        let bien = 0;
                for(var i = n ; i <= m ; i++){  
                    if(index != i){
                        bien++;
                        if(bien == 4){
                         $('.listbutton').eq(index).css("display" , "none");                    
                        }
                    }
                }
            $(this).click(function(){
                if(index == m){
                    n++;
                    changeRecord();
                }
                if(index == n){
                    if(n != 0){
                        n--;
                        changeRecord();
                    }
                }
                $('.listbutton').each(function(){
                    $(this).removeClass('btn-secondary');
                })
                $('.listbutton').eq(index).addClass('btn-secondary');
                let tableRecord = "";
                let start = x * (index + 1) - x + 1;
                if (index == $('.listbutton').length - 1) { //last page
                    var end = data.length;
                    
                }
                else { // normal page
                    var end = x * (index + 1);
                }
                for (let i = start; i <= end; i++) {
                    tableRecord += `<tr>`
                    for (const index of Object.values(data[i - 1])) {
                        tableRecord += `<td>${index}</td>`;
                    }
                    tableRecord += `<td> <button class="btn btn-primary" onclick="Edit(${data[i - 1].ID})"><i class='bx bx-edit-alt'></i></button> 
                                <button class="btn btn-primary" onclick="Delete(${data[i - 1].ID})"><i class='bx bxs-trash'></i></button></td>`;
                    tableRecord += `</tr>`;
    
                }
                $('#bdy').html(tableRecord);
            })
            
        
    });
    $('#firstPage').click(function(){
      $('.listbutton').first().click();
      n = 0 ;
      $('.listbutton').first().addClass('btn-secondary');
      changeRecord();
    });
    $('#lastPage').click(function(){
      $('.listbutton').last().click();
    //   $('.listbutton').last().addClass('btn-secondary');
    //   n = $('.listbutton').length - 5; 
    //   changeRecord();
    });
}
function Edit(x) {
    $(window).scrollTop(0);
    $('.update').attr("style", "display:flex!important");
    $('.overlay').attr("style", "display:block!important");
    let dataTemp = {};
     dataTemp = data[x - 1];
    $('#startUp2').val(dataTemp.startUp);
    $('#EndOf2').val(dataTemp.EndOf);
    $('#Namee2').val(dataTemp.Namee);
    $('#Address2').val(dataTemp.Address);
    $('#VAT2').val(dataTemp.VAT);
        $('#update').click(function(){
        if ($('#startUp2').val() == "" || $('#EndOf2').val() == "" || isNaN($('#startUp2').val()) || isNaN($('#EndOf2').val()) || $('#Namee2').val() == "" || $('#Address2').val() == "" || !isNaN($('#Address2').val()) || validateName.test($('#Namee2').val())) {
            check('#startUp2');
            check('#EndOf2');
            checkName('#Namee2');
            checkAddress('#Address2');
            return;
        }
        if ($('#startUp2').val() < 0 || $('#EndOf2').val() < 0) {
            checkLow('#startUp2');
            checkLow('#EndOf2');
            return;
        }
        if ($('#EndOf2').val() - $('#startUp2').val() < 0) {
            alert("End-of-items digits must be higher than Start-up period");
            return
        }
        $('p').text("");
        let numberOfLetter = $('#EndOf2').val() - $('#startUp2').val();
        let sum =0;
        for (let i = 1; i <= numberOfLetter; i++) {
            if (i <= 50) {
                sum += 1480;
            }
            else
                if (i <= 100) {
                    sum += 1500;
                }
                else {
                    sum += 1800;
                }
        }
        dataTemp.Namee = $('#Namee2').val();
        dataTemp.startUp = $('#startUp2').val();
        dataTemp.EndOf = $('#EndOf2').val();
        dataTemp.Address = $('#Address2').val();
        dataTemp.VAT = $('#VAT2').val();
        let vatUpdate = (100 + parseInt(dataTemp.VAT)) / 100;
        let totalAmount = (sum * vatUpdate).toFixed(0);
        dataTemp.numberOfLetter = numberOfLetter;
        dataTemp.totalAmount = totalAmount;
        data[x - 1] = dataTemp;
        localStorage.setItem("listCustomer", JSON.stringify(data));
        dataTemp = {}; 
        $('.update').attr("style" , "display:none!important");
        $('.overlay').attr("style" , "display:none!important");
        functionNotice('Edit');
        table(data.length);
        x = 0;
    });
        $('#cancel').click(function(){
            $('.update').attr("style" , "display:none!important");
            $('.overlay').attr("style" , "display:none!important");
            dataTemp = {};
        });
}
