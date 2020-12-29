import React, { useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

import { ProductCard } from 'react-ui-cards';
import { ReactNavbar } from 'react-responsive-animate-navbar';
import { Redirect } from 'react-router-dom';
import { Header, Icon, Divider } from 'semantic-ui-react';
import Navbar from 'reactjs-navbar';
import axios from 'axios';

import {
    faUsers,
    faBookOpen,
    faGlobe,
    faChartPie,
    faCogs /*...*/,
} from '@fortawesome/free-solid-svg-icons';
const API_URL = "http://localhost:8000/";
export default function Products() {
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
    ];
    const [status, setStatus] = React.useState(false);
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
                    let bulletsData = [];
                    // let pics:string = [];
                    let imagesData = [];
                    data['photos'] = data.images;
                    // pics.push(data.main_image);
                    // data['mainImage'] = pics;
                    data['price'] = data.price;
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
                    data['categories'] = categoryData;
                    data['feature_bullets'] = bulletsData;
                });

                setDetails(productData);
            });
    };
    const getUserDetails = () => {
        axios
            .get(
                API_URL + 'api/v1/users/me', {
                headers: {
                    "Authorization": "Token " + window.sessionStorage.getItem("auth_token")
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
            <div style={{ margin: '1rem' }}>
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
        </div>
    );
}
