import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.List_Blocklist_Page.onCreated(function () {
  this.subscribe('ipAddresses');
  this.blocklistCount = new ReactiveVar();

  Meteor.call('blocklists.count', (err, res) => {
    this.blocklistCount.set(res);
  });
});

Template.List_Blocklist_Page.helpers({
  blocklistCount: function () {
    return Template.instance().blocklistCount.get();
  }
});


Template.List_Blocklist_Actions_Cell.helpers({
  canShow: function () {
    return !!Meteor.user();
  }
});

Template.List_Blocklist_Actions_Cell.events({
  'click .show': function () {
    FlowRouter.go('Show_Blocklist_Page', { _blocklist_id: this._id });
  },
  'click .edit': function () {
    FlowRouter.go('Edit_Blocklist_Page', { _blocklist_id: this._id });
  },
  'click .delete': function (event, template) {
    if (confirm('Really delete "' + this.name + '"?')) {
      Meteor.call('blocklists.remove', this._id, function (err, res) {
        if (err)
          alert(err);
      });
    }
  }
});

