
let data = localStorage.getItem("listCustomer") ? JSON.parse(localStorage.getItem("listCustomer")) : [];
table(data.length);
let Clear = document.getElementById("Clear");
let inputs = document.getElementsByTagName("input");
let updatebg = document.querySelector('.update');
let overlay = document.querySelector('.overlay');
let validateName = /\d+/;
let notice = document.getElementById("notice");
[...inputs].forEach(e => { //Enter Click thoi KO co j dau
    e.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("Calculate").click();
        }
    });
});

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
function cal() {
    let startUp = document.getElementById("startUp");
    let EndOf = document.getElementById("EndOf");
    let Namee = document.getElementById("Namee");
    let Address = document.getElementById("Address");
    let VAT = document.getElementById("VAT");
    let VAT2 = (100 + parseInt(VAT.value)) / 100;
    while (startUp.value == "" || EndOf.value == "" || isNaN(startUp.value) || isNaN(EndOf.value) || Namee.value == "" || Address.value == "" || !isNaN(Address.value) || validateName.test(Namee.value)) {
        Check('#startUp');
        Check('#EndOf');
        CheckAddress('#Address');
        CheckName('#Namee');
        return
    }
    while ($('#startUp').val() < 0 || $('#EndOf').val() < 0) {
        CheckLow('#startUp');
        CheckLow('#EndOf');
        return;
    }
    while (EndOf.value - startUp.value < 0) {
        alert("End-of-items digits must be higher than Start-up period");
        return
    }

    $('p').text("");
    let numberOfLetter = EndOf.value - startUp.value;
    let n = parseInt(numberOfLetter);
    let sum = 0;
    for (let i = 1; i <= n; i++) {
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

    let totalAmount = (sum * VAT2).toFixed(0);
    let array = new aray(data.length + 1, Namee.value, Address.value, startUp.value, EndOf.value, VAT.value, numberOfLetter, totalAmount);
    data.push(array);
    localStorage.setItem("listCustomer", JSON.stringify(data));
    table(data.length);
    Fnotice('Thêm');
}
Clear.onclick = function () {
    [...inputs].forEach(x => {
        x.value = "";
    });
    $('p').text("");
    VAT.value = 10;
    Fnotice('Clear');
}
function Check(x) {
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
function CheckName(x) {
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
function CheckAddress(x) {
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
function CheckLow(x) {
    if ($(x).val() < 0) {
        $(x).next().text("số phải lớn hơn 0");
        return
    }
    else {
        $(x).next().text("");
    }
}

function table(x) {
    let count;
    if (data.length % x == 0) {
        count = data.length / x;
    }
    else {
        count = Math.floor(data.length / x) + 1;
    }
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
    document.getElementById("database").innerHTML = table;
    document.getElementById("selectRecord").innerHTML = record;
    document.getElementById("list").innerHTML = lists;
}
function Delete(x) {
    if (confirm("Bạn có chắc muốn xóa " + data[x - 1].Namee + "  không ?")) {
        data.splice(x - 1, 1);
        localStorage.setItem("listCustomer", JSON.stringify(data));
        for (let index2 = x - 1; index2 < data.length; index2++) {
            data[index2].ID--;;
        }
        Fnotice('Delete');
    }
    else return false
    table(data.length);
}
function Edit(x) {
    $(window).scrollTop(0);
    updatebg.style = `display:flex!important`;
    overlay.style = `display:block!important`;
    let startUp2 = document.getElementById("startUp2");
    let EndOf2 = document.getElementById("EndOf2");
    let update = document.getElementById("update");
    let cancel = document.getElementById("cancel");
    let Namee2 = document.getElementById("Namee2");
    let Address2 = document.getElementById("Address2");
    let VAT3 = document.getElementById("VAT2");
    let a = {};
    a = data[x - 1];
    startUp2.value = a.startUp;
    EndOf2.value = a.EndOf;
    Namee2.value = a.Namee;
    Address2.value = a.Address;
    VAT3.value = a.VAT;

    update.addEventListener("click", function () {
        while (startUp2.value == "" || EndOf2.value == "" || isNaN(startUp2.value) || isNaN(EndOf2.value) || Namee2.value == "" || Address2.value == "" || validateName.test(Namee2.value) || !isNaN(Address2.value)) {
            Check('#startUp2');
            Check('#EndOf2');
            CheckName('#Namee2');
            CheckAddress('#Address2');
            return;
        }
        while ($('#startUp2').val() < 0 || $('#EndOf2').val() < 0) {
            CheckLow('#startUp2');
            CheckLow('#EndOf2');
            return;
        }
        while (EndOf2.value - startUp2.value < 0) {
            alert("End-of-items digits must be higher than Start-up period");
            return
        }
        $('p').text("");
        let numberOfLetter = EndOf2.value - startUp2.value;
        let n = parseInt(numberOfLetter);
        let sum = 0;
        for (let i = 1; i <= n; i++) {
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
        a.Namee = Namee2.value;
        a.startUp = startUp2.value;
        a.EndOf = EndOf2.value;
        a.Address = Address2.value;
        a.VAT = VAT2.value;
        let VAT4 = (100 + parseInt(a.VAT)) / 100;
        let totalAmount = (sum * VAT4).toFixed(0);
        a.numberOfLetter = numberOfLetter;
        a.totalAmount = totalAmount;
        data[x - 1] = a;
        localStorage.setItem("listCustomer", JSON.stringify(data));
        a = {}
        table();
        updatebg.style = `display:none!important`;
        overlay.style = `display:none!important`;
        Fnotice('Edit')
    });
    cancel.addEventListener("click", function () {
        updatebg.style = `display:none!important`;
        overlay.style = `display:none!important`;
        a = {}
    });

}
function Fnotice(x) {
    notice.innerText = `${x} Thành Công`
    notice.style.opacity = "1";
    setTimeout(() => {
        notice.style.opacity = "0";
    }, 1000);
}
// let te = document.getElementById("test");
// let tet = document.getElementById("num");
// let mat = /\n/g;

// function my() {
//     if (mat.test(te.value)) {
//         var x = te.value.match(mat).length;
//     }
//     if (x == undefined) {
//         tet.innerText = te.value.length;
//     }
//     else {
//         tet.innerText = te.value.length + x;
//     }

// }


// // localStorage.clear()
// function a() {
//     alert("ok")
// }

function changeRecord() {

    let x = document.getElementById("selectRecord").value;
    table(x);
    document.getElementById("selectRecord").value = x
    
    let buttons = document.querySelectorAll(".listbutton");
    [...buttons].forEach((e, index) => {
        e.addEventListener("click", function () {
            let re = "";
            let stat = x * (index + 1) - x + 1;
            if(index == buttons.length - 1){
                var en = data.length;
                
            }
            else {
                var en = x * (index + 1);
            }
            console.log(en)
            for (let i = stat; i <= en; i++) {
                re += `<tr>`
                for (const index of Object.values(data[i - 1])) {
                    re += `<td>${index}</td>`;
                }
                re += `<td> <button class="btn btn-primary" onclick="Edit(${data[i - 1].ID})"><i class='bx bx-edit-alt'></i></button> 
                            <button class="btn btn-primary" onclick="Delete(${data[i - 1].ID})"><i class='bx bxs-trash'></i></button></td>`;
                re += `</tr>`;
        
            }
           document.getElementById("bdy").innerHTML = re;
        })
    })


}

