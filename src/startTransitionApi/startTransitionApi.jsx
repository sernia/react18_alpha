import React, { useState } from "react";
import PhotoCard from "./PhotoCard";
import {
  Container, TextField
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const SearchPhotos = () => {
  const useStyles = makeStyles({
    container: {
      marginTop: '100px',
    }
  });
  const [title, setPhotoTitle] = useState("");
  const classes = useStyles();

  const onChange = (e) => {
    // Urgent update
    setPhotoTitle(e.target.value);
  };

  return (
    <Container className={classes.container}>
      <TextField id="standard-basic" label="Search by photo title" onChange={onChange} value={title}/>
      <PhotoCard searchParam={title} />
    </Container>
  );
};

export default SearchPhotos;

//PhotoCard.jsx

import React, { useEffect, useState } from "react";
import photosJson from "./photos.json";
import PhotoListCard  from './PhotoListCard'

const PhotoCard = React.memo(({ searchParam }) => {
  const [photos, setPhotos] = useState();

  const fetchPhotos = (title) => {
    return new Promise((res) => {
      setTimeout(() => {
        if (!title) {
          return res(photosJson);
        }
        return res(photosJson.filter((photo) => photo.title.includes(title)));
      }, 500);
    });
  };

  useEffect(() => {
    fetchPhotos(searchParam).then((res) => {
      // Non-urgent update
      setPhotos(res);
    });
  }, [searchParam]);

  const photoData = photos?.map((p) => ({
    key: p.id,
    name: p.title,
    thumbnailUrl: p.thumbnailUrl
  }));

  return <PhotoListCard data={photoData}  />;
});

export default PhotoCard;