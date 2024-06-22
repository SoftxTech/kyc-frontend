import { FC, Fragment, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
interface RowProps {
  row: any;
  handleSelectOne: (name: number) => void;
  isItemSelected: boolean;
  labelId: string;
  updateUser: (id: any, userData: any) => Promise<{ success: boolean }>;
}
export const UsersRow: FC<RowProps> = (props) => {
  const { row, handleSelectOne, isItemSelected, labelId, updateUser } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const rows = [
    row?.username || "no data",
    row?._id || "no data",
    row?.role || "no data",
    row?.action || "no data",
  ];

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: 0, cursor: "pointer" } }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            sx={{
              color: theme.palette.info.main,
            }}
            onClick={() => handleSelectOne(row.id)}
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>
        {rows?.map((r: any, idx) => (
          <TableCell
            key={idx}
            scope="row"
            onClick={() => setOpen(!open)}
            sx={{
              color: "black",
            }}
          >
            {r}
          </TableCell>
        ))}
      </TableRow>
    </Fragment>
  );
};
