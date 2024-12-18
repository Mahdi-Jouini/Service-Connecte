import React from "react";
import { Container, Box, Typography } from "@mui/material";

import about_img1 from '../assets/about1.png';
import about_img2 from '../assets/3d-character-emerging-from-smartphone-removebg.png';
import './AboutPage.css'


export default function AboutPage () {
  return (
    <Box sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>

      <Box sx={{ textAlign: 'start', }}>
        <Typography variant="h4" component="h1" gutterBottom>
          À propos de Service Connect
        </Typography>
        <Typography variant="body1">
          Votre partenaire de confiance pour tous vos besoins en services à domicile.
          Notre mission est simple : connecter les prestataires qualifiés avec les clients à la recherche
          de solutions fiables, rapides et accessibles pour améliorer leur quotidien.
        </Typography>
        </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'start',}}>
            <Typography variant="h4" component="h1" gutterBottom>
            Ce que nous proposons
            </Typography>
            <Typography variant="body1">
            Notre plateforme met en relation des prestataires de services qualifiés qu'il s'agisse de réparations,
            d'entretien, de nettoyage, ou de tout autre besoin quotidien avec des clients qui recherchent une solution
            rapide et fiable.
            </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Qui sommes-nous ?
        </Typography>   
        <Typography variant="body1">
          Nous sommes une équipe passionnée composée de développeurs, de spécialistes QA et d'une Product Owner,
          tous animés par une vision commune : simplifier l'accès aux services essentiels à travers une plateforme
          intuitive et performante. Nous croyons que la technologie peut transformer les interactions humaines et
          améliorer la vie de chacun.
        </Typography>
      </Box>

    </Box>
  );
};

