var request = require('request');

/* Processus Handler for Slack incomming webhooks
 * See https://api.slack.com/incoming-webhooks for details on the API
 * Task INPUT
 * @param task.properties.webhookURL The full url assigned to your webhook
 * @param task.properties.payload The payload to be sent to slack. See https://api.slack.com/incoming-webhooks
 * for more details on the parameters i.e.
      "username": [the BOT Username to report as e.g. 'processus-bot']
      "channel":  [Channel or user name to message e.g. '#general']
      "text":     [The test message to send]
      "icon_url": [URL of icon to show]
      "unfurl_links": [true | false]
 * Task OUTPUT
 * @param task.properties which includes input and request, response and body i.e.
     task.properties.webhookURL
     task.properties.payload
     task.properties.response
     task.properties.request
     task.properties.body
 */
module.exports = function(workflowId, taskName, task, callback, logger){

  var err;

  //Check for presence of the data property
  if(!task.properties) {
    callback(new Error("Task [" + taskName + "] has no data property!"), task);
    return;
  }

  if(!task.properties.webhookURL) {
    callback(new Error("Task [" + taskName + "] has no data.webhookURL property!"), task);
    return;
  }

  if(!task.properties.payload) {
    callback(new Error("Task [" + taskName + "] has no data.payload property!"), task);
    return;
  }

  var options = {};
  options.json = true;
  options.method = "POST";
  options.url = task.properties.webhookURL;
  options.body = task.properties.payload;

  request(options, function (error, response, body) {
    task.properties.response = response;
    task.properties.body = body;
    callback(error, task);

  });
};
