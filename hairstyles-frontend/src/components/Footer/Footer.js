import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { getStrapiMedia } from '../../lib/media';
import { GlobalContext } from '../../pages/_app';
import { Container } from './Footer.styled';
import discordImg from "../../static/images/discord.svg"
import mailImg from "../../static/images/mail.svg"
import facebookImg from "../../static/images/facebook.svg"
import youtubeImg from "../../static/images/youtube.svg"
import instagramImg from "../../static/images/instagram.svg"

const Footer = () => {
    const { global, menu, desktopMenu } = useContext(GlobalContext);
    const { logo, siteName } = global.attributes;
    console.log(global)
    return (
        <Container>
            <div className='wrapper container'>
                <div className='logoWrapper'>
                    <Link href={"/"}>
                        <a className='logo'>
                            <Image
                                loader={() => getStrapiMedia(logo)}
                                src={getStrapiMedia(logo)}
                                width={35}
                                height={35}
                                unoptimized
                            />
                            <div className='logoText'>{siteName}</div>
                        </a>
                    </Link>
                </div>
                <div className='navWrapper'>
                    <div className='navItem'>
                        <div className='navTitle'>Items</div>
                        <div className='navLinks'>
                            <Link href={`/results?type=["top","dress","bottom","hat","shoes","accessories"]&price=[1,200]`}>Clothes</Link>
                            <Link href={`/results?type=["long","medium","short"]&price=[1,200]`}>Hairstyles</Link>
                            <Link href={`/results?type=["ped","baby","child1","child2","teen","adult","other"]&price=[1,200]`}>Peds</Link>
                            <Link href={"/ped-sizes"}>Ped sizes</Link>
                        </div>
                    </div>
                    <div className='navItem'>
                        <div className='navTitle'>Informations</div>
                        <div className='navLinks'>
                            <Link href={"/"}>Privacy Policy</Link>
                            <Link href={"/"}>Terms and Conditions</Link>
                            <Link href={"/"}>Cookies info</Link>
                            <Link href={"/"}>Refund and Returns Policy</Link>
                        </div>
                    </div>
                    <div className='navItem'>
                        <div className='navTitle'>About us</div>
                        <div className='navLinks'>
                            <Link href={"/"}>About hairstyles-gta5</Link>
                            <Link href={"/"}>Contact us</Link>
                        </div>
                    </div>
                    {/* <div className='navItem'>
                        <div className='navTitle'>Your style</div>
                        <div className='navLinks'>
                            <Link href={"/"}>Create your style</Link>
                            <Link href={"/"}>Request for a custom item</Link>
                        </div>
                    </div> */}
                </div>
                <div className='copyright'>
                    © 2020-2023 hairstyles-gta5.com • Site created by Piotr Jaworski
                    <div className='contact'>
                        <a href={global.attributes.discordLink}>
                            <Image src={discordImg} width={20} height={20} />
                        </a>
                        <a href={global.attributes.email}>
                            <Image src={mailImg} width={20} height={20} />
                        </a>
                        <a href={global.attributes.facebookLink}>
                            <Image src={facebookImg} width={20} height={20} />
                        </a>
                        <a href={global.attributes.youtubeLink}>
                            <Image src={youtubeImg} width={20} height={20} />
                        </a>
                        <a href={global.attributes.instagramLink}>
                            <Image src={instagramImg} width={20} height={20} />
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Footer;