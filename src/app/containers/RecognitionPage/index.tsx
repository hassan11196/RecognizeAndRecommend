import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { Modal, Button, Form } from 'react-bootstrap';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import axios from 'axios';

let NETLIFY_URL = 'recognize-and-recommend.netlify.app';

function image64toCanvasRef(
    canvasRef: HTMLCanvasElement | null,
    image64,
    pixelCrop,
) {
    return new Promise(resolve => {
        const canvas = canvasRef; // document.createElement('canvas');
        // @ts-ignore
        canvas.width = pixelCrop.width;
        // @ts-ignore
        canvas.height = pixelCrop.height;
        // @ts-ignore
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = image64;
        image.onload = function (e) {
            // @ts-ignore
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height,
            );
            // @ts-ignore
            resolve(canvas?.toDataURL());
        };
        // @ts-ignore
        // return canvas.toDataURL();
    });
}

export function RecognitionPage() {
    const [status, setStatus] = useState(true);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const [newUserName, setNewUserName] = useState('');
    const [userPic, setUserPic] = useState('');
    const handleClose = () => setShow(false);

    const onChange = e => {
        console.log(e.target.value);
        setNewUserName(e.target.value);
    };
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
    };
    const submitUserData = () => {
        handleClose();
        let remote_url = '';
        if (process.env.NODE_ENV == 'development') {
            remote_url = 'https://recognize-and-recommend.herokuapp.com/';
        } else {
            remote_url = 'https://recognize-and-recommend.herokuapp.com/';
        }
        let payload = {
            username: newUserName,
            profile_photo: userPic,
        };
        axios.post(remote_url + 'api/v1/users/', payload).then(response => {
            console.log(response.data);
            // let data = response.data;
            // setShowAlert(false)
            // setShow(true)
            // if(data === 'unknown'){
            // setStatus(false)
            // }
            // if(showAlert === true){
            //     alert("User is " + data.name);
            // }
        });
    };
    const webcamRef = React.useRef(null);
    const detectFace = async function () {
        console.log('Hwllo');

        console.log(0);
        if (process.env.NODE_ENV == 'development') {
            await faceapi.nets.ssdMobilenetv1
                .loadFromUri('/models')
                .then(error => {
                    console.log('ssdMobilenetv1 Model Loaded', error);
                    // alert("Model Loaded. Face Detection Will Start Now.")
                });
        } else {
            await faceapi.nets.ssdMobilenetv1
                .loadFromUri('/models')
                .then(error => {
                    console.log('ssdMobilenetv1 Model Loaded', error);
                    alert('Model Loaded. Face Detection Will Start Now.');
                });
        }

        // const input = document.getElementsByTagName('video')[0];
        // console.log(1);
        // // @ts-ignore
        // const detection = await faceapi.detectSingleFace(input);
        // console.log(2);
        // console.log(detection);

        setInterval(async () => {
            // @ts-ignore: Object is possibly 'null'.
            //   const imageSrc = webcamRef?.current?.getScreenshot();
            //   console.log(imageSrc)

            const input = document.getElementsByTagName('video')[0];
            // @ts-ignore
            const detection = await faceapi.detectSingleFace(input);
            if (detection != undefined) {
                // console.log(detection);

                const displaySize = videoConstraints;
                const canvas = document.getElementById('overlay');

                // @ts-ignore
                const dims = faceapi.matchDimensions(canvas, input, true);
                // @ts-ignore
                faceapi.draw.drawDetections(
                    // @ts-ignore
                    canvas,
                    faceapi.resizeResults(detection, displaySize),
                );

                const croppedCanvas = document.getElementById('croppedOverlay');
                // @ts-ignore
                const base64Image = webcamRef?.current?.getScreenshot();
                // console.log(base64Image)
                const myCrop = {
                    x: detection.box.x,
                    y: detection.box.y,
                    width: detection.box.width,
                    height: detection.box.height,
                };
                let croppedBase64 = await image64toCanvasRef(
                    // @ts-ignore
                    croppedCanvas,
                    base64Image,
                    myCrop,
                );
                // @ts-ignore
                setUserPic(croppedBase64);
                console.log(croppedBase64);
                let payload = {
                    face: croppedBase64,
                };
                let remote_url;
                if (process.env.NODE_ENV == 'development') {
                    remote_url =
                        'https://recognize-and-recommend.herokuapp.com/';
                } else {
                    remote_url =
                        'https://recognize-and-recommend.herokuapp.com/';
                }
                if (show === false) {
                    axios
                        .post(
                            remote_url + 'recognition/recognize-face',
                            payload,
                        )
                        .then(response => {
                            console.log(response.data);
                            let data = response.data;
                            setShowAlert(false);
                            setShow(true);
                            // if(data === 'unknown'){
                            setStatus(false);
                            // }
                            // if(showAlert === true){
                            //     alert("User is " + data.name);
                            // }
                        });
                }
            }
        }, 20000);
    };

    useEffect(() => {
        detectFace();
    });
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Recognize and Recommend." />
            </Helmet>
            {/* <NavBar /> */}
            <PageWrapper>
                <Webcam
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundSize: 'cover',
                        width: '100%',
                        minHeight: '100%',
                    }}
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                />
                <canvas
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundSize: 'cover',
                        width: '100%',
                        minHeight: '100%',
                    }}
                    id="overlay"
                ></canvas>
                <canvas
                    style={{
                        display: 'none',
                        position: 'relative',
                        top: 0,
                        left: 0,
                        backgroundSize: 'cover',
                        width: '100%',
                        minHeight: '100%',
                    }}
                    id="croppedOverlay"
                ></canvas>
            </PageWrapper>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Enter Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="newUserName"
                            onChange={onChange}
                            placeholder="Enter Name"
                        />
                        <Form.Text className="text-muted">
                            We'll never share your data with anyone else.
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitUserData}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
