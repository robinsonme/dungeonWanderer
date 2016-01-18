Template.equippedTemplate.helpers({
  'equipped': function(){
    var characterEquipment = Equipment.findOne({});
    return characterEquipment;
  },
});

Template.equippedTemplate.onCreated(function() {
  var character = Characters.findOne({});
  Meteor.subscribe('equipment', character._id);
});
