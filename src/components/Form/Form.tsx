import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { updateUser } from "../../store/userSlice";
import avatar from "../../assets/avatar.jpg";
import './Form.css';

export const EditUserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedUser } = useSelector((state: RootState) => state.users);
  const [name, setName] = useState(selectedUser?.name || '');
  const [jobTitle, setJobTitle] = useState(selectedUser?.jobTitle || '');
  const [department, setDepartment] = useState(selectedUser?.department || '');
  const [company, setCompany] = useState(selectedUser?.company || '');

  useEffect(() => {
    setName(selectedUser?.name || '');
    setJobTitle(selectedUser?.jobTitle || '');
    setDepartment(selectedUser?.department || '');
    setCompany(selectedUser?.company || '');
  }, [selectedUser]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); 
    
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
    return <div className="w-50">Пользователь не выбран</div>;
  }

  return (
    <div className="w-50 form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Не указано" value={name} onChange={(event)=>setName(event.target.value)}/>
        <div className="flex">
          <img src={avatar} alt="avatar" />
          <div className="column">
            <div className="form-string">
              <label className="grid">
                <span>Должность</span>
                <input className="w-100" type="text" placeholder="Не указано" value={jobTitle} onChange={(event)=>setJobTitle(event.target.value)}/>
              </label>
            </div>
            <div className="form-string">
              <label className="grid">
                <span>Отдел</span>
                <input className="w-100" type="text" placeholder="Не указано" value={department} onChange={(event)=>setDepartment(event.target.value)}/>
              </label>
            </div>
            <div className="form-string">
              <label className="grid">
                <span>Компания</span>
                <input className="w-100" type="text" placeholder="Не указано" value={company} onChange={(event)=>setCompany(event.target.value)}/>
              </label>
            </div>
          </div>
          </div>
          <button type="submit">Сохранить</button>
      </form>
    </div>
  )
}
