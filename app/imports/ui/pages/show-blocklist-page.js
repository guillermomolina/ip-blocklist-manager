import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection';

Template.Show_Blocklist_Form.onCreated(function () {
  this.subscribe('blocklists');
});


Template.Show_Blocklist_Form.helpers({
  canShow: function () {
    return !!Meteor.user();
  },
  getDoc() {
    return BlocklistCollection.findOne(FlowRouter.getParam('_blocklist_id'));
  },
  getId() {
    return FlowRouter.getParam('_blocklist_id');
  },
  onError: function () {
    return function (error) {
      console.log('Error', error);
    };
  },
  onSuccess: function () {
    return function (result) {
      console.log('Deleted');
      FlowRouter.go('List_Blocklist_Page');
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

Template.Show_Blocklist_Form.events({
  'click .edit': function () {
    FlowRouter.go('Edit_Blocklist_Page', { _blocklist_id: FlowRouter.getParam('_blocklist_id') });
  },
  'click .copyToClipboard': function (event) {
    event.target.blur();
    const link = window.location.protocol + "//" + window.location.host + FlowRouter.current().path + '/list';
    navigator.clipboard.writeText(link);
    console.log(`Copied ${link} to clipboard`);
  },
});


Template.List_IpAddress_Table.onCreated(function () {
  this.ipAddressesCount = new ReactiveVar();

  Meteor.call('ipAddresses.count', FlowRouter.getParam('_blocklist_id'), (err, res) => {
    this.ipAddressesCount.set(res);
  });
});

Template.List_IpAddress_Table.helpers({
  ipAddressesCount: function () {
    return Template.instance().ipAddressesCount.get();
  },
  selector() {
    return { blocklist_id: FlowRouter.getParam('_blocklist_id') };
  }
});

Template.List_IpAddress_Actions_Cell.helpers({
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
      if (confirm('Really delete "' + doc.address + '"?')) {
        this.remove();
      }
    };
  }
});

Template.List_IpAddress_Actions_Cell.events({
  'click .edit': function () {
    FlowRouter.go('Edit_IpAddress_Page', {
      _blocklist_id: this.blocklist_id,
      _ipAddress_id: this._id
    });
  }
});

