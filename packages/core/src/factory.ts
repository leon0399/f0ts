import { Signer } from 'ethers'

import { Network, Networkish, getNetwork } from '@ethersproject/providers'

import { F0ContactFactories } from './types'
import { F0 } from './f0'

// const addresses: Record<number, string> = {
//   1: '0x4d70631664f1CEc37D33f289A3293662D70741C3',
//   4: '0xB4051d6205f6B98e5CB1238DaA279D8b875BF144',
// }

export class F0Factory {
  signer: Signer
  readonly network: Network

  constructor(signer: Signer, network: Networkish) {
    this.signer = signer
    this.network = getNetwork(network)
  }

  // async deploy(name: string, symbol: string, config: F0Contract.ConfigStruct) {
  //   const factoryAddress = addresses[this.network.chainId]

  //   if (!factoryAddress) {
  //     throw new Error(
  //       `Unsupported network: ${this.network.name} (${this.network.chainId})`,
  //     )
  //   }

  //   const factory = F0ContactFactories.F0Factory__factory.connect(
  //     factoryAddress,
  //     this.signer,
  //   )

  //   const tx = await factory.genesis(
  //     await this.signer.getAddress(),
  //     name,
  //     symbol,
  //     config,
  //   )

  //   // TODO:
  // }

  async connect(contractAddress: string) {
    const contract = F0ContactFactories.F0__factory.connect(
      contractAddress,
      this.signer,
    )

    const f0 = new F0(contract)

    await f0.fetch()

    return f0
  }
}
