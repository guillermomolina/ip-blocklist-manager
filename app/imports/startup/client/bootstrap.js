import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'       // optional, default theme
import 'bootstrap/dist/css/bootstrap-theme.css' // optional, default theme
import '@fortawesome/fontawesome-free/js/all.js' // optional, is using FA5

import { AutoFormThemeBootstrap3 } from 'meteor/communitypackages:autoform-bootstrap3/static'
AutoFormThemeBootstrap3.load()

import { $ } from 'meteor/jquery';

// Bootstrap Theme
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

// Buttons Core
import dataTableButtons from 'datatables.net-buttons-bs';
dataTableButtons(window, $);

// Import whichever buttons you are using
import columnVisibilityButton from 'datatables.net-buttons/js/buttons.colVis.js';
columnVisibilityButton(window, $);

import html5ExportButtons from 'datatables.net-buttons/js/buttons.html5.js';
html5ExportButtons(window, $);

import flashExportButtons from 'datatables.net-buttons/js/buttons.flash.js';
flashExportButtons(window, $);

import printButton from 'datatables.net-buttons/js/buttons.print.js';
printButton(window, $);
