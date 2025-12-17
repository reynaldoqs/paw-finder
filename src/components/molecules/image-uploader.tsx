import {
  Delete02Icon,
  Edit02Icon,
  Image02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { Button, Emoji, Spinner } from "../atoms";

type ImageUploaderProps = {
  images: ImageListType;
  onChange: (
    imageList: ImageListType,
    addUpdateIndex?: number[] | null
  ) => void;
  isLoading?: boolean;
};
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  isLoading = false,
}) => {
  const maxNumber = 1;

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
        const hasImages = imageList.length > 0;
        return (
          <div className="flex flex-col gap-2 relative flex-1 h-full">
            {hasImages ? (
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <Button
                  onClick={() => onImageUpdate(0)}
                  size="icon"
                  disabled={isLoading}
                >
                  <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} />
                </Button>
                <Button
                  onClick={onImageRemoveAll}
                  size="icon"
                  disabled={isLoading}
                >
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
                </Button>
              </div>
            ) : null}

            {hasImages ? (
              <div className="relative w-full h-[300px]">
                {/* biome-ignore lint/performance/noImgElement: no explanation */}
                <img
                  src={imageList[0].data_url}
                  alt="pet"
                  className={`w-full h-full rounded-lg object-cover bg-muted transition-all duration-300 ${
                    isLoading ? "grayscale" : ""
                  }`}
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <Spinner className="w-12 h-12" />
                  </div>
                )}
              </div>
            ) : (
              <button
                className="p-2 w-full h-[300px] bg-background flex flex-col items-center justify-center gap-4 rounded-lg"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <HugeiconsIcon
                  icon={Image02Icon}
                  strokeWidth={2}
                  className="text-muted-foreground"
                  style={{ width: 62, height: 62 }}
                />
                <span className="text-sm text-muted-foreground">
                  Click or drag to upload
                </span>
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
