import { ContractTransaction } from 'ethers'

import { F0Contract, Invite } from './types/index'

import { TransferEvent } from './types/ethers-contracts/F0'
import { InviteList } from './invite-list'
import { digestToCid } from './ipfsh'

const PUBLIC_INVITE =
  '0x0000000000000000000000000000000000000000000000000000000000000000'

interface F0Data {
  name: string
  symbol: string
  invites: Invite[]
}

export class F0MintResponse {
  readonly tx: ContractTransaction

  constructor(tx: ContractTransaction) {
    this.tx = tx
  }

  async wait() {
    const receipt = await this.tx.wait()

    const transfers: TransferEvent[] =
      (receipt.events?.filter(
        (e) => e.event === 'Transfer',
      ) as TransferEvent[]) || []

    const tokenIds = transfers
      .map((event) => event.args.tokenId)
      .map((bn) => bn.toNumber())

    return tokenIds
  }
}

export class F0 {
  readonly contract: F0Contract
  data: F0Data | undefined

  constructor(contract: F0Contract) {
    this.contract = contract
  }

  async fetch() {
    const [name, symbol, invites] = await Promise.all([
      this.contract.name(),
      this.contract.symbol(),
      this.invites(),
    ])

    this.data = {
      name,
      symbol,
      invites,
    }

    return this.data
  }

  protected async invites(): Promise<Invite[]> {
    const inviteEvents = await this.contract.queryFilter(
      this.contract.filters.Invited(),
    )

    return await Promise.all(
      inviteEvents.map(async (event) => {
        const condition = await this.contract.invite(event.args!.key)

        const invite: Invite = {
          name: event.args!.key,
          key: event.args!.key,
          cid: digestToCid(event.args!.cid),
          condition: {
            limit: condition.limit.toNumber(),
            price: condition.price,
            start: new Date(condition.start.toNumber() * 1000),
          },
        }

        if (invite.key === PUBLIC_INVITE) {
          invite.name = 'Public mint'

          return invite
        }

        const request = await fetch(`https://ipfs.io/ipfs/${invite.cid}`)
        const response: { name: string; addresses: string[] } =
          await request.json()

        invite.name = response.name
        invite.list = new InviteList(response.addresses)

        return invite
      }),
    )
  }

  authTuple(key: string, address: string): F0Contract.AuthStruct {
    key = key ?? PUBLIC_INVITE

    if (!this.data) {
      throw new Error('Data is not fetched')
    }

    const invite = this.data.invites.find((i) => i.key === key)

    if (!invite) {
      throw new Error(`Unknown invite: ${key}`)
    }

    if (!invite.list) {
      return {
        key: [],
        proof: [],
      }
    }

    const proof = invite.list.proof(address)

    return {
      key,
      proof,
    }
  }

  async mint(count: number, key?: string) {
    const address = await this.contract.signer?.getAddress()

    if (!address) {
      throw new Error('Cannot mint: minter address unavailable')
    }

    key = key ?? PUBLIC_INVITE

    const auth = this.authTuple(key, address)

    const tx = await this.contract.mint(auth, count)

    return new F0MintResponse(tx)
  }
}
