import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// The Header menu does not use dropdown menus, but most menus do.
// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Footer.onCreated(function () {
    this.version = new ReactiveVar();
    const self = this
    Meteor.call('server.getVersion', function (err, res) {
        self.version.set(res);
    });
});

Template.Footer.helpers({
    getVersion: function () {
        return Template.instance().version.get();
    }
});
