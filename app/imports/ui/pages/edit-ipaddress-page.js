import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { IpAddressCollection } from '../../api/ipaddress/IpAddressCollection';

/* eslint-disable object-shorthand, no-unused-vars */

AutoForm.hooks({
  Edit_IpAddress_Form: {
    onSuccess: function onSuccess(formType, result) {
      history.back();
    },
  },
});

Template.Edit_IpAddress_Page.helpers({
  getDoc() {
    return IpAddressCollection.findOne(FlowRouter.getParam('_ipAddress_id'));
  },
});


Template.Edit_IpAddress_Page.events({
  'click .cancel': function () {
    history.back();
  },
});
