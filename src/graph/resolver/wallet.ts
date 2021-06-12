import { transactionModel } from "../../database/model/transaction";
import userModel from "../../database/model/user";
import { walletModel } from "../../database/model/wallet";
import { Wallet } from "../../types/schema";

export default {
  transactions(parent: Wallet) {
    return transactionModel.find({
      $or: [{
        to: parent._id
      }, {
        from: parent._id
      }]
    })
  },
  user(parent: Wallet) {
    return userModel.findOne({
      uid: parent.user
    })
  }
}