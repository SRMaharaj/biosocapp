



//This function pulls data from the store database
db.collection("cart").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
    });
});
