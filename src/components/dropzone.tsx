import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadFiles } from "../utils/ipfs";

// Define interfaces for types
interface FileWithPreview extends File {
  preview: string;
}

const dropzoneStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  marginTop: "2rem",
  borderWidth: "2px",
  borderRadius: "10px",
  borderColor: "#000000",
  borderStyle: "dashed",
  background: "none",
  color: "#fff600",
  outline: "none",
  transition: "border 0.24s ease-in-out",
  cursor: "pointer",
};

const activeDropzoneStyle: React.CSSProperties = {
  borderColor: "#fff500",
};

const DropzoneText: React.CSSProperties = {
  margin: "0",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
};

export const ImagePreview: React.CSSProperties = {
  display: "flex",
  width: "150px",
  height: "150px",
  margin: "auto",
  borderRadius: "50%",
};

interface DropzoneComponentProps {
  setPreview: (p: string) => void;
}
const DropzoneComponent: FC<DropzoneComponentProps> = (props) => {
  const { setPreview } = props;
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign({}, file, {
          preview: URL.createObjectURL(file),
        })
      )
    );

    const hash = await uploadFiles(acceptedFiles);
    setPreview(hash);
    // setFiles([]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5 * 1024 * 1024, // 5 MB in bytes
    maxFiles: 3,
  });

  const fileList = files.map((file) => (
    <li key={file.name}>
      <img style={ImagePreview} src={file.preview} alt={file.name} />
    </li>
  ));

  return (
    <div
      style={
        isDragActive
          ? { ...dropzoneStyle, ...activeDropzoneStyle }
          : dropzoneStyle
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p style={DropzoneText}>
        Drag and drop your image here, or click to select image
      </p>
      <ul>{fileList}</ul>
    </div>
  );
};

export default DropzoneComponent;
