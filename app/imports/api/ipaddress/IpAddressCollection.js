import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

/* eslint-disable object-shorthand */

export const IpAddressCollection = new Mongo.Collection('ipAddresses');

if (Meteor.isServer) {
  Meteor.publish('ipAddresses', function () {
    return IpAddressCollection.find();
  });
}
