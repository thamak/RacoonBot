interface ITeleBotPollingOptions {
    interval: number,
    timeout: number;
    limit: number;
    retryTimeout: number
}

interface ITeleBotConfiguration {
    token: string,
    polling: ITeleBotPollingOptions
}

declare namespace telebot {
    type idType = number | string

    export class TeleBot {
        public constructor( option: string | ITeleBotConfiguration )

        public connect(): Promise<never | (void | {})>
        public disconnect()

        public on(types: string | [string], fn: Function, opt?: {})
        public sendMessage(chatId: idType, text: string)
    }
}
