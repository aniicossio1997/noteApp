export interface INote{
    id:string,
    title:string,
    created_at:string,
    user_id:string
}
export interface INoteFull{
    id:string,
    title:string,
    description:string | null,
    updated_at: string,
    created_at:string,
    user_id:string
}
export interface IFormNote {
    title: string;
    description: string;
  }