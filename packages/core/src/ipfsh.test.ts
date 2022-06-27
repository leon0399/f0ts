import { cidToDigest, digestToCid } from './ipfsh'

describe('ipfsh', () => {
  describe('CID to Digest', () => {
    it('transforms correct V2 CID to digest', () => {
      expect(
        cidToDigest(
          'bafkreicujjsknuezqen2mtyw2ef66sdwokcozgrui6zsfrykgxleugzypa',
        ),
      ).toEqual(
        '0x544a64a6d099811ba64f16d10bef48767284ec9a3447b322c70a35d64a1b3878',
      )
    })
  })

  describe('Digest to CID', () => {
    it('transforms correct digest to V2 CID', () => {
      expect(
        digestToCid(
          '0x544a64a6d099811ba64f16d10bef48767284ec9a3447b322c70a35d64a1b3878',
        ),
      ).toEqual('bafkreicujjsknuezqen2mtyw2ef66sdwokcozgrui6zsfrykgxleugzypa')
    })
  })
})
