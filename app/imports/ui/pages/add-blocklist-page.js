import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

/* eslint-disable object-shorthand, no-unused-vars */

AutoForm.hooks({
  Add_Blocklist_Form: {
    before: {
      insert: function (doc) {
        doc.blocklist_id = FlowRouter.getParam('_blocklist_id');
        return doc;
      }
    },
    onSuccess: function onSuccess(formType, result) {
      FlowRouter.go('List_Blocklist_Page');
    }
  },
});

Template.Add_Blocklist_Page.events({
  'click .cancel': function () {
    history.back();
  },
});

Template.Add_Blocklist_Page.onDestroyed(function () {
  AutoForm.resetForm('Add_Blocklist_Form');
});