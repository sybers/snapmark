import { describe, expect, it } from 'vitest';
import { useMessage } from './useMessage';

describe('useMessage', () => {
  it('should return the initial message', () => {
    const { message } = useMessage('Hello, World!');
    expect(message.value).toBe('Hello, World!');
  });

  it('should update the message', () => {
    const { message, reset } = useMessage('Hello, World!');
    message.value = 'Hello, Universe!';
    expect(message.value).toBe('Hello, Universe!');
    reset();
    expect(message.value).toBe('Hello, World!');
  });
});
