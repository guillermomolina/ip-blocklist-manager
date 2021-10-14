import { Meteor } from 'meteor/meteor';
import { version } from '../../../package.json'

Meteor.methods({
    'server.getVersion': function () {
        return version;
    },
});