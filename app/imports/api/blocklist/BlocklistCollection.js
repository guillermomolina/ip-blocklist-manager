import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { IpAddressCollection } from '../ipaddress/IpAddressCollection';
import 'meteor/dburles:collection-helpers';

/* eslint-disable object-shorthand */


export const BlocklistCollection = new Mongo.Collection('blocklists');

BlocklistCollection.helpers({
    addresses: function () {
        return IpAddressCollection.find({ blocklist_id: this._id }, { fields: { 'address': 1 } });
    },
    addressesCount: function () {
        return IpAddressCollection.find({ blocklist_id: this._id }).count();
    }
});

if (Meteor.isServer) {
    Meteor.publish('blocklists', function () {
        return BlocklistCollection.find();
    });
}
