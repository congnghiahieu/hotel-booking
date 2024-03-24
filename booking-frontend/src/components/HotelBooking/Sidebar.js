import style from './Sidebar.module.css';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { getViewLinkGG } from '../../utils/getViewLinkGG';
import { getDiscount } from '../../utils/random';
import { selectTime, selectRoom } from '../../app/features/search/searchSlice';
import { useSelector } from 'react-redux';
import { getVnDateFormat, numFormatter, hotelLocationFormat } from '../../utils/formatter';
import { differenceInDays } from 'date-fns';

const Sidebar = ({ hotel, service }) => {
  const [start, end] = useSelector(selectTime);
  const room = useSelector(selectRoom);
  const hotelImg = getViewLinkGG(hotel.imgsGG[0]);
  const serviceImg = getViewLinkGG(service.imgsGG[0]);
  const dateDif = useMemo(() => {
    const dateDif = differenceInDays(end, start);
    return dateDif === 0 ? 1 : dateDif;
  }, [start, end]);

  return useMemo(() => {
    return (
      <div className={style.Sidebar}>
        <div className={style.card}>
          <div className={style.info}>
            <img src={`${hotelImg}`} alt={hotel.name} />
            <div className={style.cardBody}>
              <div className={style.discount}>
                <p>{hotel.discountOfCheapest || getDiscount()}%</p>
                <span>GIẢM GIÁ</span>
              </div>
              <h3 className={style.cardTitle}>{hotel.name}</h3>
              <p className={style.cardText}>{hotelLocationFormat(hotel.location)}</p>
            </div>
          </div>
        </div>

        <div className={style.card}>
          <h4>
            {getVnDateFormat(start).withoutWeekDay} - {getVnDateFormat(end).withoutWeekDay} -{' '}
            {dateDif} ngày
          </h4>
          <h4>
            {room} Phòng x {service.name}
          </h4>
          <div className={style.feedBack}>
            <p className={style.point}>{service.point}</p>
            <div className={style.comment}>
              <p id={style.one}>Vô cùng sạch sẽ</p>
              <p id={style.two}>Từ {hotel.cmtSum} bài viết</p>
            </div>
          </div>
          <hr />
          <div className={style.info}>
            <img src={serviceImg} alt={service.name} style={{ width: '120px' }} />
            <div>
              <p>
                <FontAwesomeIcon icon={faUserFriends} />
                <span> Tối đa: 2 người lớn, 1 Trẻ em (0-12 tuổi)</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} className='free' />
                <span> Cà phê & trà </span>
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} className='free' />
                <span> Wifi miễn phí</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faCheck} className='free' />
                <span> Nước uống</span>
              </p>
            </div>
          </div>
          <hr />
          <span style={{ color: '#1aac5b' }}>Hủy KHÔNG CÓ RỦI RO</span>
          <p id={style.one}>Đặt phòng ngay hôm nay để nhận những ưu đãi mới nhất từ khách sạn</p>
        </div>
        <div className={style.card}>
          <div className={style.bookingInfo}>
            <span>GIẢM {service.discount}% HÔM NAY</span>
            <div>
              <div className={style.priceSection}>
                <p>Giá mỗi phòng:</p>
                <p>{numFormatter.format(service.prices)}</p>
              </div>
              <div className={style.priceSection}>
                <p>Giá gốc {`(${room} phòng x ${dateDif} ngày)`}:</p>
                <p style={{ textDecoration: 'line-through' }}>
                  {numFormatter.format(
                    (dateDif * room * (service.prices * 100)) / (100 - service.discount),
                  )}
                </p>
              </div>
              <div className={style.priceSection}>
                <p>Phí đặt trước:</p>
                <p style={{ color: '#488bf8' }}>MIỄN PHÍ</p>
              </div>
            </div>
            <hr />
            <div className={style.priceSection} style={{ fontWeight: '600' }}>
              <p> Tổng chi phí phải thanh toán:</p>
              <p>{numFormatter.format(dateDif * room * service.prices)}</p>
            </div>
            {/* <p style={{ fontSize: '12px' }}>Giá đã bao gồm: VAT 147.273 ₫</p> */}
          </div>
        </div>
      </div>
    );
  }, [hotel, service, start, end, dateDif]);
};

export default Sidebar;
