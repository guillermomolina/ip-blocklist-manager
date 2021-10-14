import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection';

/* eslint-disable object-shorthand, no-unused-vars */

AutoForm.hooks({
  Edit_Blocklist_Form: {
    onSuccess: function onSuccess(formType, result) {
      history.back();
    },
  },
});

Template.Edit_Blocklist_Page.onCreated(function () {
  this.subscribe('blocklists');
});

Template.Edit_Blocklist_Page.helpers({
  getDoc() {
    return BlocklistCollection.findOne(FlowRouter.getParam('_blocklist_id'));
  },
});

Template.Edit_Blocklist_Page.events({
  'click .cancel': function () {
    history.back();
  },
  'click .delete': function (event, template) {
    const blocklist_id = FlowRouter.getParam('_blocklist_id')
    const blocklist = BlocklistCollection.findOne(blocklist_id);
    if (blocklist) {
      if (confirm('Really delete "' + blocklist.name + '"?')) {
        Meteor.call('blocklists.remove', blocklist._id, function (err, res) {
          if (err)
            alert(err);
          else
            FlowRouter.go('List_Blocklist_Page');
        });
      }
    }
  }
});
