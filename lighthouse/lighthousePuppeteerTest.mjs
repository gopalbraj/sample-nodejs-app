
import { Launcher, launch } from 'chrome-launcher';
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import config from 'lighthouse/core/config/desktop-config.js';
import { generateReport } from 'lighthouse';
import request from 'request';
import util from 'util';
import fs from 'fs';
const sleep = seconds =>
    new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));
let scoresBelowBaseline = false;

import assert from 'assert';


const app_name = "Blueprint";

(async () => {

    const homeURL = 'https://test.com/ngd/blueprint/smartphones';
    const subjectsURL = 'https://test.com/ngd/blueprint/smartphones/samsung';

    const opts = {
        //chromeFlags: ['--headless'],
        logLevel: 'info',
        output: 'json',
        disableDeviceEmulation: true,
        defaultViewport: {
            width: 1200,
            height: 900
        },
        chromeFlags: ['--headless', '--disable-mobile-emulation', '--no-sandbox', '--disable-setuid-sandbox']
    };

    // Launch chrome using chrome-launcher
    const instance = new Launcher();
    const chrome = await instance.launch(opts);

    opts.port = instance.port;
    console.log(opts.port);
    // Connect to it using puppeteer.connect().
    const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
    const { webSocketDebuggerUrl } = JSON.parse(resp.body);
    const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });


    // Visit Blueprint.com
    const page = (await browser.pages())[0];
    await page.setViewport({ width: 1200, height: 900 });
    await page.goto(homeURL, { waitUntil: 'networkidle2' });
    await runLighthouseForURL(page.url(), opts, "Homepage");


    // Visit a subject
    console.log("before click");
    await page.goto(subjectsURL, { waitUntil: 'networkidle2' });
    await page.evaluate(() => {
        document.querySelector('#Samsung_1 > span').click();
    });
    console.log("after click");
    await page.waitForNavigation();
    await runLighthouseForURL(page.url(), opts, "samsung");


    await browser.disconnect();
    //await chrome.kill();
    await instance.kill();


    try {
        assert.equal(scoresBelowBaseline, false, 'One of the scores was found below baseline. Failing test');
    } catch (error) {
        console.error('Failing Test: One of the scores was found below baseline. Failing test');
        process.exit(1);
    }

})().catch(e => {
    console.error(e);
    process.exit(1);
});



async function runLighthouseForURL(pageURL, opts, reportName) {

    const reportNameForFile = reportName.replace(/\s/g, '');

    let scores = { Performance: 0, Accessibility: 0, "Best Practices": 0, SEO: 0 };
    let slackArray = [];

    console.log("in runLighthouseForURL");
    const report = await lighthouse(pageURL, opts, config).then(results => {
        return results;
    });
    //const html = reportGenerator.generateReport(report.lhr, 'html');
    const html = generateReport(report.lhr, 'html');
    //const json = reportGenerator.generateReport(report.lhr, 'json');
    const json = generateReport(report.lhr, 'json');
    scores.Performance = JSON.parse(json).categories.performance.score;
    scores.Accessibility = JSON.parse(json).categories.accessibility.score;
    scores["Best Practices"] = JSON.parse(json)["categories"]["best-practices"]["score"];
    scores.SEO = JSON.parse(json).categories.seo.score;


    let baselineScores = {
        "Performance": 0.80,
        "Accessibility": 0.80,
        "Best Practices": 0.80,
        "SEO": 0.80
    };

    fs.writeFile('ReportHTML-' + reportNameForFile + '.html', html, (err) => {
        if (err) {
            console.error(err);
        }
    });

    fs.writeFile('ReportJSON-' + reportNameForFile + '.json', json, (err) => {
        if (err) {
            console.error(err);
        }
    });

    fs.writeFile('ReportScores-' + reportNameForFile + '.txt', JSON.stringify(scores, null, 2), (err) => {
        if (err) {
            console.error(err);
        }
    });

    let BreakException = {};
    let SlackHeadline = "Default Headline";

    try {
        Object.keys(baselineScores).forEach(key => {
            let baselineValue = baselineScores[key];
            console.log(scores);

            if (scores[key] != null && baselineValue > scores[key]) {
                Object.keys(baselineScores).forEach(key => {
                    const scorePercent = scores[key] * 100;
                    slackArray.push({ title: `${key}`, value: `${scorePercent}%`, short: true });
                });
                console.log(slackArray);
                console.log(`${app_name}: ` + key + " score " + scores[key] * 100 + "% for " + reportName + " is less than the defined baseline of " + baselineValue * 100 + "%");
                SlackHeadline = `*${app_name}:* _` + key + `_ score for <${pageURL}|` + reportName + "> below " + baselineValue * 100 + "%";
                throw BreakException;
            }
        });
    } catch (e) {
        if (e !== BreakException) throw e;
    }
}
