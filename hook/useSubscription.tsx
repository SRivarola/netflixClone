import { useState, useEffect } from 'react'
import { onCurrentUserSubscriptionUpdate, Subscription } from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import payments from '../config/stripe'

function useSubscription(user: User | null) {

    const [subscription, setSubscription] = useState<Subscription | null>(null)

    useEffect(() => {
        if(!user) return

        onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
            setSubscription(
                snapshot.subscriptions.filter(
                    subscription => 
                        subscription.status === 'active' || 
                        subscription.status === 'trialing'
                )[0]
            )
        })
    }, [user])
    

    return subscription
}

export default useSubscription