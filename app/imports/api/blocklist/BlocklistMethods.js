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
    'blocklists.isNameAvailable': function (name) {
        check(name, String);

        return BlocklistCollection.find({name}).count() == 0;
    }

});

