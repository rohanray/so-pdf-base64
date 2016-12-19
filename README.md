# Render PDF from base64 data using PDF.js

This is a sample project using React on the client to showcase rendering of PDF from base64 data fetched from a 3rd party.

Answering my own question here: http://stackoverflow.com/questions/40170381/display-embedded-pdf-in-internet-explorer-11-from-binary-string-or-base64

### Usage

```sh
npm install
node index
```

### Running
Then open browser and go to `http://localhost:3000`

# What & How

There are 2 main folders in this app:
* `express-sourcepdf`: This is a simple Express app running at `http://localhost:5000`. This app sends the PDF in base64 format. The sample PDF can be seen inside `express-sourcepdf` folder with the name `lorem-ipsum.pdf`. The base64 PDF can be seen at `http://localhost:5000/getBase64Pdf`.
* `express-pdfjs`: This is the react app used to render the PDF on the client using https://github.com/mozilla/pdf.js/ library. This runs at `http://localhost:3000`.

Please note that this might not be the best way to render using React. Originally I had a requirement to render the PDF in a Meteor app (will share a Meteor app soon). This is more like a learning project for me in React.

### Keypoint in rendering a base64 PDF using PDF.js library 
* First decode it using atob
* Then initializing a Uint8Array using above decoded data

### Abstract from express-pdfjs/scripts/App.js
```javascript
let options = {
      method: 'GET',
      uri: 'http://localhost:5000/getBase64Pdf',
      resolveWithFullResponse: true
    }
    rp(options)
      .then((response) => {
        if (response.statusCode !== 200) {
          console.error('http not 200 but : ', response.statusCode)
        } else {
          console.info('connected successfully : ' + response.statusCode)
          let pdfData = atob(response.body)
          let uint8ArrayPdf = new Uint8Array(pdfData.length)
          for (let i = 0; i < pdfData.length; i++) {
            uint8ArrayPdf[i] = pdfData.charCodeAt(i)
          }
          let pdfjsframe = document.getElementById('pdfViewer');
          pdfjsframe.contentWindow.PDFViewerApplication.open(uint8ArrayPdf);
        }
      })
```

pdfViewer is an iframe as can be seen in `/index.html` This initially loads the pdf viewer

### Pdf Viewer
This is currently using a full blown viewer which is present at `express-pdfjs/pdfViewer/web` 

Please refer to https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions for further details.
