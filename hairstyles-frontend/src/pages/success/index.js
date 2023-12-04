import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import Layout from "../../components/Layout/Layout"
import { API_URL } from '../../utilities/urls'
import doneImg from "../../static/icons/done.svg"
import progressImg from "../../static/icons/progress.svg"
import { Container } from "../../styles/pages/Success.styled"
// import homeIco from "../../static/icons/home.svg"
import downloadIco from "../../static/icons/download.svg"
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cart.slice";
import Seo from '../../components/SEO/SEO'
import { useRef } from 'react'

const useOrder = (session_id) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            const fetchOrder = async () => {
                setLoading(true);
                try {
                    const res = await fetch(`${API_URL}/api/orders/confirm`, {
                        method: 'POST',
                        body: JSON.stringify({ checkout_session: session_id }),
                        headers: {
                            'Content-type': 'application/json',
                        },
                    });
                    const data = await res.json();
                    setOrder(data);
                    console.log(data)
                } catch (err) {
                    setOrder(null);
                }
                setLoading(false);
            };
            fetchOrder();
        }
    }, [session_id]);

    return { order, loading };
};


export default function Success() {
    const router = useRouter()
    const { session_id } = router.query
    const { order, loading } = useOrder(session_id)
    const [isDownloaded, setIsDownloaded] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch])
    const handleDownload = () => {
        setIsDownloaded(true);
    }
    return (
        <Layout>
            <Seo customTitle={"Success payment"} />
            <Container className='container'>
                <div className='successIcon'>
                    {loading ? (<Image className='loadingIco' alt="loading" src={progressImg} width={50} height={50} />) : (<Image alt="done" src={doneImg} width={50} height={50} />)}

                </div>
                <h2 className='orderSuccess'>Order placed successfully!</h2>
                {loading && <p className='orderStatus'>Wait! Your order is being processed</p>}
                {!loading && order && (
                    <>
                        <p className='orderStatus'>Your files are ready for download.<br />An email confirmation with a link to access your resources has been sent.</p>
                        {!isDownloaded && order?.linkToDownload && (
                            <Link href={order?.linkToDownload !== "blocked" ? order.linkToDownload : "/contact"}>
                                <a className="backHome" onClick={handleDownload}>
                                    <div className='backHomeWrapper'>
                                        <Image alt="home" src={downloadIco} width={24} height={24} />
                                        {order?.linkToDownload !== "blocked" ? "Download" : "Files blocked. Please contact customer service for information"}
                                    </div>
                                </a>
                            </Link>
                        )}
                        <div className='summary'>
                            <div className='summaryRow'>
                                <div className='summaryTitle'>Date</div> <div className='summaryValue'>{new Date(order?.data?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                            </div>
                            <div className='summaryRow'>
                                <div className='summaryTitle'>Email</div> <div className='summaryValue'>{order?.data?.email}</div>
                            </div>
                            <div className='summaryRow'>
                                <div className='summaryTitle'>Total</div> <div className='summaryValue'>${order?.data?.total.toFixed(2)}</div>
                            </div>
                            {/* <div className='summaryRow'>
                                <div className='summaryTitle'>Download</div> <div className='summaryValue'><a target={"_blank"} href={order.linkToDownload} rel="noreferrer">Click here to download</a></div>
                            </div> */}
                            <div className='summaryRow itemsRow'>
                                <div className='summaryTitle' style={{ marginBottom: "16px" }}>Items</div>
                                <div className='itemList'>
                                    {order?.items?.map(item => (
                                        <div className="offerWrapper" key={item.id}>
                                            <Image
                                                src={`${API_URL}${item.gallery[0].url}`}
                                                loader={() => `${API_URL}${item.gallery[0].url}`}
                                                width={164} height={100} alt={item.gallery[0].alt} />
                                            <div className='offerInfo'>
                                                <div className='offerTitle'>{item.title}</div>
                                                <div className='offerTags'>
                                                    {item?.type?.name} |{" "}
                                                    {item?.character?.name}{" "}
                                                    {item?.gender?.data?.attributes?.name} | {item?.color_variants}{" "}
                                                    <span style={{ textTransform: "lowercase" }}>{item?.color_variants > 1 ? "textures" : "texture"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {!isDownloaded && order?.linkToDownload && (
                    <Link href={order?.linkToDownload !== "blocked" ? order.linkToDownload : "/contact"}>
                        <a className="backHome" onClick={handleDownload}>
                            <div className='backHomeWrapper'>
                                <Image alt="home" src={downloadIco} width={24} height={24} />
                                {order?.linkToDownload !== "blocked" ? "Download" : "Files blocked. Please contact customer service for information"}
                            </div>
                        </a>
                    </Link>
                )}
                {/* <Link href={"/"}>
                    <a className="backHome">
                        <div className='backHomeWrapper'>
                            <Image alt="home" src={homeIco} width={24} height={24} />
                            Back to home
                        </div>
                    </a>
                </Link> */}
            </Container>
        </Layout >
    )
}