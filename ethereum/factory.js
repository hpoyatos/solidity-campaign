import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xC3D7C5C2b6A6fBeB48de49DEae38fb109F849C0b'
);

export default instance;
