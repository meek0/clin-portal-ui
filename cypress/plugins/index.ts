/* eslint-disable no-console */
/// <reference types="Cypress" />

require('dotenv').config();

const { rmdir } = require('fs');

module.exports = (on: Cypress.PluginEvents, config: Cypress.ConfigOptions) => {
  on('task', {
    deleteFolder(folderName) {
      console.log('deleting folder %s', folderName);

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err: any) => {
          if (err) {
            console.error(err);
            return reject(err);
          }
          resolve(null);
        });
      });
    },
  });

  if (!config.env) {
    config.env = {};
  }

  config.env.username_DG_CHUSJ_CUSM_CHUS = process.env.CYPRESS_USERNAME_DG_CHUSJ_CUSM_CHUS;
  config.env.username_G_CHUSJ_CUSM_CHUS  = process.env.CYPRESS_USERNAME_G_CHUSJ_CUSM_CHUS;
  config.env.username_DG_CHUSJ           = process.env.CYPRESS_USERNAME_DG_CHUSJ;
  config.env.username_G_CHUSJ            = process.env.CYPRESS_USERNAME_G_CHUSJ;
  config.env.username_G_CUSM             = process.env.CYPRESS_USERNAME_G_CUSM;
  config.env.username_DG_CHUS            = process.env.CYPRESS_USERNAME_DG_CHUS;
  config.env.username_G_CHUS             = process.env.CYPRESS_USERNAME_G_CHUS;
  config.env.password                    = process.env.CYPRESS_PASSWORD;

  config.env.presc_EP_CHUSJ_LDM_CHUSJ = process.env.CYPRESS_PRESC_EP_CHUSJ_LDM_CHUSJ;
  config.env.presc_EP_CUSM_LDM_CHUSJ  = process.env.CYPRESS_PRESC_EP_CUSM_LDM_CHUSJ;
  config.env.presc_EP_CUSM_LDM_CUSM   = process.env.CYPRESS_PRESC_EP_CUSM_LDM_CUSM;
  config.env.presc_EP_CHUS_LDM_CHUS   = process.env.CYPRESS_PRESC_EP_CHUS_LDM_CHUS;

  return config;
};

export {};