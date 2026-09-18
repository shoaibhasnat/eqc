import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Divider,
} from "@mui/material";
import BalanceIcon from "@mui/icons-material/Balance";
import GroupIcon from "@mui/icons-material/Group";
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
export default function InheritanceCalculator() {
  const { content } = useLanguage();
  
  // Get inheritanceCalculator content from JSON
  const calcContent = content?.home?.inheritenceCalculator || {};
  const title = calcContent.title || "Inheritance Calculator";
  const subtitle = calcContent.subtitle || "";
  const estateSection = calcContent.estateSection || {};
  const heirsSection = calcContent.heirsSection || {};
  const summarySection = calcContent.summarySection || {};
  const relationOptions = calcContent.relationOptions || ["Son", "Daughter", "Other"];
  const genderOptions = calcContent.genderOptions || [
    { label: "Male", weight: 2 },
    { label: "Female", weight: 1 },
  ];

  const [estate, setEstate] = useState("");
  const [heirs, setHeirs] = useState([]);
  const [form, setForm] = useState({
    name: "",
    relation: relationOptions[0] || "Son",
    gender: genderOptions[0]?.label || "Male",
  });

  /* =======================
     HANDLERS
  ======================= */
  const handleAddHeir = () => {
    if (!form.name || !form.relation || !form.gender) return;
    setHeirs([...heirs, form]);
    setForm({ 
      name: "", 
      relation: relationOptions[0] || "Son", 
      gender: genderOptions[0]?.label || "Male" 
    });
  };

  const resetAll = () => {
    setEstate("");
    setHeirs([]);
    setForm({ 
      name: "", 
      relation: relationOptions[0] || "Son", 
      gender: genderOptions[0]?.label || "Male" 
    });
  };

  /* =======================
     CALCULATIONS
  ======================= */
  const totalEstate = Number(estate) || 0;

  const totalParts = heirs.reduce((sum, h) => {
    const gender = genderOptions.find((g) => g.label === h.gender);
    return sum + (gender?.weight || 0);
  }, 0);

  const valuePerPart = totalParts ? totalEstate / totalParts : 0;

  const distributedHeirs = heirs.map((h) => {
    const gender = genderOptions.find((g) => g.label === h.gender);
    return {
      ...h,
      share: valuePerPart * (gender?.weight || 0),
    };
  });

  const distributedAmount = distributedHeirs.reduce(
    (sum, h) => sum + h.share,
    0
  );

  /* =======================
     RENDER
  ======================= */
  return (
    <Box sx={{ backgroundColor: colors.bg, py: 8, px: 2 }}>
      {/* HEADER */}
      <Stack alignItems="center" spacing={1} mb={6}>
        <Box sx={{ width: 50, height: 4, bgcolor: colors.primary }} />
        <Typography variant="h4" fontWeight={700} color="var(--color-primary)">
          {title}
        </Typography>
        <Typography color={colors.muted} align="center">
          {subtitle}
        </Typography>
      </Stack>

      <Grid
        container
        spacing={4}
        maxWidth="lg" 
        mx="auto"
        justifyContent={"center"}
      >
        {/* LEFT SIDE */}
        <Grid size={{ xs: 12, sm: 8,md: 6, lg: 5 }} >
          {/* ESTATE */}
          <Paper sx={{ p: 2, mb: 2, borderRadius: 3}}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <BalanceIcon sx={{ color: colors.primary }} />
              <Typography fontWeight={700}>{estateSection.title || "Total Estate Value"}</Typography>
            </Stack>

            <Typography fontSize={14} mb={0.5}>
              {estateSection.label || "Estate Amount"}
            </Typography>
            <TextField
              type="number"
              fullWidth
              placeholder={estateSection.placeholder || "$ 0.00"}
              value={estate}
              onChange={(e) => setEstate(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "#FBF8F5",
                  height: 45,
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
          </Paper>

          {/* ADD HEIRS */}
          <Paper sx={{ p: 2, borderRadius: 3,  }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <GroupIcon sx={{ color: colors.primary }} />
              <Typography fontWeight={700}>{heirsSection.title || "Add Heirs"}</Typography>
            </Stack>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography fontSize={14}>{heirsSection.nameLabel || "Name"}</Typography>
                <TextField
                  fullWidth
                  placeholder={heirsSection.namePlaceholder || "Enter name"}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 45,
                      borderRadius: 2,
                      backgroundColor: "#FBF8F5",
                    },
                    "& .MuiOutlinedInput-input": {
                      padding: "15px 14px",
                    },
                  }}
                />
                              </Grid>

                <Grid item xs={12} sm={4} maxWidth={100}>
                  <Typography fontSize={14}>{heirsSection.relationLabel || "Relation"}</Typography>
                  <TextField
                    select
                    fullWidth
                    value={form.relation}
                    onChange={(e) =>
                      setForm({ ...form, relation: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 45,
                        borderRadius: 2,
                        backgroundColor: "#FBF8F5",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "15px 14px",
                      },
                    }}
                  >
                    {relationOptions.map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={4} maxWidth={100}>
                  <Typography fontSize={14}>{heirsSection.genderLabel || "Gender"}</Typography>
                  <TextField
                    select
                    fullWidth
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 45,
                        borderRadius: 2,
                        backgroundColor: "#FBF8F5",
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "15px 14px",
                      },
                    }}
                  >
                    {genderOptions.map((g) => (
                      <MenuItem key={g.label} value={g.label}>
                        {g.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              
            </Grid>

            <Button
              fullWidth
              onClick={handleAddHeir}
              sx={{
                mt: 3,
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor: "var(--color-primary)",
                color: "white",
                "&:hover": {
                  backgroundColor: "var(--color-primary-hover)",
                },
              }}
            >
              {heirsSection.addButtonText || "+ Add Heir"}
            </Button>
          </Paper>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid size={{ xs: 12, sm: 8,md: 6, lg: 4 }} maxWidth={650} >
          <Stack spacing={3}>
            {/* SUMMARY */}
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: colors.summary,
                color: "#fff",
                
              }}
            >
              <Typography fontWeight={700} mb={2}>
                {summarySection.title || "Distribution Summary"}
              </Typography>

              {[
                [summarySection.totalEstate || "Total Estate", totalEstate],
                [summarySection.totalHeirs || "Total Heirs", heirs.length],
                [summarySection.totalDistributed || "Total Distributed", distributedAmount],
              ].map(([label, value]) => (
                <Paper
                  key={label}
                  sx={{
                    p: 1,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <Typography fontSize={13}>{label}</Typography>
                  <Typography fontWeight={700} color="rgb(49, 49, 49)">
                    {label.includes("Heirs") || label.includes("وارثین")
                      ? value
                      : `$${Number(value).toFixed(2)}`}
                  </Typography>
                </Paper>
              ))}

              {distributedHeirs.length > 0 && (
                <>
                  <Divider
                    sx={{
                      my: 2,
                      borderColor: "rgba(255,255,255,0.4)",
                    }}
                  />

                  <Typography fontSize={14} fontWeight={600} mb={1}>
                    {summarySection.perHeirDistribution || "Per Heir Distribution"}
                  </Typography>

                  {distributedHeirs.map((h, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1.5,
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor: "rgba(255,255,255,0.25)",
                      }}
                    >
                      <Typography fontSize={13} fontWeight={600}>
                        {h.name} ({h.relation})
                      </Typography>
                      <Typography fontSize={13}>
                        {h.gender} — ${h.share.toFixed(2)}
                      </Typography>
                    </Paper>
                  ))}
                </>
              )}

              <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.4)" }} />

              <Button
                fullWidth
                onClick={resetAll}
                sx={{
                  backgroundColor: "#fff",
                  color: colors.primary,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                {summarySection.resetButtonText || "Reset Calculator"}
              </Button>
            </Paper>

            {/* NOTE */}
            {/* <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography fontWeight={700} mb={1}>
                Important Note
              </Typography>
              <Typography fontSize={14} color={colors.muted}>
                This calculator provides a simplified estimate based on basic
                Islamic inheritance principles.
                <br />
                <br />
                For accurate distribution according to Islamic law, please
                consult a qualified Islamic scholar or legal expert.
              </Typography>
            </Paper> */}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
