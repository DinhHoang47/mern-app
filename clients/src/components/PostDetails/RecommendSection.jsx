import React from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import useStyle from "./style";

export default function RecommendSection({ recommendedPosts }) {
  const navigate = useNavigate();
  const classes = useStyle();
  // Variable to check if the carousel is dragging by user , prevent
  let dragging = false;

  const openPost = (_id) => {
    if (!dragging) {
      navigate(`/posts/${_id}`);
    }
  };

  function PrevArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowBackIosNewIcon color="primary" />
      </div>
    );
  }

  function NextArrow(props) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowForwardIosIcon color="primary" />
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: () => (dragging = true),
    afterChange: () => {
      dragging = false;
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };

  return (
    <Slider {...settings}>
      {recommendedPosts.map(
        ({ title, name, message, likes, selectedFile, _id }, index) => (
          <div key={_id}>
            <Paper
              key={_id}
              className={classes.carouselItem}
              elevation={3}
              onClick={() => openPost(_id)}
            >
              <div style={{ padding: "1px" }}>
                <div style={{ margin: "20px" }}>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                    }}
                    gutterBottom
                    variant="h6"
                  >
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                    height={"45px"}
                    gutterBottom
                    variant="subtitle2"
                  >
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    Likes: {likes.length}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "99%",
                      paddingBottom: "70%",
                      margin: "5% auto",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    className="imgContainer"
                  >
                    <img
                      style={{ position: "absolute", height: "100%" }}
                      alt={`post-${index}`}
                      src={selectedFile}
                    />
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        )
      )}
    </Slider>
  );
}
