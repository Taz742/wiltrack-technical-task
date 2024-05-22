import React from "react";
import { Divider, Button } from "@mui/material";
import FormInput from "../../../components/UI/form/form-input";
import FormNumberInput from "../../../components/UI/form/form-number-input";
import { FieldArrayWithId, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import {
  Container,
  FieldContainer,
  FieldTitleContainer,
  FormContainer,
  ModalContentContainer,
  RemoveButton,
  RemoveIcon,
  SelectionId,
  StyledTypography,
} from "./styles";
import { IPolygonFormData } from "../typs";

interface IProps {
  editing?: boolean;
  isInModal?: boolean;
  methods: UseFormReturn<IPolygonFormData, any, undefined>;
  fields: FieldArrayWithId<IPolygonFormData, "selections", "id">[];
  handleFormSubmit: SubmitHandler<IPolygonFormData>;
  handleSelectionClick: (index: number) => void;
  handleRemovePolygon: (index: number) => void;
}

export const AddOrEditZone = ({
  editing = false,
  isInModal = false,
  methods,
  fields = [],
  handleFormSubmit,
  handleSelectionClick,
  handleRemovePolygon,
}: IProps) => {
  const Wrapper = isInModal ? React.Fragment : Container;

  return (
    <Wrapper>
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
              name={`fee`}
            />
            {fields.length > 0 && <Divider sx={{ mt: 3 }} />}
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
                  <FormNumberInput
                    decimalScale={4}
                    label="Capacity"
                    name={`selections.${index}.capacity`}
                  />
                </FieldContainer>
              );
            })}
          </FormContainer>
        </FormProvider>
      </ModalContentContainer>
      <Button
        form="zone-details"
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
    </Wrapper>
  );
};
