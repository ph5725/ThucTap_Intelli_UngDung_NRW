import { Card, CardContent, Typography } from "@mui/material";

export default function NrwDetail() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">Khung bên phải</Typography>
        <Typography variant="body2">
          Đây là một component khác được import vào
        </Typography>
      </CardContent>
    </Card>
  );
}
