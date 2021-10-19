import { BlocklistCollection } from './BlocklistCollection';
import SimpleSchema from "simpl-schema";
SimpleSchema.extendOptions(['autoform']);

export const RegEx = {
  Name: new RegExp("^[a-zA-Z0-9-_]+$")
};
export const BlocklistSchema = new SimpleSchema({
  name: {
    label: 'Name',
    type: String,
    regEx: RegEx.Name,
    max: 50,
    index: true,
    autoform: {
      placeholder: 'List_Name',
    },
    custom() {
      if (Meteor.isClient) {
        Meteor.call("blocklists.isNameAvailable", this.value, (error, result) => {
          if (!result) {
            this.validationContext.addValidationErrors([{
              name: "Name",
              type: "notUnique"
            }]);
          }
        });
      }
    }
  },
  description: {
    label: 'Description',
    type: String,
    max: 1000,
    optional: true,
    autoform: {
      rows: 5,
    },
  },
}, { tracker: Tracker });

BlocklistCollection.attachSchema(BlocklistSchema);

/*
       custom: function() { //Custom method could be used to do a server side check,
  //like below.
//Here we’re making sure that this field is having a value and we want it to be
//validated on the client side only.
           if (Meteor.isClient && this.isSet) {
               console.log("checking unique email");
               Meteor.call("isEmailExisting", this.value, function (error, result) {
                   if (result) {
                       console.log("Found duplicate email");
                       UserProfile.simpleSchema().namedContext("userProfileForm")
.addInvalidKeys([{name: "email", type: "duplicateEmail"}]);
                   }
               });
           }
       }
   },
   */