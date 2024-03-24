import style from './HotelOverview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { hotelLocationFormat } from '../../utils/formatter';

function HotelOverview({ hotel }) {
  return (
    <div id={style.Overview}>
      <div className={style.hotel_name}>
        <div className={style.name_header}>
          <div className={style.logo_wrapper}>
            <img
              className={style.Accommodation_type_badge__homes_logo}
              alt=''
              src='//cdn6.agoda.net/images/agoda-homes/homes-logo.svg'></img>
          </div>
          <div className={style.header_script}>Toàn bộ căn hộ</div>
        </div>
        <div className={style.hotel_text}>
          <div className={style.hotel_header}>
            <p>{hotel.name}</p>
            {/* <span className={style.hotel_star}></span> */}
            <p>
              {Array(hotel.stars)
                .fill()
                .map((_, i) => {
                  return <FontAwesomeIcon key={i} icon={faStar} className='star' />;
                })}
            </p>
          </div>
          <p className={style.hotel_location}>{hotelLocationFormat(hotel.location)}</p>
          <p className={style.hotel_decription}>{hotel.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default HotelOverview;
