module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  setupFiles: ["./src/config/test.config.js"],
};
