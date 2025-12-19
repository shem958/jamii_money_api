import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto) {
    try {
      const { name, email, password, phone, payday } = registerDto;

      // ✅ Check for existing user
      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser)
        throw new ConflictException(
          'User with this email or phone already exists',
        );

      // ✅ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ Create new user
      const user = await this.userModel.create({
        name,
        email,
        phone,
        password: hashedPassword,
        payday,
      });

      // ✅ Return response
      return {
        message: 'Registration successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      };
    } catch (error: unknown) {
      console.error('❌ Registration Error:', error);
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error);
      throw new InternalServerErrorException(message);
    }
  }

  async login(loginDto: LoginAuthDto) {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');

      const payload = { sub: user._id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        access_token: token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error: unknown) {
      console.error('❌ Login Error:', error);
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error);
      throw new InternalServerErrorException(message);
    }
  }
}
