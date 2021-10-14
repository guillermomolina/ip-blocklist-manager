import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.List_Blocklist_Page.onCreated(function() {
  this.subscribe('ipAddresses');
  this.blocklistCount = new ReactiveVar();

  Meteor.call('blocklists.count', (err, res) => {
    this.blocklistCount.set(res);
  });
});

Template.List_Blocklist_Page.helpers({
  blocklistCount: function() {
    return Template.instance().blocklistCount.get();
  }
});


Template.List_Blocklist_Actions_Cell.helpers({
  canShow: function () {
    return !!Meteor.user();
  },
  onError: function () {
    return function (error) {
      console.log('Error', error);
    };
  },
  onSuccess: function () {
    return function (result) {
      console.log('Deleted');
    };
  },
  beforeRemove: function () {
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        const self = this;
        Meteor.call('ipAddresses.removeFromBlocklist', doc._id, function (err, res) {
          if (!err) self.remove();
        });
      }
    };
  }
});

Template.List_Blocklist_Actions_Cell.events({
  'click .show': function () {
    FlowRouter.go('Show_Blocklist_Page', { _blocklist_id: this._id });
  },
  'click .edit': function () {
    FlowRouter.go('Edit_Blocklist_Page', { _blocklist_id: this._id });
  }
});

