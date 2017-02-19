import * as Winston from "winston";
import * as Moment from "moment";
import * as fs from "fs";

export default class Logger {
    logger: any;
    logDir = process.env.LOG_DIR || "log";
    logFile = process.env.LOG_FILE || "racoonBot.log";
    env = process.env.NODE_ENV || "development";

    constructor() {
        Winston.setLevels( Winston.config.npm.levels );
        Winston.addColors( Winston.config.npm.colors );

        // Create the directory if it does not exist
        if ( !fs.existsSync( this.logDir ) ) {
            fs.mkdirSync( this.logDir );
        }

        this.logger = new Winston.Logger({
            transports: [
                new Winston.transports.File( {
                    filename: this.logDir + "/" + this.logFile,
                    maxsize: 1024 * 1024 * 10, // 10MB
                    json: false,
                    timestamp: () => {
                        return Moment().format( "YYYY-MM-DD HH:mm:ss" );
                    },
                    formatter: (options: any): string => {
                        return options.timestamp()
                        + " [" + options.level.toUpperCase() + "]: "
                        + ( options.message ? options.message : "" )
                        + ( options.meta && Object.keys( options.meta ).length ? "\n\t" + JSON.stringify( options.meta ) : "" );
                    }
                }),
                new Winston.transports.Console({
                    handleExceptions: true,
                    colorize: true,
                    json: false,
                    timestamp: (): string => {
                        return Moment().format( "YYYY-MM-DD HH:mm:ss" );
                    }
                })
            ]
        });
    }

    info( message: string ): void {
        this.logger.info( message );
    }
}