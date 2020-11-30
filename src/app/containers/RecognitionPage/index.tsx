import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from 'app/components/PageWrapper';

import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';

let NETLIFY_URL = 'recognize-and-recommend.netlify.app'

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
                .then(error => console.log('ssdMobilenetv1 Model Loaded', error));

        } else {
            await faceapi.nets.ssdMobilenetv1
                .loadFromUri('/models')
                .then(error => console.log('ssdMobilenetv1 Model Loaded', error));

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
                const dims = faceapi.matchDimensions(canvas, input, true)
                // @ts-ignore
                faceapi.draw.drawDetections(canvas, faceapi.resizeResults(detection, displaySize))

            }

        }, 1000);
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
                <Webcam style={{ position: "absolute", top: 0, left: 0, backgroundSize: "cover", width: "100%", minHeight: "100%" }} ref={webcamRef} videoConstraints={videoConstraints} />
                <canvas style={{ position: "absolute", top: 0, left: 0, backgroundSize: "cover", width: "100%", minHeight: "100%" }} id="overlay"></canvas>
            </PageWrapper>
        </>
    );
}
