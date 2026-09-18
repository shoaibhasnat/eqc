import React from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
const cardData = [
  {
    id: 1,
    title: "Tafseer Al - Quran",
    tag: "Tajweed",
    desc: "Lorem Ipsum is simply dummy printing and typesetting industry printing and typesetting industry.....",
    img: "/images/about2.jpg",
  },
  {
    id: 2,
    title: "Tafseer Al - Quran",
    tag: "Tajweed",
    desc: "Lorem Ipsum is simply dummy printing and typesetting industry printing and typesetting industry.....",
    img: "/images/about2.jpg",
  },
  {
    id: 3,
    title: "Tafseer Al - Quran",
    tag: "Tajweed",
    desc: "Lorem Ipsum is simply dummy printing and typesetting industry printing and typesetting industry.....",
    img: "/images/about2.jpg",
  },
  {
    id: 4,
    title: "Tafseer Al - Quran",
    tag: "Tajweed",
    desc: "Lorem Ipsum is simply dummy printing and typesetting industry printing and typesetting industry.....",
    img: "/images/about2.jpg",
  },
];

// Custom arrow components
const NextArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      right: -30,
      top: "40%",
      transform: "translateY(-50%)",
      bgcolor: "var(--color-primary)",
      color: "white",
      "&:hover": { bgcolor: "var(--color-primary-hover)" },
    }}
  >
    <ArrowForwardIos fontSize="small" />
  </IconButton>
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      left: -30,
      top: "40%",
      transform: "translateY(-50%)",
      bgcolor: "var(--color-primary)",
      color: "white",
      "&:hover": { bgcolor: "var(--color-primary-hover)" },
    }}
  >
    <ArrowBackIos fontSize="small" />
  </IconButton>
);

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true, 
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600, // mobile
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ py: 5, px: { xs: 1, sm: 2, md: 5 }, maxWidth: "1200px", mx: "auto", position: "relative" }}>
      <Slider {...settings}>
        {cardData.map((card) => (
          <Box key={card.id} sx={{ px: 2 }}>
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: "hidden" }}>
              <CardMedia component="img" height="180" image={card.img} alt={card.title} />
              <CardContent>
              <Stack direction={'row'} alignItems={'center'} gap={0.5}>
              <MenuBookIcon  sx={{fontSize:20,color:"var(--color-primary)"}}/>
                      <Typography variant="subtitle2" color="var(--color-primary)" alignItems={'center'}>
                      {card.tag}
                </Typography>
              </Stack>
                <Typography variant="h6" fontWeight="bold" color="var(--color-primary)">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {card.desc}
                </Typography>
                <Button size="small" sx={{ mt: 1, color: "var(--color-primary)" }}>
                  Read More →
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CardSlider;
