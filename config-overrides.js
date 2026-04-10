module.exports = {
  webpack: function (config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "buffer": require.resolve("buffer"),
      "stream": require.resolve("stream-browserify"),
      "assert": require.resolve("assert")
    };
    return config;
  }
};
