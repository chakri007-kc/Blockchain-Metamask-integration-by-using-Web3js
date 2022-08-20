const token = artifacts.require("token");

module.exports = function (deployer) {
  deployer.deploy(token);
};
