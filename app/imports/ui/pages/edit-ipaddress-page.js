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

Template.Edit_IpAddress_Page.onCreated(function () {
  this.subscribe('ipAddresses');
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
  'click .delete': function (event, template) {
    const ipAddress_id = FlowRouter.getParam('_ipAddress_id')
    const ipAddress = IpAddressCollection.findOne(ipAddress_id);
    if (ipAddress) {
      if (confirm('Really delete "' + ipAddress.address + '"?')) {
        Meteor.call('ipAddresses.remove', ipAddress._id, function (err, res) {
          if (err)
            alert(err);
          else
            history.back();
        });
      }
    }
  }
});
