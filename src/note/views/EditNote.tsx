import { FormikHelpers } from "formik";
import { useNoteContext } from "../../context/NoteContext";
import { IFormNote } from "../../models/INote";
import { FormNoteComponent } from "../components/formComponent/FormNoteComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useUpdateNoteMutation } from "../../redux/slice/noteSlice";
import { UserAuth } from "../../context/AuthContext";

export const EditNote = () => {
  const { noteSelected } = useNoteContext();
  const navigate=useNavigate()
  const [updateNote]=useUpdateNoteMutation()
  const { user } = UserAuth();
  const { resetIsDirtyForm} = useNoteContext();
  const initialValueForm = (): IFormNote =>{
    if(noteSelected.note==undefined){
      navigate('/note/')
    }
    return{
      title: noteSelected.note.title,
      description: noteSelected.note.description,
    }
  };
  const onHandleSubmit = async (
    valuesForm: IFormNote,
    actions: FormikHelpers<IFormNote>
  ) => {
    const {note}=noteSelected;
    const {status,data}=await updateNote({note_id:note.id, user_id:user.id,note:valuesForm}).unwrap()
 
    if(status==200){
      resetIsDirtyForm();
      noteSelected.changeNoteIdSelected(data)
      navigate(`/note/${note.id}`);
      actions.resetForm();
    }
  };

  if(!noteSelected.note) return <Navigate to={'/note/'}  />;
  
  return (
    <>
      <FormNoteComponent
        initialValuesForm={initialValueForm()}
        onHandleSubmit={onHandleSubmit}
      />
    </>
  );
};
