import { transactionModel } from "../database/model/transaction";
import userModel from "../database/model/user";
import { walletModel } from "../database/model/wallet";
import { User } from "../types/schema";

const getWalletFromUser = async (user: User) => {
  try {
    const wallet = await walletModel.findById(user.wallet)
    if (!wallet) throw new Error()
    return wallet
  } catch (e) {
    const createdWallet = await walletModel.create({
      user: user.uid
    });

    const fetchedUser = await userModel.findById(user._id)
    if (!fetchedUser) throw new Error("사용자 정보를 가져오지 못했습니다")
    fetchedUser.set('wallet', createdWallet._id)
    await fetchedUser.save()
    return createdWallet
  }
}

export const getBankWallet = async () => {
  const bankWallet = await walletModel.findOne({
    isBank: true
  })
  if (bankWallet) return bankWallet
  console.log("Cannot find central wallet(bank)")
  process.exit()
}

export const transferWalletBalance = async (from: User | null, to: User, amount: number, reason?: string) => {
  const fromWallet = from ? await getWalletFromUser(from) : await getBankWallet()
  const toWallet = await getWalletFromUser(to)

  const transaction = await transactionModel.create({
    from: fromWallet._id,
    to: toWallet._id,
    amount,
    reason,
    state: 'NOT_COMPLETED'
  })

  await fromWallet.set('balance', fromWallet.balance - amount).save()
  await toWallet.set('balance', toWallet.balance + amount).save()

  return await transaction.set('state', 'FINISHED').save()
}
