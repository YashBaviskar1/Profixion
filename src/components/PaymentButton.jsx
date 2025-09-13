import { useState } from 'react'
import toast from 'react-hot-toast'

export default function PaymentButton({ amount = 499, trackingId }) {
  const [isPaying, setIsPaying] = useState(false)

  const createOrder = async () => {
    const response = await fetch('http://localhost:3001/api/payment/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, trackingId })
    })
    if (!response.ok) throw new Error('Failed to create order')
    return response.json()
  }

  const verifyPayment = async (payload) => {
    const response = await fetch('http://localhost:3001/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!response.ok) throw new Error('Verification failed')
    return response.json()
  }

  const handlePay = async () => {
    if (!window.Razorpay) {
      toast.error('Payment SDK not loaded')
      return
    }
    if (!trackingId) {
      toast.error('Missing tracking id')
      return
    }

    try {
      setIsPaying(true)
      const { order, keyId } = await createOrder()

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency,
        name: 'Profixion',
        description: 'Audit Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const result = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              trackingId,
            })
            if (result.success) {
              toast.success('Payment successful')
            } else {
              toast.error(result.error || 'Payment verification failed')
            }
          } catch (err) {
            toast.error('Verification failed')
          }
        },
        prefill: {},
        theme: { color: '#111827' },
      }

      const rz = new window.Razorpay(options)
      rz.on('payment.failed', function () {
        toast.error('Payment failed')
      })
      rz.open()
    } catch (error) {
      console.error('Payment init error:', error)
      toast.error('Unable to start payment')
    } finally {
      setIsPaying(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handlePay}
      disabled={isPaying}
      className="mt-4 px-6 py-3 border border-gray-600 text-white rounded-xl hover:bg-gray-800 transition disabled:opacity-50"
    >
      {isPaying ? 'Processing…' : 'Pay Now'}
    </button>
  )
}





