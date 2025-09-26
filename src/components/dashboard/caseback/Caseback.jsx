import { Divider, Paper, Typography } from "@mui/material";
import styles from "./caseback.module.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import Screw from "./Screw";
import Socket from "./Socket";
import Cbhousing from "./Cbhousing";
import Cbassembly from "./Cbassembly";

//endpoints
import { GET_ALL_PARTS } from "../../../global_endpoints";

//CONTEXT API
import PartContext from "../../../context_api/PartContext";

export default function Caseback() {
  const [screwData, setScrewData] = useState({});
  const [socketData, setSocketData] = useState({});
  const [housingData, setHousingData] = useState({});
  const [casebackData, setCasebackData] = useState({});

  const [screwUsed, setScrewUsed] = useState(false);
  const [socketUsed, setSocketUsed] = useState(false);
  const [cbHousingUsed, setCbHousingUsed] = useState(false);
  const [casebackFinished, setCasebackFinished] = useState(false);

  useEffect(() => {
    async function getPartData() {
      const res = await fetch(`${GET_ALL_PARTS}`);
      const data = await res.json();
      console.log(data);
      //find screw part data and assign
      const screwPart = data.find((part) => part.description.includes("screw"));
      if (screwPart) {
        setScrewData((prevObj) => ({
          ...prevObj,
          description: screwPart.description,
          partNumber: screwPart.partNumber,
          quantity: screwPart.quantity,
        }));
      }

      //find socket part data and assign
      const socketPart = data.find((part) =>
        part.description.includes("socket")
      );
      if (socketPart) {
        setSocketData((prevObj) => ({
          ...prevObj,
          description: socketPart.description,
          partNumber: socketPart.partNumber,
          quantity: socketPart.quantity,
        }));
      }

      //find rear housing part data and assign
      const housingPart = data.find((part) =>
        part.description.includes("housing")
      );
      if (housingPart) {
        setHousingData((prevObj) => ({
          ...prevObj,
          description: housingPart.description,
          partNumber: housingPart.partNumber,
          quantity: housingPart.quantity,
        }));
      }

      //find caseback part data and assign
      const caseback = data.find((part) =>
        part.description.includes("assembly")
      );
      if (caseback) {
        setCasebackData((prevObj) => ({
          ...prevObj,
          description: caseback.description,
          partNumber: caseback.partNumber,
          quantity: caseback.quantity,
        }));
      }
    }
    getPartData();
  }, []);

  if (!screwData && !socketData && !housingData && !casebackData) {
    return <div>""</div>;
  }

  return (
    <Paper className={styles.paperStyle} elevation={6} square={false}>
      <Box>
        <Grid container direction="row" columns={12.02} spacing={0}>
          <PartContext.Provider
            value={{
              screwUsed,
              setScrewUsed,
              socketUsed,
              setSocketUsed,
              cbHousingUsed,
              setCbHousingUsed,
              casebackFinished,
              setCasebackFinished,
            }}
          >
            {/* SCREW */}
            <Screw screwData={screwData} setScrewData={setScrewData} />

            <Divider orientation="vertical" flexItem />

            {/* SOCKET */}
            <Socket socketData={socketData} setSocketData={setSocketData} />

            <Divider orientation="vertical" flexItem />

            {/* CASEBACK HOUSING */}
            <Cbhousing
              housingData={housingData}
              setHousingData={setHousingData}
            />

            <Divider orientation="vertical" flexItem />

            {/* FINISHED CASEBACK */}
            <Cbassembly
              casebackData={casebackData}
              setCasebackData={setCasebackData}
            />
          </PartContext.Provider>
        </Grid>
      </Box>
    </Paper>
  );
}
