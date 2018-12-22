const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // if connection to redis is lost keep trying to connect every 1000 milisecond
});
const sub = redisClient.duplicate(); // watch redis every time there's a new value added

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
    // every time a new value shows up on redis
    // calculate a new fibonacci value
    // insert value to a hash of value (hset)
    // the key will be second param (message)
    // the value will be third param
  redisClient.hset("values", message, fib(parseInt(message)));
});

// every time someone insert value to redis 
// get that value
// calculate the fib value for it
// give fib value back to redis instance
sub.subscribe("insert");