const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: (retries) => {
            if (retries > 10) {
                console.error('Max redis reconnection attempts reached. Exiting...');
                process.exit(1);
            }
            return Math.min(retries * 100, 3000);
        }
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
    // Don't exit here - let reconnectStrategy handle connection issues
});

// Connect and handle initial connection error
(async () => {
    try {
        await redisClient.connect();
        console.log('Successfully connected to Redis');
    } catch (err) {
        console.error('Failed to establish initial Redis connection:', err);
        process.exit(1);
    }
})();

module.exports = redisClient;
