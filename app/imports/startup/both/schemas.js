import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions(['autoform']);
SimpleSchema.setDefaultMessages({
    initialLanguage: 'en',
    messages: {
        en: {
            uploadError: '{{value}}', //File-upload
        },
    }
});

import { BlocklistSchema } from '../../api/blocklist/BlocklistSchema.js';
import { IpAddressSchema } from '../../api/ipaddress/IpAddressSchema';

Schemas = {
    BlocklistSchema,
    IpAddressSchema
};
