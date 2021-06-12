import { Wallet } from "."
import userModel from "../../database/model/user"
import { walletModel } from "../../database/model/wallet"
import { Transaction } from "../../types/schema"

export default {
  async from(parent: Transaction) {
    const user = await walletModel.findById(
      parent.from
    )
    return user
  },

  async to(parent: Transaction) {
    const wallet = await walletModel.findById(
      parent.to
    )
    return wallet
  }
}