// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'default e2e tests': browser => {
        browser
            .url(process.env.VUE_DEV_SERVER_URL)
            .waitForElementVisible('#upowdb-main-container', 8888)
            .assert.elementPresent('.lang-changer')
            .end();
    },
};
