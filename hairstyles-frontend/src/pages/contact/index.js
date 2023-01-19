import React, { useEffect, useRef, useState } from 'react';
import Layout from "../../components/Layout/Layout"
import { Container } from "../../styles/pages/Contact.styled"
import Image from 'next/image';
import discordImg from "../../static/images/discord.svg"
import mailImg from "../../static/images/mail.svg"
import facebookImg from "../../static/images/facebook.svg"
import youtubeImg from "../../static/images/youtube.svg"
import instagramImg from "../../static/images/instagram.svg"
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';
import emailjs from '@emailjs/browser';
import { getCookie, setCookie } from '../../hooks/useCookie';

const Contact = () => {
    const [valueMessage, setValueMessage] = useState("");
    const textAreaRef = useRef(null);
    const form = useRef();
    const [isSent, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useAutosizeTextArea(textAreaRef.current, valueMessage);

    const handleChange = (e) => {
        const val = e.target?.value;
        setValueMessage(val);
    };

    useEffect(() => {
        const emailContact = getCookie('emailContact');
        setIsSent(emailContact);
    })

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        if (valueMessage.length <= 255) {
            emailjs.sendForm('service_l51xvgr', 'template_a1l9kgu', form.current, 'zMXb78t_2oyf_LsOj')
                .then((result) => {
                    console.log(result.text);
                    setIsSent(true);
                    setCookie('emailContact', true, {
                        days: 1,
                    });
                    setIsSending(false);
                }, (error) => {
                    console.log(error.text);
                    setIsSending(false);
                });
        }
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
                <form className='form' ref={form} onSubmit={sendEmail}>
                    <label className='label'>
                        <div className='labelText'>Your e-mail*</div>
                        <input required type="email" name="user_email" className='input' placeholder='Type your e-mail' />
                    </label>
                    <label className='label'>
                        <div className='labelText'>Your question*</div>
                        <textarea id="question"
                            onChange={handleChange}
                            ref={textAreaRef}
                            rows={1}
                            value={valueMessage}
                            className='input'
                            placeholder='Write your question'
                            required
                            name="message" />
                        <div className={`messageLength${valueMessage.length > 255 ? " red" : ""}`}>{valueMessage.length}/255</div>
                    </label>
                    {isSent ? "Your e-mail has been sent to hairstyles support." : (
                        <button disabled={isSending} className='sendButton'>Send</button>
                    )}
                </form>
            </Container>
        </Layout>
    );
}

export default Contact;