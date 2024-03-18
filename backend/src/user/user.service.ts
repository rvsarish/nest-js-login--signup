import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw new BadRequestException('Error finding user by username');
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException('Error finding user by email');
    }
  }

  async create(user: User): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
      user.password = hashedPassword;
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async generateJwtToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    const expiresIn = '1d'; // Expiry time limit
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async update(id: number, user: Partial<User>): Promise<User | undefined> {
    try {
      await this.userRepository.update(id, user);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new BadRequestException('Error updating user');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new BadRequestException('Error deleting user');
    }
  }
}
