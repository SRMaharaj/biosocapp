var items = db.collection("store");//gets collection from firebase
var addItemsButtons = document.getElementsByClassName("additemtocart");//gets buttons to add items to cart
for (var x = 0; x < addItemsButtons.length; x++) {
  addItemsButtons[x].addEventListener("click", function() {//adds an event listener to the button for each item to add to the cart when clicked
    var itemName = this.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerHTML;//gets the item name from the HTML
    var itemPrice = this.parentElement.parentElement.parentElement.parentElement.lastElementChild.lastElementChild.lastElementChild.innerHTML;//gets price from the HTML
    itemPrice = (itemPrice.split("$"))[1];//gets rid of the $ from the text
    var image = this.parentElement.parentElement.parentElement.firstElementChild.getAttribute("src");//gets relative source of image from html
    //console.log(itemName + " " + itemPrice + " " + image);//logs data
    addToCart(itemName, itemPrice, image);//adds to cart
  });
}

//adds items to cart when the AddItemsToCartButton is clicked on in the store
function addToCart(itemName, itemPrice, image) {//adds item data automatically to firebase in realtime
  db.collection('cart').add({//adding new item
    image: image,
    itemName: itemName,//adding data to populate fields
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
