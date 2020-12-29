import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

import { ProductCard, UserCard } from 'react-ui-cards';

import { ReactNavbar } from 'react-responsive-animate-navbar';
import { Redirect } from 'react-router-dom';
import {
    Header,
    Icon,
    Divider,
    Dimmer,
    Loader,
    Image,
    Segment,
} from 'semantic-ui-react';
import Navbar from 'reactjs-navbar';
import axios from 'axios';
import pic from './bg.png';

import {
    faUsers,
    faBookOpen,
    faGlobe,
    faChartPie,
    faCogs /*...*/,
} from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:8000/"
export default function UserProducts() {
    const detail = [
        {
            photos: [
                'https://i.imgur.com/jRVDeI8.jpg',
                'https://i.imgur.com/raPe27t.jpg',
                'https://i.imgur.com/IpEsYSH.jpg',
            ],
            price: '$99',
            productName: 'Headphones',
            description:
                'Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.',
            buttonText: 'Add to cart',
            rating: 3,
            url: 'https://github.com/nukeop',
            currency: '',
            mainImage: '',
        },
    ];
    const [status, setStatus] = React.useState(false);
    const [loader, setLoader] = React.useState(true);
    const [category, setCategory] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [price, setPrice] = React.useState([]);
    const [bullets, setBullets] = React.useState([]);
    const [details, setDetails] = React.useState(detail);
    const [userDetails, setUserDetails] = React.useState({ username: '' });

    const setProperties = details => {
        var properties = details;
        localStorage.setItem('properties', JSON.stringify(properties));
        console.log(properties);
        setStatus(true);
    };
    const getCategories = () => {
        axios
            .get(
                API_URL + 'recommendation/category/',
            )
            .then(response => {
                console.log(response.data);
                setCategory(response.data);
            });
    };
    const getImages = () => {
        axios
            .get(
                API_URL + 'recommendation/productimage/',
            )
            .then(response => {
                console.log(response.data);
                setImages(response.data);
            });
    };
    const getPrice = () => {
        axios
            .get(
                API_URL + 'recommendation/productprice/',
            )
            .then(response => {
                console.log(response.data);
                setPrice(response.data);
            });
    };
    const getBullets = () => {
        axios
            .get(
                API_URL + 'recommendation/productfeaturebullet/',
            )
            .then(response => {
                console.log(response.data);
                setBullets(response.data);
            });
    };
    const getProducts = () => {
        axios
            .get(
                API_URL + 'recommendation/recommended-products', {
                    headers: {
                        "Authorization": "Token " + window.sessionStorage.getItem("auth_token")
                    }
                }
            )
            .then(response => {
                console.log(response.data);
                let productData = response.data;
                productData.map((data, i) => {
                    let categoryData = [];
                    let priceData = '';
                    let pics = [];
                    let bulletsData = [];
                    let imagesData = [];
                    // pics.push(data.main)
                    data['photos'] = data.images;

                    data['newImage'] = data['price'] = data.price;
                    if (data.title.length > 20) {
                        data['productName'] = data.title.slice(0, 20) + ' ...';
                    } else {
                        data['productName'] = data.title;
                    }
                    data['title'] = data.title;
                    data['description'] = data.description;
                    data['buttonText'] = 'Add to cart';
                    data['rating'] = 3;
                    data.categories.map((cat, i) => {
                        if (cat < category.length) {
                            categoryData = [...categoryData, category[cat]];
                        }
                    });
                    if (price.length > data.price) {
                        priceData = price[data.price];
                        data.currency = priceData['currency'];
                        data.price =
                            priceData['symbol'] +
                            priceData['current_price'].toString();
                    }
                    data.images.map((cat, i) => {
                        if (cat < images.length) {
                            // let newImage:any = images[cat]['image'];
                            imagesData = [...imagesData, images[cat]['image']];
                        }
                    });
                    data.feature_bullets.map((cat, i) => {
                        if (cat < bulletsData) {
                            bulletsData = [
                                ...bulletsData,
                                bullets[cat]['feature_bullet'],
                            ];
                        }
                    });
                    if (images.length) data['images'] = imagesData;
                    data['photos'] = imagesData;
                    if (data.main_image !== null) {
                        data['photos'] = [data.main_image, ...data['photos']];
                    }
                    data['categories'] = categoryData;
                    data['feature_bullets'] = bulletsData;
                });

                setDetails(productData);
            })
            .then(res => {
                setLoader(false);
                console.log(loader);
            });
    };
    const getUserDetails = () => {
        console.log("I am fetechin user details" + window.sessionStorage.getItem("auth_token"))
        axios
            .get(
                API_URL + 'api/v1/users/me', {
                headers: {
                    
                    
                    'Authorization': 'Token  ' + window.sessionStorage.getItem("auth_token"), 
           
                }
            }
            ).then(response => {
                console.log(response);
                setUserDetails(response.data)
            })
    }
    useEffect(() => {
        getCategories();
        getBullets();
        getImages();
        getPrice();
        getUserDetails();
    }, []);
    useEffect(() => {
        if (
            category.length > 0 &&
            images.length > 0 &&
            price.length > 0 &&
            bullets.length > 0
        ) {
            getProducts();
        }
    }, [category, bullets, images, price]);

    if (status === true) {
        return <Redirect to="/details" />;
    }
    return (
        <div style={{ marginTop: '-57px' }}>
            <Navbar
                // logo={logo192}
                helpCallback={() => {
                    alert('I need help... and coffee...');
                }}
                menuItems={[
                    {
                        title: 'User : ' + userDetails.username,
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
            <div style={{ margin: '1rem' }}>
                <Breadcrumb>
                    <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Detect Face</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Recommended Products
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>

            {loader === true ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="medium">Loading</Loader>
                    </Dimmer>

                    <Image src={pic} style={{ opacity: '0.5' }} />
                </Segment>
            ) : (
                    <div style={{ marginRight: '2rem' }}>
                        <Row>
                            {details.map((product, i) => {
                                return (
                                    <Col
                                        xs="3"
                                        key={i}
                                        style={{ marginBottom: '1rem' }}
                                    >
                                        <ProductCard
                                            onClick={() => {
                                                setProperties(product);
                                            }}
                                            photos={product.photos}
                                            price={product.price}
                                            productName={product.productName}
                                            description={product.description}
                                            buttonText={product.buttonText}
                                            rating={product.rating}
                                            url={product.url}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                )}
            {/* <UserCard
          float
          href='https://github.com/nukeop'
          header='https://i.imgur.com/p5yXGQk.jpg'
          avatar='https://i.imgur.com/kFkyYkZ.jpg'
          name='Joseph Cheps'
          positionName='Firmware Engineer'
          stats={[
            {
              name: 'commits',
              value: 365
            },
            {
              name: 'stars',
              value: 110
            },
            {
              name: 'repositories',
              value: 54
            }
          ]}
        />
             */}
        </div>
    );
}
