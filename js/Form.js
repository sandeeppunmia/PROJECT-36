class Form{
    constructor(){}

    display(){
        var title = createElement('h2');
        title.html("Welcome to Virtual Pet Game!!")
        title.position(130,0);

        var input = createInput("Enter your pet name");
        var button = createButton("Play");
        var greeting = createElement('h3');

        input.position(130,160);
        button.position(250,200);

        button.mousePressed(function(){
            input.hide();
            button.hide();

            var name = input.value();

            pet+=1;
            pet.update(name);
            pet.update(pet);

            greeting.html("Hello my dear pet carer!!");
            greeting.position(130,160);
        })
    }
}