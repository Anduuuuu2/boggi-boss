import { z } from 'zod';

// Proposed contract v0.1. Review with Claude before mobile consumption.
export const createReminderSchema = z.strictObject({
  title: z.string().trim().min(1).max(200),
  scheduled_for: z.iso.datetime({ offset: true }),
  timezone: z.string().min(1).max(100).refine((value) => {
    try {
      new Intl.DateTimeFormat('es', { timeZone: value });
      return true;
    } catch {
      return false;
    }
  }, 'Invalid IANA timezone'),
});

export type CreateReminderInput = z.infer<typeof createReminderSchema>;
export const TASK_STATUSES = [
  'pending', 'awaiting_approval', 'scheduled', 'running',
  'completed', 'failed', 'cancelled',
] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface ReminderPlan extends CreateReminderInput {
  user_id: string;
  tool: 'Timo.createReminder';
}
