import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xbD6E86aF234C3245c6112400de4B2AD197Cc61D2'
);

export default instance;
