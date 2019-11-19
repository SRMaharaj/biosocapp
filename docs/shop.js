var items = db.collection("store");
var addItemsButtons = document.getElementsByClassName("additemtocart");
for (var x = 0; x < addItemsButtons.length; x++) {
  addItemsButtons[x].addEventListener("click", function() {
    var itemName = this.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerHTML;
    var itemPrice = this.parentElement.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.innerHTML;
    itemPrice = (itemPrice.split("$"))[1];
    var image = this.parentElement.parentElement.parentElement.firstElementChild.getAttribute("src");
    console.log(itemName + " " + itemPrice + " " + image);
    addToCart(itemName, itemPrice, image);
  });
}

//adds items to cart when the AddItemsToCartButton is clicked on in the store
function addToCart(itemName, itemPrice, image) {
  db.collection('cart').add({
    image: image,
    itemName: itemName,
    price:itemPrice,
    quantity:1,
    cost:itemPrice
  });
}

//reads the collection from the store document on firestore
// db.collection("store").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     var names = doc.data().itemName;
//     console.log(doc.data().itemName);
//   });
// });
