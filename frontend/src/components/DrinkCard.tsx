import React from "react";

function DrinkCard({
  name,
  image,
  alcoholic,
  tags,
  onClick,
  children,
}: {
  name?: string;
  image?: string;
  alcoholic?: string;
  tags?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="">
      <img src={image} />
      <p>{name}</p>
      <p>{alcoholic}</p>
      {tags?.split(",").map((tag) => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
}

export default DrinkCard;
