import React, { useState, useEffect, useRef } from "react";
import { BiCloudUpload } from "react-icons/bi";
import "./style.css";

type PreviewFile = File & {
  preview: string;
};

function removeItems(arr, item) {
  for (var i = 0; i < item; i++) {
    arr.pop();
  }
}

function useFiles({
  initialState = [],
  maxFiles,
}: {
  initialState?: PreviewFile[];
  maxFiles: number;
}): [PreviewFile[], (files: FileList | File[] | null | undefined) => void] {
  const [state, setstate] = useState<PreviewFile[]>(initialState);

  function withBlobs(files: FileList | File[] | null | undefined) {
    const destructured = Array.from(files || []) as File[];
    if (destructured.length > maxFiles) {
      const difference = destructured.length - maxFiles;
      removeItems(destructured, difference);
    }
    const blobs = destructured
      .map((file) => {
        if (file.type.includes("image")) {
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as PreviewFile;
        }

        return null;
      })
      .filter((elem): elem is PreviewFile => elem !== null);

    setstate(blobs);
  }

  return [state, withBlobs];
}

const ImageUploadBox = ({ fileURL = null, onDrop, maxFiles = 1 }) => {
  const [over, setover] = useState(false);
  const [files, setfiles] = useFiles({ maxFiles });
  const $input = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (onDrop) {
      onDrop(files);
    }
  }, [files, onDrop]);
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2  mx-4">
        <div
          onClick={() => {
            $input.current?.click();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.persist();
            setfiles(e.dataTransfer.files);
            setover(false);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setover(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setover(false);
          }}
          className={over ? "upload-container over" : "upload-container"}
        >
          <div className="flex items-center justify-center gap-2 h-full text-[15px] md:text-[24px]">
            <BiCloudUpload className="text-[22px] md:text-[32px]" />
            <h2>Drop/Select picture here!</h2>
          </div>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={$input}
            onChange={(e) => {
              setfiles(e.target.files);
            }}
            multiple={maxFiles > 1}
          />
        </div>
        {files.length !== 0 && (
          <div className="h-[10rem] object-cover overflow-hidden w-full">
            {files.map((file) => (
              <img
                className="h-full rounded-lg"
                key={file.name + "file"}
                src={file.preview}
                alt="your file"
              />
            ))}
          </div>
        )}
        {fileURL && (
          <div className="h-[10rem] object-cover overflow-hidden w-full">
            <img
              className="h-full rounded-lg"
              src={fileURL}
              alt="your file"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploadBox;
