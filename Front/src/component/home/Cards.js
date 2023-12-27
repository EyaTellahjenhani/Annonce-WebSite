import React from "react";
import "./Cards.css";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Card } from "@mui/material";
import { Link } from "react-router-dom";

const Cards = ({titre, description, image, price, id}) => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "#15446d",
    "&:hover": {
      backgroundColor: "#2c57a8",
    },
  }));

  return (
      <Card>
      <div className="Carde_item">
        <img src={image} width={"250px"} />
        <h4>{titre}</h4>
        <p>{price} DNT</p>
        <p>
          {description}
        </p>
        <Link to={`/Listing/${id}`}>
        <div className="Button_Card">
        <ColorButton variant="contained">En savoir plus</ColorButton>
        </div>
        </Link>
      </div>
      </Card>
  );
};

export default Cards;
