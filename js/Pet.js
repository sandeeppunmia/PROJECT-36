class Pet{
    constructor(){}

    getCount(){
        var petCountRef = database.ref("petCount");
        petCountRef.on("value",function(data){
            petCount-data.val();
        })
    }

    updateCount(count){
        database.ref('/').update({
            petCount: count
        });
    }

    update(name){
        var petIndex="pet" +petCount;
        database.ref(petIndex).set({
            name:name
        });
    }
}