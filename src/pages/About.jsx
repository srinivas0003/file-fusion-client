import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <h1>About FileFusion</h1>
        <p>
          FileFusion is a powerful file merging website that allows you to
          combine multiple file formats into a single document. With FileFusion,
          you can easily merge PDFs, DOCXs, PPTs, PPTXs, CSVs, and more.
        </p>
        <p>
          Our easy-to-use drag and drop interface makes merging files a breeze.
          Simply drag your files into the designated area, reorder them as
          needed, and click "Merge". FileFusion will take care of the rest,
          creating a single document that includes all of your files.
        </p>
        <p>
          At FileFusion, we understand the importance of security and privacy.
          That's why we use the latest encryption technology to protect your
          files during the merging process. We never store your files on our
          servers and all files are automatically deleted after the merge is
          complete.
        </p>
        <p>
          Whether you need to combine multiple reports into a single document or
          merge a collection of photos into a PDF, FileFusion is the perfect
          solution. Try it today and experience the power of effortless file
          merging.
        </p>
      </div>
    </div>
  );
};

export default About;
