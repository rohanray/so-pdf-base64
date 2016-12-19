import React, { Component } from 'react'
const rp = require('request-promise-native')
require('pdfjs-dist')
PDFJS.workerSrc = 'pdfjs/build/pdf.worker.js'

export default class App extends Component {

  constructor(props) {
    super(props);
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
          // console.log('pdfData : ', response.body)
          let pdfData = atob(response.body)
          let uint8ArrayPdf = new Uint8Array(pdfData.length)
          for (let i = 0; i < pdfData.length; i++) {
            uint8ArrayPdf[i] = pdfData.charCodeAt(i)
          }
          let pdfjsframe = document.getElementById('pdfViewer');
          // console.log("pdfjsframe : ", pdfjsframe.contentWindow.PDFViewerApplication)
          pdfjsframe.contentWindow.PDFViewerApplication.open(uint8ArrayPdf);
        }
      })
  }

  render() {
    return (
      <div/>
    );
  }
}
