import { Meteor } from 'meteor/meteor';
import { BlocklistCollection } from './BlocklistCollection';
import { IpAddressCollection } from '../ipaddress/IpAddressCollection';
import 'meteor/dburles:collection-helpers';


Meteor.methods({
    'blocklists.count': function () {
        return BlocklistCollection.find().count();
    },
    'blocklists.remove': function (blocklist_id) {
        check(blocklist_id, String);

        IpAddressCollection.remove({ blocklist_id: blocklist_id });
        BlocklistCollection.remove(blocklist_id);
    },
    'blocklists.insert': function (blocklist) {
        BlocklistSchema.validate(blocklist);

        if (BlocklistCollection.find({name: blocklist.name}).count() != 0) {
            throw new Meteor.Error('blocklists.insert.blocklist-exists',
                `The list "${blocklist.name}" is already present. Choose another name`);
        }

        delete blocklist._id;
        return BlocklistCollection.insert(blocklist);
    },
    'blocklists.isNameAvailable': function (name) {
        check(name, String);

        return BlocklistCollection.find({name}).count() == 0;
    }

});

