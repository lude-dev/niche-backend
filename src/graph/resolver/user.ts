import userModel from "../../database/model/user";
import { walletModel } from "../../database/model/wallet";
import { Context } from "../../types/commonTypes";
import { User } from "../../types/schema";

const myInfo = (parent: unknown, args: unknown, { user }: Context) => {
  if (!user) throw new Error("로그인이 필요합니다")
  return user
}

export const query = {
  myInfo
}

export default {
  async wallet(parent: User, args: unknown, { user }: Context) {
    if (parent.uid !== user.uid) throw new Error("본인의 지갑 정보만 열람할 수 있습니다")
    const wallet = await walletModel.findById(parent.wallet)
    if (wallet) return wallet

    const createdWallet = await walletModel.create({
      user: parent.uid
    });

    const fetchedUser = await userModel.findById(parent._id)
    if (!fetchedUser) throw new Error("사용자 정보를 가져오지 못했습니다")
    fetchedUser.set('wallet', createdWallet._id)
    await fetchedUser.save()
    return createdWallet
  }
}
