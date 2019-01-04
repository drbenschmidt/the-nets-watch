const assert = require('assert');
const sinon = require('sinon');
const Ping = require('../../src/modules/commands/ping');
const { doesNotThrow, doesThrow } = require('../../../core/utils/test-helpers');

const sandbox = sinon.createSandbox();

describe('Ping', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('#constructor()', () => {
    it('should accept an IPv4 address', () => {
      const session1 = doesNotThrow(() => new Ping('1.1.1.1'));
      const session2 = doesThrow(() => new Ping('1.1.1.1.1.1'));

      assert.ok(session1, 'Good IPv4 did not throw.');
      assert.ok(session2, 'Bad IPv4 did throw.');
    });

    it('should accept an IPv6 address', () => {
      const session1 = doesNotThrow(() => new Ping('2001:0:ce49:7601:e866:efff:62c3:fffe', { networkProtocol: Ping.NetworkProtocol.IPv6 }));
      const session2 = doesThrow(() => new Ping('2001:0:ce49:7601:e866:efff:62c3:fffe:xxxx', { networkProtocol: Ping.NetworkProtocol.IPv6 }));

      assert.ok(session1, 'Good IPv6 did not throw.');
      assert.ok(session2, 'Bad IPv6 did throw.');
    });
  });

  describe('#execute()', () => {
    it('should return a promise', () => {
      const ping = new Ping('1.1.1.1');
      sandbox.stub(ping, 'getSession').returns({ pingHost: () => null });
      const promise = ping.execute();
      
      assert.ok(promise instanceof Promise);
    });

    it('should return successful result of session.pingHost()', () => {
      const ping = new Ping('1.1.1.1');
      sandbox.stub(ping, 'getSession')
        .returns({
          pingHost: (target, cb) => {
            cb(null, target, 100, 130);
          },
          close: () => null
        });
      
      return ping.execute()
        .then((resp) => {
          assert.ok(resp.ms === 30);
        });
    });

    it('should return erroneous result of session.pingHost()', () => {
      const ping = new Ping('1.1.1.1');
      sandbox.stub(ping, 'getSession')
        .returns({
          pingHost: (target, cb) => {
            cb('error', target, 100, 130);
          },
          close: () => null
        });
      
      return ping.execute()
        .catch((resp) => {
          assert.ok(resp.error === 'error');
          assert.ok(resp.target === '1.1.1.1');
        });
    });
  });
});