const Ping = require('./modules/commands/ping');
const TraceRoute = require('./modules/commands/traceroute');

/*
const ping = new Ping('216.58.193.174');
const pingPromse = ping.execute()
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
*/

const tr = new TraceRoute('192.168.1.254');
const tracePromise = tr.execute()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));