var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var productsContainer = [];
var productIndex = 0;

if(localStorage != null) {
  productsContainer = JSON.parse(localStorage.getItem("product"));
  displayProducts();
}

function addProduct() {
  if(validateProductName() == true) {
    if(btn.innerHTML == "Add Product") {
      var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
      }
      productsContainer.push(product);
      localStorage.setItem("product", JSON.stringify(productsContainer));
    }
    else {
      updateProduct();
    }
    clearForm();
    displayProducts();
  }
  else {
    alert("Product Name Isn't Accepted (Start With [A-Z])")
  }
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function displayProducts() {
  var productRow = ``;
  for(var i = 0; i < productsContainer.length; i++) {
    productRow += `
    <tr>
    <td class="py-4">${i+1}</td>
    <td class="py-4">${productsContainer[i].name}</td>
    <td class="py-4">${productsContainer[i].price}</td>
    <td class="py-4">${productsContainer[i].category}</td>
    <td class="py-4">${productsContainer[i].desc}</td>
    <th class="py-4"><button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></th>
    <th class="py-4"><button class="btn btn-outline-primary btn-sm" onclick="getInputData(${i})">Update</button></th>
    </tr>
    `
  }
  document.getElementById("tableBody").innerHTML = productRow;
}

function deleteProduct(deletedItem) {
  productsContainer.splice(deletedItem,1);
  localStorage.setItem("product", JSON.stringify(productsContainer));
  displayProducts()
}

function search (term) {
  var productRow = ``;
  for(var i = 0; i< productsContainer.length; i++) {
    if
    (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
      productRow += `
      <tr>
      <td class="py-4">${i+1}</td>
      <td class="py-4">${productsContainer[i].name}</td>
      <td class="py-4">${productsContainer[i].price}</td>
      <td class="py-4">${productsContainer[i].category}</td>
      <td class="py-4">${productsContainer[i].desc}</td>
      <th class="py-4"><button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button></th>
      <th class="py-4"><button class="btn btn-outline-primary btn-sm" onclick="getInputData(${i})">Update</button></th>
      </tr>
      `  
    }
  }
  document.getElementById("tableBody").innerHTML = productRow;
}

function getInputData(index) {
  productIndex = index;
  productNameInput.value = productsContainer[index].name
  productPriceInput.value = productsContainer[index].price
  productCategoryInput.value = productsContainer[index].category
  productDescInput.value = productsContainer[index].desc
  btn.innerHTML = "Update Product";
}
function updateProduct() {

  var product = {
    name:productNameInput.value,
    price:productPriceInput.value,
    category:productCategoryInput.value,
    desc:productDescInput.value,
  }
  productsContainer[productIndex] = product;
  localStorage.setItem("product", JSON.stringify(productsContainer));
  clearForm();
  btn.innerHTML = "Add Product";

}

function validateProductName() {
  var regex = /^[A-Z][a-z]{3,8}$/;
  if(regex.test(productNameInput.value) == true) {
    return true;
  }
  else{
    return false;
  }
}