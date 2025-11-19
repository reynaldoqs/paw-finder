import React from "react";

type EmojiProps = {
  emoji: string;
  label: string;
  size?: number;
  lineHeight?: number;
  className?: string;
};

export const Emoji: React.FC<EmojiProps> = ({
  emoji,
  label,
  size = 18,
  lineHeight = 1,
  className = "",
}) => {
  return (
    <span
      role="img"
      aria-label={label}
      className={`${className}`}
      style={{
        lineHeight: lineHeight,
        fontSize: size,
      }}
    >
      {emoji}
    </span>
  );
};
