import Dexie from 'dexie'
import type { Asset, Calendar } from '@phoobynet/alpaca-fluent'

export class Database extends Dexie {
  calendars!: Dexie.Table<Calendar>
  assets!: Dexie.Table<Asset>

  constructor() {
    super('OmegaStocksDatabase')
    this.version(2).stores({
      calendars: 'date',
      assets:
        'id,status,symbol,exchange,active,name,tradable,easy_to_borrow,fractionable,marginable',
    })
  }
}

export const database = new Database()
