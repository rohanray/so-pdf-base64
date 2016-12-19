import React, { Component } from 'react'
const rp = require('request-promise-native')
require('pdfjs-dist')
PDFJS.workerSrc = 'pdfjs/build/pdf.worker.js'

function getBase64Pdf() {
  // request('http://localhost:5000/getBase64Pdf', function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     console.log(response.statusCode) // 200
  //     console.log(response.headers['content-type']) // 'image/png'
  //     // console.log(body)
  //   }
  // })

  let options = {
    method: 'GET',
    uri: 'http://localhost:5000/getBase64Pdf',
    resolveWithFullResponse: true
  }

  return rp(options)
    .then((response) => {
      if (response.statusCode !== 200) {
        console.error("http not 200 but : ", response.statusCode)
        return false
      } else {
        console.info("connected successfully : " + response.statusCode)
        return response
      }
    })
}

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
          console.error("http not 200 but : ", response.statusCode)
          return false
        } else {
          console.info("connected successfully : " + response.statusCode)
          // console.log('pdfData : ', response.body)
          let pdfData = atob(response.body)
          let uint8ArrayPdf = new Uint8Array(pdfData.length)
          for (let i = 0; i < pdfData.length; i++) {
            uint8ArrayPdf[i] = pdfData.charCodeAt(i)
          }
          let pdfjsframe = document.getElementById('pdfViewer');
          console.log("pdfjsframe : ",pdfjsframe.contentWindow.PDFViewerApplication)
          pdfjsframe.contentWindow.PDFViewerApplication.open(uint8ArrayPdf);
        }
      })
  }

  render() {
    return (
      // Add your component markup and other subcomponent references here.
      <div>
        <h1>{PDFJS.workerSrc}</h1>
      </div>
    );
  }
}
