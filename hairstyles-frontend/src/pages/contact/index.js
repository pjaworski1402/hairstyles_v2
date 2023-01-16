import React, { useRef, useState } from 'react';
import Layout from "../../components/Layout/Layout"
import { Container } from "../../styles/pages/Contact.styled"
import Image from 'next/image';
import discordImg from "../../static/images/discord.svg"
import mailImg from "../../static/images/mail.svg"
import facebookImg from "../../static/images/facebook.svg"
import youtubeImg from "../../static/images/youtube.svg"
import instagramImg from "../../static/images/instagram.svg"
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';

const Contact = () => {
    const [value, setValue] = useState("");
    const textAreaRef = useRef(null);

    useAutosizeTextArea(textAreaRef.current, value);

    const handleChange = (e) => {
        const val = e.target?.value;
        setValue(val);
    };
    return (
        <Layout>
            <Container className='container'>
                <h1 className='title'>Contact</h1>
                <h2 className='subtitle'>Do you have any problem or maybe you have an idea?</h2>
                <p className='text'>You can contact us using:</p>
                <div className='mediaWrapper'>
                    <a href='/'>
                        <Image src={discordImg} width={50} height={50} />
                    </a>
                    <a href='/'>
                        <Image src={mailImg} width={50} height={50} />
                    </a>
                    <a href='/'>
                        <Image src={facebookImg} width={50} height={50} />
                    </a>
                    <a href='/'>
                        <Image src={youtubeImg} width={50} height={50} />
                    </a>
                    <a href='/'>
                        <Image src={instagramImg} width={50} height={50} />
                    </a>
                </div>
                <p className='text2'>or</p>
                <form className='form'>
                    <label className='label'>
                        <div className='labelText'>Your e-mail:</div>
                        <input className='input' placeholder='Type your e-mail' style={{ width: "50%" }} />
                    </label>
                    <label className='label'>
                        <div className='labelText'>Your question:</div>
                        <textarea id="question"
                            onChange={handleChange}
                            ref={textAreaRef}
                            rows={1}
                            value={value}
                            className='input'
                            placeholder='Write your question'
                            style={{ width: "100%" }} />
                    </label>
                    <button className='sendButton'>Send</button>
                </form>
            </Container>
        </Layout>
    );
}

export default Contact;