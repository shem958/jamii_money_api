import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void {
        const start = Date.now();

        res.on('finish', () => {
            const duration = Date.now() - start;
            const method = req.method;
            const url = req.originalUrl;
            const statusCode = res.statusCode;

            let statusColor: (msg: string) => string;

            if (statusCode >= 500) statusColor = chalk.red;
            else if (statusCode >= 400) statusColor = chalk.yellow;
            else if (statusCode >= 300) statusColor = chalk.cyan;
            else statusColor = chalk.green;

            const logMessage = `${chalk.gray(
                new Date().toISOString(),
            )} ${chalk.blue(method)} ${chalk.white(url)} ${statusColor(
                statusCode.toString(),
            )} - ${chalk.magenta(duration + 'ms')}`;

            console.log(logMessage);
        });

        next();
    }
}
