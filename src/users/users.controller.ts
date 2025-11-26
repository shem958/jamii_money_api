import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Import JWT Guard
import { RolesGuard } from '../auth/guards/roles.guard'; // Import Roles Guard
import { Roles } from '../auth/decorators/roles.decorator'; // Import Roles Decorator

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards to all methods in this controller
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @Roles('admin') // Restrict creation of a user via this endpoint to 'admin' role
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles('admin') // Restrict viewing all users to 'admin' role
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    // Protected by JwtAuthGuard, typically an authorized user can view their own profile
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    // Protected by JwtAuthGuard, typically an authorized user can update their own profile
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    // Protected by JwtAuthGuard, typically an authorized user can delete their own profile
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}