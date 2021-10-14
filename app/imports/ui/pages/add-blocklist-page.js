import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection';

/* eslint-disable object-shorthand, no-unused-vars */

/**
 * After successful addition of a new BlocklistCollection document, go to List page.
 * See: https://github.com/aldeed/meteor-autoform#callbackshooks
 */
AutoForm.hooks({
  Add_Blocklist_Form: {
    /**
     * After successful form submission, go to List_Blocklist_Page.
     * @param formType The form.
     * @param result The result of form submission.
     */
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