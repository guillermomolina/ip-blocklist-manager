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

Template.Edit_Blocklist_Page.onCreated(function() {
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
});
