import { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Divider, Typography } from "@mui/material";
import styles from "./caseback.module.css";

//endpoints
import { UPDATE_PART_QUANTITY } from "../../../global_endpoints";

//PART CONTEXT
import { PartContext } from "../../../context_api/PartContext";

export default function Cbassembly({ casebackData, setCasebackData }) {
  const [quantityChange, setQuantityChange] = useState(false);

  //destructure part context to use specific state
  const {
    screwUsed,
    setScrewUsed,
    socketUsed,
    setSocketUsed,
    cbHousingUsed,
    setCbHousingUsed,
    setCasebackFinished,
  } = useContext(PartContext);

  useEffect(() => {
    if (!quantityChange) return; // Prevent on initial render

    async function updatePartQuantity() {
      const payload = {
        partNumber: casebackData.partNumber,
        quantity: casebackData.quantity,
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
    setCasebackData((prevObj) => ({
      ...prevObj,
      quantity: prevObj.quantity + 1,
    }));
    setQuantityChange(true);
    setScrewUsed(false);
    setSocketUsed(false);
    setCbHousingUsed(false);
    setCasebackFinished(true);
  }

  return (
    <>
      <Grid size={3}>
        <Typography className={styles.headingStyle} align="center" variant="h4">
          Finished Caseback
          <br />
          {casebackData.partNumber}
        </Typography>
        <Typography
          className={styles.headingStyle}
          align="center"
          variant="h1"
          sx={{ pt: 18 }}
        >
          {casebackData.quantity}
        </Typography>
        <Stack
          direction="row"
          //   divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{
            justifyContent: "center",
            pt: 22,
          }}
        >
          {screwUsed && socketUsed && cbHousingUsed ? (
            <Button onClick={handleUse} variant="contained" color="success">
              COMPLETED
            </Button>
          ) : (
            <Button variant="contained" color="success" disabled>
              COMPLETED
            </Button>
          )}
        </Stack>
      </Grid>
    </>
  );
}
