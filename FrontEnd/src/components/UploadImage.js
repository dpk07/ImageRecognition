import React, { Component } from "react";
import { uploadImage } from "../services/ImageUpload.service";
export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isUploaded: false,
      isUploadSuccessfull: false,
      file: null,
      fileSize: null,
      fileType: null,
      errorMessage: null
    };
  }

  /**
   * Sets the selected file in the state
   * and updates the state with latest data
   * @param {event object} e
   */
  handleChange(e) {
    const file = e.target.files[0];

    const splitName = e.target.value.split(".");
    const extension = splitName[splitName.length - 1];
    this.setState({
      predictions: null,
      height: null,
      width: null,
      fileSize: file.size,
      fileType: extension,
      isUploaded: false,
      isUploadSuccessfull: false,
      errorMessage: null
    });
    if (
      (extension.toLowerCase() === "jpg" ||
        extension.toLowerCase() === "png" ||
        extension.toLowerCase() === "jpeg") &&
      file.size < 5000000
    ) {
      this.setState({ file: file });
    } else {
      e.target.value = "";
      this.setState({
        fileSize: null,
        fileType: null,
        errorMessage: "Please select JPG/PNG file of size less than 5mb"
      });
    }
  }

  /**
   * Hits the API for prediction and on success
   * updates the state with appropriate data
   * @param {event object} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isUploaded: true });
    const { file } = this.state;
    if (file) {
      console.log(file);
      uploadImage(file)
        .then(response => {
          this.setState({ ...response });
          this.setState({ isUploadSuccessfull: true });
        })
        .catch(() => {
          this.setState({ isUploadSuccessfull: false });
        });
    }
  }

  render() {
    const { isUploadSuccessfull, isUploaded } = this.state;
    const imgUrl =
      "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="">Object Detection</h1>
          <p>Upload a JPG/PNG image to detect objects in your image.</p>
        </div>

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
            <input
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
              value="Submit"
            />
          </div>
          {isUploaded && !isUploadSuccessfull ? <img src={imgUrl} /> : ""}

          <br />
          <div className="form-group">
            {this.state.errorMessage ? (
              <span class="alert alert-danger">{this.state.errorMessage}</span>
            ) : (
              ""
            )}
          </div>

          <div className="form-group">
            {isUploaded ? (
              isUploadSuccessfull ? (
                <span className="alert alert-success">Upload Successfull</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
          {/* Display the below data only when the file is uploaded successfully */}
          {isUploadSuccessfull ? (
            <div>
              <div className="form-group">
                <label htmlFor="imgResolution">Image resolution:</label>
                <input
                  type="text"
                  className="form-control"
                  id="imgResolution"
                  aria-describedby="resolutionHelp"
                  placeholder="Image resolution"
                  value={
                    this.state.width
                      ? this.state.width + "*" + this.state.height
                      : ""
                  }
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="imgResolution">File type:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fileType"
                  aria-describedby="fileHelp"
                  placeholder="File type"
                  value={this.state.fileType ? this.state.fileType : ""}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="fileSize">File size:</label>
                <input
                  type="text"
                  className="form-control"
                  id="fileSize"
                  aria-describedby="fileSizeHelp"
                  value={this.state.fileSize ? this.state.fileSize : ""}
                  placeholder="File Size"
                  disabled
                />
              </div>
              <div className="form-group">
                {this.state.predictions ? (
                  <label htmlFor="predictions">Predictions:</label>
                ) : (
                  ""
                )}
                <ul className="list-group" id="predictions">
                  {this.state.predictions ? (
                    this.state.predictions.length > 0 ? (
                      this.state.predictions.map(item => (
                        <li className="list-group-item" key={item.class}>
                          {item.class + " " + item.score}
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item">No Predictions Found</li>
                    )
                  ) : null}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}
