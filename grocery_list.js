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
    },

    'click #add-button' : function(event, template) {
      // prevent button's default action
      event.preventDefault();

      // get the new item's name
      var newItem = $("#new-item").val();

      // add new item to the database
      Items.insert({ name:newItem, checked:false });

      // clear input field once we have stored the data
      $("#new-item").val("");
    }
  });

  Template.groceryList.helpers({
    items: function() {
      return Items.find({checked:false});
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
