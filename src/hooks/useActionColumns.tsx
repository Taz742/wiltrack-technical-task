import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";

const EditIcon = () => (
  <svg
    fill="none"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.6268 3.94945L12.0515 0.375011C11.9327 0.25612 11.7915 0.161808 11.6362 0.0974633C11.4809 0.0331183 11.3144 0 11.1463 0C10.9782 0 10.8117 0.0331183 10.6564 0.0974633C10.5011 0.161808 10.36 0.25612 10.2411 0.375011L0.376187 10.2399C0.25681 10.3584 0.162164 10.4993 0.0977515 10.6547C0.0333392 10.81 0.000445805 10.9766 0.000983039 11.1447V14.72C0.000983039 15.0595 0.135841 15.385 0.375891 15.6251C0.61594 15.8651 0.941517 16 1.281 16H14.7212C14.8909 16 15.0537 15.9326 15.1737 15.8125C15.2937 15.6925 15.3612 15.5297 15.3612 15.36C15.3612 15.1903 15.2937 15.0275 15.1737 14.9074C15.0537 14.7874 14.8909 14.72 14.7212 14.72H6.66666L15.6268 5.75988C15.7457 5.64101 15.84 5.49989 15.9043 5.34457C15.9687 5.18926 16.0018 5.02278 16.0018 4.85466C16.0018 4.68655 15.9687 4.52007 15.9043 4.36476C15.84 4.20944 15.7457 4.06832 15.6268 3.94945ZM4.85624 14.72H1.281V11.1447L8.32108 4.10466L11.8963 7.6799L4.85624 14.72ZM12.8011 6.77509L9.22669 3.19985L11.1467 1.27982L14.7212 4.85507L12.8011 6.77509Z"
      fill="black"
    />
  </svg>
);

type HandlerType<T> = (row: T) => void;

function useActionColumns<T>({ handleEdit }: { handleEdit?: HandlerType<T> }) {
  return {
    field: "actions",
    headerName: "Action",
    type: "actions",
    flex: 0.1,
    getActions: ({ row }: GridRowParams) => {
      const menuBtnArray = [];

      if (handleEdit) {
        menuBtnArray.push(
          <GridActionsCellItem
            showInMenu
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleEdit(row)}
          />
        );
      }

      return menuBtnArray;
    },
  };
}

export default useActionColumns;
