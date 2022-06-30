let dataUser = localStorage.getItem("listUser")
  ? JSON.parse(localStorage.getItem("listUser"))
  : [];
let data = localStorage.getItem("listCustomer")
  ? JSON.parse(localStorage.getItem("listCustomer"))
  : [];
let userCallBack = JSON.parse(localStorage.getItem("status"))
  ? JSON.parse(localStorage.getItem("status"))
  : {};

$("#user").click(function () {
  switch (userCallBack.type) {
      case "admin":
          $(".dropdownUser").toggleClass("toggleClick");
        $(".manageuser").toggleClass("toggleClick");
        $(".logout").toggleClass("toggleClick");
          break;
    case "user" :
        $(".dropdownUser").toggleClass("toggleClick");
        $(".logout").toggleClass("toggleClick");
        break;
      default:
          break;
  }

});
try {
  if (userCallBack.onOff === true) {
    userComeBack();
  }
} catch (e) {
  console.log(e);
}
$(".logout").click(function () {
  logoutSussgess();
  localStorage.removeItem("status");
});
$(".manageuser").click(() => {
  $(".manageUsertable").css("display", "block");
  $('.welcome').css("display","none");
  $(".manageUsertable").find("span.close").click(function(){
    $(".manageUsertable").css("display", "none");
    $('.welcome').css("display","block");
  })
  tableuser();
});
function userComeBack() {
  let check = dataUser.filter((e) => {
    return (
      e.EmailUser === userCallBack.tk && e.PasswordUser === userCallBack.mk
    );
  });
  loginSussgess(check);
}
var user = function (
  NameUser,
  EmailUser,
  PasswordUser,
  PhoneUser,
  typeAccount
) {
  this.NameUser = NameUser;
  this.EmailUser = EmailUser;
  this.PasswordUser = PasswordUser;
  this.PhoneUser = PhoneUser;
  this.typeAccount = typeAccount;
};
$("#register").click(function () {
  onForm(".register");
  $(".register__top")
    .find("a")
    .click(function () {
      offForm(".register");
    });
});
$('#onCloseRegister').click(function(){
    offForm(".register");
})
$("#OnRegister").click(function () {
  let check = dataUser.filter((e) => {
    return e.EmailUser == $("#EmailUser").val();
  });
  if (check.length > 0) {
    $("#EmailUser").next().text("email nay da ton tai");
    return;
  }
  // let fpt ;
  // data.forEach((element,index) => { // nevermine
  //     if(element.Namee === $('#NameUser').val()){
  //         fpt = index;
  //     }
  // });
  let user2 = new user(
    $("#NameUser").val(),
    $("#EmailUser").val(),
    $("#PasswordUser").val(),
    $("#PhoneUser").val(),
    $("#typeAccount").val()
  );
  dataUser.push(user2);
  alert("dang ki thanh cong");
  offForm(".register");
  localStorage.setItem("listUser", JSON.stringify(dataUser));
});
$("#OnLogin").click(function () {
  let check = dataUser.filter((e) => {
    return (
      e.EmailUser == $("#EmailLogin").val() &&
      e.PasswordUser == $("#PasswordLogin").val()
    );
  });
  if (check.length > 0) {
    alert("dang nhap thanh cong");
    offForm(".login");
    userCallBack = {
      tk: check[0].EmailUser,
      mk: check[0].PasswordUser,
      onOff: true,
      type: check[0].typeAccount,
    };
    localStorage.setItem("status", JSON.stringify(userCallBack));
    loginSussgess(check);
  } else {
    $("#PasswordLogin").next().text("sai tk hoac mk");
    return;
  }
});

$("#login").click(function (e) {
  onForm(".login");
  $(".login__top").find("a").click(function () {
      offForm(".login");
    });
});
enterKey('#login',"#OnLogin");
enterKey('.login__mid input',"#OnLogin");

