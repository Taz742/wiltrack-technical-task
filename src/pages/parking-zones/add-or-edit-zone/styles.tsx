import { styled, Box, Typography, Button } from "@mui/material";

export const Container = styled(Box)`
  position: absolute;
  top: 40px;
  right: 90px;
  height: calc(100vh - 220px);
  width: 460px;
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 24px;
  padding-top: 20px;
  padding-bottom: 40px;
  border: none;
  outline: none;
  z-index: 9998;
`;

export const RemoveIcon = () => (
  <svg
    fill="none"
    height="12"
    viewBox="0 0 12 12"
    width="12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.7472 10.5352C11.9081 10.6962 11.9986 10.9145 11.9986 11.1422C11.9986 11.3698 11.9081 11.5881 11.7472 11.7491C11.5862 11.91 11.3679 12.0005 11.1403 12.0005C10.9126 12.0005 10.6943 11.91 10.5333 11.7491L6 7.21431L1.46523 11.7476C1.30427 11.9086 1.08595 11.999 0.858315 11.999C0.630676 11.999 0.41236 11.9086 0.251395 11.7476C0.0904294 11.5867 3.39209e-09 11.3684 0 11.1407C-3.39209e-09 10.9131 0.0904295 10.6948 0.251395 10.5338L4.78616 6.00047L0.252822 1.4657C0.0918573 1.30474 0.00142808 1.08642 0.00142808 0.858785C0.00142808 0.631145 0.0918573 0.41283 0.252822 0.251864C0.413788 0.0908992 0.632104 0.000469766 0.859743 0.000469763C1.08738 0.000469761 1.3057 0.0908992 1.46666 0.251864L6 4.78663L10.5348 0.25115C10.6957 0.090185 10.914 -0.000244144 11.1417 -0.000244141C11.3693 -0.000244137 11.5876 0.090185 11.7486 0.25115C11.9096 0.412116 12 0.630431 12 0.85807C12 1.08571 11.9096 1.30403 11.7486 1.46499L7.21384 6.00047L11.7472 10.5352Z"
      fill="white"
    />
  </svg>
);

export const RemoveButton = styled(Button)(() => ({
  backgroundColor: "#a91d54",
  padding: "5px 10px !important",
  minHeight: 32,
  maxHeight: 32,
  height: 32,
  borderRadius: 10,
  color: "#FFF",

  svg: {
    marginRight: 10,
  },

  textTransform: "capitalize",

  "&:hover": { backgroundColor: "#a91d54" },
}));

export const FieldTitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-bottom: 0px;
  row-gap: 20px;

  & .MuiFormHelperText-root {
    color: red !important;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  margin-left: 20px !important;
  margin-bottom: 10px;
`;

export const SelectionId = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ModalContentContainer = styled(Box)`
  overflow: auto;
  padding: 20px;
  height: calc(100% - 160px);
`;
