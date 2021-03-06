import TeleBot from "telebot";
import * as AppConfig from "./appconfig.json";
import Logger from "./tools/logger";

const logger: Logger = new Logger();
const userTelegramId: number = AppConfig.userTelegramId;
const bot: TeleBot = new TeleBot( {
    token: AppConfig.botToken,
    polling: {
        interval: AppConfig.polling.interval, // Optional. How often check updates (in ms).
        timeout: AppConfig.polling.timeout, // Optional. Update polling timeout (0 - short polling).
        limit: AppConfig.polling.limit, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: AppConfig.polling.retryTimeout // Optional. Reconnecting timeout (in ms).
    },
    updates: {
        enabled: true
    }
});

bot.on( "text", ( message: any ): void => {
    const id: number = message.from.id;
    const text: string = message.text;
    logger.info( `Msg received from ${id}: ${text}` );

    if ( id !== userTelegramId ) {
        bot.sendMessage( userTelegramId, `${id} tried to talk to ThkBot: ${text}` );
        return bot.sendMessage( id, `I don"t know you !` );
    }
    return bot.sendMessage( id, `Your msg: ${text}` );
});

bot.on( "/sab", ( message: any ): void => {
    const id: number = message.from.id;

    const markup: any = bot.keyboard( [
        [ "/buttons", "/inlineKeyboard" ],
        [ "/start", "/hide" ]
    ], { resize: true });

    return bot.sendMessage( id, "Keyboard example.", { markup });
});

bot.on("/inlineKeyboard", ( message: any ): void => {
  const markup: any = bot.inlineKeyboard([
    [
      bot.inlineButton("callback", { callback: "this_is_data" }),
      bot.inlineButton("inline", { inline: "some query" })
    ], [
      bot.inlineButton("url", { url: "https://telegram.org" })
    ]
  ]);

  return bot.sendMessage(message.from.id, "Inline keyboard example.", { markup });

});

bot.connect();