function offForm(whatForm) {
  $(whatForm).css("display", "none");
  $(".overlay").css("display", "none");
}
function onForm(whatForm) {
  $(whatForm).css("display", "block");
  $(".overlay").css("display", "block");
}
var sum = 0;
let indexActive = 0;
$("#inputSearch").on("keyup", function (e) {
  let check = data.filter((el) => {
    var obj = el.Namee;
    var value = $("#inputSearch").val().toLowerCase();
    return obj.indexOf(value) != -1;
  });

  if (e.keyCode == 13) {
    // Enter
    if (check.length === data.length) {
      // empty Input
      return;
    } else {
      $("#ReSearch").click();
    }
    console.log(check);
    console.log(data);
  }
  table(check); // show item true
  if (e.keyCode == "40") {
    if (indexActive < check.length - 1) {
      indexActive++;
    } else {
      indexActive = 0; // return first item
    }
  }
  if (e.keyCode == "38") {
    if (indexActive > 0) {
      indexActive--;
    } else {
      indexActive = check.length - 1; // return last iten
    }
  }
  if (e.keyCode != "38" && e.keyCode != "40" && e.keyCode != "13") {
    indexActive = 0;
  }
  $(".result div").each((index, e) => {
    if (indexActive == index) {
      $(".result div").removeClass("active");
      $(e).addClass("active");
    }
  });
  $(".result div").click(function () {
    // Click to view
    $(".bill").css("display", "block ");
    $(".search").css("display", "none");
    $(".result").css("display", "none");
    findBillView(this);
  });

  $("#ReSearch").click(function () {
    // function search
    $(".bill").css("display", "block ");
    $(".search").css("display", "none");
    $(".result").css("display", "none");
    $(".result div").each((index, e) => {
      if ($(e).hasClass("active")) {
        findBillView(e);
      }
    });
  });
});
function onFind() {
  var indexActive = 0;
  let check = data.filter((e) => {
    var obj = e.Namee;
    var value = $("#inputSearch").val().toLowerCase();
    return obj.search(value) != -1;
  });
  table(check); //
  tmp = check;
  $("#inputSearch").keyup((e) => {
    // up and down
    if (e.keyCode == "40") {
      if (indexActive < check.length - 1) {
        indexActive++;
      } else {
        indexActive = 0; // return first item
      }
      console.log(indexActive);
    }
    if (e.keyCode == "38") {
      if (indexActive > 0) {
        indexActive--;
      } else {
        indexActive = check.length - 1; // return last iten
      }
      console.log(indexActive);
    }
    $(".result div").each((index, e) => {
      if (indexActive == index) {
        $(".result div").removeClass("active");
        $(e).addClass("active");
        return;
      }
    });
  });
  $(document).on("keypress", function (e) {
    // Enter show
    if (e.which == 13) {
      $("#ReSearch").click();
    }
  });
  $("#inputSearch").keyup((e) => {
    // up and down
    if (e.keyCode == "40") {
      if (indexActive < tmp.length - 1) {
        indexActive++;
      } else {
        indexActive = 0; // return first item
      }
      console.log(indexActive);
    }
    if (e.keyCode == "38") {
      if (indexActive > 0) {
        indexActive--;
      } else {
        indexActive = tmp.length - 1; // return last iten
      }
      console.log(indexActive);
    }
    $(".result div").each((index, e) => {
      if (indexActive == index) {
        $(".result div").removeClass("active");
        $(e).addClass("active");
        return;
      }
    });
  });
  $("#ReSearch").click(function () {
    $(".bill").css("display", "block ");
    $(".search").css("display", "none");
    $(".result").css("display", "none");
    $(".result div").each((index, e) => {
      if ($(e).hasClass("active")) {
        var i = e.dataset.id;
        let lv1 = 0;
        let lv2 = 0;
        let lv3 = 0;
        for (var y = 1; y < data[i - 1].numberOfLetter; y++) {
          if (y <= 50) {
            lv1++;
          } else if (y <= 100) {
            lv2++;
          } else {
            lv3++;
          }
        }
        let dataInner = `<div class="p-3 bg-white">
            <div class="d-flex justify-content-between"><p class="text-danger fw-bolder">TỔNG CÔNG TY ĐIỆN LỰC THÀNH PHỐ HÀ NỘI</p><span><i class='bx bx-x' id="closeBill"></i></span></div>
            <p class="text-primary fw-bold">Tên khách hàng : <strong class="text-dark">${
              data[i - 1].Namee
            }</strong></p>
            <p>Địa chỉ : <strong class="text-dark">${
              data[i - 1].Address
            }</strong></p>
            <div class="girdSystem">
                <div class="item text-secondary"><span>dien thoai : </span></div>
                <div class="item text-secondary"><span>MST</span></div>
                <div class="item text-secondary"><span>số công tơ</span></div>
                <div class="item text-secondary"><span>số hộ</span></div>
                <div class="item text-secondary"><span>mã kh</span></div>
                <div class="item text-secondary"><span>mã thanh toán</span></div>
                <div class="item text-secondary"><span>mã nn</span></div>
                <div class="item text-secondary"><span>mã tổ</span></div>
                <div class="item text-secondary"><span>mã trạm</span></div>
                <div class="item text-secondary"><span>Cấp đa</span></div>
                <div class="item text-secondary"><span>só gsc</span></div>
                <div class="item text-secondary"><span>p gcs</span></div>
                <div class="item text-secondary"><span>mã giá</span></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Chỉ số mới</th>
                        <th>Chỉ số cũ</th>
                        <th>Tiêu thụ</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody id="data">
                    <tr>
                        <td>${data[i - 1].startUp}</td>
                        <td>${data[i - 1].EndOf}</td>
                        <td>${data[i - 1].numberOfLetter}</td>
                        <td></td>
                        <td></td>
                    </tr>
                  
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv1}</td>
                    <td>1480</td>
                    <td>${1480 * lv1}</td>
                    </tr>
                    
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv2}</td>
                    <td>1500</td>
                    <td>${1500 * lv2}</td>
                    </tr>

                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv3}</td>
                    <td>1800</td>
                    <td>${1800 * lv3}</td>
                    </tr>
          
                   <tr><td colspan="2">Cộng</td><td>${
                     data[i - 1].numberOfLetter
                   }</td><td></td><td>${
          1480 * lv1 + 1500 * lv2 + 1800 * lv3
        }</td></tr>
                   <tr><td colspan="2">Thuế</td><td colspan="2">Thuế GTGT</td><td>${
                     data[i - 1].VAT
                   }</td></tr>
                   <tr><td colspan="4">Tổng cộng thanh toán</td><td>${
                     data[i - 1].totalAmount
                   }</td></tr>
                </tbody>
            </table>
    
        </div>`;
        $(".bill").html(dataInner);
      }
    });
    $("#closeBill").click(function () {
      $(".bill").css("display", "none");

      $(".search").css("display", "flex");
      $(".result").css("display", "block");
    });
  });
}
function table(x) {
  let ta = "";
  for (var i = 0; i < x.length; i++) {
    ta += ` <div data-id="${x[i].ID}"><i class='bx bx-search'></i><span>${x[i].Namee}</span></div>`;
  }
  if ($("#inputSearch").val() == "") {
    ta = "";
  }
  $(".result").html(ta);
}
function findBillView(divActive) {
  $(".bill").css("display", "block ");
  $(".search").css("display", "none");
  $(".result").css("display", "none");
  var i = divActive.dataset.id;
  let lv1 = 0;
  let lv2 = 0;
  let lv3 = 0;
  for (var y = 1; y < data[i - 1].numberOfLetter; y++) {
    if (y <= 50) {
      lv1++;
    } else if (y <= 100) {
      lv2++;
    } else {
      lv3++;
    }
  }
  let dataInner = `<div class="p-3 bg-white">
            <div class="d-flex justify-content-between"><p class="text-danger fw-bolder">TỔNG CÔNG TY ĐIỆN LỰC THÀNH PHỐ HÀ NỘI</p><span><i class='bx bx-x' id="closeBill"></i></span></div>
            <p class="text-primary fw-bold">Tên khách hàng : <strong class="text-dark">${
              data[i - 1].Namee
            }</strong></p>
            <p>Địa chỉ : <strong class="text-dark">${
              data[i - 1].Address
            }</strong></p>
            <div class="girdSystem">
                <div class="item text-secondary"><span>dien thoai : </span></div>
                <div class="item text-secondary"><span>MST</span></div>
                <div class="item text-secondary"><span>số công tơ</span></div>
                <div class="item text-secondary"><span>số hộ</span></div>
                <div class="item text-secondary"><span>mã kh</span></div>
                <div class="item text-secondary"><span>mã thanh toán</span></div>
                <div class="item text-secondary"><span>mã nn</span></div>
                <div class="item text-secondary"><span>mã tổ</span></div>
                <div class="item text-secondary"><span>mã trạm</span></div>
                <div class="item text-secondary"><span>Cấp đa</span></div>
                <div class="item text-secondary"><span>só gsc</span></div>
                <div class="item text-secondary"><span>p gcs</span></div>
                <div class="item text-secondary"><span>mã giá</span></div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Chỉ số mới</th>
                        <th>Chỉ số cũ</th>
                        <th>Tiêu thụ</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody id="data">
                    <tr>
                        <td>${data[i - 1].startUp}</td>
                        <td>${data[i - 1].EndOf}</td>
                        <td>${data[i - 1].numberOfLetter}</td>
                        <td></td>
                        <td></td>
                    </tr>
                  
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv1}</td>
                    <td>1480</td>
                    <td>${1480 * lv1}</td>
                    </tr>
                    
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv2}</td>
                    <td>1500</td>
                    <td>${1500 * lv2}</td>
                    </tr>
    
                    <tr>
                    <td></td>
                    <td></td>
                    <td>${lv3}</td>
                    <td>1800</td>
                    <td>${1800 * lv3}</td>
                    </tr>
          
                   <tr><td colspan="2">Cộng</td><td>${
                     data[i - 1].numberOfLetter
                   }</td><td></td><td>${
    1480 * lv1 + 1500 * lv2 + 1800 * lv3
  }</td></tr>
                   <tr><td colspan="2">Thuế</td><td colspan="2">Thuế GTGT</td><td>${
                     data[i - 1].VAT
                   }</td></tr>
                   <tr><td colspan="4">Tổng cộng thanh toán</td><td>${
                     data[i - 1].totalAmount
                   }</td></tr>
                </tbody>
            </table>
    
        </div>`;
  $(".bill").html(dataInner);
  $("#closeBill").click(function () {
    $(".bill").css("display", "none");

    $(".search").css("display", "flex");
    $(".result").css("display", "block");
  });
}
function loginSussgess(x) {
  $(".welcome h2").text("Tra cứu thông tin điện tử");
  $(".welcome h1").text("");
  $(".search").css("display", "flex");
  $(".top__right button").css("display", "none");
  $(".top__right i").css("display", "block");
  $(".top__right a").text(`${x[0].NameUser}`);
}

