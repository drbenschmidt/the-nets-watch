const ping = require('net-ping');

// Default net-ping options.
const defaultOptions = {
  networkProtocol: ping.NetworkProtocol.IPv4,
  packetSize: 16,
  retries: 1,
  sessionId: (process.pid % 65535),
  timeout: 2000,
  ttl: 128
};

module.exports = class TraceRoute {
  constructor(target) {
    this.target = target;
  }

  async execute() {
    return new Promise((res, rej) => {
      const results = [];
      const session = ping.createSession();

      const completedCb = (error, target) => {
        if (error) {
          rej({ error, results });
          session.close();
        }

        res({ target, results });
        session.close();
      };

      const feedCb = (error, target, ttl, sent, rcvd) => {
        const ms = rcvd - sent;
        if (error) {
          if (error instanceof ping.TimeExceededError) {
            results.push({target, error: error.source, ttl, ms });
          } else {
            results.push({target, error: error.toString(), ttl, ms });
          }
          return;
        }

        results.push({target, ttl, ms });
      };

      session.traceRoute(this.target, 10, feedCb, completedCb);
    });
  }
}