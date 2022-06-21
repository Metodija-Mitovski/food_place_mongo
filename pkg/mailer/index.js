const fs = require("fs");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const config = require("../config");
const cfgmailer = config.get("mailer")
const mailTemplates = require("./mailTemplateTypes");
const ejs = require("ejs")

// mailgun configuration
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: cfgmailer.username,
    key: cfgmailer.key
});

const sendMail = async (to, type, data) => {
    let title = "";
    let content = "";

    if (mailTemplates[type]) {
        title = mailTemplates[type].title;
        let tempPath = `${__dirname}/../../email_templates/${mailTemplates[type].template}`;
        ejs.renderFile(tempPath, data, (err, str) => {
            if (err) {
                throw new Error();
            };
            content = str
        });
    };
    const options = {
        from: cfgmailer.default_address,
        to: to,
        subject: title,
        html: content
    };
    try {
        const res = await mg.messages.create(cfgmailer.domain, options);
        console.log(res);
    } catch (error) {
        console.log(error);
    };
};

module.exports = {
    sendMail
}