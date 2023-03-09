import React, { useState } from "react";
import "../styles/Home.css";

function Home({ fileType }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergedFileUrl, setMergedFileUrl] = useState(null);
  const [fileName, setFileName] = useState("merged.pdf");

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files];
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      if (!newFiles.includes(file)) {
        newFiles.push(file);
      }
    });
    setFiles(newFiles);
  };

  const handleFileInputChange = (e) => {
    const newFiles = [...files];
    const selectedFiles = Array.from(e.target.files);
    selectedFiles.forEach((file) => {
      if (!newFiles.includes(file)) {
        newFiles.push(file);
      }
    });
    setFiles(newFiles);
  };

  const handleRemoveFile = (file) => {
    const newFiles = files.filter((f) => f !== file);
    setFiles(newFiles);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropItem = (e, toIndex) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("text/plain");
    const newFiles = [...files];
    const [removedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, removedFile);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    setLoading(true);
    setFileName(() => "merged." + fileType);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("fileType", fileType);
    try {
      const response = await fetch("http://localhost:5000/merge", {
        method: "POST",
        body: formData,
      });
      const data = await response.blob();
      setMergedFileUrl(() => URL.createObjectURL(data));
      // console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fileItems = files.map((file, index) => (
    <div
      key={file.name}
      className="file-item"
      draggable={true}
      onDragStart={(e) => handleDragStart(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDropItem(e, index)}
    >
      <div title={file.name} className="file-name">
        <i className="fa fa-file-text-o "></i>&nbsp;{index + 1}. {file.name}
      </div>
      <div className="extra-info">
        <div className="file-size">
          {(file.size / (1024 * 1024)).toFixed(2)} MB
        </div>
        <div className="remove-button" onClick={() => handleRemoveFile(file)}>
        <i className="fa fa-trash"></i>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="home">
      <div
        className="file-input-container"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => {
          document.querySelector(".file-input").click();
        }}
      >
        <div className="file-input-label">
        <i className="fa fa-file-text-o "></i> Drag and drop files here or click to select files
        </div>
        <input
          className="file-input"
          type="file"
          multiple
          onChange={handleFileInputChange}
          accept={`.${fileType}`}
        />
      </div>
      <div className="file-list-container">
        <h2 className="selected-files-count">
        <i className="fa fa-file-text-o "></i> {files.length} files selected <span className="file-type-info">{`( ${fileType} )`}</span> <br/>
          {files.length > 0 && "Drag and drop to reorder the files..."}
        </h2>
        <div className="file-list ">{fileItems}</div>
        <div className="buttons">
          <button
            className={`btn btn-primary ${
              loading || files.length === 0 ? "block-cursor" : null
            }`}
            onClick={handleUpload}
            disabled={loading ? true : false}
          >
            {loading ? "Merging..." : "Merge files"}
          </button>
          {(mergedFileUrl && !loading) && (
            <a
              href={mergedFileUrl}
              download={fileName}
              className="btn btn-success"
            >
              Download File
            </a>
          )}

          <button className="btn btn-danger" onClick={handleRemoveAllFiles}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
