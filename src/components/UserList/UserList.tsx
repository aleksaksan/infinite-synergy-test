import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { IUser, loadUsers, selectUser } from '../../store/userSlice';

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, isLoading } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const user: IUser = users[index];
    return (
      <div
        key={key} 
        style={style}
        className=""
        onClick={() => dispatch(selectUser(user))}
      >
        <div>{user.name}</div>
      </div>
    );
  };

  if (isLoading) {
    return (<>Loading...</>)
  }

  return (
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
  );
};