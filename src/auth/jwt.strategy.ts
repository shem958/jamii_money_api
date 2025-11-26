import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // Use the non-null assertion operator (!) to tell TypeScript 
            // that JWT_SECRET is guaranteed to be a string at runtime,
            // enforcing our required security configuration.
            secretOrKey: process.env.JWT_SECRET!,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}