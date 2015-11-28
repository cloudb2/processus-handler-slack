var request = require('request');

/* Processus Handler for Slack incomming webhooks
 * See https://api.slack.com/incoming-webhooks for details on the API
 * Task INPUT
 * @param task.data.webhookURL The full url assigned to your webhook
 * @param task.data.payload The payload to be sent to slack. See https://api.slack.com/incoming-webhooks
 * for more details on the parameters i.e.
      "username": [the BOT Username to report as e.g. 'processus-bot']
      "channel":  [Channel or user name to message e.g. '#general']
      "text":     [The test message to send]
      "icon_url": [URL of icon to show]
      "unfurl_links": [true | false]
 * Task OUTPUT
 * @param task.data which includes input and request, response and body i.e.
     task.data.webhookURL
     task.data.payload
     task.data.response
     task.data.request
     task.data.body
 */
module.exports = function(workflowId, taskName, task, callback, logger){

  var err;

  //Check for presence of the data property
  if(!task.data) {
    callback(new Error("Task [" + taskName + "] has no data property!"), task);
    return;
  }

  if(!task.data.webhookURL) {
    callback(new Error("Task [" + taskName + "] has no data.webhookURL property!"), task);
    return;
  }

  if(!task.data.payload) {
    callback(new Error("Task [" + taskName + "] has no data.payload property!"), task);
    return;
  }

  var options = {};
  options.json = true;
  options.method = "POST";
  options.url = task.data.webhookURL;
  options.body = task.data.payload;

  request(options, function (error, response, body) {
    task.data.response = response;
    task.data.body = body;
    callback(error, task);

  });
};
