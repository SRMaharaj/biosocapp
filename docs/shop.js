

var addItemsButtons = document.getElementsByClassName("additemtocart");
for(var x=0;x<addItemsButtons.length;x++){
  addItemsButtons[x].addEventListener("click", function(){
      var itemName=this.parentElement.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerHTML;
      console.log(itemName);
  });
}

db.collection("store").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
});
