// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'check if lang changer exists': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .waitForElementVisible('#upowdb-main-container', 2000)
            .assert.elementPresent('.lang-changer');
    },
    'open sandbox and see whether HelpButton and helpMsg is rendered correctly': browser => {
        browser
            .useXpath()
            .click("//a[@href='/sandbox']/button")
            .useCss()
            .waitForElementVisible('body', 2000)
            .click('button[id=popoverHelpMsg]')
            .waitForElementVisible('div.popover', 1000)
            .assert.containsText('div.popover', 'Hier können SQLite Datenbanken hochgeladen werden.')
            .end();
    },
};
