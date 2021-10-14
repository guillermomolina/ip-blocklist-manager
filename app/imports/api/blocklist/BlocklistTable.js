import Tabular from "meteor/aldeed:tabular";
import { Template } from 'meteor/templating';
import { BlocklistCollection } from './BlocklistCollection.js';
import { FlowRouter } from 'meteor/kadira:flow-router';


export const BlocklistTable = new Tabular.Table({
    name: "BlocklistTable",
    collection: BlocklistCollection,
    buttonContainer: '.col-sm-6:eq(0)',
    buttons: [
        {
            text: '<i class="fa fa-plus" aria-hidden="true"></i> New',
            className: 'btn btn-warning',
            action: function (e, dt, node, config) {
                if (Meteor.isClient) {
                    FlowRouter.go('Add_Blocklist_Page');
                }
            }
        },
    ],
    columns: [
        { data: "name", title: "Name" },
        { data: "description", title: "Description" },
        { data: "addressesCount()", title: "IP Addresses Count" },
        {
            data: "actions",
            title: "Actions",
            tmpl() {
                return Meteor.isClient && Template.List_Blocklist_Actions_Cell;
            }
        }
    ]
});
