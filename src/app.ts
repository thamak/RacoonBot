import TeleBot from "telebot";
import Logger from "./logger/logger";
import AppConfig from "./appconfig.json";

const logger: Logger = new Logger();
const userTelegramId: number = AppConfig.userTelegramId;
const bot: TeleBot = new TeleBot({
  token: AppConfig.botToken,
  polling: {
    interval: AppConfig.polling.interval, // Optional. How often check updates (in ms).
    timeout: AppConfig.polling.timeout, // Optional. Update polling timeout (0 - short polling).
    limit: AppConfig.polling.limit, // Optional. Limits the number of updates to be retrieved.
    retryTimeout: AppConfig.polling.retryTimeout // Optional. Reconnecting timeout (in ms).
  }
});

bot.on("text", msg => {
    let id: number = msg.from.id;
    let text: string = msg.text;
    logger.info(`Msg received from ${id}: ${text}`);

    if (id !== userTelegramId) {
        bot.sendMessage(userTelegramId, `${id} tried to talk to ThkBot: ${text}`);
        return bot.sendMessage(id, `I don"t know you !`);
    }
    return bot.sendMessage(id, `Your msg: ${text}`);
});

// On every text message
bot.on("/sab", msg => {
    let id: number = msg.from.id;
    let text: string = msg.text;
    return bot.sendMessage(id, `sab: ${text}`);
});

bot.connect();
