/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import Box from "../component/box";
import Typography from "../component/typography";
import ImageModal from "ImageModal";
import S3 from "react-aws-s3-typescript";
import { useState, useEffect } from "react";

export default function data() {
  const [images, setImages] = useState([]);
  const fetchImages = () => {
    const ReactS3Client = new S3({
      accessKeyId: "AKIA5FTZBV5V5QLBMG7W",
      secretAccessKey: "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",
      bucketName: "animalpicsdata",
      region: "us-east-2",
      s3Url: "https://animalpicsdata.s3.us-east-2.amazonaws.com",
    });
    ReactS3Client.listFiles()
      .then((data) => {
        setImages(data.data.Contents);
        console.log(data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []); // Empty dependency array ensures the effect runs only once, when the component mounts

  const Animal = ({ title, description }) => (
    <Box lineHeight={1} textAlign="left">
      <Typography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </Typography>
      <Typography variant="caption">{description}</Typography>
    </Box>
  );

  return {
    columns: [
      { Header: "Image", accessor: "Image", align: "left" },
      { Header: "Time", accessor: "Time", align: "left" },
      { Header: "Date", accessor: "Date", align: "center" },
    ],

    rows: images
      .filter((image) => image.Key.startsWith("animal_detection"))
      .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
      .map((image, index) => ({
        Image: <ImageModal imageBase64={image.publicUrl} />,
        Time: <Animal title={new Date(image.LastModified).toLocaleTimeString()} />,
        Date: (
          <Typography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {new Date(image.LastModified).toLocaleDateString()}
          </Typography>
        ),
        action: (
          <Typography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </Typography>
        ),
      })),
  };
}
