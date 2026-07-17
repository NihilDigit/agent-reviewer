import { describe, expect, test } from 'bun:test';
import { normalizePendingFilePath } from '../src/paths';

describe('pending review file paths', () => {
  test('normalizes safe workspace-relative paths', () => {
    expect(normalizePendingFilePath('.codex/./pending.md')).toBe('.codex/pending.md');
    expect(normalizePendingFilePath('reviews\\pending.md')).toBe('reviews/pending.md');
  });

  test.each(['', '.', '..', '../outside.md', 'nested/../../outside.md', '/tmp/file', 'C:\\tmp\\file'])(
    'rejects unsafe or non-file path %s',
    (value) => expect(() => normalizePendingFilePath(value)).toThrow()
  );
});
