import { createContext, useState } from 'react';
import { selectUserInfo } from '../app/features/auth/authSlice';
import { useSelector } from 'react-redux';

export const BookingContext = createContext({});

const TOTAL_PAGE = 3;
const starter = {
  0: 'cus',
  1: 'card',
};

const BookingProvider = ({ children }) => {
  const [page, setPage] = useState(0);
  const { name, email } = useSelector(selectUserInfo);
  const [formData, setFormData] = useState({
    cusName: {
      valid: true,
      value: name,
    },
    cusEmail: {
      valid: true,
      value: email,
    },
    cusEmailVerification: {
      valid: false,
      value: '',
    },
    cusPhone: {
      valid: false,
      value: '',
    },
    cardName: {
      valid: false,
      value: '',
    },
    cardSeries: {
      valid: false,
      value: '',
    },
    cardExpiredate: {
      valid: false,
      value: '',
    },
    cardCvc: {
      valid: false,
      value: '',
    },
  });
  // Value of transaction = prices of service
  const [value, setValue] = useState(0);

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onDataChange = e => {
    const type = e.target.type;
    const name = e.target.name;
    let value;
    switch (type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      case 'files':
        value = e.target.files;
        break;
      default:
        value = e.target.value;
        break;
    }

    const valid = e.target.checkValidity();
    /* Kiểm tra email và confirm email có match không*/
    if (name === 'cusEmail') {
      const match = value === formData.cusEmailVerification.value;
      setFormData(prevData => ({
        ...prevData,
        [name]: {
          ...prevData[name],
          valid,
          value,
        },
        'cusEmailVerification': {
          ...prevData.cusEmailVerification,
          valid: match,
        },
      }));
    }
    /* Các TH khác */
    setFormData(prevData => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        valid,
        value,
      },
    }));
  };

  let canSubmit;
  if (page === 1) {
    canSubmit = Object.values(formData).every(v => v.valid);
  }

  const canNextPage = Object.keys(formData)
    .filter(key => key.startsWith(starter[page]))
    .map(key => formData[key].valid)
    .every(Boolean);

  const disablePrev = page === 0;

  const disableNext = page === 1 || !canNextPage;

  const prevHide = page === 0 && 'hidden';

  const nextHide = page === 1 && 'hidden';

  const submitHide = page !== 1 && 'hidden';

  return (
    <BookingContext.Provider
      value={{
        page,
        setPage,
        formData,
        setFormData,
        value,
        setValue,
        onDataChange,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
