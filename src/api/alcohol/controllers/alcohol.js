'use strict';

const axios = require("axios");
/**
 * alcohol controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::alcohol.alcohol', ({strapi}) => ({
    async findOne(ctx, next) {
        // force populate
        ctx.request.query.populate = "*";
        const response = await super.findOne(ctx);

        if (response != null) {
            const data = response.data.attributes;
            const toReturn = { ...data, id: response.data.id };

            // populate maker
            if (data.maker.data != null) {
                toReturn.maker = { ...data.maker.data, ...data.maker.data.attributes};
                delete toReturn.maker.attributes;
            } else {
                toReturn.maker = null;
            }

            // populate images
            toReturn.images = data.images.data.map((ele) => ({
                id: ele.id,
                ...ele.attributes,
            }));

            // link tags
            try {
                const tagsRes = await axios.get(`${process.env.TAG_API_HOST}/byalc/${toReturn.id}`);
                toReturn.tags = tagsRes.data.data;
            } catch (err) {
                toReturn.tags = [];
            }
            
            return toReturn;
        } 
        return response;
    }
}));
