import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import "./view.css";
import { useAddNoteMutation } from "../../redux/slice/noteSlice";
import { UserAuth } from "../../context/AuthContext";
import { FormNoteComponent } from "../components/formComponent/FormNoteComponent";
import { IFormNote } from "../../models/INote";
import { useNoteContext } from "../../context/NoteContext";

const initialValueForm: IFormNote = {
  description: "",
  title: "",
};

export const CreateNote = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [addNote] = useAddNoteMutation();
  const { resetIsDirtyForm} = useNoteContext();


  const onHandleSubmit = async (
    valuesForm: IFormNote,
    actions: FormikHelpers<IFormNote>
  ) => {
    const { data, status } = await addNote({
      note: valuesForm,
      user_id: user.id,
    }).unwrap();

    if (status == 201) {
      navigate(`/note/${data.id}`);
      actions.resetForm();
      resetIsDirtyForm()
    }
  };

  return (
    <>
      

      <FormNoteComponent
        initialValuesForm={initialValueForm}
        onHandleSubmit={onHandleSubmit}
      />
    </>
  );
};
