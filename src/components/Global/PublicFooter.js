import React from "react";
import { Box, Typography } from "@mui/material";
import "./PublicFooter.css";

export default function PublicFooter() {
  return (
    <Box className="footer-container">
      <div className="footer-content">
        <Typography variant="h4" className="foodie-footer-text">
          "Good food is all the sweeter when shared with good friends."
        </Typography>
        <Typography variant="body1" className="footer-description">
          At Foodie, we believe that every meal is a moment to cherish, with flavors that bring joy and memories that last forever.
        </Typography>
        <Typography variant="body2" className="footer-note">
          Order now and experience the best restaurants curated just for you.
        </Typography>
        <Typography variant="body2" className="footer-copyright">
          &copy; 2025 Parul Bhamba. All rights reserved.
        </Typography>
      </div>
    </Box>
  );
}
