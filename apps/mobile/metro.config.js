// Expo detects the npm workspace automatically (watchFolders, nodeModulesPaths).
// Workspace packages are TypeScript compiled with NodeNext, so their relative imports
// use the `.js` extension; resolve them to the `.ts` source outside node_modules.
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const fromWorkspaceSource = !context.originModulePath.includes('/node_modules/');
  if (fromWorkspaceSource && /^\.{1,2}\/.+\.js$/.test(moduleName)) {
    try {
      return context.resolveRequest(context, moduleName.slice(0, -3), platform);
    } catch {
      // Fall through: a real .js file with that name.
    }
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
