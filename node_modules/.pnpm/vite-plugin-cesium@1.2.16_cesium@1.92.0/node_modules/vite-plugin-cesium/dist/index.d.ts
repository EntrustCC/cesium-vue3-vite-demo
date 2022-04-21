import { Plugin } from 'vite';
interface VitePluginCesiumOptions {
    /**
     * rebuild cesium library, default: false
     */
    rebuildCesium?: boolean;
    devMinifyCesium?: boolean;
}
declare function vitePluginCesium(options?: VitePluginCesiumOptions): Plugin;
export default vitePluginCesium;
