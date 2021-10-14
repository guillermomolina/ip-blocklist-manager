import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
  name: 'List_Blocklist_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'List_Blocklist_Page' });
  },
});

FlowRouter.route('/add', {
  name: 'Add_Blocklist_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_Blocklist_Page' });
  },
});

FlowRouter.route('/:_blocklist_id/edit/:_ipAddress_id', {
  name: 'Edit_IpAddress_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_IpAddress_Page' });
  },
});

FlowRouter.route('/:_blocklist_id/edit', {
  name: 'Edit_Blocklist_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Edit_Blocklist_Page' });
  },
});

FlowRouter.route('/:_blocklist_id/add', {
  name: 'Add_IpAddress_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Add_IpAddress_Page' });
  },
});

FlowRouter.route('/:_blocklist_id/upload', {
  name: 'Upload_IpAddress_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Upload_IpAddress_Page' });
  },
});

FlowRouter.route('/:_blocklist_id', {
  name: 'Show_Blocklist_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Show_Blocklist_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};
