import style from './HomeStay.module.css';
import { getViewLinkGG } from '../../utils/getViewLinkGG';
import { faStar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearch, setField } from '../../app/features/search/searchSlice';
import { SEARCH_FIELD } from '../../utils/constants';
import { numFormatter } from '../../utils/formatter';

function HomeStay({ hotel }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDirect = () => {
    dispatch(setSearch(hotel.name));
    dispatch(setField(SEARCH_FIELD.BY_NAME));
    navigate(`/hotel/view/${hotel.slug}/${hotel.id}`, { preventScrollReset: false });
  };

  return (
    <div className={style.HomeStay} onClick={onDirect}>
      <div className={style.HomeStay_img}>
        <img
          className={style.Img_homeStay}
          src={`${getViewLinkGG(hotel.imgsGG[0])}`}
          alt={hotel.name}
        />
        <div className={style.HomeStay_point}>{hotel.point.toFixed(1)}</div>
      </div>
      <div className={style.HomeStay_name}>{hotel.name}</div>
      <div className={style.HomeStay_location_star}>
        <div className={style.HomeStay_star}>
          {Array(hotel.stars)
            .fill()
            .map((v, i) => (
              <FontAwesomeIcon key={i} icon={faStar} color='#ff567d' />
            ))}
        </div>
        <div className={style.HomeStay_location}>
          <FontAwesomeIcon icon={faLocationDot} />
          {hotel.location.province}, {hotel.location.nation}
        </div>
      </div>
      <span className={style.price_text}>Giá mỗi đêm rẻ nhất từ</span>
      <div className={style.HomeStay_price}>{numFormatter.format(hotel.cheapest || 500000)}</div>
    </div>
  );
}

export default HomeStay;
