import { Picker } from 'meteor/meteorhacks:picker';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection';
import { IpAddressCollection } from '../../api/ipaddress/IpAddressCollection';

Picker.route('/:_blocklist_name/list.txt', function (params, request, response, next) {
  const blocklist = BlocklistCollection.findOne({ name: params._blocklist_name });
  if(blocklist) {
    const ipAddressList = IpAddressCollection.find({ blocklist_id: blocklist._id }).fetch().map(o => o.address);

    response.setHeader('Content-Type', 'text/plain');
    response.statusCode = 200;
    response.end(ipAddressList.join('\r\n'));  
  }
  else {
    response.statusCode = 404;
    response.end('Not Found');
  }
});
