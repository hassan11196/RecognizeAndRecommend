import React, { useEffect, useState } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Rating, Divider, Button, List, Image } from 'semantic-ui-react';
import Comments from '../Comments';
import Navbar from 'reactjs-navbar';
import axios from 'axios';

// import {NavBar} from '../NavBar'
import {
    faUsers,
    faBookOpen,
    faGlobe,
    faChartPie,
    faCogs /*...*/,
} from '@fortawesome/free-solid-svg-icons';
import logo192 from './logo192.png';
import 'reactjs-navbar/dist/index.css';

const API_URL = 'http://localhost:8000/';

function ProductDetails() {
    const [size, setSize] = useState(['S', 'M', 'L', 'XL']);
    const [color, setColor] = useState([
        {
            name: 'Black',
            hash: '#000000',
        },
        {
            name: 'Green',
            hash: '#008000',
        },
        {
            name: 'Pink',
            hash: '#FFC0CB',
        },
        {
            name: 'Blue',
            hash: '#0000FF',
        },
        {
            name: 'Brown',
            hash: '#964B00',
        },
    ]);
    const [colorIndex, setColorIndex] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [details, setDetails] = useState({});
    const [productName, setProductName] = useState('');
    const [productCurrency, setProductCurrency] = useState('');
    const [description, setProductDescription] = useState('');
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const [asin, setAsin] = useState("");
    const [reviews, setReviews] = useState([]);
    const getProductDetails = () => {
        var details = JSON.parse(localStorage.getItem('properties') || '{}');

        

        setAsin(details.asin)
        setDetails(details);
        setProductDescription(details.description);
        setProductName(details.title);
        setCategory(details.categories);
        setProductCurrency(details.currency);
        setPrice(details.price);
        console.log(details);
        axios
            .get(
                API_URL + 'recommendation/productreview-asin/' + details.asin,
            )
            .then(response => {
                console.log(response.data)
                setReviews(response.data)});
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
            {/* <NavBar/> */}
            <div style={{ margin: '1.5rem' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Detect Face</Breadcrumb.Item>
                    <Breadcrumb.Item href="/user-products">
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
                        showPlayButton={true}
                        autoPlay={true}
                        showFullscreenButton={true}
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

                    <h2 style={{ marginTop: '-5px' }}>
                        {productCurrency} {price}
                    </h2>
                    <span
                        style={{ display: 'inline-flex', paddingRight: '1rem' }}
                    >
                        <h5>{'Size:  '}</h5>
                    </span>
                    <span style={{ display: 'inline-flex' }}>
                        {size.map((size, i) => {
                            if (currentIndex === i) {
                                return (
                                    <Button key={i}
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
                        <Col xs={'2'}>
                            <h5 style={{ marginTop: '4px' }}>{'Color:  '}</h5>
                        </Col>
                        <Col xs={'10'} style={{ marginLeft: '-60px' }}>
                            {color.map((color, i) => {
                                return (
                                    <div style={{ display: 'inline-flex' }}>
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                height: '2rem',
                                                width: '2rem',
                                                backgroundColor: color.name,
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
                                        ></div>{' '}
                                        <List.Item
                                            style={{
                                                marginTop: '2px',
                                                marginLeft: '-10px',
                                                marginRight: '15px',
                                            }}
                                        >
                                            {color.hash}
                                        </List.Item>
                                    </div>
                                );
                            })}
                        </Col>
                    </Row>
                    <br></br>
                    {category.length > 0 ? (
                        <Row>
                            <Col xs="2">
                                <h5>Category :</h5>
                            </Col>
                            <Col style={{ marginLeft: '-50px' }}>
                                <List horizontal>
                                    {category.map((data, i) => {
                                        let { category, url } = data;
                                        console.log(url);
                                        return (
                                            <Button
                                                style={{ marginBottom: '2px' }}
                                                basic
                                            >
                                                {category}
                                            </Button>
                                        );
                                    })}
                                </List>
                            </Col>
                        </Row>
                    ) : null}
                </Col>
            </Row>
            <Comments reviews={reviews}/>
        </div>
    );
}

export default ProductDetails;
