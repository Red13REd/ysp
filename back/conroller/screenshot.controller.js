const axios = require('axios');
const fs = require('fs');
const uuid = require('uuid');


class screenshotController {
     sendScreenshot(req, res) {
        let {imageBase64} = req.body

        let data = {
            "folderId": "someFolderId",
            "analyze_specs": [{
                "content": `${imageBase64}`,
                "features": [{
                    "type": "TEXT_DETECTION",
                    "text_detection_config": {
                        "language_codes": ["*"]
                    }
                }]
            }]
        }

        axios.post('https://vision.api.cloud.yandex.net/vision/v1/batchAnalyze', data, {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Api-Key SomeApi-Key`,
                    "Accept": "application/json"
                }})
            .then(r=> {

                let text = r.data.results[0].results[0].textDetection.pages[0].blocks
                    .map(f => f.lines[0].words.map(f => f.text).join(" ")).join()

                fs.writeFile(`../../${uuid.v1()}.txt`, text, function (err) {
                    if (err) return console.log(err);
                    console.log('txt file write');
                });
                res.json('Ok')
            })
            .catch(err=> res.json(err))

    }

}

module.exports = new screenshotController()