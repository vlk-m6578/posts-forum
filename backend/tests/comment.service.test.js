const commentService = require('../../backend/src/services/comment.service');
const prisma = require('../../backend/src/config/prisma');

jest.mock('../../backend/src/config/prisma', () => ({
  post: {
    findUnique: jest.fn()
  },
  comment: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn()
  }
}));

describe('Comment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createComment', () => {
    test('should create comment if post exists', async () => {
      const mockPost = { id: 1 };
      const mockComment = {
        id: 1,
        text: 'Test comment',
        authorId: 1,
        postId: 1,
        author: { username: 'testuser' }
      };

      prisma.post.findUnique.mockResolvedValue(mockPost);
      prisma.comment.create.mockResolvedValue(mockComment);

      const result = await commentService.createComment(
        { text: 'Test comment', postId: 1 },
        1
      );

      expect(result).toEqual(mockComment);
      expect(prisma.comment.create).toHaveBeenCalledTimes(1);
    });

    test('should throw error if post not found', async () => {
      prisma.post.findUnique.mockResolvedValue(null);

      await expect(commentService.createComment(
        { text: 'Test', postId: 999 },
        1
      )).rejects.toThrow('Post not found');
    });
  });

  describe('getPostComments', () => {
    test('should return comments for post', async () => {
      const mockComments = [
        { id: 1, text: 'Comment 1', author: { username: 'user1' } },
        { id: 2, text: 'Comment 2', author: { username: 'user2' } }
      ];

      prisma.comment.findMany.mockResolvedValue(mockComments);

      const result = await commentService.getPostComments(1);
      expect(result).toEqual(mockComments);
      expect(prisma.comment.findMany).toHaveBeenCalledTimes(1);
    });

    test('should throw error if invalid postId', async () => {
      await expect(commentService.getPostComments('invalid'))
        .rejects.toThrow('Invalid post ID');
    });
  });

  describe('deleteComment', () => {
    test('should delete comment if user is author', async () => {
      const mockComment = { id: 1, authorId: 1 };

      prisma.comment.findUnique.mockResolvedValue(mockComment);
      prisma.comment.delete.mockResolvedValue({});

      const result = await commentService.deleteComment(1, 1, 'USER');
      expect(result.message).toBe('Comment deleted');
    });

    test('should delete comment if user is ADMIN', async () => {
      const mockComment = { id: 1, authorId: 2 };

      prisma.comment.findUnique.mockResolvedValue(mockComment);
      prisma.comment.delete.mockResolvedValue({});

      const result = await commentService.deleteComment(1, 1, 'ADMIN');
      expect(result.message).toBe('Comment deleted');
    });

    test('should throw error if user is not author or admin', async () => {
      const mockComment = { id: 1, authorId: 2 };

      prisma.comment.findUnique.mockResolvedValue(mockComment);

      await expect(commentService.deleteComment(1, 1, 'USER'))
        .rejects.toThrow('You can only delete your own comments');
    });

    test('should throw error if comment not found', async () => {
      prisma.comment.findUnique.mockResolvedValue(null);

      await expect(commentService.deleteComment(999, 1, 'USER'))
        .rejects.toThrow('Comment not found');
    });
  });
});