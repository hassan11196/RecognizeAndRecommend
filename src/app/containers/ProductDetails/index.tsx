import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Rating, Divider, Button } from 'semantic-ui-react';
import Comments from '../Comments';
import Navbar from 'reactjs-navbar';
import {
    faUsers,
    faBookOpen,
    faGlobe,
    faChartPie,
    faCogs /*...*/,
} from '@fortawesome/free-solid-svg-icons';
import logo192 from './logo192.png';
import 'reactjs-navbar/dist/index.css';

function ProductDetails() {
    const [size, setSize] = useState(['S', 'M', 'L', 'XL']);
    const [color, setColor] = useState([
        'Black',
        'Green',
        'Pink',
        'Blue',
        'Brown',
    ]);
    const [colorIndex, setColorIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [details, setDetails] = useState({});
    const [productName, setProductName] = useState('');
    const [description, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const getProductDetails = () => {
        var details = JSON.parse(localStorage.getItem('properties') || '{}');
        setDetails(details);
        setProductDescription(details.description);
        setProductName(details.title);
        setPrice(details.price);
        console.log(details);
        var picsArray: any = [];
        var pictures: any = {
            original: '',
            thumbnail: '',
        };
        var length = details.photos.length;
        console.log(length);
        var i = 0;
        for (i = 0; i < length; i++) {
            pictures.original = details.photos[i] || '';
            pictures.thumbnail = details.photos[i] || '';
            picsArray.push(pictures);
        }
        setImages(picsArray);
    };
    useEffect(() => {
        getProductDetails();
    }, []);
    return (
        <div style={{ marginTop: '-57px' }}>
            <Navbar
                // logo={logo192}
                helpCallback={() => {
                    alert('I need help... and coffee...');
                }}
                menuItems={[
                    {
                        title: 'Administration',
                        icon: faUsers,
                        isAuth: true,
                        onClick: () => {
                            // What you want to do...
                            alert('Its coffee time...');
                        },
                    },
                    {
                        title: 'Transactions',
                        icon: faBookOpen,
                        isAuth: () => {
                            // Claim authorization logic...
                            return false;
                        },
                    },
                    {
                        title: 'Networks',
                        icon: faGlobe,
                        isAuth: true,
                    },
                    {
                        title: 'Settings',
                        icon: faCogs,
                        isAuth: true,
                    },
                    {
                        title: 'Reports',
                        icon: faChartPie,
                        isAuth: true,
                    },
                ]}
            />
            <div style={{ margin: '1.5rem' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Detect Face</Breadcrumb.Item>
                    <Breadcrumb.Item href="/products">
                        Recommended Products
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{productName}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Row style={{ margin: '1rem' }}>
                <Col xs={5}>
                    <ImageGallery
                        useBrowserFullscreen={false}
                        items={images}
                        showPlayButton={false}
                        autoPlay={true}
                        showFullscreenButton={false}
                        showBullets={true}
                    />
                </Col>
                <Col xs="7">
                    <h1>{productName}</h1>
                    <div style={{ display: 'flex' }}>
                        <p>{description}</p>
                    </div>
                    <div style={{ marginTop: '5px' }}>
                        <Rating
                            maxRating={5}
                            defaultRating={3}
                            icon="star"
                            size="large"
                        />
                        {'   2 Reviews'}
                    </div>
                    <Divider inverted />

                    <h2 style={{ marginTop: '-5px' }}>PKR {price}</h2>
                    <span
                        style={{ display: 'inline-flex', paddingRight: '1rem' }}
                    >
                        <h5>{'Size:  '}</h5>
                    </span>
                    <span style={{ display: 'inline-flex' }}>
                        {size.map((size, i) => {
                            if (currentIndex === i) {
                                return (
                                    <Button
                                        basic
                                        color="blue"
                                        onClick={() => {
                                            setCurrentIndex(i);
                                        }}
                                    >
                                        {size}
                                    </Button>
                                );
                            } else {
                                return (
                                    <Button
                                        basic
                                        onClick={() => {
                                            setCurrentIndex(i);
                                        }}
                                    >
                                        {size}
                                    </Button>
                                );
                            }
                        })}
                    </span>
                    <br />
                    <Row style={{ marginTop: '1rem' }}>
                        <Col xs={'1'}>
                            <h5 style={{ marginTop: '4px' }}>{'Color:  '}</h5>
                        </Col>
                        <Col xs={'11'}>
                            {color.map((color, i) => {
                                return (
                                    <div
                                        style={{
                                            display: 'inline-flex',
                                            height: '2rem',
                                            width: '2rem',
                                            backgroundColor: color,
                                            borderRadius: '50%',
                                            borderColor:
                                                colorIndex === i
                                                    ? 'white'
                                                    : 'black',
                                            marginRight: '1rem',
                                        }}
                                        onClick={() => {
                                            setColorIndex(i);
                                        }}
                                    ></div>
                                );
                            })}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Comments />
        </div>
    );
}

export default ProductDetails;
