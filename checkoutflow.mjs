/**
 * @param {import('browsertime').BrowsertimeContext} context
 * @param {import('browsertime').BrowsertimeCommands} commands
 */
export default async function (context, commands) {


    // Set the path to your performance budget file
    context.options.budget = {
        configPath: 'sitespeedBudget.json'
    };

    // Access the Jenkins parameter
    const blockLaunchJs = process.env.BLOCK_LAUNCH_JS === 'true';

    if (blockLaunchJs) {
        // If the Jenkins flag is true, block requests to launch.js
        await commands.cdp.send('Network.setBlockedURLs', {
            urls: ["*launch.js*"]
        });
    }

    await commands.measure.start('https://www.verizon.com/');

    await commands.measure.start('Home Page');

    //Grildwall page
    await commands.measure.start('https://www.verizon.com/smartphones/');

    //Product detail page (PDP)
    await commands.measure.start('https://www.verizon.com/smartphones/apple-iphone-14/');

    await commands.click.byXpathAndWait('//*[@id="color-swatch-group"]/div/div/label[2]/span');
    await commands.click.byXpathAndWait('//*[@id="128"]/div/label');
    await commands.click.byXpathAndWait('//*[@id="new"]/div/label');
    await commands.click.byXpathAndWait('//*[@id="128frp"]/div/div/label');
    await commands.click.byXpathAndWait('//*[@id="cta-btn"]/div[1]/button/span[1]');
    await commands.click.byXpathAndWait('//*[@data-testid="zipConfirm"]/span[1]');

    //plan page
    await commands.click.byXpathAndWait('//*[@data-testid="goToCartCTA"]/span[1]');
    return commands.measure.stop();


};