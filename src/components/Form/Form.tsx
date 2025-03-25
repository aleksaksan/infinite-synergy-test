import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import { updateUser } from "../../store/userSlice";

export const EditUserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser } = useSelector((state: RootState) => state.users);
  const [name, setName] = useState(selectedUser?.name || '');
  const [jobTitle, setJobTitle] = useState(selectedUser?.jobTitle || '');
  const [department, setDepartment] = useState(selectedUser?.department || '');
  const [company, setCompany] = useState(selectedUser?.company || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    if (!selectedUser) return;
    
    dispatch(updateUser({
      id: selectedUser.id,
      name,
      jobTitle,
      department,
      company
    }));
  }

  if (!selectedUser) {
    return <div>Пользователь не выбран</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Не указано" value={name} onChange={(event)=>setName(event.target.value)}/>
      <div className="">
        <img src="" alt="avatar" />
        <div>
          <label>
            Должность
            <input type="text" placeholder="Не указано" value={jobTitle} onChange={(event)=>setJobTitle(event.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Отдел
            <input type="text" placeholder="Не указано" value={department} onChange={(event)=>setDepartment(event.target.value)}/>
          </label>
        </div>
        <div>
          <label>
            Компания
            <input type="text" placeholder="Не указано" value={company} onChange={(event)=>setCompany(event.target.value)}/>
          </label>
        </div>
      </div>
      <button type="submit">Сохранить</button>
    </form>
  )
}
