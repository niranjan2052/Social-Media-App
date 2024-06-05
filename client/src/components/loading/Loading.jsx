import { CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <div>
      <div style={{ margin: "auto", textAlign: "center" }}>
        <h4>
          <CircularProgress />
          Loading...
        </h4>
      </div>
    </div>
  );
};
