import './Comment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faBed, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { getVnDateFormat } from '../../utils/formatter';

function Comment({ cmt }) {
  return (
    <div className='Comment'>
      <div className='user_in4'>
        <p className='userPoint'>{cmt.point} / 10</p>
        <p>
          <b className='userName'>{cmt.user.name}</b>
          {cmt.user?.nation && <span>từ {cmt.user.nation}</span>}
        </p>
        <p className='user_info'>
          <FontAwesomeIcon icon={faSuitcase} className='icon1' />
          <span>Du lịch một mình</span>
        </p>
        <p className='user_info'>
          <FontAwesomeIcon icon={faBed} className='icon1' />
          <span>Căn hộ Suite Executive</span>
        </p>
        <p className='user_info'>
          <FontAwesomeIcon icon={faCalendarDays} className='icon1' />
          <span>Đã ở 1 đêm vào tháng 5 2023</span>
        </p>
      </div>
      <div className='user_comment'>
        <div className='subcomment'>
          <div className='comment1'>"{cmt.title}”</div>
          <div className='comment2'>{cmt.content}</div>
          <div className='time_comment'>
            Đã nhận xét vào {getVnDateFormat(cmt.createdAt).withoutWeekDay}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Comment;
