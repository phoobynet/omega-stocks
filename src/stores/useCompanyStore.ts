import { defineStore } from 'pinia'
import type {
  Asset,
  Ticker,
  TickerObserverCancel,
  TickerObserverState,
  Trade,
} from '@phoobynet/alpaca-fluent'
import {
  assets,
  createTickerFrom,
  tickerObserver,
} from '@phoobynet/alpaca-fluent'

export const useCompanyStore = defineStore('companyStore', {
  state() {
    return {
      asset: undefined as undefined | Asset,
      trade: undefined as undefined | Trade,
      loading: false,
      cancel: undefined as undefined | TickerObserverCancel,
      tickerObserverState: undefined as undefined | TickerObserverState,
      ticker: undefined as undefined | Ticker,
    }
  },

  actions: {
    async initialise(symbol: string): Promise<void> {
      try {
        this.$state.loading = true
        if (this.$state.cancel) {
          this.$state.cancel()
        }
        this.$state.asset = await assets.one(symbol)
        if (this.$state.asset) {
          this.$state.ticker = await createTickerFrom(this.$state.asset)
          this.$state.trade = await this.$state.ticker.trades.latest()
        }
      } finally {
        this.$state.loading = false
      }
    },
    async observe() {
      if (!this.$state.ticker) {
        throw new Error('Ticker not initialized')
      }

      this.$state.cancel = await tickerObserver(
        this.$state.ticker,
        (state: TickerObserverState) => {
          this.$state.tickerObserverState = state
          this.$state.trade = state.trade
        },
      )
    },
    async unobserve() {
      if (this.$state.cancel) {
        this.$state.cancel()
      }
    },
  },
})
