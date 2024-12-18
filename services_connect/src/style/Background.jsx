import { Box, Typography } from "@mui/material";

const Background = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        overflow: "hidden",
      }}
    >
      {/* Floating Image on the Left */}
      <Box
        component="img"
        src="left-image-url.png" // Replace with your image URL
        alt="Floating Left"
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          animation: "float 6s ease-in-out infinite",
        }}
      />

      {/* Floating Image on the Right */}
      <Box
        component="img"
        src="right-image-url.png" // Replace with your image URL
        alt="Floating Right"
        sx={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "150px",
          animation: "float 6s ease-in-out infinite",
          animationDelay: "3s",
        }}
      />

      {/* Centered Text */}
      <Typography
        variant="h3"
        sx={{
          zIndex: 1,
          color: "#333",
        }}
      >
        Your Centered Text
      </Typography>

      {/* Keyframes for Floating Effect */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Background;
