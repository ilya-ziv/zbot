const https = require('https')
const TelegramBot = require('node-telegram-bot-api')
 
const token = '256494726:AAG5RMYEIT-17sSah1Lc_xJdBW0vfc8qasU'
const myIpUrl = 'https://api.ipify.org?format=json'
 
const bot = new TelegramBot(token, {polling: true})

function getMyIp(cb) {

  let promise = new Promise((resolve, reject) => {

    https.get(myIpUrl, (res) => {

      if (res.statusCode != 200)
        reject(res.statusCode)
      else
        res.on('data', (d) => {
          resolve(JSON.parse(d).ip)
        })

    }).on('error', (e) => {

      reject(e)

    });

  })
  return promise
}

function pushCommandsToBotfather() {
  
}
 
// Matches "/echo [whatever]" 
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram 
  // 'match' is the result of executing the regexp above on the text content 
  // of the message 
 
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever" 
 
  // send back the matched "whatever" to the chat 
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/myip/, (msg, match) => {

  const chatId = msg.chat.id

  getMyIp().then( 
    result => { bot.sendMessage(chatId, result) }, 
    error => { 
      bot.sendMessage('error')
      console.log(error) 
    })

});
 
// Listen for any kind of message. There are different kinds of 
// messages. 
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log('MSG:', chatId, msg.text);
 
  // send a message to the chat acknowledging receipt of their message 
  //bot.sendMessage(chatId, 'Received your message');
});
