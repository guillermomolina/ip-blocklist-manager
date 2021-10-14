import Tabular from "meteor/aldeed:tabular";
import { Template } from 'meteor/templating';
import { IpAddressCollection } from './IpAddressCollection';
import { FlowRouter } from 'meteor/kadira:flow-router';


export const IpAddressTable = new Tabular.Table({
    name: "IpAddressTable",
    collection: IpAddressCollection,
    buttonContainer: '.col-sm-6:eq(0)',
    buttons: [
        {
            text: '<i class="fa fa-plus" aria-hidden="true"></i> New',
            className: 'btn btn-warning',
            action: function (e, dt, node, config) {
                if (Meteor.isClient) {
                    const blocklist_id = FlowRouter.getParam('_blocklist_id')
                    FlowRouter.go('Add_IpAddress_Page', { _blocklist_id: blocklist_id });
                }
            }
        },
        {
            text: '<i class="fa fa-upload" aria-hidden="true"></i> Upload',
            className: 'btn btn-warning',
            action: function (e, dt, node, config) {
                if (Meteor.isClient) {
                    const blocklist_id = FlowRouter.getParam('_blocklist_id')
                    FlowRouter.go('Upload_IpAddress_Page', { _blocklist_id: blocklist_id });
                }
            }
        }
    ],
    columns: [
        { data: "address", title: "Address" },
        {
            data: "actions",
            title: "Actions",
            tmpl() {
                return Meteor.isClient && Template.List_IpAddress_Actions_Cell;
            }
        }
    ],
    extraFields: ['blocklist_id']
});