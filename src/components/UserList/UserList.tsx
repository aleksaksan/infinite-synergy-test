import { AutoSizer, List } from 'react-virtualized';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { IUser, loadUsers, selectUser } from '../../store/userSlice';

export const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const rowRenderer = ({ index }: { index: number }) => {
    const user: IUser = users[index];
    return (
      <div
        className=""
        key={user.id}
        onClick={() => dispatch(selectUser(user))}
      >
        <div>{user.name}</div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <AutoSizer>
      {({height, width}) => (
        <List
          height={height}
          rowCount={users.length}
          rowHeight={20}
          rowRenderer={rowRenderer}
          width={width}
        />
      )}
    </AutoSizer>
    </div>
  );
};
