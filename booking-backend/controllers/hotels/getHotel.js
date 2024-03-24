const HotelModel = require('../../model/Hotel');
const { checkValidMongoId, isFalsy } = require('../../utils/checkValidMongoId');
const pagingFind = require('../../utils/pagingFind');
const { getSearchRegex } = require('../../utils/getSearchRegex');

/*
  GET /v1/hotels?hotel_id
*/

const getHotels = async (req, res) => {
    const { hotel_id: hotelId, page, per_page, province, name } = req.query;

    // Check for hotel id (query single hotel)
    if (hotelId) {
        const { isValid, errMsg, errCode } = checkValidMongoId(hotelId);
        if (!isValid) return res.status(errCode).json(errMsg);
    }

    try {
        if (hotelId) {
            const hotel = await HotelModel.findById(hotelId).lean().exec();
            if (!hotel) {
                // If find single hotel and not found mean wrong id
                return res.status(400).json({
                    message: `No hotel with ID ${hotelId} found`,
                });
            }
            return res.status(200).json(hotel);
        }
        let findField;
        if (!isFalsy(province)) {
            findField = {
                'location.province': {
                    '$in': getSearchRegex(province),
                },
            };
        }
        if (!isFalsy(name)) {
            findField = {
                '$text': { '$search': name },
            };
        }
        const hotelList = await pagingFind(page, per_page, HotelModel, findField);

        return res.status(200).json(hotelList);
    } catch (err) {
        // console.log(err);
        return res.status(422).json({
            message: `Get ${hotelId ? `hotel with ID ${hotelId}` : 'all hotels'} failed`,
            isError: true,
        });
    }
};

module.exports = {
    getHotels,
};
