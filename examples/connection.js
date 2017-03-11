'use strict';

const Memcached = require('./lib/memcached.js');

let cnt = 0;

const increaseConnection = () => {
  console.log(`increate connection: ${++cnt}`);
  const client = new Memcached({
    host: 'localhost',
    port: 11211,
    autoreconnect: true
  });
  const str = "𠮷野屋で𩸽\r\n頼んで𠮟られる😭";
  client.connect();
  // client.on('close', () => console.log('client close'));
  client.on('reconnect', () => console.log('client reconnected'));
  client.on('connect', () => {
    console.log('loop connected');
    client.set('foo', `1${str}`, 0, 100)
      .then(() => client.set('bar', `2${str}`, 0, 100))
      .then(() => client.gets('foo', 'bar'))
      .then((data) => console.log(data));
  });
};

setInterval(increaseConnection, 1000);
