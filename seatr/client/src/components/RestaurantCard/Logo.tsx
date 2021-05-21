import React from "react";

interface IProps {
  logoHref: string;
}

export default function Logo({ logoHref }: IProps) {
  return (
    <div className="restaurant-card__logo">
      <img
        className="w-5 h-5 cover round border-white"
        alt="company logo"
        src={logoHref}
      />
    </div>
  );
}
