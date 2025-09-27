import { Card, CardContent, Typography } from "@mui/material";

export default function ListNrw() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6">Khung bên trái</Typography>
        <Typography variant="body2">
          Nội dung hoặc component riêng của bạn
        </Typography>
      </CardContent>
    </Card>
  );
}
