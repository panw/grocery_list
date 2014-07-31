Items = new Meteor.Collection('items');

if(Meteor.isClient){

  Template.groceryList.events({
    'click li' : function(event, template){
      var listItem = event.currentTarget; // get the list item being clicked on
      $('#'+listItem.id).hide(); // hide li with matching id

      // update check attribute for the item in the database
      Items.update(listItem.id, { $set : {checked:true} }, function(error){
        // if error occurs print it out
        if(error){
          console.log(error.reason);
        }
      });
    }
  });

  Template.groceryList.helpers({
    items: function() {
      return Items.find();
    }
  });
}

if(Meteor.isServer){
  if (Items.find().count() === 0) {
    Items.insert({ name: "Baguette", checked: false });
    Items.insert({ name: "Butter", checked: false });
    Items.insert({ name: "Jam", checked: false });
    Items.insert({ name: "Coconut", checked: false });
  }
}
