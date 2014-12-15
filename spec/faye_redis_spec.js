var RedisEngine = require('../faye-redis')
var Redis = require('redis');

JS.Test.describe("Redis engine", function() { with(this) {
  before(function() {
    this.engineOpts = {
      type: RedisEngine,
      factory: function (opts) { return Redis.createClient(opts); },
      namespace: new Date().getTime().toString()
    };
  })

  after(function(resume) { with(this) {
    engine.disconnect()
    var redis = Redis.createClient(6379, 'localhost', {no_ready_check: true})
    redis.auth(engineOpts.password)
    redis.flushall(function() {
      redis.end()
      resume()
    })
  }})

  itShouldBehaveLike("faye engine")

  describe("distribution", function() { with(this) {
    itShouldBehaveLike("distributed engine")
  }})
}})
