import { CID } from 'multiformats/cid'
import { create } from 'multiformats/hashes/digest'

export const digestToCid = (hex: string) => {
  if (hex === '0x00') {
    return ''
  }

  const arr = new Uint8Array(
    hex
      .slice(2)
      .match(/.{1,2}/g)
      ?.map((byte) => parseInt(byte, 16)) || [],
  )

  const digest = create(18, arr)
  const cid = CID.createV1(0x55, digest)

  return cid.toString()
}

export const cidToDigest = (cid: string) => {
  if (!cid || cid.length === 0) {
    return '0x00'
  }

  const digest = CID.parse(cid).multihash.digest
  const bytes = digest.reduce(
    (str, byte) => str + byte.toString(16).padStart(2, '0'),
    '',
  )

  return '0x' + bytes
}
