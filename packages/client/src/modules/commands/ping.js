const ping = require('net-ping');
const _ = require('lodash');
const validate = require('../../../../core/validation/validate');

// Default net-ping options.
const defaultOptions = {
  networkProtocol: ping.NetworkProtocol.IPv4,
  packetSize: 16,
  retries: 1,
  sessionId: (process.pid % 65535),
  timeout: 2000,
  ttl: 128
};

module.exports = class Ping {
  constructor(target, options = {}) {
    this.options = _.defaults(options, defaultOptions);
    this.target = target;

    if (this.options.networkProtocol === ping.NetworkProtocol.IPv4) {
      validate.string.isNetworkAddress('ipv4', target);
    }

    if (this.options.networkProtocol === ping.NetworkProtocol.IPv6) {
      validate.string.isNetworkAddress('ipv6', target);
    }
  }

  static get NetworkProtocol() {
    return ping.NetworkProtocol;
  }

  getSession() {
    return ping.createSession(this.options);
  }

  async execute() {
    return new Promise((res, rej) => {
      const session = this.getSession();

      session.pingHost(this.target, (error, target, sent, rcvd) => {
        const ms = rcvd - sent;
        if (error) {
          rej({ target, error });
          session.close();
        }
        else {
          res({ target, ms });
          session.close();
        }
      });
    });
  }
}