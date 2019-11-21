


//This function pulls data from the cart database. If an error
//occurs while this process is taking place then an error will be
//thrown on the console and the database will not be read
db.collection('cart').get().then(function(snapshot){
  snapshot.docs.forEach(doc =>{
  console.log(doc.data());
  });
});

/*This function takes a documentID along with other data that may be updated while a user utilizes the Cart
and attempts to update the relevant fields in the database  */
function updateFirebase(docID,val,cost){
   db.collection('cart').doc(docID).update({
     cost:cost,
     quantity:val
   });
}
