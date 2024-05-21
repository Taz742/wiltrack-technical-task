/* eslint-disable react/jsx-props-no-spreading */
import {
  Divider,
  Button,
} from "@mui/material";
import FormInput from "../../../components/UI/form/form-input";
import FormNumberInput from "../../../components/UI/form/form-number-input";
import { FormProvider } from "react-hook-form";
import { Container, FieldContainer, FieldTitleContainer, FormContainer, ModalContentContainer, RemoveButton, RemoveIcon, SelectionId, StyledTypography } from "./styles";


export const AddOrEditZone = ({
  editing = false,
  methods,
  handleFormSubmit,
  fields = [],
  handleSelectionClick,
  handleRemovePolygon,
}: any) => {
  return (
    <Container>
      <StyledTypography variant="body2">Zone Form</StyledTypography>
      <ModalContentContainer>
        <FormProvider {...methods}>
          <FormContainer
            component={"form"}
            id="zone-details"
            onSubmit={methods.handleSubmit(handleFormSubmit)}
          >
            <FormInput label="Name" name={`name`} />
            <FormNumberInput
              decimalScale={4}
              label="Fee"
              name={`defaultReminderFee`}
            />

            {fields.length > 0 && <Divider sx={{ marginTop: "30px" }} />}
            {fields.map((field: any, index: number) => {
              return (
                <FieldContainer id={`selection-${index + 1}`} key={index}>
                  <FieldTitleContainer>
                    <SelectionId onClick={() => handleSelectionClick(index)}>
                      {`Selection #${index + 1}`}
                    </SelectionId>
                    <RemoveButton onClick={() => handleRemovePolygon(index)}>
                      <RemoveIcon />
                      Remove
                    </RemoveButton>
                  </FieldTitleContainer>
                  <FormInput
                    label="Subarea Name"
                    name={`selections.${index}.subareaName`}
                  />
                  <FormInput
                    label="Subarea ID"
                    name={`selections.${index}.subAreaId`}
                  />
                </FieldContainer>
              );
            })}
          </FormContainer>
        </FormProvider>
      </ModalContentContainer>
      <Button
        form="customer-form"
        sx={{
          margin: "10px 0",
          width: "90%",
          marginLeft: "5%",
        }}
        type="submit"
        variant="contained"
      >
        {editing ? "Save Changes" : "Save New Customer"}
      </Button>
    </Container>
  );
};
