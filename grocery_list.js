Items = new Meteor.Collection('items');

if(Meteor.isClient){
  Template.groceryList.helpers({
    items: function() {
      return Items.find();
    }
  });
}

if(Meteor.isServer){
  if (Items.find().count() === 0) {
    Items.insert({ name: "Baguette"});
    Items.insert({ name: "Butter"});
    Items.insert({ name: "Jam"});
    Items.insert({ name: "Coconut"});
  }
}
