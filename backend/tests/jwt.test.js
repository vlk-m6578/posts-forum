const jwt = require('jsonwebtoken');
const generateToken = require('../../backend/src/utils/jwt');

process.env.JWT_SECRET = 'test_secret_key';

describe('JWT Utils', () => {
  const testUser = {
    id: 1,
    username: 'testuser',
    role: 'USER'
  };

  test('should generate valid token', () => {
    const token = generateToken(testUser);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('should contain correct user data in token', () => {
    const token = generateToken(testUser);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe(testUser.id);
    expect(decoded.role).toBe(testUser.role);
  });

  test('should reject invalid token', () => {
    const invalidToken = 'invalid.token.here';
    expect(() => {
      jwt.verify(invalidToken, process.env.JWT_SECRET);
    }).toThrow();
  });

  test('should have expiration time', () => {
    const token = generateToken(testUser);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.exp).toBeDefined();
  });
});