function logoutSussgess() {
  $(".welcome h2").text("CHÀO MỪNG ĐẾN VỚI");
  $(".welcome h1").text("HỆ THỐNG QUẢN LÍ THÔNG TIN NGƯỜI DÙNG");
  $(".search").css("display", "none");
  $(".top__right button").css("display", "block");
  $(".top__right i").css("display", "none");
  $(".top__right a").text("");
}

function tableuser() {
  let dataTable = "";
  let indexReadonly;
  let listThead = $('.manageUsertable table thead tr th')
  listThead.each((index,e) => {
      if(e.innerText === "type"){
        indexReadonly = index;
       
      }
  })
  dataUser.forEach((e, index) => {
    dataTable += `<tr>`;
    Object.keys(e).forEach((el,index) => {
       if(index === indexReadonly){ // set Readonly on index = indexReadonly
        dataTable += `<td><span>${e[el]}</span><input readonly  value="${e[el]}"></input></td>`;
       }
       else {
        dataTable += `<td><span>${e[el]}</span><input  value="${e[el]}"></input></td>`;
       }
     
    });
    dataTable += `<td>
        <button type="button" class="btn btn-primary" onclick="editUser(${index})">Edit</button>
        <button type="button" class="btn btn-primary" onclick="deleteUser(${index})">Delete</button>
        </td>`;
    dataTable += `</tr>`;
  });
  $("#tableUser").html(dataTable);
}
let action = "edit";
function editUser(index) {
    var temp =   dataUser[index];
  if (action === "edit") {
    $(`#tableUser tr:nth-child(${index + 1}) span`).css("display", "none");
    $(`#tableUser tr:nth-child(${index + 1}) input`).css("display", "block");
    action = "update";
  } else {
    $(`#tableUser tr:nth-child(${index + 1}) span`).css("display", "block");
    $(`#tableUser tr:nth-child(${index + 1}) input`).css("display", "none");
    var x = $(`#tableUser tr:nth-child(${index + 1}) input`);
    x.each((index , e) => {
        let n = Object.keys(temp)[index];
        temp[n] = e.value
    })
    dataUser.splice(index , 1 , temp)
    localStorage.setItem("listUser",JSON.stringify(dataUser));
    tableuser();
    action = "edit";
  }
}
function deleteUser(index) {
    dataUser.splice(index , 1);
    tableuser();
    localStorage.setItem("listUser",JSON.stringify(dataUser));

}
function enterKey(sub ,funcEnter){
    $(sub).keypress(function(e) {
        if (e.keyCode == '13') {
            $(funcEnter).click()
    
         }
      });
}
