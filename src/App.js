import React, {useRef} from 'react';
import './App.css';
import {Button} from "./components/Button";
import axios from "axios";

function App() {

    const ref = useRef()

    function sendPicture(imageBase64) {
        axios.post("http://localhost:8080/screenshot/", {imageBase64})
            .then(res => console.log(res))
            .catch(rej => {
            console.log(rej)
        })
    }

    const takeScreenShot = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia();
        const track = stream.getVideoTracks()[0];
        const image = new ImageCapture(track);
        const bitmap = await image.grabFrame();
        track.stop();

        ref.current.width = bitmap.width;
        ref.current.height = bitmap.height;
        const context = ref.current.getContext("2d");
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
        const img = ref.current.toDataURL("image/jpeg");
        const imageBase64 = ref.current.toDataURL("image/jpeg", 0.1).split(",")[1]

        saveBase64AsFile(img, "New screenshot")
        sendPicture(imageBase64)
    }

    function saveBase64AsFile(base64, fileName) {
        const link = document.createElement("a");
        link.setAttribute("href", base64);
        link.setAttribute("download", fileName);
        link.click();
    }


    return (
        <div className="App">
            <h2>Hi, there (ﾟ▽ﾟ)/ </h2>
            <Button onClick={takeScreenShot} width='200px'>Take screenshot</Button>
            <canvas style={{'position':'fixed','zIndex':'-1'}} ref={ref}></canvas>
        </div>
    );
}

export default App;
