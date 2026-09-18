import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useLanguage } from "../../../contexts/LanguageContext";

/* =======================
   COLOR THEME
======================= */
const colors = {
  bg: "#F7F2EC",
  card: "#FFFFFF",
  primary: "#C47A3D",
  primaryDark: "#B06A32",
  summary: "#C88A4A",
  text: "#1C1C1C",
  muted: "#6F6F6F",
};

/* =======================
   COMPONENT
======================= */
export default function ZakatCalculator() {
  const { content } = useLanguage();
  const zakatData = content?.home?.zakatCalculator;

  const [assets, setAssets] = useState({});
  const [liabilities, setLiabilities] = useState({});

  const handleChange = (setter, key, value) => {
    setter((prev) => ({ ...prev, [key]: Number(value) || 0 }));
  };

  const assetFields = zakatData?.assetFields || [];
  const liabilityFields = zakatData?.liabilityFields || [];
  const NISAB = zakatData?.nisabThreshold || 5000;

  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(liabilities).reduce(
    (a, b) => a + b,
    0
  );
  const netAssets = totalAssets - totalLiabilities;
  const zakat =
    netAssets >= NISAB ? ((netAssets * 2.5) / 100).toFixed(2) : "0.00";

  const resetAll = () => {
    setAssets({});
    setLiabilities({});
  };

  return (
    <Box sx={{ backgroundColor: colors.bg, py: 8, px: 2 }}>
      {/* HEADER */}
      <Stack alignItems="center" spacing={1} mb={6}>
        <Box sx={{ width: 50, height: 4, bgcolor: colors.primary }} />
        <Typography variant="h4" fontWeight={700} color="var(--color-primary)">
          {zakatData?.title || "Zakat Calculator"}
        </Typography>
        <Typography color={colors.muted}>
          {zakatData?.subtitle || "Calculate your Zakat obligation based on your assets and liabilities"}
        </Typography>
      </Stack>

      {/* LAYOUT */}
      <Grid
        container
        spacing={4}
        maxWidth="lg"
        mx="auto"
        alignItems="flex-start"
        justifyContent={"center"}
      >
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12,sm: 8, md: 6, lg: 8 }} >
          {/* ASSETS */}
          <Paper sx={{ p: 2, mb: 1, borderRadius: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={["center", "center", "flex-start"]}
              mb={1}
            >
              <MonetizationOnIcon sx={{ color: colors.primary }} />
              <Typography fontWeight={700}>{zakatData?.assetsTitle || "Your Assets"}</Typography>
            </Stack>

            <Grid
              container
              spacing={2}
              justifyContent={["center", "center", "flex-start"]}
            >
              {assetFields.map((item) => (
                <Grid size={{ xs: 12, sm: 6 }} key={item}>
                  <Typography fontSize={14} mb={0.5}>
                    {item}
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    placeholder="$ 0.00"
                    value={assets[item] ?? ""}
                    onChange={(e) =>
                      handleChange(setAssets, item, e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#FBF8F5",
                        height: 46,
                      },

                      "& .MuiOutlinedInput-input": {
                        padding: "15px 14px", 
                      },

                      /* REMOVE NUMBER ARROWS */
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                      "& input[type=number]::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      "& input[type=number]::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* LIABILITIES */}
          <Paper sx={{ p: 2, borderRadius: 3 }}>
            <Stack
              direction="row"
              spacing={1}
              justifyContent={["center", "center", "flex-start"]}
              mb={1}
            >
              <ReceiptLongIcon sx={{ color: colors.primary }} />
              <Typography fontWeight={700}>{zakatData?.liabilitiesTitle || "Your Liabilities"}</Typography>
            </Stack>

            <Grid
              container
              spacing={2}
              justifyContent={["center", "center", "flex-start"]}
            >
              {liabilityFields.map((item) => (
                <Grid size={{ xs: 12, sm: 6 }} key={item}>
                  <Typography fontSize={14} mb={0.5}>
                    {item}
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="$ 0.00"
                    value={liabilities[item] ?? ""}
                    onChange={(e) =>
                      handleChange(setLiabilities, item, e.target.value)
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "#FBF8F5",
                        height: 46,
                      },
                       "& .MuiOutlinedInput-input": {
                        padding: "15px 14px", 
                      },
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                      "& input[type=number]::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      "& input[type=number]::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* RIGHT SIDE (STACK BELOW 1200px) */}
        <Grid size={{ xs: 12,sm: 8, md: 6, lg: 4 }} >
          <Stack
            direction={["column-reverse", "column-reverse", "column-reverse"]}
            alignItems={"center"}
            gap={3}
          >
            {/* SUMMARY */}
            <Paper
              sx={{
                borderRadius: 3,
                color: "#fff",
                minWidth: { xs: "100%", sm: 400, md: 400 },
              }}
            >
              <Stack
                direction={"row"}
                alignItems="center"
                p={2}
                mb={1}
                gap={1}
                sx={{
                  backgroundColor: "var(--color-primary)",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              >
                <SourceOutlinedIcon sx={{ fontSize: 22 }} />
                <Typography fontWeight={700} fontSize={22}>
                  {zakatData?.summaryTitle || "Summary"}
                </Typography>
              </Stack>

              <Stack p={2}>
                {[
                  [zakatData?.summaryLabels?.totalAssets || "Total Assets", totalAssets],
                  [zakatData?.summaryLabels?.totalLiabilities || "Total Liabilities", totalLiabilities],
                  [zakatData?.summaryLabels?.netAssets || "Net Assets", netAssets],
                  [zakatData?.summaryLabels?.nisabThreshold || "Nisab Threshold", NISAB],
                ].map(([label, value]) => (
                  <Box
                    key={label}
                    sx={{
                      p: 1,
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: "rgba(228, 228, 228, 0.2)",
                      border:"1px solid rgb(228, 228, 228)",
                    }}
                  >
                    <Typography fontSize={13} color="var(--text-light)">
                      {label}
                    </Typography>
                    <Typography fontWeight={700} color="rgb(68, 68, 68)">
                      ${Number(value).toFixed(2)}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.4)" }} />

                <Typography
                  fontSize={17}
                  color="var(--text-light)"
                  fontWeight={500}
                >
                  {zakatData?.summaryLabels?.zakatPayable || "Zakat Payable"}
                </Typography>
                <Typography
                  fontSize={25}
                  fontWeight={800}
                  mb={2}
                  color="var(--color-primary)"
                >
                  ${zakat}
                </Typography>

                <Button
                  fullWidth
                  onClick={resetAll}
                  sx={{
                    backgroundColor: "#e7e2e28a",
                    color: colors.primary,
                    border: "1px solid var(--color-primary)",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "var(--color-primary-hover)",
                      color: "#fff",
                      transition: "0.5s all",
                    },
                  }}
                  startIcon={<ReplayOutlinedIcon />}
                >
                  {zakatData?.resetButtonText || "Reset Calculator"}
                </Button>
              </Stack>
            </Paper>

            {/* ABOUT */}
            {/* <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                minWidth: { xs: 250, sm: 200 },
                maxWidth: 400,
                maxHeight: "max-content",
              }}
            >
              <Typography fontWeight={700} mb={1}>
                About Zakat
              </Typography>
              <Typography fontSize={14} color={colors.muted}>
                Zakat is one of the Five Pillars of Islam and is obligatory for
                those whose wealth exceeds the Nisab threshold.
                <br />
                <br />
                The standard rate is 2.5% of your eligible wealth that has been
                in your possession for a full lunar year.
              </Typography>
            </Paper> */}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
