import { Meteor } from 'meteor/meteor';
import { BlocklistCollection } from './BlocklistCollection';
import 'meteor/dburles:collection-helpers';


Meteor.methods({
    'blocklists.count': function () {
        return BlocklistCollection.find().count();
    }
});

