var request = require('request');

/* Processus Handler for Slack incomming webhooks
 * See https://api.slack.com/incoming-webhooks for details on the API
 * Task INPUT
 * @param task.parameters.webhookURL The full url assigned to your webhook
 * @param task.parameters.payload The payload to be sent to slack. See https://api.slack.com/incoming-webhooks
 * for more details on the parameters i.e.
      "username": [the BOT Username to report as e.g. 'processus-bot']
      "channel":  [Channel or user name to message e.g. '#general']
      "text":     [The test message to send]
      "icon_url": [URL of icon to show]
      "unfurl_links": [true | false]
 * Task OUTPUT
 * @param task.parameters which includes input and request, response and body i.e.
     task.parameters.webhookURL
     task.parameters.payload
     task.parameters.response
     task.parameters.request
     task.parameters.body
 */
module.exports = function(workflowId, taskName, task, callback, logger){

  var err;

  //Check for presence of the data property
  if(!task.parameters) {
    callback(new Error("Task [" + taskName + "] has no parameters property!"), task);
    return;
  }

  if(!task.parameters.webhookURL) {
    callback(new Error("Task [" + taskName + "] has no parameters.webhookURL property!"), task);
    return;
  }

  if(!task.parameters.payload) {
    callback(new Error("Task [" + taskName + "] has no parameters.payload property!"), task);
    return;
  }

  var options = {};
  options.json = true;
  options.method = "POST";
  options.url = task.parameters.webhookURL;
  options.body = task.parameters.payload;

  request(options, function (error, response, body) {
    task.parameters.response = response;
    task.parameters.body = body;
    callback(error, task);

  });
};
