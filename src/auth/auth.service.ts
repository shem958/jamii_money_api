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

      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { phone }],
      });

      if (existingUser) {
        throw new ConflictException(
          'User with this email or phone already exists',
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
        name,
        email,
        phone,
        password: hashedPassword,
        payday,
      });

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
      if (error instanceof ConflictException) throw error;
      const message =
        error instanceof Error ? error.message : 'Registration failed';
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
          role: user.role || 'user',
          phone: user.phone,
        },
      };
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) throw error;
      const message = error instanceof Error ? error.message : 'Login failed';
      throw new InternalServerErrorException(message);
    }
  }
}
