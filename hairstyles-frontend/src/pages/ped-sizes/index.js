import React from 'react';
import { Container } from "../../styles/pages/PedSizes.styled"
import pedSizes from "../../static/images/pedSizes.png"
import Image from "next/image";
import Layout from '../../components/Layout/Layout';

const PedSizes = () => {
    return (
        <Layout>
            <Container className="container">
                <h1 className='title'>Ped sizes</h1>
                <div className='description'>
                    <p>The sizes of peds are seen in the image below.</p>
                    <p>Each peds is selected # according to the size. Please choose the right size for you.</p>
                    <p className='warning'><span className='red'>Warning!</span> After purchase, you cannot exchange the model for a larger or smaller one. Please make your purchase wisely.</p>
                </div>
                <Image src={pedSizes} width={1613} height={1171} />
            </Container>
        </Layout>);
}

export default PedSizes;