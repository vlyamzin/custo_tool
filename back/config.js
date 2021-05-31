import {config as cnfg} from 'dotenv';

cnfg();
export const config = {
  domain: process.env.DOMAIN,
  port: process.env.PORT
}
