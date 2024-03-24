import React, { useState } from 'react';
import style from './UserEdit.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarCheck, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import UserComment from '../../components/UserComment/UserComment';
import { useGetCmtsByUserIdQuery } from '../../app/features/api/cmtsSlice';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../app/features/auth/authSlice';

const UserComments = () => {
  const { id } = useSelector(selectUserInfo);
  const [page, setPage] = useState(1);
  const {
    data: cmts,
    isLoading,
    isSuccess,
    isError,
  } = useGetCmtsByUserIdQuery({ userId: id, page: 1, populate: true });

  return (
    <>
      <div className={style.container}>
        <div className={style.Sidebar}>
          <Link to='/user/booking'>
            <FontAwesomeIcon icon={faCalendarCheck} className='iconProfile' />
            <span>Đơn đặt chỗ của tôi</span>
          </Link>
          <div className={style.profile}>
            <FontAwesomeIcon icon={faMessage} className='iconProfile' />
            <span>Nhận xét</span>
          </div>

          <Link to='/user/profile'>
            <FontAwesomeIcon icon={faUser} className='iconProfile' />
            <span>Hồ sơ</span>
          </Link>
          <hr></hr>
        </div>
        <div className={style.Show}>
          <p className={style.yourComment}>Đánh giá của bạn</p>
          {isLoading && <p>Loading...</p>}
          {!isLoading && isError && <p>Error...</p>}
          {!isLoading &&
            isSuccess &&
            (cmts.length ? (
              cmts.map(cmt => <UserComment key={cmt.id} cmt={cmt} />)
            ) : (
              <>
                <p>Bạn chưa có bình luận nào</p>
                {/* <Link to='/'>
                  <button id={style.one}>Đặt phòng ngay</button>
                </Link> */}
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserComments;
