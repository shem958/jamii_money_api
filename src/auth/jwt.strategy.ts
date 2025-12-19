import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Define a typed shape for the JWT payload we expect
interface JwtPayload {
  sub?: string | number;
  email?: string;
  role?: string | string[];
  [key: string]: unknown;
}

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

  validate(payload: JwtPayload) {
    // The payload (decoded JWT content) is returned as the user object for the request
    return {
      userId: payload.sub ? String(payload.sub) : undefined,
      email: payload.email,
      role: payload.role,
    };
  }
}
