class Quadrilateral {
  constructor(side1, side2, side3, side4){
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.side4 = side4;
  }
  getPerimeter(){
    return this.side1 + this.side2 + this.side3 + this.side4;
  }
}

/*
The extends keyword below allows the Rectangle class to inherit all 
the properties and methods present in the quadrilateral class
*/
class Rectangle extends Quadrilateral{
  constructor(side1, side2){
    /*
    The super function calls the constructor of tbe class were inheriting from.
    In this case, it's the Quadrilateral class.
    By using super(side1, side2, side1, side2), we send the side lengths to the parent class (Quadrilateral).
    The parent class then uses those values to create properties for each side (side1, side2, side3, side4).
    This allows the Rectangle class to have access to these side properties and methods like getPerimeter.
    */
    super(side1, side2, side1, side2);
  }
  getArea(){
    return this.side1 * this.side2;
  }
}
/*
The square class inherits from the Rectangle class
Meaning, it inherits all of it's properties and methods, as well as the ones from quadrilateral. 

Since a square has four equal sides, we only need to pass `side1` twice to `super(side1, side1)`.  
This works because the Rectangle class already passes two sides to the Quadrilateral constructor, 
which then sets up all four sides. 
*/
class Square extends Rectangle{
  constructor(side1){
    super(side1, side1);
  }
  getDiagonal(){
    return this.side1 * Math.sqrt(2);
  }
}

/* Be creative with this one! */
class Person {
  static #allPeople = [];
  static #items = [ "Wiggly Wobble Coins", "Soggy Sock Tokens","Golden Goober Nuts", "Shiny Snail Shells", "Quantum Pickles", "Glorp Crystals", "Funky Fidget Cubes", "Mystic Meatballs", "Boogie Beans", "Cursed Rubber Chickens", "Zorp Nuggets", "Jellyfish Jingles", "Banana Stickers of Destiny", "Interdimensional Lint Balls", "Screaming Marshmallows", "Rainbow Bubble Wrap", "Haunted Whoopee Cushions", "Neon Nacho Chips", "Squishy Starfruits", "Doomed Donuts"];
  /*
  My class creates a person with video game life properties.
  Each person has a name, health (starting at 100), and an inventory for collected items.
  When a new person is created, they are automatically added to the list of all people.
  */
  constructor(name){
    this.name = name;
    this.health = 100;
    this.inventory = [];
    Person.#allPeople.push(this);
  }

  /*
  We return a copy of the person's inventory.  
  The spread operator is used to prevent direct access to the original array.
  */
  showInventory(){
    return [...this.inventory];
  }

  /*
  The method below allows you to use an item from your inventory in exchange for health.  
  First, we check if the character is alive (health must be greater than 0).
  If they are alive, we then check if the inventory contains any items.  
  If an item is available, it is removed from the inventory, and the character gains 10 HP.  
  */
  useItem(){
    if(this.health <= 0) {
      console.log('Your character is dead.')
      return;
    }
    if(this.inventory.length){
      const item = this.inventory.pop();
      this.health += 10;
      console.log(`You have used ${item}. You have gained 10hp`);
      if(this.health > 100) this.health = 100;
    } else {
      console.log('Your inventory is empty');
    }
  }

  /*
  The method below just logs a random scenario your character may find themselves in. 
  */
  secretAction() {
    if(this.health <= 0) {
      console.log('Your character is dead.')
      return;
    }
    const outcomes = [
      "discovered a hidden passage!",
      "accidentally stepped on a banana peel!",
      "found an ancient relic buried underground!",
      "heard an ominous whisper...",
      "got teleported to another dimension for 3 seconds!",
      "tripped over a tiny rock and dramatically fell!",
      "saw a pigeon wearing a tiny wizard hat.",
      "discovered that their shadow is moving independently...",
      "met a talking frog who gave cryptic life advice.",
      "found a sock that doesn’t belong to them.",
      "picked up a glowing rock... it immediately stopped glowing.",
      "got challenged to a dance battle by a ghost!",
      "sneezed so hard they momentarily lost gravity.",
      "received a mysterious note that says 'RUN'.",
      "accidentally summoned a swarm of sentient gummy bears!",
      "stared at the moon for too long and it winked back.",
      "stepped into a puddle... but the puddle whispered 'finally'.",
      "felt an intense urge to do jazz hands for no reason.",
      "discovered a chest filled with expired coupons."
    ];
  
    const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    console.log(`${this.name} ${outcome}`);
  }  


/*
  This method allows the character to explore, triggering random events.  
  The character may take damage, find an item, regain a small amount of health,  
  or encounter nothing at all. If their health reaches 0, they die.
*/
  explore(){
    if(this.health <= 0) {
      console.log('Your character is dead.')
      return;
    }
    let flag = false;
    const damageRoll = Math.floor(Math.random() * 4);
    const collectableRoll = Math.floor(Math.random() * 4);
    const healthRoll = Math.floor(Math.random() * 4);

    if(damageRoll === 3){
      flag = true;
      this.health -= 10;
      console.log('You took 10 damage');
      if(this.health <= 0){
        console.log("Your character has died");
      }
    }
    this.secretAction();
    if(collectableRoll === 3){
      flag = true;
      const randomIndex = Math.floor(Math.random() * Person.#items.length);
      this.inventory.push(Person.#items[randomIndex]);
      console.log(`You've received a ${Person.#items[randomIndex]}`);
    }
    if(healthRoll === 3){
      flag = true;
      this.health += 1;
      console.log('You have gained 1hp')
    }

    if(flag === false){
      console.log('You have encountered nothing this adventure')
    }
  }

  /*
  The allPeople array keeps track of all instances created by this function
  the method below allows us to view this array
  */
  static listPeople(){
    return [...Person.#allPeople]
  }

  /*
  This method searches through all existing Person instances and returns  
  the one that matches the given name. If no match is found, it returns  
  a message indicating that no person was found.
  */
  static findPerson(name){
    const foundPerson = [...Person.#allPeople].find((person) => person.name === name)
    return foundPerson || 'No person found.';
  }
}

module.exports = {
  Quadrilateral,
  Rectangle,
  Square,
  Person,
};
