import { useState, useEffect} from "react";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import Search from "../components/Search";
import SearchTrend from "../components/SearchTrend";
import AboutPage from "../components/AboutPage";
import IconCloud from "../components/CustomImageCloud";
import { styled } from '@mui/system';
import './home.css'

const BouncingIconButton = styled(IconButton)`
  @keyframes bounce2 {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }

  animation: bounce2 2s ease infinite;
`;

export default function Home() {
  const [height, setHeight] = useState(650);

  const handleExpand = () => {
    setHeight((prevHeight) => (prevHeight === 350 ? 650 : 350));
  };

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      handleExpand()
    }
  };
  const handleTouchStart = (event) => {
    const startY = event.touches[0].clientY;
    console.log(startY);
    
  };
  


  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll === 0) {
        setHeight(650);
      } else if (currentScroll > 0) {
        setHeight(350);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
    id= 'welcome'
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      <Box
      className='wave-background'
      
        sx={{
          bgcolor: '#e0f2f1',
          position: "relative",
          width: "100%",
          height: height,
          display: "flex",
          flexDirection: 'column',
          borderBottom: "5px solid #3d9970",
          transition: "height 0.3s ease",
          boxShadow: 5,
          overflow: "hidden",
        }}
      >  
        <Box sx={{display: "flex", justifyContent: 'start', alignItems: 'center', height: '85%', pl: 5}}>
          <Box sx={{display: "flex", flexDirection: 'column', justifyContent: 'space-around', height: '50%', }}>

              <Typography variant="h3" sx={{ mb: 2,  }}>
                Service Connect
              </Typography>

            <Typography variant="h5" sx={{ mb: 2 }}>
              Tous les services pour votre quotidien.
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 2, width: "60%" }}>
              En simples clics Service connect facilite votre quotidien pour trouver le meilleur
              service proche de vous, gagnez du temps et de l&apos;argent en déléguant à des
              prestataires qualifiés.
            </Typography>
            <Search />
          </Box>
          <IconCloud />
        </Box>  

        <BouncingIconButton
          sx={{
            boxShadow: 5,
            justifySelf: "end",
            alignSelf: 'center',
            width: height === 350? 40 : 50,
            height: height === 350? 40 : 50,
            m: 1,
            bgcolor: 'white'
          }}
          onClick={handleExpand}
        >
          {height === 350 ? <ExpandMoreRoundedIcon /> : <ExpandLessRoundedIcon />}
        </BouncingIconButton>
      </Box>
      <Slide
        direction="up"
        in={height === 350}
        mountOnEnter
        unmountOnExit
        style={{
          position: "absolute",
          top: height + 80,
          left: 0,
          width: "100%",
        }}
      >
        <Box component={'div'} id='search_trend'>
          <SearchTrend  />
          
          <Box component={'div'} id='about'><AboutPage /></Box>
        </Box>
      </Slide>
      
    </Box>
  );
}
