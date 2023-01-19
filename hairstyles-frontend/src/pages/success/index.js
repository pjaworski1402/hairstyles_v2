import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import Layout from "../../components/Layout/Layout"
import { API_URL } from '../../utilities/urls'
import doneImg from "../../static/icons/done.svg"
import { Container } from "../../styles/pages/Success.styled"
import homeIco from "../../static/icons/home.svg"

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${API_URL}/api/orders/confirm`, {
                    method: 'POST',
                    body: JSON.stringify({ checkout_session: session_id }),
                    headers: {
                        'Content-type': 'application/json',
                    }
                })
                const data = await res.json()
                setOrder(data)
            } catch (err) {
                setOrder(null)
            }
            setLoading(false)
        }
        fetchOrder()

    }, [])

    return { order, loading }
}

export default function Success() {

    const router = useRouter()
    const { session_id } = router.query
    const { order, loading } = useOrder(session_id)
    console.log(order)
    return (
        <Layout>
            <Container className='container'>
                <div className='successIcon'>
                    <Image src={doneImg} width={50} height={50} />
                </div>
                <h2 className='orderSuccess'>Order placed successfully!</h2>
                {loading && <p className='orderStatus'>We're confirming your purchase!</p>}
                {!loading && order && (
                    <p className='orderStatus'>Check your email. All files should be waiting for you!</p>
                )}
                <div className='summary'>
                    <div className='summaryRow'>
                        <div className='summaryTitle'>Date</div> <div className='summaryValue'>{new Date(order?.data?.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className='summaryRow'>
                        <div className='summaryTitle'>Email</div> <div className='summaryValue'>{order?.data?.email}</div>
                    </div>
                    <div className='summaryRow'>
                        <div className='summaryTitle'>Total</div> <div className='summaryValue'>${order?.data?.total}</div>
                    </div>
                </div>
                <Link href={"/"}>
                    <a className="backHome">
                        <div className='backHomeWrapper'>
                            <Image src={homeIco} width={24} height={24} />
                            Back to home
                        </div>
                    </a></Link>

            </Container>
        </Layout>
    )
}