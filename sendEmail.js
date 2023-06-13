const axios = require('axios');
const https = require('https');
const fs = require('fs');

function getTokenAndSendEmail(fileName) {
    const agent = new https.Agent({
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + '/utils/cert/Dell Technologies Root Certificate Authority 2018.pem'),
        cert: fs.readFileSync(__dirname + '/utils/cert/Dell Technologies Root Certificate Authority 2018.pem'),
    });
    const url = 'https://oauth2-api-g2-dci.ausvdc02.pcf.dell.com/oauth2/api/v3/token';
    const auth = {
        username: '37b5b827-e378-41c8-9049-24d59359061e',
        password: 'ZYNpZBEw'
    };
    const options = {
        url: url,
        method: "post",
        httpsAgent: agent,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        },
        data: "grant_type=client_credentials",
        auth: auth
    };
    axios(options)
        .then(response => {
            sendEmail(response.data.access_token, fileName);
        }).catch(err => {
            console.log(err);
            return false
        });
}

function sendEmail(token, fileName) {
    let pipeLineLink = process.env.PIPELINE_LINK + process.env.CI_PIPELINE_ID;
    let emailbody = fs.readFileSync(fileName).toString('base64');
    const agent = new https.Agent({
        rejectUnauthorized: true,
        ca: fs.readFileSync('./utils/cert/Dell Technologies Root Certificate Authority 2018.pem'),
        cert: fs.readFileSync('./utils/cert/Dell Technologies Root Certificate Authority 2018.pem'),
    });

    const options = {
        url: 'https://sus-g4.solutions-np.mesh.dell.com/api/Notification/sendEmail',
        method: "POST",
        httpsAgent: agent,
        headers: {
            'Accept': 'application/json',
            "content-type": "application/json",
            "Authorization": "Bearer " + token
        },
        data: {
            "fromAddress": "Vikas_Ballal@DellTeam.com",//process.env.FROM_ADDRESS,
            "toAddress": "Vikas_Ballal@DellTeam.com",
            "toMultipleAddress": "",//process.env.TO_ADDRESS,
            "ccAddress": "",
            "subject": "Test Email",//process.env.SUBJECT + '-TestReport-' + result,
            "isHtmlBody": true,
            "emailBody": "Please open the attachemt to see the detailed report of automation test execution",
            "encodedAttachment": emailbody,
            "fileName": "test",
            "fileExtension": "html",
            "fileContentType": "text/html"
        }
    };
    axios(options)
        .then(response => {
            if (response.data.statusCode == 200)
                console.log("Email Sent Successfully!");
        }).catch(err => {
            console.log(err);
            return false
        });

}
module.exports = { getTokenAndSendEmail };