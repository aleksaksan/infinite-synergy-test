import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { IUser, loadUsers, selectUser } from '../../store/userSlice';
import './UserList.css';

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading, selectedUser } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const user: IUser = users[index];
    return (
      <div
        key={key} 
        style={style}
        className={`user-list-item align-center${selectedUser?.id === user.id ? " selected" : ""}`}
        onClick={() => dispatch(selectUser(user))}
      >
        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill=""/>
        <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill=""/>
        </svg>
        <div>{user.name}</div>
      </div>
    );
  };

  if (isLoading) {
    return (<div className="w-50">Loading...</div>)
  }

  return (
    <div className="w-50">
      <div style={{ height: '100%', width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={users.length}
              rowHeight={40} 
              rowRenderer={rowRenderer}
              width={width}
              overscanRowCount={50} 
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
