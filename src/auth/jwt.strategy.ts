import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Inject ConfigService in the constructor
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // 👇 Use the non-null assertion operator (!) on the result of get()
            // This assures TypeScript that the value is defined.
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });
    }

    async validate(payload: any) {
        // The payload (decoded JWT content) is returned as the user object for the request
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}