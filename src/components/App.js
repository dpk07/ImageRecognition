import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isUploaded: true,
      isUploadSuccessfull: true
    };
  }
  handleChange(e) {
    const file = e.target.files[0];
    const splitName = e.target.value.split(".");
    const extension = splitName[splitName.length - 1];
    if (
      (extension.toLowerCase() === "jpg" ||
        extension.toLowerCase() === "png" ||
        extension.toLowerCase() === "jpeg") &&
      file.size < 5000000
    ) {
    } else {
      e.target.value = "";
    }
  }
  render() {
    const { isUploadSuccessfull, isUploaded } = this.state;
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">Upload your image</label>
            <input
              type="file"
              onChange={this.handleChange}
              className="form-control-file"
              accept=".jpg,.png"
            />
          </div>
          <div className="form-group">
            {isUploaded ? (
              isUploadSuccessfull ? (
                <span className="alert alert-success">Upload Successfull</span>
              ) : (
                <span className="alert alert-danger">
                  Image could not be uploaded
                </span>
              )
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="imgResolution">Image resolution</label>
            <input
              type="text"
              className="form-control"
              id="imgResolution"
              aria-describedby="resolutionHelp"
              placeholder="Image resolution"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="imgResolution">File type</label>
            <input
              type="text"
              className="form-control"
              id="fileType"
              aria-describedby="fileHelp"
              placeholder="File type"
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileSize">File size</label>
            <input
              type="text"
              className="form-control"
              id="fileSize"
              aria-describedby="fileSizeHelp"
              placeholder="File Size"
              disabled
            />
          </div>
        </form>
      </div>
    );
  }
}
export default App;
