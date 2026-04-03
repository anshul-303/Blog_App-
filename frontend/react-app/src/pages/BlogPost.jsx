import { useParams } from "react-router-dom";
import { useState } from "react";

export default function BlogPost() {
  const { id } = useParams();
  return <div>This is the blog post page with id : {id}</div>;
}
