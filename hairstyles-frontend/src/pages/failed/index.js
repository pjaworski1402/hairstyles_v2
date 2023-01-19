import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import Layout from "../../components/Layout/Layout"
import { API_URL } from '../../utilities/urls'
import failedImg from "../../static/icons/failed.svg"
import { Container } from "../../styles/pages/Failed.styled"
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

export default function Failed() {

    const router = useRouter()
    const { session_id } = router.query
    const { order, loading } = useOrder(session_id)
    console.log(order)
    return (
        <Layout>
            <Container className='container'>
                <div className='failedIcon'>
                    <Image src={failedImg} width={50} height={50} />
                </div>
                <h2 className='orderFailed'>Payment Failed</h2>
                {loading && <p className='orderStatus'>Loading...</p>}
                {!loading && order && (
                    <p className='orderStatus'>{order.error}</p>
                )}
                <div className='buttonWrapper'>
                    <Link href={"/contact"}>
                        <a className="navButton">
                            <div className='navButtonWrapper'>
                                Contact us
                            </div>
                        </a>
                    </Link>
                    <Link href={"/cart"}>
                        <a className="navButton">
                            <div className='navButtonWrapper'>
                                Back to cart
                            </div>
                        </a>
                    </Link>
                </div>
            </Container>
        </Layout>
    )
}