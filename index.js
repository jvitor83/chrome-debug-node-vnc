///@ts-check

(async () => {

    // THERE IS NO NEED TO USE CHROMIUM (PUPPETEER BUILT-IN CHROME)
    // The Chrome is already inside the docker and works as normal user browser
    const useExistingBrowserInstance = true;
    if (useExistingBrowserInstance) {

        const remoteDebuggingPort = process.env.REMOTE_DEBUGGING_PORT || 9222;
        const remoteDebuggingHostname = process.env.REMOTE_DEBUGGING_HOSTNAME || '127.0.0.1';

        const puppeteer = require('puppeteer');
        const browser = await puppeteer.connect({
            browserURL: `http://${remoteDebuggingHostname}:${remoteDebuggingPort}`
        });
    
        await exec(browser);

    } else {

        /**
         * @type {puppeteer.PuppeteerExtra}
         */
        const puppeteer = require('puppeteer-extra');

        // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());

        // Add adblocker plugin to block all ads and trackers (saves bandwidth)
        // const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
        // puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

        puppeteer.launch({
            headless: false,
            ignoreHTTPSErrors: true,
            // userDataDir: './',
            ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
            args: [
                //'--disable-web-security', 
                '--proxy-bypass-list=*',
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--window-position=0,0',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--enable-features=NetworkService',
                "--disable-features=IsolateOrigins,site-per-process",
                '--blink-settings=imagesEnabled=true',
            ]
        }).then(async browser => {

            await exec(browser);

        });
    }

})();

/**
 * 
 * @param {puppeteer.Browser} browser 
 */
async function exec(browser) {
    let page = null;
    let pages = await browser.pages();
    if (pages.length == 0) {
        page = await browser.newPage();
    } else {
        page = pages[0];
    }
    
    await page.goto('https://github.com/jvitor83/chrome-debug-node-vnc');

    // wait opened
    await page.waitForTimeout(Math.pow(2, 31) - 1);
}

