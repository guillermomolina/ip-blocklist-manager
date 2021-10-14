import { Picker } from 'meteor/meteorhacks:picker';
import { IpAddressCollection } from '../../api/ipaddress/IpAddressCollection';

Picker.route('/:_blocklist_id/list', function (params, request, response, next) {
  const ipAddressList = IpAddressCollection.find({ blocklist_id: params._blocklist_id }).fetch().map(o => o.address);

  response.setHeader('Content-Type', 'text/plain');
  response.statusCode = 200;
  response.end(ipAddressList.join('\r\n'));
});
