import { BigNumber } from 'ethers'

import { InviteList } from '../invite-list'

export type {
  F0 as F0Contract,
  F0Factory as F0FactoryContract,
} from './ethers-contracts'

export { factories as F0ContactFactories } from './ethers-contracts'

export interface InviteCondition {
  limit: number
  start: Date
  price: BigNumber
}

export interface Invite {
  key: string
  name?: string
  cid?: string
  list?: InviteList
  condition: InviteCondition
}
