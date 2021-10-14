import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

/* eslint-disable object-shorthand, no-unused-vars */

AutoForm.hooks({
  Add_IpAddress_Form: {
    before: {
      insert: function (doc) {
        doc.blocklist_id = FlowRouter.getParam('_blocklist_id');
        return doc;
      }
    },
    /**
     * After successful form submission, go to List_IpAddress_Page.
     * @param formType The form.
     * @param result The result of form submission.
     */
    onSuccess: function onSuccess(formType, result) {
      const blocklist_id = FlowRouter.getParam('_blocklist_id');
      FlowRouter.go('Show_Blocklist_Page', { _blocklist_id: blocklist_id });
    },
  },
});

Template.Add_IpAddress_Page.events({
  'click .cancel': function () {
    history.back();
  },
});

Template.Add_IpAddress_Page.onDestroyed(function () {
  AutoForm.resetForm('Add_IpAddress_Form');
});