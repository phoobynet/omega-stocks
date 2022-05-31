import type { Calendar, CalendarRepository } from '@phoobynet/alpaca-fluent'
import { database } from '@/libs/database'

export const calendarRepository: CalendarRepository = {
  async clear(): Promise<void> {
    await database.calendars.clear()
  },
  async isEmpty(): Promise<boolean> {
    return database.calendars.count().then((c) => c === 0)
  },
  async bulkAdd(calendars: Calendar[]): Promise<void> {
    await database.calendars.bulkPut(calendars)
  },
  async findByDate(date: Date): Promise<Calendar | undefined> {
    return database.calendars.where(date).first()
  },
  async findBetween(start: Date, end: Date): Promise<Calendar[]> {
    return database.calendars
      .where('date')
      .between(start, end, true, true)
      .toArray()
  },
}
