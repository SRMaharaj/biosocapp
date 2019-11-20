

var list = document.querySelector("#list");


//This function pulls data from the cart database
// db.collection('cart').get().then(function(snapshot){
//   snapshot.docs.forEach(doc =>{
//   renderCart(doc);
//   });
// });


//real time listener
db.collection('cart').orderBy('itemName').onSnapshot(snapshot =>{
  let changes=snapshot.docChanges();
  changes.forEach(change =>{
    if(change.type=='added')
      renderCart(change.doc);
    else if(change.type=='removed'){
      let tr=cafeList.querySelector('[data-id='+change.doc.id+']');
      list.removeChild(tr);
    }
  });
})


//This function renders the items from the cart database to the webpage
function renderCart(doc){

  let image = document.createElement('img');
  image.classList.add('image-responsive');

  let aDescription = document.createElement('a');
  let tdPrice = document.createElement('td');
  let tdCost = document.createElement('td');
  tdCost.textContent='$'+doc.data().cost;

  aDescription.textContent = doc.data().itemName;
  tdPrice.textContent = '$'+doc.data().price;
  image.src=doc.data().image;

  let tr = document.createElement('tr');
  tr.setAttribute('data-id',doc.id);

  let tdImage=document.createElement('td');
  tdImage.classList.add('image');
  let aImage = document.createElement('a');
  aImage.classList.add("media-link");
  aImage.appendChild(image);
  tdImage.appendChild(aImage);

  let tdDescription = document.createElement('td');
  tdDescription.classList.add('description');
  tdDescription.appendChild(aDescription);

  tdPrice.classList.add('price');
  tdCost.classList.add('price');

  let tdQuantity=document.createElement('td');
  tdQuantity.classList.add('td-quentety');
  let input=document.createElement('input');
  input.setAttribute("type", "number");


  var quantity = doc.data().quantity;
  input.setAttribute("value", quantity);
  var id=doc.data().id;
  input.addEventListener("click",function(){
    var val = input.value;
    var priceOfItem = doc.data().price;
    if(val<=1){
       input.value=1;
       tdCost.textContent='$'+priceOfItem;
    }
    else{
      tdCost.textContent='$'+input.value*priceOfItem+'.00';
      updateFirebase(doc.id,val,tdCost.textContent.split('$')[1]);
    }
  });
  input.addEventListener("keydown", function(event){
    if(event.keyCode==13){
      var priceOfItem= doc.data().price;
      var val = input.value;
      if(val<=1){
         input.value=1;
         tdCost.textContent='$'+priceOfItem;
       }
       else{
         tdCost.textContent='$'+input.value*priceOfItem+'.00';
         updateFirebase(doc.id,val,tdCost.textContent.split('$')[1]);
      }
    }
  });
  tdQuantity.appendChild(input);

  let tdTotal = document.createElement('td');
  tdTotal.classList.add('total');
  let aTotal=document.createElement('a');
  let i=document.createElement('i');
  i.classList.add('fa');
  i.classList.add('fa-close');
  aTotal.appendChild(i);
  aTotal.addEventListener('click', (e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    db.collection('cart').doc(id).delete();
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

function updateFirebase(docID,val,cost){
   db.collection('cart').doc(docID).update({
     cost:cost,
     quantity:val
   });
}
