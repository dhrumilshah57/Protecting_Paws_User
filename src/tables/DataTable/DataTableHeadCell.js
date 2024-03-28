import PropTypes from "prop-types";
import Box from "../../component/box";

function DataTableHeadCell({ width, children, align, ...rest }) {
  return (
    <Box
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      <Box
        {...rest}
        position="relative"
        textAlign={align}
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }) => ({
          fontSize: size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
        })}
      >
        {children}
      </Box>
    </Box>
  );
}

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableHeadCell;
