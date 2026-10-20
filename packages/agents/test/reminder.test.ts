import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DomainError, prepareReminder } from '../src/reminder.js';

const now = new Date('2026-10-19T15:00:00Z');
const input = {
  title: '  Pagar internet  ',
  scheduled_for: '2026-10-20T10:00:00-05:00',
  timezone: 'America/Bogota',
};
const userA = { user_id: '00000000-0000-4000-8000-000000000001', reminder_permission: true };
const userB = { user_id: '00000000-0000-4000-8000-000000000002', reminder_permission: true };
const hasCode = (code: DomainError['code']) => (error: unknown) =>
  error instanceof DomainError && error.code === code;

test('prepares a normalized future reminder without claiming persistence or delivery', () => {
  assert.deepEqual(prepareReminder(input, userA, now), {
    title: 'Pagar internet', scheduled_for: '2026-10-20T15:00:00.000Z',
    timezone: 'America/Bogota', user_id: userA.user_id, tool: 'Timo.createReminder',
  });
});

test('requires an authenticated principal', () => {
  assert.throws(() => prepareReminder(input, null, now), hasCode('UNAUTHENTICATED'));
});

test('rejects revoked reminder permission', () => {
  assert.throws(() => prepareReminder(input, { ...userA, reminder_permission: false }, now), hasCode('FORBIDDEN'));
});

test('rejects past and present timestamps', () => {
  for (const scheduled_for of ['2026-10-18T15:00:00Z', now.toISOString()]) {
    assert.throws(() => prepareReminder({ ...input, scheduled_for }, userA, now), hasCode('INVALID_INPUT'));
  }
});

test('rejects malformed, ambiguous and unknown fields', () => {
  for (const patch of [
    { title: '' }, { title: 'a'.repeat(201) }, { scheduled_for: 'tomorrow' },
    { scheduled_for: '2026-10-20T10:00:00' }, { timezone: 'Bogota' },
    { status: 'completed' }, { user_id: userB.user_id },
  ]) {
    assert.throws(() => prepareReminder({ ...input, ...patch }, userA, now), hasCode('INVALID_INPUT'));
  }
});

test('derives ownership exclusively from the trusted principal', () => {
  assert.equal(prepareReminder(input, userA, now).user_id, userA.user_id);
  assert.equal(prepareReminder(input, userB, now).user_id, userB.user_id);
});

test('validation errors do not echo user content', () => {
  assert.throws(() => prepareReminder({ ...input, title: 'private-content', timezone: 'invalid' }, userA, now),
    (error: unknown) => error instanceof DomainError && !error.message.includes('private-content'));
});
