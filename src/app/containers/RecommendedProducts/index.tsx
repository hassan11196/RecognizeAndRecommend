import React from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

import { ProductCard } from 'react-ui-cards';
import { ReactNavbar } from 'react-responsive-animate-navbar';
import { Redirect } from 'react-router-dom';
import { Header, Icon, Divider } from 'semantic-ui-react';
import Navbar from 'reactjs-navbar';
import logo192 from './logo192.png';

import {
    faUsers,
    faBookOpen,
    faGlobe,
    faChartPie,
    faCogs /*...*/,
} from '@fortawesome/free-solid-svg-icons';

export default function Products() {
    const [status, setStatus] = React.useState(false);
    const setProperties = details => {
        var properties = details;
        localStorage.setItem('properties', JSON.stringify(properties));
        console.log(properties);
        setStatus(true);
    };
    const details = [
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
