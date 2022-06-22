import { InviteList } from './invite-list'

const invites = [
  '0xd0428c1385c86461104272a7049ee79c561d326b',
  '0x83eb387C8F7c8903f2Be1cA367197fC4b3cb573E',
  '0x258720283dd7CD9B9bA016A2a275e56950bb84Df',
  '0xA6c0F7bde119930fB919ed02F8155887EcF0D756',
  '0x4821280215DFfEef650Eaa03762c3D9adeb2AFA3',
]

describe('InviteList', () => {
  it('generates proof for existing address', () => {
    const inviteList = new InviteList(invites)

    expect(
      inviteList.proof('0xd0428c1385c86461104272a7049ee79c561d326b'),
    ).not.toHaveLength(0)
  })

  it('generates empty proof for non-existing address', () => {
    const inviteList = new InviteList(invites)

    expect(
      inviteList.proof('0x4ea324A72848F8A689110E41f891A512eF7BDA7b'),
    ).toHaveLength(0)
  })

  it('verify correct proof', () => {
    const inviteList = new InviteList(invites)

    const proof = [
      '0x33fa7dc76b5d86a1a82cf014621ea0644447291221c3c7793d22a52735a88f7a',
      '0xe6109cbba621c968f7feaf4879ddf7baa37387b4083e646df929941be8526264',
      '0x141318de90144dda3d6a935ba46c6c65278e3732de464c9f15698e87b9428591',
    ]

    expect(
      inviteList.verify('0xd0428c1385c86461104272a7049ee79c561d326b', proof),
    ).toBeTruthy()
  })

  it('not verify correct proof', () => {
    const inviteList = new InviteList(invites)

    const proof = [
      '0x33fa7dc76b5d86a1a82cf014621ea0644447291221c3c7793d22a52735a88f7a',
      '0xe6109cbba621c968f7feaf4879ddf7baa37387b4083e646df929941be8526264',
      '0x141318de90144dda3d6a935ba46c6c65278e3732de464c9f15698e87b9428592',
    ]

    expect(
      inviteList.verify('0xd0428c1385c86461104272a7049ee79c561d326b', proof),
    ).toBeFalsy()
  })

  it('not verify empty proof', () => {
    const inviteList = new InviteList(invites)

    const proof: string[] = []

    expect(
      inviteList.verify('0xd0428c1385c86461104272a7049ee79c561d326b', proof),
    ).toBeFalsy()
  })
})
