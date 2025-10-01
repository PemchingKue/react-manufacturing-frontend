import { Divider, Paper, Typography } from "@mui/material";
import styles from "./caseback.module.css";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";

//endpoints
import { UPDATE_PART_QUANTITY } from "../../../global_endpoints";

//PART CONTEXT
import { PartContext } from "../../../context_api/PartContext";

export default function Screw({ screwData, setScrewData }) {
  const [quantityChange, setQuantityChange] = useState(false);

  //destructure part context to use specific state
  const { screwUsed, setScrewUsed } = useContext(PartContext);

  useEffect(() => {
    if (!quantityChange) return; // Prevent on initial render

    async function updatePartQuantity() {
      const payload = {
        partNumber: screwData.partNumber,
        quantity: screwData.quantity,
      };

      if (payload.partNumber && quantityChange) {
        const res = await fetch(UPDATE_PART_QUANTITY, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        setQuantityChange(false);
      }
    }

    updatePartQuantity();
  }, [quantityChange]);

  function handleUse() {
    setScrewData((prevObj) => ({
      ...prevObj,
      quantity: prevObj.quantity - 1,
    }));
    setQuantityChange(true);
    setScrewUsed(true);
  }

  return (
    <>
      <Grid size={3}>
        <Typography className={styles.headingStyle} align="center" variant="h4">
          Screw <br />
          {screwData.partNumber}
        </Typography>
        <Typography
          className={styles.headingStyle}
          align="center"
          variant="h1"
          sx={{ pt: 18 }}
        >
          {screwData.quantity}
        </Typography>
        <Stack
          direction="row"
          // divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            justifyContent: "center",
            pt: 22,
          }}
        >
          {!screwUsed ? (
            <Button onClick={handleUse} variant="contained" color="success">
              USE
            </Button>
          ) : (
            <Button variant="contained" color="success" disabled>
              USE
            </Button>
          )}
        </Stack>
      </Grid>
    </>
  );
}
