import { Divider, Paper, Typography } from "@mui/material";
import styles from "../../pages/dashboard.module.css";

export default function Metrics() {
  return (
    <Paper className={styles.paperStyle} elevation={6} square={false}>
      <Typography className={styles.headingStyle} align="center" variant="h2">
        TEST THIS IS Metrics
      </Typography>
      <Divider variant="middle" />
      TEST THIS IS Metrics
    </Paper>
  );
}
