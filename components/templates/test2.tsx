import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const Login = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userFaceDescriptor, setUserFaceDescriptor] = useState<any>(null);
  const [inputFaceDescriptor, setInputFaceDescriptor] = useState<any>(null);
  const [mediaStream, setMediaStream] = useState<any>(null);

  useEffect(() => {
    // Load face recognition models
    if (!inputFaceDescriptor) {
      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
      ]).then(startRecognition);
    }
  }, [inputFaceDescriptor]);

  useEffect(() => {
    const faceMatcher = userFaceDescriptor
      ? new faceapi.FaceMatcher([
          new faceapi.LabeledFaceDescriptors('user', [userFaceDescriptor])
        ])
      : null;
    const bestMatch = inputFaceDescriptor
      ? faceMatcher?.findBestMatch(inputFaceDescriptor)
      : null;
    if (bestMatch?.label === 'user') {
      // setLoggedIn(true);
    }
  }, [inputFaceDescriptor, userFaceDescriptor]);

  const startRecognition = async () => {
    // Get video element from DOM
    const video: any = document.getElementById('video');

    // Start video stream
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        video.srcObject = stream;
        setMediaStream(stream);
      })
      .catch((err) => {
        console.error('Could not start video stream', err);
      });

    // Start face recognition
    const recognition = new faceapi.FaceRecognitionNet();
    recognition.load('/models').then(() => {
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();
        if (detections.length > 0) {
          setUserFaceDescriptor(detections[0].descriptor);
          // setLoggedIn(true);
        }
      }, 1000);
    });
  };

  console.log('userFaceDescriptor', userFaceDescriptor);
  console.log('inputFaceDescriptor', inputFaceDescriptor);
  console.log('mediaStream', mediaStream);

  return (
    <>
      {!inputFaceDescriptor ? (
        <div>
          <h2>Please input your face</h2>
          <div
            style={{ position: 'relative', width: '320px', height: '240px' }}>
            <video
              id="video"
              style={{
                position: 'absolute',
                width: '320px',
                height: '240px',
                transform: 'rotateY(180deg)'
              }}
              muted
              autoPlay
            />
            <div style={{ position: 'relative' }}>
              ini coba aja lorem ipsum doler sit Lorem ipsum dolor sit.
            </div>
          </div>
          <button
            onClick={async () => {
              const video: any = document.getElementById('video');
              const detections = await faceapi
                .detectSingleFace(video)
                .withFaceLandmarks()
                .withFaceDescriptor();
              if (detections) {
                setInputFaceDescriptor(detections.descriptor);
                // setLoggedIn(true);
                mediaStream.getTracks()[0].stop();
              }
            }}>
            Save Face
          </button>
        </div>
      ) : (
        <div>
          <h2>You are logged in!</h2>
          <button
            onClick={() => {
              // setLoggedIn(false);
              setInputFaceDescriptor(null);
            }}>
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
