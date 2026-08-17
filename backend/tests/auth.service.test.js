const authService = require('../../backend/src/services/auth.service');
const prisma = require('../../backend/src/config/prisma');
const bcrypt = require('bcrypt');
const generateToken = require('../../backend/src/utils/jwt');

jest.mock('../../backend/src/config/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock('bcrypt');
jest.mock('../../backend/src/utils/jwt');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('should create new user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        country: 'Ukraine',
        city: 'Kyiv'
      };

      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_password');
      prisma.user.create.mockResolvedValue(mockUser);

      const result = await authService.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        country: 'Ukraine',
        city: 'Kyiv'
      });

      expect(result).toEqual(mockUser);
      expect(prisma.user.create).toHaveBeenCalledTimes(1);
    });

    test('should throw error if email exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(authService.register({
        username: 'testuser',
        email: 'existing@example.com',
        password: 'password123',
        country: 'Ukraine',
        city: 'Kyiv'
      })).rejects.toThrow('Email already exists');
    });
  });

  describe('login', () => {
    test('should return token and user on successful login', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashed_password',
        role: 'USER'
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      generateToken.mockReturnValue('test_token');

      const result = await authService.login('test@example.com', 'password123');

      expect(result).toEqual({
        token: 'test_token',
        user: {
          id: mockUser.id,
          username: mockUser.username,
          role: mockUser.role
        }
      });
    });

    test('should throw error on invalid email', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(authService.login('invalid@example.com', 'password123'))
        .rejects.toThrow('Invalid email or password');
    });

    test('should throw error on invalid password', async () => {
      const mockUser = {
        id: 1,
        password: 'hashed_password'
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongpassword'))
        .rejects.toThrow('Invalid email or password');
    });
  });
});