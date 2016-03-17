import SketchfabSDK from 'SketchfabSDK';
import config from '../config/config';

module.exports = new SketchfabSDK(config.oauth2);
