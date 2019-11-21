

var list = document.querySelector("#list");//selects the tag with id=list
var grandTotal = document.querySelector("h3.grand-total");

//This function pulls data from the cart database
// db.collection('cart').get().then(function(snapshot){
//   snapshot.docs.forEach(doc =>{
//   renderCart(doc);
//   });
// });

//real time listener
//This function listens for changes from the firebase database in real time and commits those changes to the
//web page itself
db.collection('cart').orderBy('itemName').onSnapshot(snapshot =>{//collects a snapshot of the database at the point in time of the update
  let changes=snapshot.docChanges();////collects the changes made in the firebase

  changes.forEach(change =>{//gets the change for each element in the firebase
    if(change.type=='added'){//checks to see if the element has an attribute called added which means that the element was not deleted
      renderCart(change.doc);//renders the change to the webpage
    }
    else if(change.type=='removed'){//if attribute of element is removed, element was deleted from firebase
      let tr=list.querySelector('[data-id='+change.doc.id+']');//proceeds to get the id for the relevant tag
      list.removeChild(tr);//removes the row of deleted item data from the cart
    }
  });
});


//This function renders the items from the cart database to the webpage
function renderCart(doc){
  let image = document.createElement('img');//gets image source
  image.classList.add('image-responsive');//adds to classlist for styling


  /*Creating html elements for a table and pulling item fields from firebase to populate those fields*/
  let aDescription = document.createElement('a');
  let tdPrice = document.createElement('td');
  let tdCost = document.createElement('td');
  tdCost.textContent='$'+doc.data().cost;

  aDescription.textContent = doc.data().itemName;
  tdPrice.textContent = '$'+doc.data().price;
  image.src=doc.data().image;

  let tr = document.createElement('tr');
  tr.setAttribute('data-id',doc.id);//assigns document id to that of row id from firebase. Row id contains the data for an item

  let tdImage=document.createElement('td');
  tdImage.classList.add('image');//adds to classlist for styling
  let aImage = document.createElement('a');
  aImage.classList.add("media-link");//adds to classlist for styling
  aImage.appendChild(image);
  tdImage.appendChild(aImage);

  let tdDescription = document.createElement('td');
  tdDescription.classList.add('description');//adds to classlist for styling
  tdDescription.appendChild(aDescription);

  tdPrice.classList.add('price');//adds to classlist for styling
  tdCost.classList.add('price');//adds to classlist for styling

  let tdQuantity=document.createElement('td');
  tdQuantity.classList.add('td-quentety');//adds to classlist for styling
  let input=document.createElement('input');
  input.setAttribute("type", "number");


  var quantity = doc.data().quantity;
  input.setAttribute("value", quantity);
  var id=doc.data().id;
  input.addEventListener("click",function(){//adding an event listener to the input field to update the quantity of the cart and cost when the user clicks on the button to increase/decrease items
    var val = input.value;
    var priceOfItem = doc.data().price;
    if(val<=1){
       input.value=1;
       tdCost.textContent='$'+priceOfItem;
    }
    else{
      tdCost.textContent='$'+input.value*priceOfItem+'.00';
      updateFirebase(doc.id,val,tdCost.textContent.split('$')[1]);//sends update to firebase to be rendered
    }
  });
  input.addEventListener("keydown", function(event){//adds a key listener to update firebase as an item's quantity is updated
    if(event.keyCode==13){
      var priceOfItem= doc.data().price;
      var val = input.value;
      if(val<=1){
         input.value=1;
         tdCost.textContent='$'+priceOfItem;
       }
       else{
         tdCost.textContent='$'+input.value*priceOfItem+'.00';
         updateFirebase(doc.id,val,tdCost.textContent.split('$')[1]);//render update to firebase
      }
    }
  });
  tdQuantity.appendChild(input);

  let tdTotal = document.createElement('td');
  tdTotal.classList.add('total');//adds to classlist for styling
  let aTotal=document.createElement('a');
  let i=document.createElement('i');
  i.classList.add('fa');//adds to classlist for styling
  i.classList.add('fa-close');//adds to classlist for styling
  aTotal.appendChild(i);
  aTotal.addEventListener('click', (e)=>{//event listener added to delete item from firebase when there is a click on x button in cart
    e.stopPropagation();//stops default page propogation
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');//gets the table row id of an element to be deleted
    db.collection('cart').doc(id).delete();//deletes item from cart
  });
  tdTotal.appendChild(aTotal);

  tr.appendChild(tdImage);
  tr.appendChild(tdDescription);
  tr.appendChild(tdPrice);
  tr.appendChild(tdQuantity);
  tr.appendChild(tdCost);
  tr.appendChild(tdTotal);

  list.appendChild(tr);


}

function updateFirebase(docID,val,cost){//sends update to firebase
   db.collection('cart').doc(docID).update({//gets relevant document id for update
     cost:cost,//updates firebase fields
     quantity:val
   });
}
