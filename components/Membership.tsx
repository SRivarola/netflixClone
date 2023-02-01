import { useState } from "react"
import { goToBillingPortal } from "../config/stripe"
import useAuth from "../hook/useAuth"
import useSubscription from "../hook/useSubscription"
import Loader from "./Loader"

function Membership() {

    const { user } = useAuth()
    const subscription = useSubscription(user)
    const [billingLoading, setBillingLoading] = useState(false)

    const manageSubscirption = () => {
        if(subscription){
            setBillingLoading(true)
            goToBillingPortal()
        }
    }

  return (
    <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
        <div className="space-y-2 py-4">
            <h4 className="text-lg text-[gray]">Membership & Billing</h4>
            <button
                disabled={billingLoading || !subscription}
                className='flex items-center justify-center h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium text-black shadow-md hover:bg-gray-200 md:w-4/5'
                onClick={manageSubscirption}
            >
                {
                    billingLoading ? (
                        <Loader />
                    ) : (
                        'Cancel Membership'
                    )
                }
            </button>
        </div>

        <div className="col-span-3">
            <div className="flex flex-col justify-between border-b border-white/10 py-10 md:flex-row">
                <div className="">
                    <p className="font-medium">{user?.email}</p>
                    <p className="text-[grey]">Password: ********</p>
                </div>
                <div className="md:text-right">
                    <p className="membershipLink">Change email</p>
                    <p className="membershipLink">Change password</p>
                </div>
            </div>

            <div className="flex flex-col justify-between pt-4 pb-4 md:flex-row md:pb-0">
                <p>
                    {
                        subscription?.cancel_at_period_end
                        ? 'Your membership will end on'
                        : 'Your next billing date id'
                    }
                    {subscription?.current_period_end}
                </p>
            </div>
            <div className="md:text-right pb-4 md:pb-0">
                <p className="membershipLink">Manage payment info</p>
                <p className="membershipLink">Add backup payment method</p>
                <p className="membershipLink">Billing Detiails</p>
                <p className="membershipLink">Change billing day</p>
            </div>
        </div>
    </div>
  )
}
export default Membership