import React from "react";

interface IProps {
  backgroundHref: string;
}

export default function Background({ backgroundHref }: IProps) {
  return (
    <img
      className="w-100p h-5 cover"
      alt="company background"
      src={backgroundHref}
    />
  );
}
