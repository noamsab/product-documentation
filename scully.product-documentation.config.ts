import { ScullyConfig, setPluginConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer';
import { copyToClipboardPlugin } from './scully/plugins/copyToClipboard';
import { replaceImgSrc } from './scully/plugins/replaceImgSrc';
import 'prismjs/components/prism-ruby.min.js';
import { getSitemapPlugin } from './scully/plugins/sitemap';

const categories = [
    'streaming',
    'server-protection',
    'storage',
    'hosting',
    'dns',
    'cloud',
    'cdn',
    'account-settings',
    'waap',
    'edge-ai',
    'reseller-support',
];
import { setCustomUrls } from './scully/plugins/custom-url/custom-url';
import { moveContentFiles, updateAlgolia } from './scully/plugins/registerPlugins';

const SitemapPlugin = getSitemapPlugin();

const defaultPostRenderers = [copyToClipboardPlugin, replaceImgSrc];
setPluginConfig('md', { enableSyntaxHighlighting: true });
setPluginConfig(moveContentFiles, {
    root: 'docs',
    categories: [
        'account-settings',
        'cdn',
        'cloud',
        'dns',
        'hosting',
        'storage',
        'streaming-platform',
        'ddos-protection',
        'waap',
        'edge-ai',
        'reseller-support',
    ],
});
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://gcore.com/docs',
    sitemapFilename: 'sitemap.xml',
    ignoredRoutes: [],
    ignoredRoutesPattern: [/\/metadata$/, /___UNPUBLISHED___/],
    merge: false,
    trailingSlash: false,
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
});
setPluginConfig(setCustomUrls, {});
setPluginConfig(updateAlgolia, {});

export const config: ScullyConfig = {
    projectRoot: './src',
    projectName: 'product-documentation',
    outDir: './dist/static',
    distFolder: './dist/product-documentation',
    puppeteerLaunchOptions:
        process.env.BUILD_ENV === 'develop'
            ? undefined
            : {
                  executablePath: '/usr/bin/chromium-browser',
                  args: ['--no-sandbox'],
              },
    routes: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '/:title': {
            type: 'contentFolder',
            postRenderers: defaultPostRenderers,
            title: {
                folder: `./documentation`,
            },
        },
    },
};
