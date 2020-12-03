import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from 'app/components/PageWrapper';

import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

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
    })
}

export function RecognitionPage() {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user',
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
                    alert("Model Loaded. Face Detection Will Start Now.")
                }

                );
        } else {
            await faceapi.nets.ssdMobilenetv1
                .loadFromUri('/models')
                .then(error => {
                    console.log('ssdMobilenetv1 Model Loaded', error);
                    alert("Model Loaded. Face Detection Will Start Now.")
                }
                );
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
                console.log(detection);

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
                console.log(croppedBase64);
            }
        }, 2000);
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
                        display: "none",
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
        </>
    );
}
