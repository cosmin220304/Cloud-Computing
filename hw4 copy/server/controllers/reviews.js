const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");
const containerName = "review-images";
const { Review } = require("../models");
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(containerName);

const uploadBlob = async (file) => {
  console.log(file);
  const blobName = uuidv1() + ".png";
  const contentType = file.type;
  const filePath = file.path; //This is where you get the file path.
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
  return {
    uploadBlobResponse,
    url: `https://hw4.blob.core.windows.net/review-images/${blobName}`,
  };
};
module.exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ ...req.query });
    return res.status(200).json({
      reviews,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.addReview = async (req, res) => {
  try {
    const file = req.file;
    const { uploadBlobResponse, url } = await uploadBlob(file);
    const review = await Review.create({
      ...req.body,
      imageHref: url,
    });
    return res.status(200).json(review);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
