import {
  Eraser1BulkRounded,
  GalleryBulkRounded,
  Trash3BulkRounded,
} from "@lineiconshq/react-lineicons";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { Button, Emoji } from "../atoms";

type ImageUploaderProps = {
  images: ImageListType;
  onChange: (
    imageList: ImageListType,
    addUpdateIndex?: number[] | null
  ) => void;
};
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
}) => {
  const maxNumber = 1;
  console.log("images", images);

  return (
    <ImageUploading
      multiple={false}
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemoveAll,
        isDragging,
        dragProps,
      }) => {
        console.log("imageList", imageList);
        const hasImages = imageList.length > 0;
        return (
          <div className="flex flex-col gap-2 relative flex-1 h-full">
            {hasImages ? (
              <div className="absolute top-2 right-2 flex gap-2">
                <Button onClick={() => onImageUpdate(0)} size="icon">
                  <Eraser1BulkRounded size="22" />
                </Button>
                <Button onClick={onImageRemoveAll} size="icon">
                  <Trash3BulkRounded size="22" />
                </Button>
              </div>
            ) : null}

            {hasImages ? (
              // biome-ignore lint/performance/noImgElement: no explanation
              <img
                src={imageList[0]["data_url"]}
                alt="pet"
                className="w-full h-[300px] rounded-lg object-cover bg-muted"
              />
            ) : (
              <button
                className="p-2 w-full h-[300px] bg-beige-medium flex items-center justify-center rounded-lg"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <GalleryBulkRounded size="62" className="text-foreground/55" />
              </button>
            )}
            <div className="flex gap-1">
              <Emoji
                emoji="❕"
                label="information"
                className="text-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Drag & drop images here or click to upload, this image will be
                used to find the pet
              </p>
            </div>
          </div>
        );
      }}
    </ImageUploading>
  );
};
