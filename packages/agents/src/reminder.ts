import { createReminderSchema, type ReminderPlan } from '../../shared/src/reminder.js';

export interface AuthenticatedPrincipal {
  /** Internal only: built by the authentication adapter, never from the request body. */
  user_id: string;
  /** Current persisted authorization, loaded by the server. */
  reminder_permission: boolean;
}

export class DomainError extends Error {
  constructor(public readonly code: 'UNAUTHENTICATED' | 'FORBIDDEN' | 'INVALID_INPUT') {
    super(code);
    this.name = 'DomainError';
  }
}

/** Pure planning boundary. Does not persist, schedule, send or claim completion. */
export function prepareReminder(
  input: unknown,
  principal: AuthenticatedPrincipal | null,
  now: Date,
): ReminderPlan {
  if (!principal?.user_id) throw new DomainError('UNAUTHENTICATED');
  if (!principal.reminder_permission) throw new DomainError('FORBIDDEN');
  const parsed = createReminderSchema.safeParse(input);
  if (!parsed.success) throw new DomainError('INVALID_INPUT');
  const due = new Date(parsed.data.scheduled_for);
  if (!Number.isFinite(now.getTime()) || due.getTime() <= now.getTime()) {
    throw new DomainError('INVALID_INPUT');
  }
  return {
    ...parsed.data,
    scheduled_for: due.toISOString(),
    user_id: principal.user_id,
    tool: 'Timo.createReminder',
  };
}
