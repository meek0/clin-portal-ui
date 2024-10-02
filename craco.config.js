const { CracoAliasPlugin } = require('react-app-alias-ex');

// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
  webpack: {
    configure: {
      ignoreWarnings: [
        // Ignore source maps warnings (ferlab-ui source-map are not available)
        function ignoreSourceMapsLoaderWarnings(warning) {
          return (
            warning.module?.resource.includes('node_modules') &&
            warning.details?.includes('source-map-loader')
          );
        },
        // Ignore css conflict order warnings (this is not relevant whe using CSS modules)
        function ignoreCssConflictOrder(warning) {
          return warning.message?.includes('mini-css-extract-plugin');
        },
      ],
    },
  },
};
