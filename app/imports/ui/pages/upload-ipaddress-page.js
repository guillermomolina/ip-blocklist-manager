import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { RegEx } from '../../api/ipaddress/IpAddressSchema';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection';

/* eslint-disable object-shorthand, no-unused-vars */

Template.Upload_IpAddress_Page.onCreated(function () {
  this.subscribe('blocklists');
  this.ipList = new ReactiveVar([]);
  this.fileStatus = new ReactiveVar([]);
});

Template.Upload_IpAddress_Page.helpers({
  getFileText: function () {
    return Template.instance().ipList.get().join('\r\n');
  },
  getFileStatus: function () {
    return Template.instance().fileStatus.get();
  },
});

function checkText(text, template) {
  const splitted = text.trim().split('\n');
  const ipList = []
  const errors = [];
  let line = 0;
  splitted.forEach((data) => {
    const address = data.trim()
    line++;
    if (!RegEx.CIDR.test(address)) {
      errors.push(`Invalid IP: "${address}" at line: ${line}`);
    }
    ipList.push(address);
  });
  template.fileStatus.set(errors);
  return ipList;
}

Template.Upload_IpAddress_Page.events({
  'change #uploadInput': function (event, template) {
    let oFile = event.target.files[0];
    document.getElementById("fileName").value = oFile.name;

    const reader = new FileReader();
    reader.onload = function () {
      template.ipList.set(checkText(this.result, template));
    };
    reader.readAsText(oFile);
  },
  'change #uploadedText': function (event, template) {
    template.ipList.set(checkText(event.target.value, template));
  },
  'click .add': function (event, template) {
    const blocklist_id = FlowRouter.getParam('_blocklist_id');
    const blocklist = BlocklistCollection.findOne(blocklist_id);
    if (blocklist) {
      Meteor.call('ipAddresses.insertMany', blocklist_id, template.ipList.get(), function (err, res) {
        if (err && err.error != 'ipAddresses.insertMany.address-exists')
          template.fileStatus.set(err.reason.split('\n'));
        else
          history.back();
      });
    }
    else {
      template.fileStatus.set([`There is no blocklist with id "${blocklist_id}"`]);
    }
  },
  'click .replace': function (event, template) {
    const blocklist_id = FlowRouter.getParam('_blocklist_id');
    const blocklist = BlocklistCollection.findOne(blocklist_id);
    if (blocklist) {
      if (confirm(`You are about to delete ALL addresses from list "${blocklist.name}" then replace it with this addresses, continue?`)) {
        Meteor.call('ipAddresses.replace', blocklist_id, template.ipList.get(), function (err, res) {
          if (!err)
            history.back();
          else
            template.fileStatus.set(err.reason.split('\n'));
        });
      }
    }
    else {
      template.fileStatus.set([`There is no blocklist with id "${blocklist_id}"`]);
    }
  }
});
