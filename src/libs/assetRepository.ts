import { cleanTicker } from '@phoobynet/alpaca-fluent'
import { database } from '@/libs/database'
import type { Asset, AssetRepository } from '@phoobynet/alpaca-fluent'
import { uniqBy } from 'lodash'

export const assetRepository: AssetRepository = {
  async clear(): Promise<void> {
    await database.assets.clear()
  },
  async isEmpty(): Promise<boolean> {
    return database.assets.count().then((c) => c === 0)
  },
  async bulkAdd(assets: Asset[]): Promise<void> {
    await database.assets.bulkPut(
      uniqBy(assets, 'symbol').filter((x) => x.status === 'active'),
    )
  },
  async findAll(): Promise<Asset[]> {
    return database.assets
      .where({
        status: 'active',
      })
      .toArray()
  },
  async findByTicker(tickerSymbol: string): Promise<Asset | undefined> {
    return database.assets
      .where({
        symbol: cleanTicker(tickerSymbol),
      })
      .first()
  },
}
