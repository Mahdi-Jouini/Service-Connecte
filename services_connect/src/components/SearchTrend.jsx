import {useRef, useState, useEffect} from 'react';
import { IconButton, Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import 'swiper/css';
import 'swiper/css/navigation';
import axiosConfig from '../config/axiosConfig';



export default function SearchTrend() {
  const swiperRef = useRef(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    axiosConfig
    .get('/services')
    .then(response => {
      console.log(response.data);
      setServices(response.data);
      })
      .catch(error => {
        console.error(error);
        });
  }, []);

  return (
  <Box >
    <Typography variant='h5' sx={{ml: 5}}> Tendance de recherche</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1 }}>
      <IconButton sx={{width: 50, height: 50}} onClick={() => swiperRef.current?.slidePrev()}  >
        <NavigateBeforeIcon />
      </IconButton>
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper }}
        spaceBetween={20}

        breakpoints={{
          1900: {
            slidesPerView: 4, 
          },
          1200: {
            slidesPerView: 3, 
          },
          700: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 1,
          },
        }}
      >
        {services.map((services) => (
          <SwiperSlide key={services.id}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignservicess: 'center',
            }}>

            <Card sx={{ width: 300, m: 4, filter: 'drop-shadow(-20px -20px 0px #e0f2f1)' }} elevation={5}>
              <CardMedia
                component="img"
                height={150}
                image={`http://localhost:3000/uploads/${services.service_image}`}
                alt={services.name}
              />
              <CardContent>
                <Typography variant="h6">{services.name}</Typography>
                <Chip size='small' label= {'+ 968'} sx={{ fontWeight: 'bold', color: 'gray'}}/>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <IconButton sx={{width: 50, height: 50}} onClick={() => swiperRef.current?.slideNext()} >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  </Box>
  );
}