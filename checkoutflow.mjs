/**
 * @param {import('browsertime').BrowsertimeContext} context
 * @param {import('browsertime').BrowsertimeCommands} commands
 */
export default async function (context, commands) {

    await commands.measure.start('Home Page');
    await commands.measure.start('https://www.verizon.com/');
    await commands.measure.stop();

    await commands.measure.start('Gridwall Page');
    await commands.measure.start('https://www.verizon.com/smartphones/');
    await commands.measure.stop();


    await commands.measure.start('https://www.verizon.com/smartphones/apple-iphone-14/');

    await commands.click.byXpathAndWait('//*[@id="color-swatch-group"]/div/div/label[2]/span');

    await commands.click.byXpathAndWait('//*[@id="128"]/div/label');

    await commands.click.byXpathAndWait('//*[@id="new"]/div/label');

    await commands.click.byXpathAndWait('//*[@id="128frp"]/div/div/label');

    await commands.click.byXpathAndWait('//*[@id="cta-btn"]/div[1]/button/span[1]');

    await commands.measure.start('Plan page');
    await commands.click.byXpathAndWait('//*[@id="goToCartCTA"]/span[2]');
    return commands.measure.stop();


};