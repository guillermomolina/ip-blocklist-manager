import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { IpAddressCollection } from './IpAddressCollection';
import { IpAddressSchema } from './IpAddressSchema';
import { BlocklistCollection } from '../blocklist/BlocklistCollection'

Meteor.methods({
    'ipAddresses.remove': function (ipAddress_id) {
        check(ipAddress_id, String);

        IpAddressCollection.remove(ipAddress_id);
    },
    'ipAddresses.removeFromBlocklist': function (blocklist_id) {
        check(blocklist_id, String);

        IpAddressCollection.remove({ blocklist_id: blocklist_id });
    },
    'ipAddresses.count': function (blocklist_id) {
        check(blocklist_id, String);

        return IpAddressCollection.find({ blocklist_id: blocklist_id }).count();
    },
    'ipAddresses.insert': function (ipAddress) {
        IpAddressSchema.validate(ipAddress);
        delete ipAddress._id;

        const blocklist = BlocklistCollection.findOne(ipAddress.blocklist_id);
        if (!blocklist) {
            throw new Meteor.Error('ipAddresses.insert.no-such-list',
                `There is no blocklist with ID "${ipAddress.blocklist_id}".`);
        }
        if (IpAddressCollection.find(ipAddress).count() != 0) {
            throw new Meteor.Error('ipAddresses.insert.address-exists',
                `The IP address "${ipAddress.address}" is already present in the list "${blocklist.name}".`);
        }

        return IpAddressCollection.insert(ipAddress);
    },
    'ipAddresses.insertMany': function (blocklist_id, addresses) {
        check(blocklist_id, String);
        check(addresses, Array);

        const errorList = [];
        let errorName = 'ipAddresses.insertMany.addresses-error'
        addresses.forEach((address) => {
            try {
                Meteor.call('ipAddresses.insert', { blocklist_id, address });
            }
            catch (error) {
                if (error.error == 'ipAddresses.insert.address-exists') {
                    errorName = 'ipAddresses.insertMany.address-exists'
                }
                errorList.push(error.reason);
            }
        });
        if (errorList.length > 0) {
            throw new Meteor.Error(errorName, errorList.join('\n'));
        }
    },
    'ipAddresses.replace': function (blocklist_id, addresses) {
        check(blocklist_id, String);
        check(addresses, Array);

        Meteor.call('ipAddresses.removeFromBlocklist', blocklist_id, function (err, res) {
            if (err)
                return err;
            return Meteor.call('ipAddresses.insertMany', blocklist_id, addresses);
        });
    },
});
