# Factoria F0 TypeScript

## Installing

```sh
npm i f0ts ethers
```

```sh
yarn add f0ts ethers
```

```sh
pnpm i f0ts ethers
```

## Usage

```TypeScript
import type { Signer } from 'ethers'
import { F0Factory, F0 } from 'f0ts'

const signer: Signer = provider.getSigner()
const factory = new F0Factory(signer, 'mainet')
const f0 = factory.connect('0x24F6328cdDDdad9475c9a3DC2675b5ef851A7C5E')

const data = f0.getData()

console.log(data) // { name: 'Mini DeGens', symbol: 'MDEGEN', invites: [ ...invites ] }

// Mint public invites

const mintTx = await f0.mint(5) // mint 5 tokens
const tokenIds = await mintTx.wait() // wait for TX to succeed

console.log(tokenIds) // [ 10, 11, 12, 13, 14 ]

// Mint private invites

const inviteKey = '0x3b8a456a5218cba792008f74ed2bc03068deb7f766bed208bd20aeaf75310635'
const mintTx = await f0.mint(5, inviteKey) // mint 5 tokens from private round
const tokenIds = await mintTx.wait() // wait for TX to succeed

console.log(tokenIds) // [ 15, 16, 17, 18, 19 ]
```
