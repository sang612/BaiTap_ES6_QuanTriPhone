var phoneList = [];

const fetchPhones = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });

    phoneList = mapPhones(res.data);
    renderPhones(phoneList);
  } catch (err) {
    console.log(err);
  }
};

const mapPhones = (data) => {
  const results = data.map((item, i) => {
    return new Phone(
      item.name,
      item.price,
      item.screen,
      item.backCamera,
      item.frontCamera,
      item.img,
      item.desc,
      item.type,
      item.id,
      item.quantity
    );
  });

  return results;
};

const createPhone = () => {
  if (!validate()) {
    return;
  }

  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  var quantity = document.getElementById("quantity").value;

  var newPhone = new Phone(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id,
    quantity
  );

  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "POST",
    data: newPhone,
  })
    .then(function (res) {
      fetchPhones();
    })
    .catch(function (err) {
      console.log(err);
    });

  renderPhones();

  //   saveData();

  document.getElementById("btnDong").click();
  document.getElementById("btnReset").click();
};

var renderPhones = function (data) {
  data = data || phoneList;

  var dataHTML = "";
  for (var i = 0; i < data.length; i++) {
    dataHTML += `<tr>
          <td>${data[i].name}</td>
          <td>${formatNumber(data[i].price)}</td>
          <td>${data[i].screen}</td>
          <td>${data[i].backCamera}</td>
          <td>${data[i].frontCamera}</td>
          <td> <img src=${data[i].img} width="50px" height="auto"> </img> </td>
          <td>
            <div class="description">${data[i].desc}</div>
          </td>
          <td>${data[i].type}</td>
          <td>${data[i].id}</td>
          <td>${data[i].quantity}</td>
          <td>
            <button class = "btn btn-danger" onclick = "deletePhone('${
              data[i].id
            }')">Xoa</button>
            <button class = "btn btn-info" onclick = "getPhone('${
              data[i].id
            }')">Cap Nhat</button>
        </td>
        </tr>`;
  }

  document.getElementById("tableDanhSach").innerHTML = dataHTML;
};

const deletePhone = (id) => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "DELETE",
  })
    .then(function (res) {
      console.log(res);
      fetchPhones();
    })
    .catch(function (err) {
      console.log(err);
    });
};

const updatePhone = () => {
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  var quantity = document.getElementById("quantity").value;

  var updatedPhone = new Phone(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type,
    id,
    quantity
  );

  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "PUT",
    data: updatedPhone,
  })
    .then(function (res) {
      fetchPhones();
      document.getElementById("btnReset").click();
      document.getElementById("btnDong").click();
    })
    .catch(function (err) {
      console.log(err);
    });
};

var getPhone = function (id) {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/" + id,
    method: "GET",
  })
    .then(function (res) {
      console.log(res);
      var foundPhone = res.data;
      document.getElementById("name").value = foundPhone.name;
      document.getElementById("price").value = foundPhone.price;
      document.getElementById("screen").value = foundPhone.screen;
      document.getElementById("backCamera").value = foundPhone.backCamera;
      document.getElementById("frontCamera").value = foundPhone.frontCamera;
      document.getElementById("img").value = foundPhone.img;
      document.getElementById("desc").value = foundPhone.desc;
      document.getElementById("type").value = foundPhone.type;
      document.getElementById("id").value = foundPhone.id;
      document.getElementById("quantity").value = foundPhone.quantity;
      document.getElementById("btnCapNhat").style.display = "inline-block";
      document.getElementById("btnThemNV").style.display = "none";
      document.getElementById("btnCapNhatHidden").click();
    })
    .catch(function (err) {
      console.log(err);
    });
};

const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

var findPhoneByName = function () {
  var keyword = document
    .getElementById("searchName")
    .value.toLowerCase()
    .trim();
  var result = [];

  for (var i = 0; i < phoneList.length; i++) {
    var phoneType = phoneList[i].name.toLowerCase();
    if (phoneType.includes(keyword)) {
      result.push(phoneList[i]);
    }
  }

  renderPhones(result);
};

var validate = function () {
  var name = document.getElementById("name").value;
  var price = document.getElementById("price").value;
  var screen = document.getElementById("screen").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  var id = document.getElementById("id").value;
  var quantity = document.getElementById("quantity").value;

  const numberPatern = /[0-9]/g;

  var isValid = true;

  isValid &= require(name, "tbName");
  isValid &= require(price, "tbPrice");
  isValid &= require(screen, "tbScreen");
  isValid &= require(backCamera, "tbBackCamera");
  isValid &= require(frontCamera, "tbFrontCamera");
  isValid &= require(img, "tbImg");
  isValid &= require(desc, "tbDesc");
  isValid &= checkType(type, "tbType");
  isValid &=
    require(quantity, "tbQuantity") &&
    patern(quantity, "tbQuantity", numberPatern, "Chỉ được nhập số");

  return isValid;
};

const require = (val, spanId, message) => {
  if (!val) {
    document.getElementById(spanId).style.display = "inline-block";
    document.getElementById(spanId).innerHTML =
      message || "* Truong nay bat buoc nhap";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
};

// patern
var patern = function (val, spanId, regex, message) {
  if (!regex.test(val)) {
    document.getElementById(spanId).style.display = "inline-block";
    document.getElementById(spanId).innerHTML =
      message || "* Khong dung dinh dang";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
};

//type
const checkType = (val, spanId, message) => {
  if (val != "Samsung" && val != "Iphone") {
    document.getElementById(spanId).style.display = "inline-block";
    document.getElementById(spanId).innerHTML =
      message || "* Hãy chọn loại điện thoại";
    return false;
  }

  document.getElementById(spanId).innerHTML = "";
  return true;
};

fetchPhones();

document.getElementById("btnCapNhat").style.display = "none";

document.getElementById("btnThem").addEventListener("click", () => {
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("btnCapNhat").style.display = "none";
});
