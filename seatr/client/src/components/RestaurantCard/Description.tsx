import React, { Typography } from "@material-ui/core";

interface IProps {
  name: string;
  description: string | undefined;
}

export default function Description({ name, description }: IProps) {

  return (
    <div className="p-1 secondary white">
      <br />
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">
        {description?.substring(0, 200)}...
      </Typography>
    </div>
  );
}
