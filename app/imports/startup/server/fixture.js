import { _ } from 'meteor/underscore';
import { BlocklistCollection } from '../../api/blocklist/BlocklistCollection.js';
import { IpAddressCollection } from '../../api/ipaddress/IpAddressCollection';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIp() {
  return [
    getRandomInt(1,254),
    getRandomInt(1,254),
    getRandomInt(1,254),
    getRandomInt(1,254)
  ].join('.')
}

if (BlocklistCollection.find().count() === 0) {
  for(list=1; list <= 12; list++) {
    const list_name = `List ${list}`
    blocklist_id = BlocklistCollection.insert({ 
      name:  list_name,
      description: `This is list ${list_name} and it's awesome`
    });
    const num_ips =  getRandomInt(10,50);
    console.log(`Generating ${num_ips} IP's for ${list_name}`)
    for(i=0; i < getRandomInt(10,50); i++) {
      IpAddressCollection.insert({ 
        address: getRandomIp(),
        blocklist_id: blocklist_id
      });
    }
  };
}

