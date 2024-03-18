import { Controller, Post, Body, Get, Param, Patch, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userData: User): Promise<{ token: string; user: User }> {
    try {
      const user = await this.userService.create(userData);
      const token = await this.userService.generateJwtToken(user);
      return { token, user }; // Include user data in the return object
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Post('login')
  async login(@Body() userData: { username: string; password: string }): Promise<{ token: string }> {
    try {
      const { username, password } = userData;

      // Check if the user exists
      const user = await this.userService.findByUsername(username);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Validate the password directly (without AuthService)
      const isValidPassword = await this.userService.validatePassword(password, user.password);
      if (!isValidPassword) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Generate and return a JWT token upon successful login
      const token = await this.userService.generateJwtToken(user);
      return { token };
    } catch (error) {
      throw new HttpException('Error logging in', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string): Promise<User | undefined> {
    return this.userService.findByUsername(username);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() userData: Partial<User>): Promise<User | undefined> {
    return this.userService.update(id, userData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
